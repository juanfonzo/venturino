import { normalizeMatchText, normalizeText } from "@/lib/normalize/text";

export type MachineCategory =
  | "Tractores"
  | "Cosechadoras"
  | "Sembradoras"
  | "Pulverizadoras";

export interface MachineIdentity {
  brandNorm: string | null;
  modelKey: string | null;
  modelDisplay: string | null;
  familyKey: string | null;
  familyDisplay: string | null;
  qualifiers: string[];
  aliasApplied: boolean;
  source: "model" | "title" | "none";
}

const BRAND_EQUIVALENCES: Record<string, string> = {
  JD: "JOHN DEERE",
  JOHN: "JOHN DEERE",
  JOHNDEERE: "JOHN DEERE",
  "JOHN DEERE": "JOHN DEERE",
  CASE: "CASE IH",
  CASEIH: "CASE IH",
  "CASE IH": "CASE IH",
  NEW: "NEW HOLLAND",
  NEWHOLLAND: "NEW HOLLAND",
  "NEW HOLLAND": "NEW HOLLAND",
  MASSEY: "MASSEY FERGUSON",
  MASSEYFERGUSON: "MASSEY FERGUSON",
  MASSEYFERGUSSON: "MASSEY FERGUSON",
  "MASSEY FERGUSON": "MASSEY FERGUSON",
  "MASSEY FERGUSSON": "MASSEY FERGUSON",
  DEUTZFAHR: "DEUTZ FAHR",
  "DEUTZ FAHR": "DEUTZ FAHR",
  "DEUTZ- FAHR": "DEUTZ FAHR",
  FAHR: "DEUTZ FAHR",
  AGCO: "AGCO ALLIS",
  AGCOALLIS: "AGCO ALLIS",
  VALMET: "VALTRA",
  "VALTRA VALMET": "VALTRA",
  "VALTRA - VALMET": "VALTRA",
};

const MODEL_BRAND_PREFIXES = new Set([
  "CASEIH",
  "CIH",
  "DEERE",
  "JHON",
  "JOHNDEERE",
  "NEWHOLLAND",
]);

const CATEGORY_TOKENS = new Set([
  "TRACTOR",
  "TRACTORES",
  "COSECHADORA",
  "COSECHADORAS",
  "SEMBRADORA",
  "SEMBRADORAS",
  "PULVERIZADORA",
  "PULVERIZADORAS",
  "AUTOPROPULSADA",
  "AUTOPROPULSADO",
]);

const CONFIGURATION_TOKENS = new Set([
  "4WD",
  "4X4",
  "4X2",
  "2WD",
  "DT",
  "DUAL",
  "DOBL",
  "DOBLE",
  "SIMPLE",
  "TRACCION",
  "ROD",
  "RODADO",
  "PATON",
  "CAB",
  "CABINA",
  "CABINADO",
  "FULL",
  "PREMIUM",
  "MOD",
  "MODELO",
  "ANO",
  "AÑO",
  "HP",
]);

const CATEGORY_CONFIGURATION_TOKENS: Record<MachineCategory, Set<string>> = {
  Tractores: new Set(),
  Cosechadoras: new Set([
    "DRAPER",
    "FLEXDRAPER",
    "PLATAF",
    "PLATAFORMA",
    "PIES",
    "P",
  ]),
  Sembradoras: new Set(["HILERAS", "SURCOS", "LINEAS", "LINEA"]),
  Pulverizadoras: new Set([
    "HYDRO",
    "HIDRO",
    "HIDROSTATICA",
    "HIDROSTATICO",
    "BOTALON",
    "METROS",
    "METRO",
    "MTS",
    "CARBONO",
  ]),
};

type AliasRule = { modelKey: string; display: string };

// Only proven, scoped aliases belong here. Model-line suffixes are otherwise preserved.
const MODEL_ALIASES: Record<string, AliasRule> = {
  "TRACTORES|JOHN DEERE|5075ED": { modelKey: "5075E", display: "5075E" },
  "TRACTORES|JOHN DEERE|5065ES": { modelKey: "5065E", display: "5065E" },
  "TRACTORES|JOHN DEERE|5045DS": { modelKey: "5045D", display: "5045D" },
  "TRACTORES|NEW HOLLAND|T8295270": { modelKey: "T8295", display: "T8.295" },
};

