"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function AlertTestButton({ disabled = false }: { disabled?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function sendTest() {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch("/api/superadmin/alerts/test", { method: "POST" });
      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };
      if (!response.ok || !payload.ok) throw new Error(payload.error || `Error ${response.status}`);
      setMessage(payload.message || "Correo enviado.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar el correo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button type="button" size="sm" variant="outline" disabled={disabled || loading} onClick={sendTest}>
        {loading ? "Enviando..." : "Enviar correo de prueba"}
      </Button>
      {message ? <p className="text-xs text-jd-green">{message}</p> : null}
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
