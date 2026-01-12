import type { Estado } from "@/lib/types";

const DEFAULT_YEAR_THRESHOLD = new Date().getFullYear() - 2;

export function buildFlags({
  precio_nor,
  anio,
  hp_motor,
  ubicacion,
  estado_norm,
  yearThreshold = DEFAULT_YEAR_THRESHOLD,
}: {
  precio_nor: number | null;
  anio: number | null;
  hp_motor: number | null;
  ubicacion: string | null;
  estado_norm: Estado;
  yearThreshold?: number;
}) {
  const flags: string[] = [];

  if (precio_nor === null) flags.push("MISSING_PRICE");
  if (anio === null) flags.push("MISSING_YEAR");
  if (hp_motor === null) flags.push("MISSING_HP");
  if (!ubicacion) flags.push("MISSING_LOCATION");

  if (estado_norm === "Nuevo" && anio !== null && anio < yearThreshold) {
    flags.push("YEAR_CONDITION_CONFLICT");
  }

  return flags;
}