const MODEL_DISPLAY: Record<string, string> = {
  T8295: "T8.295",
  T8325: "T8.325",
  T8355: "T8.355",
  T8385: "T8.385",
  T8430: "T8.430",
  T8440: "T8.440",
  CR790: "CR7.90",
  MAP33300: "MAP 3 3300",
};

export function normalizeMachineIdentity(input: {
  category?: string | null;
  brand?: string | null;
  model?: string | null;
  title?: string | null;
  hp?: number | string | null;
}): MachineIdentity {
  const category = normalizeCategory(input.category);
  const brandNorm = normalizeBrand(input.brand);
  const explicitModel = stripSeriesPrefix(input.model);
  const inferredTitleModel = extractModelFromTitle(input.title, brandNorm);
  const useTitleModel = Boolean(
    inferredTitleModel
    && (!explicitModel || (isNumericOnlyModel(explicitModel) && /[A-Z]/i.test(inferredTitleModel))),
  );
  const modelText = useTitleModel ? inferredTitleModel : explicitModel;
  const modelSource = useTitleModel ? "title" : explicitModel ? "model" : "none";
  const qualifiers = extractCommercialQualifiers(
    [input.model, input.title].filter(Boolean).join(" "),
    category,
  );

  const normalizedModel = normalizeModelText(modelText, category, brandNorm, input.hp);
  if (!normalizedModel) {
    return {
      brandNorm,
      modelKey: null,
      modelDisplay: null,
      familyKey: null,
      familyDisplay: null,
      qualifiers,
      aliasApplied: false,
      source: modelSource,
    };
  }

  const compact = compactModel(normalizedModel);
  const aliasScope = `${category?.toUpperCase() ?? ""}|${brandNorm ?? ""}|`;
  const alias = MODEL_ALIASES[`${aliasScope}${compactModel(modelText ?? "")}`]
    ?? MODEL_ALIASES[`${aliasScope}${compact}`];
  const modelKey = alias?.modelKey ?? normalizeEmbeddedConfiguration(compact, category);
  const modelDisplay = alias?.display ?? MODEL_DISPLAY[modelKey] ?? modelKey;
  const family = getModelFamily(modelKey, brandNorm);

  return {
    brandNorm,
    modelKey,
    modelDisplay,
    familyKey: family?.key ?? null,
    familyDisplay: family?.display ?? null,
    qualifiers,
    aliasApplied: Boolean(alias) || compact !== modelKey,
    source: modelSource,
  };
}

export function normalizeBrandModelParts(brand?: string | null, model?: string | null) {
  const identity = normalizeMachineIdentity({ brand, model });
  return { brandNorm: identity.brandNorm, modelNorm: identity.modelKey };
}

export function inferModelFromTitle(title?: string | null, brand?: string | null) {
  return normalizeMachineIdentity({ brand, title }).modelKey;
}

function normalizeCategory(value?: string | null): MachineCategory | null {
  const normalized = normalizeText(value ?? null);
  if (!normalized) return null;
  if (normalized.startsWith("TRACTOR")) return "Tractores";
  if (normalized.startsWith("COSECHADOR")) return "Cosechadoras";
  if (normalized.startsWith("SEMBRADOR")) return "Sembradoras";
  if (normalized.startsWith("PULVERIZADOR")) return "Pulverizadoras";
  return null;
}

function normalizeBrand(value?: string | null) {
  const normalized = normalizeText(value ?? null);
  if (!normalized) return null;
  const compact = normalized.replace(/\s+/g, "");
  return BRAND_EQUIVALENCES[normalized] ?? BRAND_EQUIVALENCES[compact] ?? normalized;
}

