import { normalizeText } from "@/lib/normalize/text";
import type { TractorItem } from "@/lib/types";

export interface TractorQuery {
  q?: string | null;
  searchScope?: "core" | "full" | null;
  origin?: string | null;
  brand?: string | null;
  model?: string | null;
  estado?: string | null;
  province?: string | null;
  yearMin?: number | null;
  yearMax?: number | null;
  hpMin?: number | null;
  hpMax?: number | null;
  hasPrice?: boolean | null;
}

export function applyTractorFilters(rows: TractorItem[], query: TractorQuery) {
  const q = query.q?.toLowerCase().trim();
  const brandNorm = normalizeText(query.brand ?? null);
  const modelNorm = normalizeText(query.model ?? null);
  const originNorm = normalizeText(query.origin ?? null);
  const estadoNorm = normalizeText(query.estado ?? null);
  const provinceNorm = normalizeText(query.province ?? null);
  const yearThreshold = new Date().getFullYear() - 2;
  const includeDescription = query.searchScope !== "core";

  return rows.filter((row) => {
    if (q) {
      const haystackParts = [row.titulo, row.marca, row.modelo];
      if (includeDescription) haystackParts.push(row.descripcion);
      const haystack = haystackParts.filter(Boolean).join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (originNorm) {
      const rowOrigin = normalizeText(row.origen ?? null);
      if (rowOrigin !== originNorm) return false;
    }

    if (brandNorm) {
      if (row.marca_norm !== brandNorm) return false;
    }

    if (modelNorm) {
      if (!row.modelo_norm || !row.modelo_norm.includes(modelNorm)) return false;
    }

    if (estadoNorm) {
      const rowEstado = normalizeText(row.estado_norm ?? null);
      if (rowEstado !== estadoNorm) return false;
      if (estadoNorm === "NUEVO" && row.anio && row.anio < yearThreshold) {
        return false;
      }
    }

    if (provinceNorm) {
      const rowProv = normalizeText(row.provincia ?? null);
      if (rowProv !== provinceNorm) return false;
    }

    if (query.yearMin !== null && query.yearMin !== undefined) {
      if (!row.anio || row.anio < query.yearMin) return false;
    }

    if (query.yearMax !== null && query.yearMax !== undefined) {
      if (!row.anio || row.anio > query.yearMax) return false;
    }

    if (query.hpMin !== null && query.hpMin !== undefined) {
      if (!row.hp_motor || row.hp_motor < query.hpMin) return false;
    }

    if (query.hpMax !== null && query.hpMax !== undefined) {
      if (!row.hp_motor || row.hp_motor > query.hpMax) return false;
    }

    if (query.hasPrice !== null && query.hasPrice !== undefined) {
      if (query.hasPrice && row.precio_nor === null) return false;
      if (!query.hasPrice && row.precio_nor !== null) return false;
    }

    return true;
  });
}

export function sortTractors(rows: TractorItem[], sortBy?: string | null, sortDir?: string | null) {
  const dir = sortDir === "asc" ? 1 : -1;
  if (!sortBy) return rows;

  const sorted = [...rows];
  const compareNullable = (aVal: number | null, bVal: number | null) => {
    if (aVal === null && bVal === null) return 0;
    if (aVal === null) return 1;
    if (bVal === null) return -1;
    return (aVal - bVal) * dir;
  };
  if (sortBy === "price_nor") {
    sorted.sort((a, b) => compareNullable(a.precio_nor, b.precio_nor));
  } else if (sortBy === "year") {
    sorted.sort((a, b) => compareNullable(a.anio, b.anio));
  } else if (sortBy === "hp") {
    sorted.sort((a, b) => compareNullable(a.hp_motor, b.hp_motor));
  }

  return sorted;
}
