import { normalizeText } from "@/lib/normalize/text";
import type { TractorItem } from "@/lib/types";

export type UnitDuplicateMarked<T> = T & { _isUnitDuplicate: boolean };

type ListingUnitLike = Pick<
  TractorItem,
  | "id"
  | "url"
  | "empresa"
  | "marca"
  | "modelo"
  | "marca_norm"
  | "modelo_norm"
  | "anio"
  | "precio_nor"
  | "hp_motor"
  | "horas_uso"
  | "provincia"
  | "ciudad"
  | "descripcion"
  | "titulo"
  | "formas_pago"
  | "flags"
>;

function normalizeCompany(value?: string | null) {
  return normalizeText(value);
}

function completenessScore(row: ListingUnitLike) {
  let score = 0;
  if (row.precio_nor !== null) score += 10;
  if (row.hp_motor !== null) score += 4;
  if (row.horas_uso !== null) score += 4;
  if (row.provincia) score += 2;
  if (row.ciudad) score += 1;
  if (row.descripcion) score += 1;
  if (row.titulo) score += 1;
  if (row.formas_pago) score += 1;
  if (row.marca) score += 1;
  if (row.modelo) score += 1;
  score += Math.min(row.flags.length, 4);
  return score;
}

function compareRepresentative(a: ListingUnitLike, b: ListingUnitLike) {
  const scoreDiff = completenessScore(a) - completenessScore(b);
  if (scoreDiff !== 0) return scoreDiff;

  if (a.precio_nor !== null && b.precio_nor !== null && a.precio_nor !== b.precio_nor) {
    return b.precio_nor - a.precio_nor;
  }

  const aIdentity = `${a.url ?? ""}|${a.id ?? ""}`;
  const bIdentity = `${b.url ?? ""}|${b.id ?? ""}`;
  return bIdentity.localeCompare(aIdentity);
}

export function getListingUnitKey(
  row: Pick<TractorItem, "empresa" | "marca_norm" | "modelo_norm" | "anio" | "precio_nor">,
) {
  const empresa = normalizeCompany(row.empresa);
  const marca = row.marca_norm?.trim() || null;
  const modelo = row.modelo_norm?.trim() || null;
  const anio = row.anio;
  const precio = row.precio_nor;

  if (!empresa || !marca || !modelo || !Number.isFinite(anio) || !Number.isFinite(precio)) return null;
  return `${empresa}|${marca}|${modelo}|${anio}|${precio}`;
}

export function markListingUnitDuplicates<T extends ListingUnitLike>(rows: T[]): UnitDuplicateMarked<T>[] {
  const preferredIndexByKey = new Map<string, number>();

  rows.forEach((row, index) => {
    const key = getListingUnitKey(row);
    if (!key) return;

    const existingIndex = preferredIndexByKey.get(key);
    if (existingIndex === undefined) {
      preferredIndexByKey.set(key, index);
      return;
    }

    const existingRow = rows[existingIndex];
    if (compareRepresentative(row, existingRow) > 0) {
      preferredIndexByKey.set(key, index);
    }
  });

  return rows.map((row, index) => {
    const key = getListingUnitKey(row);
    if (!key) {
      return { ...row, _isUnitDuplicate: false };
    }

    return {
      ...row,
      _isUnitDuplicate: preferredIndexByKey.get(key) !== index,
    };
  });
}

export function dedupeListingsByUnit<T extends ListingUnitLike>(rows: T[]): T[] {
  const deduped = markListingUnitDuplicates(rows);
  const result: T[] = [];

  deduped.forEach((row, index) => {
    if (row._isUnitDuplicate) return;
    result.push(rows[index]);
  });

  return result;
}