function stripSeriesPrefix(value?: string | null) {
  if (!value) return null;
  const stripped = value.replace(/^[^›]+›\s*/, "").trim();
  return stripped || null;
}

function extractModelFromTitle(title?: string | null, brandNorm?: string | null) {
  if (!title) return null;
  const leadingSegment = title.split(/[,;|]/, 1)[0];
  let tokens = (normalizeMatchText(leadingSegment) ?? "").split(" ").filter(Boolean);
  if (tokens.length === 0) return null;

  tokens = tokens.filter((token) => !CATEGORY_TOKENS.has(token));
  const brandTokens = new Set((brandNorm ?? "").split(" ").filter(Boolean));
  while (tokens.length > 0 && brandTokens.has(tokens[0])) tokens.shift();
  if (brandNorm === "NEW HOLLAND" && tokens[0] === "HOLLAND") tokens.shift();
  if (brandNorm === "JOHN DEERE" && tokens[0] === "DEERE") tokens.shift();

  const output: string[] = [];
  for (const token of tokens) {
    if (/^(19\d{2}|20\d{2})$/.test(token)) break;
    if (token === "HP" || /^\d{2,3}HP$/.test(token)) break;
    if (CONFIGURATION_TOKENS.has(token)) break;
    output.push(token);
    if (output.length >= 3) break;
  }
  return output.join(" ") || null;
}

function normalizeModelText(
  value: string | null,
  category: MachineCategory | null,
  brandNorm: string | null,
  hp?: number | string | null,
) {
  const normalized = normalizeMatchText(value);
  if (!normalized) return null;
  let tokens = normalized.split(" ").filter(Boolean);
  const brandTokens = new Set((brandNorm ?? "").split(" ").filter(Boolean));

  while (
    tokens.length > 1
    && (
      CATEGORY_TOKENS.has(tokens[0])
      || brandTokens.has(tokens[0])
      || MODEL_BRAND_PREFIXES.has(tokens[0])
      || tokens[0] === "HOLLAND"
    )
  ) {
    tokens.shift();
  }

  const categoryConfiguration = category ? CATEGORY_CONFIGURATION_TOKENS[category] : new Set<string>();
  const hpValue = Number(hp);
  tokens = tokens.filter((token) => {
    if (CONFIGURATION_TOKENS.has(token) || categoryConfiguration.has(token)) return false;
    if (/^\d{2,3}HP$/.test(token)) return false;
    if (category === "Pulverizadoras" && /^(?:HYDRO|HIDRO)\d*$/.test(token)) return false;
    return true;
  });

  if (Number.isFinite(hpValue) && tokens.length > 1) {
    const last = tokens[tokens.length - 1];
    const previous = tokens.slice(0, -1).join("");
    if (Number(last) === hpValue && /^\d{2,3}$/.test(last) && /\d{3,}/.test(previous)) {
      tokens.pop();
    }
  }

  if (tokens.length === 0) return null;
  const joined = tokens.join(" ")
    .replace(/\b([A-Z]+)\s+(\d+)\b/g, "$1$2")
    .replace(/\b(\d+)\s+([A-Z]+)\b/g, "$1$2")
    .replace(/\b([A-Z]+\d+)\s+(\d+)\b/g, "$1$2")
    .replace(/\s+/g, " ")
    .trim();
  return joined || null;
}

function normalizeEmbeddedConfiguration(value: string, category: MachineCategory | null) {
  if (category === "Cosechadoras") {
    return value.replace(/^(S\d{3})(?:25|30|35|40|45|50)$/, "$1");
  }
  if (category === "Pulverizadoras") {
    return value.replace(/^(\d{3,5})(?:HYDRO|HIDRO).*$/, "$1");
  }
  return value;
}

