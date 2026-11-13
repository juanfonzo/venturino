import { normalizeMachineIdentity } from "@/lib/normalize/machineIdentity";
import { normalizeText } from "@/lib/normalize/text";
import {
  type DirectReferenceInput,
  type ExpandedSearchInput,
  type MarketCategory,
  type MarketReferenceFieldError,
} from "@/lib/market-reference/types";

const CATEGORY_BY_NORMALIZED = new Map<string, MarketCategory>([
  ["TRACTOR", "Tractores"],
  ["TRACTORES", "Tractores"],
  ["COSECHADORA", "Cosechadoras"],
  ["COSECHADORAS", "Cosechadoras"],
  ["SEMBRADORA", "Sembradoras"],
  ["SEMBRADORAS", "Sembradoras"],
  ["PULVERIZADORA", "Pulverizadoras"],
  ["PULVERIZADORAS", "Pulverizadoras"],
]);

const MIN_YEAR = 1950;
const MAX_YEAR = new Date().getFullYear() + 1;
const MAX_TEXT_LENGTH = 120;
const DEFAULT_PAGE_SIZE = 25;
const MAX_PAGE_SIZE = 50;

export class MarketReferenceValidationError extends Error {
  readonly issues: string[];
  readonly fields: MarketReferenceFieldError[];

  constructor(fields: MarketReferenceFieldError[]) {
    super(fields.length === 1
      ? fields[0].message
      : "Completá o corregí los datos indicados para consultar referencias.");
    this.name = "MarketReferenceValidationError";
    this.fields = fields;
    this.issues = fields.map((issue) => issue.message);
  }
}

export function parseDirectReferenceInput(value: unknown): DirectReferenceInput {
  const body = asObject(value);
  const issues: MarketReferenceFieldError[] = [];
  const categoria = parseCategory(body.categoria, issues);
  const marca = parseRequiredText(body.marca, "marca", 2, issues);
  const modelo = parseRequiredText(body.modelo, "modelo", 1, issues);
  const anio = parseYear(body.anio, true, issues);

  const identity = normalizeMachineIdentity({ category: categoria, brand: marca, model: modelo });
  const marcaNorm = identity.brandNorm;
  const modeloNorm = identity.modelKey;
  if (marca && !marcaNorm) issues.push({ field: "marca", code: "invalid_value", message: "Revisá la marca de la maquinaria; no pudimos identificarla." });
  if (modelo && !modeloNorm) issues.push({ field: "modelo", code: "invalid_value", message: "Revisá el modelo de la maquinaria; no pudimos identificarlo." });

  if (issues.length > 0 || !categoria || !marca || !modelo || !marcaNorm || !modeloNorm || !anio) {
    throw new MarketReferenceValidationError(issues);
  }

  return {
    categoria,
    marca,
    marcaNorm,
    modelo,
    modeloNorm,
    modeloDisplay: identity.modelDisplay ?? modeloNorm,
    familiaModelo: identity.familyKey,
    familiaDisplay: identity.familyDisplay,
    configuracion: identity.qualifiers,
    anio,
  };
}

export function parseExpandedSearchInput(value: unknown): ExpandedSearchInput {
  const body = asObject(value);
  const issues: MarketReferenceFieldError[] = [];
  const categoria = parseCategory(body.categoria, issues);
  const marca = parseOptionalText(body.marca, "marca", issues);
  const modelo = parseRequiredText(body.modelo, "modelo", 2, issues);
  const anio = parseYear(body.anio, false, issues);
  const page = parseInteger(body.page, "page", 1, 10_000, 1, issues);
  const pageSize = parseInteger(
    body.pageSize,
    "pageSize",
    1,
    MAX_PAGE_SIZE,
    DEFAULT_PAGE_SIZE,
    issues,
  );

  const identity = normalizeMachineIdentity({ category: categoria, brand: marca, model: modelo });
  const marcaNorm = marca ? identity.brandNorm : null;
  const modeloNorm = identity.modelKey;
  if (marca && !marcaNorm) issues.push({ field: "marca", code: "invalid_value", message: "Revisá la marca de la maquinaria; no pudimos identificarla." });
  if (modelo && !modeloNorm) issues.push({ field: "modelo", code: "invalid_value", message: "Revisá el modelo de la maquinaria; no pudimos identificarlo." });

  if (issues.length > 0 || !categoria || !modelo || !modeloNorm) {
    throw new MarketReferenceValidationError(issues);
  }

  return {
    categoria,
    marca,
    marcaNorm,
    modelo,
    modeloNorm,
    modeloDisplay: identity.modelDisplay ?? modeloNorm,
    familiaModelo: identity.familyKey,
    familiaDisplay: identity.familyDisplay,
    configuracion: identity.qualifiers,
    anio,
    page,
    pageSize,
  };
}

function asObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new MarketReferenceValidationError([{
      field: "body",
      code: "invalid_type",
      message: "No pudimos leer los datos de la consulta. Revisalos y volvé a intentarlo.",
    }]);
  }
  return value as Record<string, unknown>;
}

function parseCategory(value: unknown, issues: MarketReferenceFieldError[]) {
  if (isBlank(value)) {
    issues.push({ field: "categoria", code: "required", message: "Seleccioná el tipo de maquinaria: tractor, cosechadora, sembradora o pulverizadora." });
    return null;
  }
  if (typeof value !== "string") {
    issues.push({ field: "categoria", code: "invalid_type", message: "Seleccioná un tipo de maquinaria válido: tractor, cosechadora, sembradora o pulverizadora." });
    return null;
  }
  const normalized = normalizeText(value);
  const category = normalized ? CATEGORY_BY_NORMALIZED.get(normalized) : null;
  if (!category) issues.push({ field: "categoria", code: "invalid_value", message: "Seleccioná un tipo de maquinaria válido: tractor, cosechadora, sembradora o pulverizadora." });
  return category ?? null;
}

function parseRequiredText(
  value: unknown,
  field: "marca" | "modelo",
  minLength: number,
  issues: MarketReferenceFieldError[],
) {
  if (isBlank(value)) {
    issues.push({ field, code: "required", message: field === "marca" ? "Completá la marca de la maquinaria." : "Completá el modelo de la maquinaria." });
    return null;
  }
  if (typeof value !== "string") {
    issues.push({ field, code: "invalid_type", message: field === "marca" ? "Ingresá la marca de la maquinaria como texto." : "Ingresá el modelo de la maquinaria como texto." });
    return null;
  }
  const parsed = value.replace(/\s+/g, " ").trim();
  if (parsed.length < minLength || parsed.length > MAX_TEXT_LENGTH) {
    issues.push({ field, code: "invalid_length", message: `${field === "marca" ? "La marca" : "El modelo"} debe tener entre ${minLength} y ${MAX_TEXT_LENGTH} caracteres.` });
    return null;
  }
  return parsed;
}

function parseOptionalText(value: unknown, field: "marca", issues: MarketReferenceFieldError[]) {
  if (isBlank(value)) return null;
  if (typeof value !== "string") {
    issues.push({ field, code: "invalid_type", message: "Ingresá la marca de la maquinaria como texto." });
    return null;
  }
  const parsed = value.replace(/\s+/g, " ").trim();
  if (parsed.length === 0 || parsed.length > MAX_TEXT_LENGTH) {
    issues.push({ field, code: "invalid_length", message: `La marca debe tener hasta ${MAX_TEXT_LENGTH} caracteres.` });
    return null;
  }
  return parsed;
}

function parseYear(value: unknown, required: boolean, issues: MarketReferenceFieldError[]) {
  if (isBlank(value)) {
    if (required) issues.push({ field: "anio", code: "required", message: "Completá el año de la maquinaria." });
    return null;
  }
  const parsed = typeof value === "number" || typeof value === "string" ? Number(value) : NaN;
  if (!Number.isInteger(parsed) || parsed < MIN_YEAR || parsed > MAX_YEAR) {
    issues.push({ field: "anio", code: "invalid_value", message: `Ingresá un año válido, entre ${MIN_YEAR} y ${MAX_YEAR}, sin decimales.` });
    return null;
  }
  return parsed;
}

function parseInteger(
  value: unknown,
  field: "page" | "pageSize",
  min: number,
  max: number,
  fallback: number,
  issues: MarketReferenceFieldError[],
) {
  if (isBlank(value)) return fallback;
  const parsed = typeof value === "number" || typeof value === "string" ? Number(value) : NaN;
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    issues.push({ field, code: "invalid_value", message: `${field === "page" ? "El número de página" : "La cantidad de resultados por página"} debe ser un número entero entre ${min} y ${max}.` });
    return fallback;
  }
  return parsed;
}

function isBlank(value: unknown) {
  return value === undefined || value === null || (typeof value === "string" && value.trim().length === 0);
}
