"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import {
  REVIEW_REASON_LABELS,
  REVIEW_REASONS,
  REVIEW_STATUS_LABELS,
  REVIEW_STATUSES,
  type ReviewReason,
  type ReviewStatus,
} from "@/lib/superadmin/review";

export function ReviewForm({
  queryId,
  initialStatus,
  initialReason,
  initialNotes,
}: {
  queryId: number;
  initialStatus: string;
  initialReason: string | null;
  initialNotes: string | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<ReviewStatus>(
    REVIEW_STATUSES.includes(initialStatus as ReviewStatus)
      ? initialStatus as ReviewStatus
      : "unreviewed",
  );
  const [reason, setReason] = useState(initialReason || "");
  const [notes, setNotes] = useState(initialNotes || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch(`/api/superadmin/market-reference-queries/${queryId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reason, notes }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!response.ok || !payload.ok) throw new Error(payload.error || `Error ${response.status}`);
      setMessage("Revisión guardada.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar la revisión");
    } finally {
      setLoading(false);
    }
  }

  function updateStatus(next: ReviewStatus) {
    setStatus(next);
    if (next === "unreviewed" || next === "correct") setReason("");
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-jd-black/70">
          Estado
          <Select value={status} onChange={(event) => updateStatus(event.target.value as ReviewStatus)}>
            {REVIEW_STATUSES.map((value) => (
              <option key={value} value={value}>{REVIEW_STATUS_LABELS[value]}</option>
            ))}
          </Select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-jd-black/70">
          Motivo
          <Select
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            disabled={status === "unreviewed" || status === "correct"}
          >
            <option value="">Sin motivo</option>
            {REVIEW_REASONS.map((value) => (
              <option key={value} value={value}>{REVIEW_REASON_LABELS[value as ReviewReason]}</option>
            ))}
          </Select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-xs font-semibold text-jd-black/70">
        Nota interna
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          maxLength={1000}
          rows={4}
          className="w-full resize-y rounded-xl border border-jd-black/15 bg-white/80 px-3 py-2 text-sm font-normal outline-none transition focus:border-jd-green"
          placeholder="Observación breve"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? "Guardando..." : "Guardar revisión"}
        </Button>
        {message ? <span className="text-xs text-jd-green">{message}</span> : null}
        {error ? <span className="text-xs text-red-700">{error}</span> : null}
      </div>
    </form>
  );
}
