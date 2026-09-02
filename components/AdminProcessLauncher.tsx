"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

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
  { action: "maquinaria", label: "Actualizar maquinaria" },
  { action: "postventa", label: "Actualizar postventa" },
];

export function AdminProcessLauncher() {
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
    if (!window.confirm(`¿Ejecutar ${option.label.toLowerCase()}?`)) return;

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
      if (payload.process.status === "running") startPolling(option.action);
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
        setError(err instanceof Error ? err.message : "No se pudo consultar el proceso");
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
    <section className="panel">
      <div className="panel-header">
        <h2 className="text-lg font-semibold text-jd-black">Procesos</h2>
      </div>
      <div className="panel-body">
        <div className="flex flex-wrap gap-3">
          {PROCESS_OPTIONS.map((option) => (
            <Button
              key={option.action}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => runProcess(option)}
              disabled={running !== null}
            >
              {running === option.action ? "Ejecutando..." : option.label}
            </Button>
          ))}
        </div>
        {message ? <p className="mt-3 text-xs text-jd-green">{message}</p> : null}
        {error ? <p className="mt-3 text-xs text-red-700">{error}</p> : null}
      </div>
    </section>
  );
}
