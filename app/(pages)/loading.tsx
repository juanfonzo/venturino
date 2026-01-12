import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="panel flex min-h-[320px] items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-jd-black/60">
        <Spinner />
        Cargando datos...
      </div>
    </div>
  );
}
