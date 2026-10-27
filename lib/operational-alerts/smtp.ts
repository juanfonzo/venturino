import { randomUUID } from "node:crypto";
import net, { type Socket as NetSocket } from "node:net";
import os from "node:os";
import tls, { type TLSSocket } from "node:tls";
import type { OperationalAlertConfig } from "@/lib/operational-alerts/config";
import { sanitizeHeaderText } from "@/lib/operational-alerts/sanitize";

type SmtpSocket = NetSocket | TLSSocket;

type SmtpResponse = {
  code: number;
  lines: string[];
};

class SmtpResponseReader {
  private buffer = "";
  private current: string[] = [];
  private queue: SmtpResponse[] = [];
  private waiters: Array<{
    resolve: (response: SmtpResponse) => void;
    reject: (error: Error) => void;
  }> = [];

  private readonly onData = (chunk: Buffer) => {
    this.buffer += chunk.toString("utf8");
    let separatorIndex = this.buffer.indexOf("\r\n");
    while (separatorIndex >= 0) {
      const line = this.buffer.slice(0, separatorIndex);
      this.buffer = this.buffer.slice(separatorIndex + 2);
      this.consumeLine(line);
      separatorIndex = this.buffer.indexOf("\r\n");
    }
  };

  private readonly onError = (error: Error) => this.rejectAll(error);
  private readonly onClose = () => this.rejectAll(new Error("La conexión SMTP se cerró inesperadamente."));

  constructor(private readonly socket: SmtpSocket) {
    socket.on("data", this.onData);
    socket.on("error", this.onError);
    socket.on("close", this.onClose);
  }

  read(): Promise<SmtpResponse> {
    const queued = this.queue.shift();
    if (queued) return Promise.resolve(queued);
    return new Promise((resolve, reject) => this.waiters.push({ resolve, reject }));
  }

  dispose() {
    this.socket.off("data", this.onData);
    this.socket.off("error", this.onError);
    this.socket.off("close", this.onClose);
  }

  private consumeLine(line: string) {
    this.current.push(line);
    const match = line.match(/^(\d{3})([ -])/);
    if (!match || match[2] === "-") return;
    const response = { code: Number(match[1]), lines: this.current };
    this.current = [];
    const waiter = this.waiters.shift();
    if (waiter) waiter.resolve(response);
    else this.queue.push(response);
  }

  private rejectAll(error: Error) {
    while (this.waiters.length > 0) this.waiters.shift()?.reject(error);
  }
}

export async function sendOperationalEmail(input: {
  config: NonNullable<OperationalAlertConfig["smtp"]>;
  subject: string;
  body: string;
}) {
  const plainSocket = net.createConnection({
    host: input.config.server,
    port: input.config.port,
  });
  plainSocket.setTimeout(15_000, () => plainSocket.destroy(new Error("Timeout SMTP.")));
  await onceConnected(plainSocket, "connect");

  let socket: SmtpSocket = plainSocket;
  let reader = new SmtpResponseReader(socket);

  try {
    await expectResponse(reader, [220]);
    await command(socket, reader, `EHLO ${sanitizeEhloHost(os.hostname())}`, [250]);
    await command(socket, reader, "STARTTLS", [220]);

    reader.dispose();
    const secureSocket = tls.connect({
      socket: plainSocket,
      servername: input.config.server,
      rejectUnauthorized: true,
    });
    secureSocket.setTimeout(15_000, () => secureSocket.destroy(new Error("Timeout SMTP TLS.")));
    await onceConnected(secureSocket, "secureConnect");
    socket = secureSocket;
    reader = new SmtpResponseReader(socket);

    await command(socket, reader, `EHLO ${sanitizeEhloHost(os.hostname())}`, [250]);
    await command(socket, reader, "AUTH LOGIN", [334]);
    await command(socket, reader, Buffer.from(input.config.user, "utf8").toString("base64"), [334]);
    await command(socket, reader, Buffer.from(input.config.password, "utf8").toString("base64"), [235]);
    await command(socket, reader, `MAIL FROM:<${input.config.from}>`, [250]);
    for (const recipient of input.config.recipients) {
      await command(socket, reader, `RCPT TO:<${recipient}>`, [250, 251]);
    }
    await command(socket, reader, "DATA", [354]);

    const message = buildSmtpMessage({
      from: input.config.from,
      recipients: input.config.recipients,
      subject: input.subject,
      body: input.body,
    });
    socket.write(`${message}\r\n.\r\n`, "utf8");
    await expectResponse(reader, [250]);
    await command(socket, reader, "QUIT", [221]);
  } finally {
    reader.dispose();
    socket.end();
    if (!plainSocket.destroyed) plainSocket.destroy();
  }
}

export function buildSmtpMessage(input: {
  from: string;
  recipients: string[];
  subject: string;
  body: string;
}) {
  const subject = encodeHeader(sanitizeHeaderText(input.subject));
  const body = input.body
    .replace(/\r?\n/g, "\r\n")
    .split("\r\n")
    .map((line) => (line.startsWith(".") ? `.${line}` : line))
    .join("\r\n");
  return [
    `From: ${input.from}`,
    `To: ${input.recipients.join(", ")}`,
    `Subject: ${subject}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${randomUUID()}@${sanitizeEhloHost(os.hostname())}>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    body,
  ].join("\r\n");
}

async function command(
  socket: SmtpSocket,
  reader: SmtpResponseReader,
  value: string,
  expectedCodes: number[],
) {
  socket.write(`${value}\r\n`, "utf8");
  return expectResponse(reader, expectedCodes);
}

async function expectResponse(reader: SmtpResponseReader, expectedCodes: number[]) {
  const response = await reader.read();
  if (!expectedCodes.includes(response.code)) {
    throw new Error(`SMTP respondió ${response.code}: ${response.lines.join(" | ")}`);
  }
  return response;
}

function onceConnected(socket: SmtpSocket, event: "connect" | "secureConnect") {
  return new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      socket.off(event, onConnected);
      socket.off("error", onError);
    };
    const onConnected = () => {
      cleanup();
      resolve();
    };
    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };
    socket.once(event, onConnected);
    socket.once("error", onError);
  });
}

function encodeHeader(value: string) {
  return /^[\x20-\x7E]*$/.test(value)
    ? value
    : `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function sanitizeEhloHost(value: string) {
  const sanitized = value.replace(/[^a-zA-Z0-9.-]/g, "-").slice(0, 120);
  return sanitized || "venturino";
}
