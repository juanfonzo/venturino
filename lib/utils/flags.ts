export const FLAG_LABELS: Record<string, string> = {
  MISSING_PRICE: "Sin precio",
  MISSING_YEAR: "Sin anio",
  MISSING_HP: "Sin potencia",
  MISSING_LOCATION: "Sin ubicacion",
  YEAR_CONDITION_CONFLICT: "Nuevo con anio antiguo",
  SUSPECT_PLACEHOLDER: "Precio sospechoso",
  OUTLIER_LOW: "Precio muy bajo",
  OUTLIER_HIGH: "Precio muy alto",
};

export function formatFlag(flag: string) {
  return FLAG_LABELS[flag] ?? flag;
}
