import { normalizeMachineIdentity } from "@/lib/normalize/machineIdentity";
import { normalizeText } from "@/lib/normalize/text";
import {
  MARKET_CATEGORIES,
  type DirectReferenceInput,
  type ExpandedSearchInput,
  type MarketCategory,
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

  constructor(issues: string[]) {
    super("La solicitud contiene datos inválidos.");
    this.name = "MarketReferenceValidationError";
    this.issues = issues;
  }
}

export function parseDirectReferenceInput(value: unknown): DirectReferenceInput {
  const body = asObject(value);
  const issues: string[] = [];
  const categoria = parseCategory(body.categoria, issues);
  const marca = parseRequiredText(body.marca, "marca", 2, issues);
  const modelo = parseRequiredText(body.modelo, "modelo", 1, issues);
  const anio = parseYear(body.anio, true, issues);
  const externalOperationId = parseOptionalText(
    body.externalOperationId,
    "externalOperationId",
    issues,
  );

  const identity = normalizeMachineIdentity({ category: categoria, brand: marca, model: modelo });
  const marcaNorm = identity.brandNorm;
  const modeloNorm = identity.modelKey;
  if (!marcaNorm) issues.push("marca no se pudo normalizar.");
  if (!modeloNorm) issues.push("modelo no se pudo normalizar.");

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
    externalOperationId,
  };
}

export function parseExpandedSearchInput(value: unknown): ExpandedSearchInput {
  const body = asObject(value);
  const issues: string[] = [];
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
  const externalOperationId = parseOptionalText(
    body.externalOperationId,
    "externalOperationId",
    issues,
  );

  const identity = normalizeMachineIdentity({ category: categoria, brand: marca, model: modelo });
  const marcaNorm = marca ? identity.brandNorm : null;
  const modeloNorm = identity.modelKey;
  if (marca && !marcaNorm) issues.push("marca no se pudo normalizar.");
  if (!modeloNorm) issues.push("modelo no se pudo normalizar.");

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
    externalOperationId,
  };
}

function asObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new MarketReferenceValidationError(["El cuerpo debe ser un objeto JSON."]);
  }
  return value as Record<string, unknown>;
}

function parseCategory(value: unknown, issues: string[]) {
  if (typeof value !== "string") {
    issues.push(`categoria es obligatoria: ${MARKET_CATEGORIES.join(", ")}.`);
    return null;
  }
  const normalized = normalizeText(value);
  const category = normalized ? CATEGORY_BY_NORMALIZED.get(normalized) : null;
  if (!category) issues.push(`categoria debe ser una de: ${MARKET_CATEGORIES.join(", ")}.`);
  return category ?? null;
}

function parseRequiredText(
  value: unknown,
  field: string,
  minLength: number,
  issues: string[],
) {
  if (typeof value !== "string") {
    issues.push(`${field} es obligatorio.`);
    return null;
  }
  const parsed = value.replace(/\s+/g, " ").trim();
  if (parsed.length < minLength || parsed.length > MAX_TEXT_LENGTH) {
    issues.push(`${field} debe tener entre ${minLength} y ${MAX_TEXT_LENGTH} caracteres.`);
    return null;
  }
  return parsed;
}

function parseOptionalText(value: unknown, field: string, issues: string[]) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") {
    issues.push(`${field} debe ser texto.`);
    return null;
  }
  const parsed = value.replace(/\s+/g, " ").trim();
  if (parsed.length === 0 || parsed.length > MAX_TEXT_LENGTH) {
    issues.push(`${field} debe tener hasta ${MAX_TEXT_LENGTH} caracteres.`);
    return null;
  }
  return parsed;
}

function parseYear(value: unknown, required: boolean, issues: string[]) {
  if (!required && (value === undefined || value === null || value === "")) return null;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(parsed) || parsed < MIN_YEAR || parsed > MAX_YEAR) {
    issues.push(`anio debe ser un entero entre ${MIN_YEAR} y ${MAX_YEAR}.`);
    return null;
  }
  return parsed;
}

function parseInteger(
  value: unknown,
  field: string,
  min: number,
  max: number,
  fallback: number,
  issues: string[],
) {
  if (value === undefined || value === null || value === "") return fallback;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    issues.push(`${field} debe ser un entero entre ${min} y ${max}.`);
    return fallback;
  }
  return parsed;
}
