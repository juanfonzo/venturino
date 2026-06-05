"use client";

import { useEffect, useRef, useState } from "react";

type ProcessAction = "maquinaria" | "postventa";

type ProcessOption = {
  action: ProcessAction;
  label: string;
};

type ProcessState = {
  action: ProcessAction;
  label: string;
  status: "running" | "success" | "failed";
  startedAt: string;
  finishedAt?: string;
  exitCode?: number | null;
  error?: string;
  output?: string;
};

type ProcessResponse = {
  ok?: boolean;
  error?: string;
  process?: ProcessState | null;
};

const PROCESS_OPTIONS: ProcessOption[] = [
  { action: "maquinaria", label: "Maquinaria" },
  { action: "postventa", label: "Postventa" },
];

export function AdminProcessLauncher() {
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState<ProcessAction | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (pollingRef.current) window.clearInterval(pollingRef.current);
    };
  }, []);

  async function runProcess(option: ProcessOption) {
    const confirmed = window.confirm(`Ejecutar proceso: ${option.label}?`);
    if (!confirmed) return;

    stopPolling();
    setRunning(option.action);
    setMessage(`${option.label} iniciado.`);
    setError(null);

    try {
      const response = await fetch("/api/admin/processes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: option.action }),
      });
      const payload = (await response.json().catch(() => ({}))) as ProcessResponse;
      if (!response.ok || !payload.ok || !payload.process) {
        throw new Error(payload.error || `Error ${response.status}`);
      }

      handleProcessState(payload.process);
      if (payload.process.status === "running") {
        startPolling(option.action);
      }
    } catch (err) {
      setRunning(null);
      setMessage(null);
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }

  function startPolling(action: ProcessAction) {
    pollingRef.current = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/admin/processes?action=${action}`);
        const payload = (await response.json().catch(() => ({}))) as ProcessResponse;
        if (!response.ok || !payload.ok) throw new Error(payload.error || `Error ${response.status}`);
        if (payload.process) handleProcessState(payload.process);
      } catch (err) {
        stopPolling();
        setRunning(null);
        setError(err instanceof Error ? err.message : "No se pudo consultar el estado del proceso");
      }
    }, 4000);
  }

  function stopPolling() {
    if (!pollingRef.current) return;
    window.clearInterval(pollingRef.current);
    pollingRef.current = null;
  }

  function handleProcessState(process: ProcessState) {
    if (process.status === "running") {
      setRunning(process.action);
      setMessage(`${process.label} en ejecución.`);
      return;
    }

    stopPolling();
    setRunning(null);
    if (process.status === "success") {
      setMessage(`${process.label} finalizó correctamente.`);
      setError(null);
      return;
    }

    setMessage(null);
    setError(process.error || `${process.label} terminó con error`);
  }

  return (
    <div className="relative z-10 flex justify-end">
      {open ? (
        <div className="absolute bottom-11 right-0 w-72 rounded-lg border border-jd-black/10 bg-white/95 p-3 text-xs shadow-soft backdrop-blur">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="font-semibold text-jd-black/70">Procesos</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded px-2 py-1 text-jd-black/45 transition hover:bg-jd-black/5 hover:text-jd-black"
              aria-label="Cerrar configuración"
            >
              x
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {PROCESS_OPTIONS.map((option) => (
              <button
                key={option.action}
                type="button"
                onClick={() => runProcess(option)}
                disabled={running !== null}
                className="rounded border border-jd-black/10 bg-jd-cream/60 px-3 py-3 text-left transition hover:border-jd-green/40 hover:bg-jd-yellow/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="block font-semibold text-jd-black">
                  {running === option.action ? "Ejecutando..." : option.label}
                </span>
              </button>
            ))}
          </div>

          {message ? <p className="mt-2 text-[11px] text-jd-green">{message}</p> : null}
          {error ? <p className="mt-2 text-[11px] text-red-700">{error}</p> : null}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-jd-black/10 bg-white/55 text-sm text-jd-black/25 opacity-50 shadow-soft transition hover:bg-white hover:text-jd-black/75 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-jd-green/40"
        aria-label="Abrir configuración"
        title="Configuración"
      >
        ⚙
      </button>
    </div>
  );
}
