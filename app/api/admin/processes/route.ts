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

const PROCESS_DEFINITIONS: Record<ProcessAction, ProcessDefinition> = {
  maquinaria: {
    label: "Actualizar maquinaria",
    script: "pipeline:live",
    timeoutMs: 30 * 60 * 1000,
  },
  postventa: {
    label: "Actualizar postventa",
    script: "pipeline:postventa",
    timeoutMs: 30 * 60 * 1000,
  },
};

const runningActions = new Set<ProcessAction>();

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifyToken(token) : null;
  if (!session) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { action?: unknown };
  const action = typeof body.action === "string" ? body.action : "";
  if (!isProcessAction(action)) {
    return NextResponse.json({ ok: false, error: "Proceso no permitido" }, { status: 400 });
  }

  if (runningActions.has(action)) {
    return NextResponse.json(
      { ok: false, error: "Ese proceso ya se está ejecutando" },
      { status: 409 },
    );
  }

  const definition = PROCESS_DEFINITIONS[action];
  runningActions.add(action);
  const startedAt = new Date();

  try {
    const result = await runNpmScript(definition);
    const finishedAt = new Date();
    console.log(
      `[admin-processes] action=${action} script=${definition.script} exit=${result.exitCode} durationMs=${
        finishedAt.getTime() - startedAt.getTime()
      }`,
    );

    if (result.exitCode !== 0) {
      return NextResponse.json(
        {
          ok: false,
          action,
          label: definition.label,
          startedAt: startedAt.toISOString(),
          finishedAt: finishedAt.toISOString(),
          exitCode: result.exitCode,
          error: "El proceso terminó con error",
          output: result.output,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      action,
      label: definition.label,
      startedAt: startedAt.toISOString(),
      finishedAt: finishedAt.toISOString(),
      exitCode: result.exitCode,
      output: result.output,
    });
  } catch (error) {
    const finishedAt = new Date();
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error(`[admin-processes] action=${action} ERROR: ${message}`);
    return NextResponse.json(
      {
        ok: false,
        action,
        label: definition.label,
        startedAt: startedAt.toISOString(),
        finishedAt: finishedAt.toISOString(),
        error: message,
      },
      { status: 500 },
    );
  } finally {
    runningActions.delete(action);
  }
}

function isProcessAction(value: string): value is ProcessAction {
  return value === "maquinaria" || value === "postventa";
}

function runNpmScript(definition: ProcessDefinition) {
  return new Promise<{ exitCode: number | null; output: string }>((resolve, reject) => {
    const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
    const child = spawn(npmCommand, ["run", definition.script], {
      cwd: process.cwd(),
      env: process.env,
      shell: false,
    });

    let output = "";
    const appendOutput = (chunk: Buffer) => {
      output += chunk.toString("utf8");
      if (output.length > 12000) output = output.slice(-12000);
    };

    const timeout = setTimeout(() => {
      child.kill("SIGTERM");
      reject(new Error(`Timeout ejecutando ${definition.script}`));
    }, definition.timeoutMs);

    child.stdout.on("data", appendOutput);
    child.stderr.on("data", appendOutput);
    child.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timeout);
      resolve({ exitCode: code, output: output.trim() });
    });
  });
}
