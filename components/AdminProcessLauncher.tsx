"use client";

import { useState } from "react";

type ProcessAction = "maquinaria" | "postventa";

type ProcessOption = {
  action: ProcessAction;
  label: string;
  description: string;
};

type ProcessResponse = {
  ok?: boolean;
  label?: string;
  error?: string;
  output?: string;
};

const PROCESS_OPTIONS: ProcessOption[] = [
  {
    action: "maquinaria",
    label: "Maquinaria",
    description: "Mongo maquinaria -> Postgres",
  },
  {
    action: "postventa",
    label: "Postventa",
    description: "Mongo postventa -> Postgres + análisis",
  },
];

export function AdminProcessLauncher() {
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState<ProcessAction | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runProcess(option: ProcessOption) {
    const confirmed = window.confirm(`Ejecutar proceso: ${option.label}?`);
    if (!confirmed) return;

    setRunning(option.action);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/admin/processes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: option.action }),
      });
      const payload = (await response.json().catch(() => ({}))) as ProcessResponse;
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || `Error ${response.status}`);
      }

      setMessage(`${payload.label || option.label} finalizó correctamente.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setRunning(null);
    }
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
                className="rounded border border-jd-black/10 bg-jd-cream/60 px-3 py-2 text-left transition hover:border-jd-green/40 hover:bg-jd-yellow/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="block font-semibold text-jd-black">
                  {running === option.action ? "Ejecutando..." : option.label}
                </span>
                <span className="block text-[11px] text-jd-black/55">{option.description}</span>
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