function extractCommercialQualifiers(value: string, category: MachineCategory | null) {
  const normalized = normalizeMatchText(value) ?? "";
  const qualifiers: string[] = [];
  const add = (label: string) => {
    if (!qualifiers.includes(label)) qualifiers.push(label);
  };

  if (/\b(?:4WD|4X4|DOBLE TRACCION)\b/.test(normalized)) add("Doble tracción");
  if (/\bDUAL\b/.test(normalized)) add("Rodado dual");
  if (/\bSIMPLE\b/.test(normalized)) add("Rodado simple");
  if (/\bPATON\b/.test(normalized)) add("Rodado patón");
  if (/\b(?:HYDRO|HIDRO)\d*\b|\b(?:HIDROSTATICA|HIDROSTATICO)\b/.test(normalized)) {
    add("Transmisión hidrostática");
  }

  if (category === "Cosechadoras" && /\b(?:DRAPER|FLEXDRAPER)\b/.test(normalized)) {
    const feet = normalized.match(/\b(\d{2})\s*(?:P|PIES)?\b(?=.*\bDRAPER\b)/)?.[1]
      ?? normalized.match(/\bDRAPER\s*(\d{2})\b/)?.[1];
    add(feet ? `Plataforma Draper de ${feet} pies` : "Plataforma Draper");
  } else if (category === "Cosechadoras" && /\bPLATAF(?:ORMA)?\b/.test(normalized)) {
    add("Con plataforma");
  }
  if (category === "Cosechadoras") {
    const embeddedFeet = normalized.match(/\bS\d{3}\s*(25|30|35|40|45|50)\b/)?.[1];
    if (embeddedFeet && !qualifiers.some((item) => item.includes("pies"))) {
      add(`Plataforma de ${embeddedFeet} pies`);
    }
  }

  if (category === "Pulverizadoras") {
    const meters = normalized.match(/\b(\d{2})\s*(?:MTS|METROS|METRO)\b/)?.[1]
      ?? normalized.match(/\b(?:HYDRO|HIDRO)(\d{2})\b/)?.[1];
    if (meters) add(`Botalón de ${meters} metros`);
    if (/\bCARBONO\b/.test(normalized)) add("Botalón de carbono");
  }

  return qualifiers;
}

function getModelFamily(modelKey: string, brandNorm: string | null) {
  let match = modelKey.match(/^T(\d)\d+$/);
  if (brandNorm === "NEW HOLLAND" && match) {
    return { key: `T${match[1]}`, display: `Serie T${match[1]}` };
  }
  match = modelKey.match(/^T(\d)$/);
  if (brandNorm === "NEW HOLLAND" && match) {
    return { key: modelKey, display: `Serie T${match[1]}` };
  }
  match = modelKey.match(/^CR(\d)\d+$/);
  if (brandNorm === "NEW HOLLAND" && match) {
    return { key: `CR${match[1]}`, display: `Serie CR${match[1]}` };
  }
  match = modelKey.match(/^CR(\d)$/);
  if (brandNorm === "NEW HOLLAND" && match) {
    return { key: modelKey, display: `Serie CR${match[1]}` };
  }
  match = modelKey.match(/^S\d+$/);
  if (brandNorm === "JOHN DEERE" && match) {
    return { key: modelKey.slice(0, 2), display: `Serie S, línea ${modelKey[1]}00` };
  }
  match = modelKey.match(/^(\d)([A-Z])\d+$/);
  if (brandNorm === "JOHN DEERE" && match) {
    return { key: `${match[1]}${match[2]}`, display: `Serie ${match[1]}${match[2]}` };
  }
  match = modelKey.match(/^(\d)\d{3}([A-Z])$/);
  if (brandNorm === "JOHN DEERE" && match) {
    return { key: `${match[1]}${match[2]}`, display: `Serie ${match[1]}${match[2]}` };
  }
  match = modelKey.match(/^(\d)([A-Z])$/);
  if (brandNorm === "JOHN DEERE" && match) {
    return { key: modelKey, display: `Serie ${modelKey}` };
  }
  if (brandNorm === "PLA" && modelKey.startsWith("MAP3")) {
    return { key: "MAP3", display: "Línea MAP 3" };
  }
  return null;
}

function compactModel(value: string) {
  return value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
}

function isNumericOnlyModel(value: string) {
  return /^\d[\d\s.,/-]*$/.test(value.trim());
}
