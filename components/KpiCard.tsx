import { cn } from "@/lib/utils/cn";

export function KpiCard({
  label,
  value,
  helper,
  tone = "default",
}: {
  label: string;
  value: string;
  helper?: string;
  tone?: "default" | "green" | "yellow";
}) {
  const tones = {
    default: "bg-white/80",
    green: "bg-jd-green/10",
    yellow: "bg-jd-yellow/20",
  };

  return (
    <div className={cn("panel animate-rise", tones[tone])}>
      <div className="panel-body">
        <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">{label}</p>
        <p className="mt-3 text-2xl font-semibold text-jd-black">{value}</p>
        {helper ? <p className="mt-2 text-xs text-jd-black/60">{helper}</p> : null}
      </div>
    </div>
  );
}
