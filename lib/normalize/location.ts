import { normalizeText } from "@/lib/normalize/text";

const PROVINCE_MAP: Record<string, string> = {
  "CIUDAD AUTONOMA DE BUENOS AIRES": "Ciudad Autónoma de Buenos Aires",
  CABA: "Ciudad Autónoma de Buenos Aires",
  "CAPITAL FEDERAL": "Ciudad Autónoma de Buenos Aires",
  "BUENOS AIRES": "Buenos Aires",
  "PROVINCIA DE BUENOS AIRES": "Buenos Aires",
  PBA: "Buenos Aires",
  "TIERRA DEL FUEGO": "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
  "TIERRA DEL FUEGO ANTARTIDA E ISLAS DEL ATLANTICO SUR":
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
  "TIERRA DEL FUEGO, ANTARTIDA E ISLAS DEL ATLANTICO SUR":
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
  "CORDOBA": "Córdoba",
  "ENTRE RIOS": "Entre Ríos",
  "RIO NEGRO": "Río Negro",
  "TUCUMAN": "Tucumán",
  "NEUQUEN": "Neuquén",
  "DEPARTAMENTO DE MISIONES": "Misiones",
  "PARANA": "Entre Ríos",
};

const CANONICAL_PROVINCES = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Ciudad Autónoma de Buenos Aires",
  "Corrientes",
  "Córdoba",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
  "Tucumán",
];

const CANONICAL_LOOKUP = new Set(
  CANONICAL_PROVINCES.map((name) => normalizeText(name) ?? name.toUpperCase()),
);

function normalizeProvincia(value: string | null) {
  if (!value) return null;
  const cleaned = value.trim();
  if (!cleaned) return null;
  const key = normalizeText(cleaned) ?? cleaned.toUpperCase();
  return PROVINCE_MAP[key] ?? cleaned;
}

export function deriveLocation(ubicacionRaw?: string | null) {
  if (!ubicacionRaw) {
    return { provincia: null, ciudad: null };
  }

  const trimmed = ubicacionRaw.toString().trim();
  if (!trimmed) {
    return { provincia: null, ciudad: null };
  }

  const parts = trimmed
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return { provincia: null, ciudad: null };
  }

  if (parts.length === 1) {
    const guess = normalizeProvincia(parts[0]);
    const guessKey = guess ? normalizeText(guess) ?? guess.toUpperCase() : "";
    if (guess && guessKey && CANONICAL_LOOKUP.has(guessKey)) {
      return { provincia: guess, ciudad: null };
    }
    return { provincia: null, ciudad: parts[0] };
  }

  return {
    provincia: normalizeProvincia(parts[parts.length - 1]),
    ciudad: parts.slice(0, -1).join(", "),
  };
}
