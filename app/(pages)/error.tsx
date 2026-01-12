"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="panel flex min-h-[320px] flex-col items-center justify-center gap-3 text-sm text-jd-black/70">
      <p>No se pudo cargar esta seccion. Revisa el CSV e intenta otra vez.</p>
      <button
        onClick={reset}
        className="rounded-full bg-jd-yellow px-4 py-2 text-xs font-semibold"
      >
        Reintentar
      </button>
    </div>
  );
}
