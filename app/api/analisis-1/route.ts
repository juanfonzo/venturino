import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { computeAnalisis1 } from "@/lib/analysis/analisis1";
import { normalizeText } from "@/lib/normalize/text";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseIntParam(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseFloatParam(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

function parseBoolParam(value: string | null, fallback: boolean) {
  if (value === null) return fallback;
  const raw = value.toString().trim().toLowerCase();
  if (raw === "1" || raw === "true" || raw === "yes" || raw === "on") return true;
  if (raw === "0" || raw === "false" || raw === "no" || raw === "off") return false;
  return fallback;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const categoria = searchParams.get("categoria") ?? null;
    const brandNorm = normalizeText(searchParams.get("brand") ?? null);
    const modelNorm = normalizeText(searchParams.get("model") ?? null);

    const maxVenturinoRows = parseIntParam(searchParams.get("maxVenturinoRows"), 250);
    const maxEquivalentsPerRow = parseIntParam(searchParams.get("maxEquivalentsPerRow"), 50);
    const yearTolerance = clamp(parseIntParam(searchParams.get("yearTolerance"), 1), 0, 10);
    const hoursTolerancePct = clamp(parseFloatParam(searchParams.get("hoursTolerancePct"), 0.15), 0, 1);
    const fuzzyLevel = clamp(parseIntParam(searchParams.get("fuzzyLevel"), 1), 0, 3);

    const compareYear = parseBoolParam(searchParams.get("compareYear"), true);
    const compareHours = parseBoolParam(searchParams.get("compareHours"), true);

    const data = await computeAnalisis1({
      categoria,
      brandNorm,
      modelNorm,
      maxVenturinoRows,
      maxEquivalentsPerRow,
      yearTolerance,
      hoursTolerancePct,
      fuzzyLevel,
      compareYear,
      compareHours,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "No se pudo calcular Análisis 1." }, { status: 500 });
  }
}
