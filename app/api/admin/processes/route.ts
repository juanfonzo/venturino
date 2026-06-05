import { spawn } from "node:child_process";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ProcessAction = "maquinaria" | "postventa";

type ProcessDefinition = {
  label: string;
  script: string;
  timeoutMs: number;
};

type ProcessState = {
  action: ProcessAction;
  label: string;
  script: string;
  status: "running" | "success" | "failed";
  startedAt: string;
  finishedAt?: string;
  exitCode?: number | null;
  error?: string;
  output: string;
};

const PROCESS_DEFINITIONS: Record<ProcessAction, ProcessDefinition> = {
  maquinaria: {
    label: "Maquinaria",
    script: "pipeline:live",
    timeoutMs: 30 * 60 * 1000,
  },
  postventa: {
    label: "Postventa",
    script: "pipeline:postventa",
    timeoutMs: 30 * 60 * 1000,
  },
};

const processStates = new Map<ProcessAction, ProcessState>();

export async function GET(request: NextRequest) {
  const unauthorized = await requireSession(request);
  if (unauthorized) return unauthorized;

  const action = request.nextUrl.searchParams.get("action");
  if (action) {
    if (!isProcessAction(action)) {
      return NextResponse.json({ ok: false, error: "Proceso no permitido" }, { status: 400 });
    }
    return NextResponse.json({ ok: true, process: getProcessState(action) });
  }

  return NextResponse.json({
    ok: true,
    processes: {
      maquinaria: getProcessState("maquinaria"),
      postventa: getProcessState("postventa"),
    },
  });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireSession(request);
  if (unauthorized) return unauthorized;

  const body = (await request.json().catch(() => ({}))) as { action?: unknown };
  const action = typeof body.action === "string" ? body.action : "";
  if (!isProcessAction(action)) {
    return NextResponse.json({ ok: false, error: "Proceso no permitido" }, { status: 400 });
  }

  const currentState = processStates.get(action);
  if (currentState?.status === "running") {
    return NextResponse.json(
      { ok: false, error: "Ese proceso ya se está ejecutando", process: currentState },
      { status: 409 },
    );
  }

  const state = startNpmScript(action, PROCESS_DEFINITIONS[action]);
  return NextResponse.json({ ok: true, process: state }, { status: 202 });
}

async function requireSession(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifyToken(token) : null;
  if (!session) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }
  return null;
}

function isProcessAction(value: string): value is ProcessAction {
  return value === "maquinaria" || value === "postventa";
}

function startNpmScript(action: ProcessAction, definition: ProcessDefinition): ProcessState {
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const startedAt = new Date();
  const state: ProcessState = {
    action,
    label: definition.label,
    script: definition.script,
    status: "running",
    startedAt: startedAt.toISOString(),
    output: "",
  };
  processStates.set(action, state);

  const child = spawn(npmCommand, ["run", definition.script], {
    cwd: process.cwd(),
    env: process.env,
    shell: false,
  });

  const appendOutput = (chunk: Buffer) => {
    state.output += chunk.toString("utf8");
    if (state.output.length > 12000) state.output = state.output.slice(-12000);
  };

  const timeout = setTimeout(() => {
    state.status = "failed";
    state.error = `Timeout ejecutando ${definition.script}`;
    state.finishedAt = new Date().toISOString();
    child.kill("SIGTERM");
  }, definition.timeoutMs);

  child.stdout.on("data", appendOutput);
  child.stderr.on("data", appendOutput);
  child.on("error", (error) => {
    clearTimeout(timeout);
    state.status = "failed";
    state.error = error.message;
    state.finishedAt = new Date().toISOString();
    console.error(`[admin-processes] action=${action} ERROR: ${error.message}`);
  });
  child.on("close", (code) => {
    clearTimeout(timeout);
    if (state.status === "running") {
      state.status = code === 0 ? "success" : "failed";
      state.error = code === 0 ? undefined : "El proceso terminó con error";
      state.finishedAt = new Date().toISOString();
    }
    state.exitCode = code;
    state.output = state.output.trim();
    const durationMs = new Date(state.finishedAt || new Date()).getTime() - startedAt.getTime();
    console.log(
      `[admin-processes] action=${action} script=${definition.script} exit=${code} status=${state.status} durationMs=${durationMs}`,
    );
  });

  return state;
}

function getProcessState(action: ProcessAction) {
  return processStates.get(action) ?? null;
}
