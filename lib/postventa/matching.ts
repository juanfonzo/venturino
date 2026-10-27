export const POSTVENTA_ALGORITHM_VERSION = "postventa-v0";
export const DEFAULT_POSTVENTA_TOP_N = 20;
export const DEFAULT_POSTVENTA_PRICE_BAND = 0.4;
export const DEFAULT_POSTVENTA_MIN_SCORE = 20;
export const DEFAULT_POSTVENTA_SIMILARITY_THRESHOLD = 0.1;

export type PostventaSource = "venturino" | "ml";
export type MatchConfidence = "alta" | "media" | "baja" | "descartar";
export type MatchStatus =
  | "Venturino más caro que ML"
  | "Venturino más barato que ML"
  | "sin comparable"
  | "baja confianza"
  | "similar a ML";

export type PostventaComparableProduct = {
  id: number;
  source: PostventaSource;
  externalId: string;
  name: string;
  priceArs: number | null;
  url: string | null;
  installmentTotalArs?: number | null;
  installmentsQuantity?: number | null;
  freeShipping?: boolean | null;
};

export type ProductFeatures = {
  normalized: string;
  tokens: string[];
  brand: boolean;
  types: string[];
  strongTokens: string[];
  primaryTokens: string[];
  batteryAh: number | null;
  fluidLiters: number | null;
  modelTokens: string[];
  technicalCodes: string[];
};

export type FeaturedPostventaProduct = PostventaComparableProduct & {
  features: ProductFeatures;
};

export type PostventaCandidate = {
  mlProductId: number;
  mlExternalId: string;
  name: string;
  priceArs: number;
  url: string | null;
  installmentTotalArs: number | null;
  installmentsQuantity: number | null;
  freeShipping: boolean | null;
  diffPct: number;
  score: number;
  confidence: Exclude<MatchConfidence, "descartar">;
  reasons: string[];
};

export type PostventaProductMatch = {
  candidates: PostventaCandidate[];
  medianMlPriceArs: number | null;
  ventVsMedianPct: number | null;
  status: MatchStatus;
  bestConfidence: MatchConfidence;
  strongCandidateCount: number;
  excludedByPrice: number;
  excludedByScore: number;
  totalValidBeforeTop: number;
};

export type AnalyzePostventaOptions = {
  topN?: number;
  priceBand?: number;
  minScore?: number;
  similarityThreshold?: number;
};

const STOPWORDS = new Set([
  "a",
  "al",
  "ante",
  "articulo",
  "articulos",
  "con",
  "de",
  "del",
  "el",
  "en",
  "la",
  "las",
  "lo",
  "los",
  "para",
  "por",
  "sin",
  "un",
  "una",
  "unas",
  "uno",
  "y",
]);

const BRAND_TOKENS = new Set(["john", "deere", "jd"]);

const TOKEN_SYNONYMS = new Map<string, string>([
  ["jhon", "john"],
  ["jhondeere", "john"],
  ["johndeere", "john"],
  ["gorro", "gorra"],
  ["gorros", "gorra"],
  ["gorras", "gorra"],
  ["cap", "gorra"],
  ["caps", "gorra"],
  ["neumaticos", "neumatico"],
  ["tire", "neumatico"],
  ["tyre", "neumatico"],
  ["filtros", "filtro"],
  ["filtrante", "filtro"],
  ["cuchillas", "cuchilla"],
  ["navajas", "navaja"],
  ["cinceles", "cincel"],
  ["correas", "correa"],
  ["belt", "correa"],
  ["belts", "correa"],
  ["latas", "lata"],
  ["carburadores", "carburador"],
  ["termos", "termo"],
  ["bolsos", "bolso"],
  ["remeras", "remera"],
  ["camisetas", "remera"],
  ["motores", "motor"],
  ["hidraulicos", "hidraulico"],
  ["hidraulica", "hidraulico"],
  ["lts", "l"],
  ["lts.", "l"],
  ["litro", "l"],
  ["litros", "l"],
  ["pulgadas", "pulgada"],
  ["llaves", "llave"],
  ["tubos", "tubo"],
  ["piezas", "pieza"],
  ["herramientas", "herramienta"],
  ["combustibles", "combustible"],
  ["manometros", "manometro"],
  ["baterias", "bateria"],
  ["generadores", "generador"],
  ["sopladores", "soplador"],
  ["bombas", "bomba"],
  ["motobombas", "motobomba"],
  ["motoguadanas", "motoguadana"],
  ["motoguadañas", "motoguadana"],
  ["desmalezadora", "motoguadana"],
  ["desmalezadoras", "motoguadana"],
  ["cortadoras", "cortadora"],
  ["cortacesped", "cortadora"],
  ["cortacésped", "cortadora"],
  ["cuchillos", "cuchillo"],
  ["punzones", "punzon"],
  ["puntones", "punton"],
  ["pinzas", "pinza"],
  ["enfriadores", "enfriador"],
  ["acondicionadores", "acondicionador"],
  ["mejoradores", "mejorador"],
  ["inyectores", "inyector"],
  ["boquillas", "boquilla"],
  ["botellas", "botella"],
  ["jarros", "jarro"],
  ["taza", "jarro"],
  ["tazas", "jarro"],
  ["mug", "jarro"],
  ["mugs", "jarro"],
  ["mates", "mate"],
  ["materos", "mate"],
  ["matero", "mate"],
  ["bombillas", "bombilla"],
  ["mochilas", "mochila"],
  ["fumigadoras", "fumigadora"],
  ["aspersoras", "aspersora"],
  ["pulverizadores", "pulverizador"],
  ["boinas", "boina"],
  ["bandejas", "bandeja"],
  ["materas", "matera"],
  ["anticongelantes", "anticongelante"],
  ["coolgard", "cool-gard"],
  ["tractir", "tractor"],
  ["duals", "dual"],
]);

const PRODUCT_TYPE_BY_TOKEN = new Map<string, string>([
  ["gorra", "GORRA"],
  ["neumatico", "NEUMATICO"],
  ["aceite", "ACEITE"],
  ["lubricante", "ACEITE"],
  ["filtro", "FILTRO"],
  ["manometro", "MANOMETRO"],
  ["bateria", "BATERIA"],
  ["generador", "GENERADOR"],
  ["soplador", "SOPLADOR"],
  ["motor", "MOTOR"],
  ["bomba", "BOMBA"],
  ["enfriador", "ENFRIADOR"],
  ["cuchilla", "CUCHILLA"],
  ["navaja", "NAVAJA"],
  ["cuchillo", "CUCHILLO"],
  ["cincel", "CINCEL"],
  ["punton", "CUCHILLA"],
  ["punzon", "PUNZON"],
  ["pinza", "PINZA"],
  ["isg", "ISG"],
  ["correa", "CORREA"],
  ["lata", "LATA"],
  ["carburador", "CARBURADOR"],
  ["aditivo", "ADITIVO"],
  ["acondicionador", "ADITIVO"],
  ["mejorador", "ADITIVO"],
  ["inyector", "INYECCION"],
  ["boquilla", "INYECCION"],
  ["botella", "BOTELLA"],
  ["jarro", "JARRO"],
  ["taza", "JARRO"],
  ["mate", "MATE"],
  ["bombilla", "MATE"],
  ["mochila", "MOCHILA"],
  ["fumigadora", "MOCHILA"],
  ["aspersora", "MOCHILA"],
  ["pulverizador", "MOCHILA"],
  ["boina", "BOINA"],
  ["bandeja", "BANDEJA"],
  ["matera", "MATERA"],
  ["anticongelante", "REFRIGERANTE"],
  ["cool-gard", "REFRIGERANTE"],
  ["termo", "TERMO"],
  ["bolso", "BOLSO"],
  ["remera", "INDUMENTARIA"],
  ["herramienta", "HERRAMIENTA"],
  ["palanca", "HERRAMIENTA"],
  ["juguete", "JUGUETE"],
  ["motobomba", "MOTOBOMBA"],
  ["motoguadana", "MOTOGUADANA"],
  ["cortadora", "CORTADORA"],
]);

const TECHNICAL_DETAIL_TYPES = new Set([
  "ACEITE",
  "FILTRO",
  "BATERIA",
  "BOMBA",
  "ENFRIADOR",
  "INYECCION",
  "CORREA",
  "CUCHILLA",
  "NAVAJA",
  "CUCHILLO",
  "CINCEL",
  "PUNZON",
  "MOTOBOMBA",
  "MOTOGUADANA",
  "CORTADORA",
  "MOTOR",
  "GENERADOR",
  "SOPLADOR",
  "MANOMETRO",
  "CARBURADOR",
]);

const SPECIFIC_TYPE_TOKENS = new Map<string, string>([
  ["PINZA", "pinza"],
  ["MATE", "mate"],
  ["MATERA", "matera"],
  ["NAVAJA", "navaja"],
  ["CUCHILLA", "cuchilla"],
  ["CUCHILLO", "cuchillo"],
  ["CINCEL", "cincel"],
  ["PUNZON", "punzon"],
]);

const CONFIDENCE_ORDER: Record<MatchConfidence, number> = {
  alta: 3,
  media: 2,
  baja: 1,
  descartar: 0,
};

export function normalizePostventaAnalysisOptions(options: AnalyzePostventaOptions = {}) {
  return {
    topN: clampInteger(options.topN, 1, 50, DEFAULT_POSTVENTA_TOP_N),
    priceBand: clampNumber(options.priceBand, 0.05, 2, DEFAULT_POSTVENTA_PRICE_BAND),
    minScore: clampInteger(options.minScore, 0, 100, DEFAULT_POSTVENTA_MIN_SCORE),
    similarityThreshold: clampNumber(
      options.similarityThreshold,
      0,
      1,
      DEFAULT_POSTVENTA_SIMILARITY_THRESHOLD,
    ),
  };
}

export function withPostventaFeatures(product: PostventaComparableProduct): FeaturedPostventaProduct {
  return {
    ...product,
    features: extractFeatures(product.name, product.source),
  };
}

export function extractFeatures(name: string, source: PostventaSource): ProductFeatures {
  const tokens = unique(tokenize(name));
  const tokenSet = new Set(tokens);
  const brand = tokenSet.has("jd") || (tokenSet.has("john") && tokenSet.has("deere"));
  const normalized = normalizeBase(name);
  const modelTokens = tokens.filter(isModelToken);

  return {
    normalized,
    tokens,
    brand,
    types: inferProductTypes(tokens, normalized, source),
    strongTokens: tokens.filter(isStrongToken),
    primaryTokens: tokens.filter((token) => !BRAND_TOKENS.has(token)),
    batteryAh: extractBatteryAh(normalized),
    fluidLiters: extractFluidLiters(normalized),
    modelTokens,
    technicalCodes: unique([...modelTokens, ...tokens.filter(isTechnicalCodeToken)]),
  };
}

export function buildPostventaMatch(
  venturino: FeaturedPostventaProduct,
  mlProducts: FeaturedPostventaProduct[],
  options: AnalyzePostventaOptions = {},
): PostventaProductMatch {
  const { topN, priceBand, minScore, similarityThreshold } = normalizePostventaAnalysisOptions(options);

  if (!venturino.priceArs) {
    return emptyMatch("sin comparable");
  }

  const evaluated: PostventaCandidate[] = [];
  let excludedByPrice = 0;
  let excludedByScore = 0;

  for (const ml of mlProducts) {
    if (!ml.priceArs) continue;

    const diffPct = (ml.priceArs - venturino.priceArs) / venturino.priceArs;
    const effectivePriceBand = getEffectivePriceBand(venturino, ml, priceBand);
    const effectiveMinPrice = venturino.priceArs * (1 - effectivePriceBand);
    const effectiveMaxPrice = venturino.priceArs * (1 + effectivePriceBand);
    if (ml.priceArs < effectiveMinPrice || ml.priceArs > effectiveMaxPrice) {
      excludedByPrice += 1;
      continue;
    }

    const scored = scorePostventaCandidate(venturino, ml, minScore);
    if (scored.score < minScore || scored.confidence === "descartar") {
      excludedByScore += 1;
      continue;
    }

    evaluated.push({
      mlProductId: ml.id,
      mlExternalId: ml.externalId,
      name: ml.name,
      priceArs: ml.priceArs,
      url: ml.url,
      installmentTotalArs: ml.installmentTotalArs ?? null,
      installmentsQuantity: ml.installmentsQuantity ?? null,
      freeShipping: ml.freeShipping ?? null,
      diffPct,
      score: scored.score,
      confidence: scored.confidence,
      reasons: scored.reasons,
    });
  }

  evaluated.sort((a, b) => {
    return (
      b.score - a.score ||
      CONFIDENCE_ORDER[b.confidence] - CONFIDENCE_ORDER[a.confidence] ||
      Math.abs(a.diffPct) - Math.abs(b.diffPct)
    );
  });

  const candidates = shouldKeepLowConfidenceOnlyMatch(venturino, evaluated)
    ? evaluated.slice(0, topN)
    : evaluated.filter((candidate) => candidate.confidence !== "baja").slice(0, topN);
  const prices = candidates.map((candidate) => candidate.priceArs).sort((a, b) => a - b);
  const medianMlPriceArs =
    prices.length === 0
      ? null
      : prices.length % 2
        ? prices[Math.floor(prices.length / 2)]
        : (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2;

  const ventVsMedianPct =
    medianMlPriceArs && venturino.priceArs ? (venturino.priceArs - medianMlPriceArs) / medianMlPriceArs : null;

  const bestConfidence = candidates.reduce<MatchConfidence>(
    (best, candidate) =>
      CONFIDENCE_ORDER[candidate.confidence] > CONFIDENCE_ORDER[best] ? candidate.confidence : best,
    "descartar",
  );
  const strongCandidateCount = candidates.filter((candidate) => CONFIDENCE_ORDER[candidate.confidence] >= 2).length;

  const status: MatchStatus =
    candidates.length === 0
      ? "sin comparable"
      : bestConfidence === "baja" || strongCandidateCount === 0
        ? "baja confianza"
        : ventVsMedianPct !== null && Math.abs(ventVsMedianPct) <= similarityThreshold
          ? "similar a ML"
        : ventVsMedianPct !== null && ventVsMedianPct > 0
          ? "Venturino más caro que ML"
          : ventVsMedianPct !== null && ventVsMedianPct < 0
            ? "Venturino más barato que ML"
            : "similar a ML";

  return {
    candidates,
    medianMlPriceArs,
    ventVsMedianPct,
    status,
    bestConfidence,
    strongCandidateCount,
    excludedByPrice,
    excludedByScore,
    totalValidBeforeTop: evaluated.length,
  };
}

function scorePostventaCandidate(
  venturino: FeaturedPostventaProduct,
  ml: FeaturedPostventaProduct,
  minScore: number,
) {
  const vf = venturino.features;
  const mf = ml.features;
  const reasons: string[] = [];
  let score = 0;

  const commonPrimary = intersection(vf.primaryTokens, new Set(mf.primaryTokens)).filter(
    (token) => !BRAND_TOKENS.has(token),
  );
  const commonStrong = intersection(vf.strongTokens, new Set(mf.strongTokens));
  const commonTypes = intersection(vf.types, new Set(mf.types));
  const guardrailRejection = getGuardrailRejection(vf, mf, commonPrimary, commonStrong);
  if (guardrailRejection) {
    return {
      score: 0,
      confidence: "descartar" as MatchConfidence,
      reasons: [guardrailRejection],
    };
  }

  const typeMismatch = vf.types.length > 0 && mf.types.length > 0 && commonTypes.length === 0;
  const brandMatch = vf.brand && mf.brand;

  if (commonTypes.length > 0) {
    score += 35;
    reasons.push(`tipo: ${commonTypes.join(", ")}`);
  }

  if (typeMismatch) {
    score -= 45;
    reasons.push(`penalización tipo distinto (${vf.types.join(", ")} vs ${mf.types.join(", ")})`);
  }

  if (vf.batteryAh !== null) {
    if (mf.batteryAh === vf.batteryAh) {
      score += 25;
      reasons.push(`capacidad batería: ${vf.batteryAh}Ah`);
    } else if (mf.batteryAh !== null) {
      score -= 35;
      reasons.push(`penalización capacidad batería distinta (${vf.batteryAh}Ah vs ${mf.batteryAh}Ah)`);
    } else {
      score -= 12;
      reasons.push(`capacidad batería no informada en candidato (${vf.batteryAh}Ah)`);
    }
  }

  const extraCandidateTypes = mf.types.filter((type) => !vf.types.includes(type));
  if (commonTypes.length > 0 && extraCandidateTypes.length > 0) {
    const penalizableExtraTypes = extraCandidateTypes.filter(
      (type) => !(vf.types.includes("MATERA") && ["BOLSO", "MATE"].includes(type)),
    );
    const technicalExtraCount = penalizableExtraTypes.filter((type) => TECHNICAL_DETAIL_TYPES.has(type)).length;
    const genericExtraCount = penalizableExtraTypes.length - technicalExtraCount;
    score -= Math.min(technicalExtraCount * 25 + genericExtraCount * 10, 40);
    if (penalizableExtraTypes.length > 0) {
      reasons.push(`penalización tipo adicional candidato: ${penalizableExtraTypes.join(", ")}`);
    }
  }

  const specificTypeMatched = commonTypes.some((type) => {
    const token = SPECIFIC_TYPE_TOKENS.get(type);
    return token && commonPrimary.includes(token);
  });
  if (specificTypeMatched) score += 6;

  if (commonStrong.length > 0) {
    score += Math.min(commonStrong.length * 14, 42);
    reasons.push(`tokens técnicos: ${commonStrong.join(", ")}`);
  }

  const sharedHondaFamilies = getSharedHondaModelFamilies(vf, mf);
  if (sharedHondaFamilies.length > 0) {
    score += Math.min(sharedHondaFamilies.length * 24, 36);
    reasons.push(`modelo Honda compatible: ${sharedHondaFamilies.join(", ")}`);
  }

  if (commonPrimary.length > 0) {
    score += Math.min(commonPrimary.length * 5, 35);
    reasons.push(`tokens comunes: ${commonPrimary.slice(0, 8).join(", ")}`);
  }

  const union = new Set([...vf.primaryTokens, ...mf.primaryTokens]);
  const jaccard = union.size ? commonPrimary.length / union.size : 0;
  if (jaccard > 0) score += Math.round(jaccard * 25);

  if (brandMatch) {
    score += 6;
    reasons.push("compatibilidad/marca: John Deere");
  }

  if (commonPrimary.length === 0 && commonStrong.length === 0 && commonTypes.length === 0) {
    score = 0;
    reasons.push("sin evidencia semántica suficiente");
  }

  score = Math.max(0, Math.round(score));
  const confidenceCap = getGuardrailConfidenceCap(vf, mf, commonPrimary, commonStrong);
  let confidence: MatchConfidence = score >= 70 ? "alta" : score >= 45 ? "media" : score >= minScore ? "baja" : "descartar";
  if (confidenceCap && CONFIDENCE_ORDER[confidence] > CONFIDENCE_ORDER[confidenceCap]) {
    confidence = confidenceCap;
    reasons.push(`guardrail confianza: ${confidenceCap}`);
  }

  return {
    score,
    confidence,
    reasons,
  };
}

function getGuardrailRejection(
  venturino: ProductFeatures,
  ml: ProductFeatures,
  commonPrimary: string[],
  commonStrong: string[],
) {
  if (venturino.types.includes("ISG") && !ml.types.includes("ISG")) {
    return "guardrail ISG: no comparar contra llaves físicas o accesorios genéricos";
  }

  if (venturino.types.includes("CAJA_HERRAMIENTAS") && !ml.types.includes("CAJA_HERRAMIENTAS")) {
    return "guardrail caja de herramientas: no comparar contra kits, llaves o accesorios genéricos";
  }

  if (ml.types.includes("CAJA_HERRAMIENTAS") && !venturino.types.includes("CAJA_HERRAMIENTAS")) {
    return "guardrail caja de herramientas: candidato no equivalente";
  }

  if (isVehicleKeyOrSwitch(venturino) !== isVehicleKeyOrSwitch(ml)) {
    return "guardrail llave/switch: no comparar contacto o arranque contra herramientas genéricas";
  }

  if (isToyLike(venturino) !== isToyLike(ml)) {
    return "guardrail juguete: no comparar juguetes/merchandising contra artículos operativos";
  }

  if (isFluidProduct(venturino)) {
    const venturinoLine = getFluidLine(venturino);
    const mlLine = getFluidLine(ml);
    if (venturinoLine && mlLine && venturinoLine !== mlLine) {
      return `guardrail fluido: línea distinta (${venturinoLine} vs ${mlLine})`;
    }
    if (venturinoLine && !mlLine) {
      return `guardrail fluido: candidato sin línea ${venturinoLine}`;
    }
    if (venturino.fluidLiters === null && ml.fluidLiters !== null) {
      return "guardrail fluido: producto Venturino sin litros";
    }
    if (venturino.fluidLiters !== null) {
      if (ml.fluidLiters === null) return "guardrail fluido: candidato sin litros";
      if (!sameNumericSpec(venturino.fluidLiters, ml.fluidLiters, 0.05)) {
        return `guardrail fluido: litros distintos (${venturino.fluidLiters}L vs ${ml.fluidLiters}L)`;
      }
    }
  }

  if (venturino.types.includes("BATERIA")) {
    if (venturino.batteryAh !== null && ml.batteryAh !== venturino.batteryAh) {
      return `guardrail batería: capacidad distinta o ausente (${venturino.batteryAh}Ah)`;
    }
  }

  if (requiresExactHondaModel(venturino)) {
    if (!ml.tokens.includes("honda")) return "guardrail Honda: candidato sin marca Honda";
    if (!hasSharedHondaModel(venturino, ml)) return "guardrail Honda: modelo no equivalente";
  }

  if (venturino.types.includes("CORREA") && venturino.tokens.includes("draper") && !ml.tokens.includes("draper")) {
    return "guardrail correa Draper: candidato sin Draper";
  }

  if (venturino.types.includes("CINCEL") && !hasSharedTechnicalCode(venturino, ml, commonStrong)) {
    return "guardrail cincel: medida/código no equivalente";
  }

  if (
    venturino.types.includes("PUNZON") &&
    !hasSharedTechnicalCode(venturino, ml, commonStrong) &&
    !hasTokenPair(commonPrimary, "punton", "cosechadora")
  ) {
    return "guardrail punzón: falta código o contexto cosechadora";
  }

  return null;
}

function getGuardrailConfidenceCap(
  venturino: ProductFeatures,
  ml: ProductFeatures,
  commonPrimary: string[],
  commonStrong: string[],
): MatchConfidence | null {
  if (
    venturino.types.includes("FILTRO") &&
    !hasSharedTechnicalCode(venturino, ml, commonStrong)
  ) {
    return "baja";
  }

  if (
    venturino.types.includes("INYECCION") &&
    !hasSharedTechnicalCode(venturino, ml, commonStrong)
  ) {
    return "baja";
  }

  if (
    venturino.types.includes("CUCHILLA") &&
    !hasSharedTechnicalCode(venturino, ml, commonStrong) &&
    !hasTokenPair(commonPrimary, "punton", "cosechadora") &&
    !hasTokenPair(commonPrimary, "seccion", "cuchilla")
  ) {
    return "baja";
  }

  return null;
}

function isVehicleKeyOrSwitch(features: ProductFeatures) {
  const tokens = new Set(features.tokens);
  return (
    tokens.has("switch") ||
    tokens.has("interruptor") ||
    tokens.has("tambor") ||
    tokens.has("arranque") ||
    tokens.has("encendido") ||
    tokens.has("contacto") ||
    (tokens.has("llave") && (tokens.has("tractor") || tokens.has("tractores")))
  );
}

function isToyLike(features: ProductFeatures) {
  const toyTokens = [
    "juguete",
    "toy",
    "llavero",
    "miniatura",
    "replica",
    "escala",
    "ertl",
    "bruder",
    "tomy",
    "tommy",
    "bif",
    "pedal",
  ];
  return features.types.includes("JUGUETE") || toyTokens.some((token) => features.tokens.includes(token));
}

function isFluidProduct(features: ProductFeatures) {
  return features.types.includes("ACEITE") || features.types.includes("REFRIGERANTE");
}

function getFluidLine(features: ProductFeatures) {
  const normalized = features.normalized;
  if (normalized.includes("plus-50") || normalized.includes("plus 50")) return "plus-50";
  if (normalized.includes("torq-gard") || normalized.includes("torq gard")) return "torq-gard";
  if (normalized.includes("hy-gard") || normalized.includes("hy gard")) return "hy-gard";
  if (normalized.includes("cool-gard") || normalized.includes("cool gard")) return "cool-gard";
  return null;
}

function requiresExactHondaModel(features: ProductFeatures) {
  const hondaMachineTypes = ["GENERADOR", "SOPLADOR", "MOTOBOMBA", "MOTOGUADANA", "CORTADORA", "MOTOR", "MOCHILA"];
  return features.tokens.includes("honda") && features.types.some((type) => hondaMachineTypes.includes(type));
}

function hasSharedHondaModel(venturino: ProductFeatures, ml: ProductFeatures) {
  if (venturino.modelTokens.length === 0) return false;
  const candidateModels = new Set(ml.modelTokens);
  if (venturino.modelTokens.some((token) => candidateModels.has(token))) return true;
  return getSharedHondaModelFamilies(venturino, ml).length > 0;
}

function getSharedHondaModelFamilies(venturino: ProductFeatures, ml: ProductFeatures) {
  if (!venturino.tokens.includes("honda") || !ml.tokens.includes("honda")) return [];
  const venturinoFamilies = new Set(venturino.modelTokens.map(toHondaModelFamily).filter(Boolean));
  const mlFamilies = new Set(ml.modelTokens.map(toHondaModelFamily).filter(Boolean));
  return Array.from(venturinoFamilies).filter((family) => mlFamilies.has(family));
}

function toHondaModelFamily(token: string) {
  const normalized = token.replace(/[^a-z0-9]/g, "");
  const match = normalized.match(/^(hrg|hrx|umk|wb|wl|wjr|ez|hhb|gp|gx)(\d{2,4})/);
  if (!match) return null;
  return `${match[1]}${match[2]}`;
}

function hasSharedTechnicalCode(venturino: ProductFeatures, ml: ProductFeatures, commonStrong: string[]) {
  if (commonStrong.length > 0) return true;
  if (venturino.technicalCodes.length === 0) return false;
  const candidateCodes = new Set(ml.technicalCodes);
  return venturino.technicalCodes.some((token) => candidateCodes.has(token));
}

function hasTokenPair(tokens: string[], first: string, second: string) {
  return tokens.includes(first) && tokens.includes(second);
}

function sameNumericSpec(a: number, b: number, tolerancePct: number) {
  const base = Math.max(Math.abs(a), Math.abs(b), 1);
  return Math.abs(a - b) / base <= tolerancePct;
}

function getEffectivePriceBand(
  venturino: FeaturedPostventaProduct,
  ml: FeaturedPostventaProduct,
  defaultPriceBand: number,
) {
  const sameBatteryCapacity =
    venturino.features.types.includes("BATERIA") &&
    ml.features.types.includes("BATERIA") &&
    venturino.features.batteryAh !== null &&
    venturino.features.batteryAh === ml.features.batteryAh;

  if (sameBatteryCapacity) return Math.max(defaultPriceBand, 0.9);
  return defaultPriceBand;
}

function shouldKeepLowConfidenceOnlyMatch(venturino: FeaturedPostventaProduct, candidates: PostventaCandidate[]) {
  if (candidates.some((candidate) => CONFIDENCE_ORDER[candidate.confidence] >= 2)) return true;
  if (candidates.length === 0) return true;
  return venturino.features.types.some((type) => TECHNICAL_DETAIL_TYPES.has(type));
}

function normalizeBase(value: string) {
  return (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, "-")
    .replace(/&/g, " y ")
    .replace(/\+/g, " ")
    .replace(/,/g, ".")
    .trim();
}

function canonicalToken(token: string) {
  let current = token.toLowerCase();
  if (TOKEN_SYNONYMS.has(current)) return TOKEN_SYNONYMS.get(current) as string;
  if (current.length > 4 && current.endsWith("es")) current = current.slice(0, -2);
  else if (current.length > 4 && current.endsWith("s")) current = current.slice(0, -1);
  return TOKEN_SYNONYMS.get(current) || current;
}

function tokenize(value: string) {
  const normalized = normalizeBase(value);
  const rawTokens = normalized.match(/[a-z0-9]+(?:[.\-x][a-z0-9]+)*/g) || [];
  const tokens = rawTokens.map(canonicalToken).filter((token) => token.length > 0 && !STOPWORDS.has(token));
  return unique([...tokens, ...extractHondaModelFamilyTokens(normalized, tokens)]);
}

function inferProductTypes(tokens: string[], normalizedName: string, source: PostventaSource) {
  const types = tokens.map((token) => PRODUCT_TYPE_BY_TOKEN.get(token)).filter((type): type is string => Boolean(type));
  const toyHints = [
    "juguete",
    "toy",
    "toy",
    "armar",
    "paca",
    "heno",
    "vagon",
    "pedal",
    "llavero",
    "fundido",
    "replica",
    "prestige",
    "escala",
    "miniatura",
    "bif",
    "big scoop",
    "johnny",
    "dual",
    "duals",
    "oruga",
    "orugas",
    "baler",
    "crop",
    "row",
    "ertl",
    "tommy",
    "tomy",
    "bruder",
    "build",
    "buddy",
    "farmin",
    "friends",
    "1/64",
    "1:64",
    "1/32",
    "1:32",
  ];

  if (toyHints.some((token) => normalizedName.includes(token))) {
    types.push("JUGUETE");
  }
  if (tokens.includes("vehiculo") && (tokens.includes("juego") || tokens.includes("set") || tokens.includes("mini"))) {
    types.push("JUGUETE");
  }

  const machineryToyTokens = ["tractor", "cosechadora", "camion", "camioneta", "cargador"];
  if (
    source === "venturino" &&
    machineryToyTokens.some((token) => tokens.includes(token)) &&
    !types.some((type) => TECHNICAL_DETAIL_TYPES.has(type))
  ) {
    types.push("JUGUETE");
  }

  if (tokens.includes("caja") && tokens.includes("herramienta")) {
    types.push("CAJA_HERRAMIENTAS");
  }
  if (
    (tokens.includes("kit") || tokens.includes("set") || tokens.includes("juego") || tokens.includes("pieza")) &&
    (tokens.includes("herramienta") || tokens.includes("llave") || tokens.includes("tubo"))
  ) {
    types.push("KIT_HERRAMIENTAS");
  }
  if (
    tokens.includes("herramienta") ||
    ((tokens.includes("juego") || tokens.includes("set")) &&
      (tokens.includes("llave") || tokens.includes("tubo") || tokens.includes("pieza")))
  ) {
    types.push("HERRAMIENTA");
  }
  if (tokens.includes("palanca") && tokens.includes("barra")) types.push("HERRAMIENTA");
  if (tokens.includes("llave") || tokens.includes("cincel") || tokens.includes("punzon")) types.push("HERRAMIENTA");
  if (normalizedName.includes("hy-gard") || normalizedName.includes("hy gard" ) || normalizedName.includes("plus-50")) {
    types.push("ACEITE");
  }

  const normalizedTypes = unique(types);
  const primaryPriority = [
    "ISG",
    "MANOMETRO",
    "BATERIA",
    "ACEITE",
    "GENERADOR",
    "SOPLADOR",
    "MOTOR",
    "FILTRO",
    "BOMBA",
    "ENFRIADOR",
    "INYECCION",
    "REFRIGERANTE",
    "CUCHILLA",
    "NAVAJA",
    "CUCHILLO",
    "CINCEL",
    "PUNZON",
    "PINZA",
    "CAJA_HERRAMIENTAS",
    "KIT_HERRAMIENTAS",
    "MOTOBOMBA",
    "MOTOGUADANA",
    "CORTADORA",
  ];
  const primary = primaryPriority.find((type) => normalizedTypes.includes(type));
  return primary ? [primary] : normalizedTypes;
}

function extractBatteryAh(normalizedName: string) {
  let match = normalizedName.match(/\b(\d{2,3})\s*ah\b/);
  if (!match) match = normalizedName.match(/\b12\s*x\s*(\d{2,3})\b/);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function extractFluidLiters(normalizedName: string) {
  const mlMatch = normalizedName.match(/\b(\d+(?:\.\d+)?)\s*ml\b/);
  if (mlMatch) {
    const value = Number(mlMatch[1]);
    return Number.isFinite(value) ? value / 1000 : null;
  }

  const match = normalizedName.match(/\b(\d+(?:\.\d+)?)\s*(?:l|lt|lts|litro|litros)\b/);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function isStrongToken(token: string) {
  if (!/\d/.test(token)) return false;
  if (/[a-z]/.test(token) && /\d/.test(token)) return true;
  if (/[.x-]/.test(token)) return true;
  return token.length >= 3;
}

function isModelToken(token: string) {
  return token.length >= 4 && /[a-z]/.test(token) && /\d/.test(token);
}

function extractHondaModelFamilyTokens(normalizedName: string, tokens: string[]) {
  if (!tokens.includes("honda")) return [];

  const families = new Set<string>();
  const familyPattern = /\b(hrg|hrx|umk|wb|wl|wjr|ez|hhb|gp|gx)[\s.-]*(\d{2,4})(?!\d)/g;

  for (const match of normalizedName.matchAll(familyPattern)) {
    const family = `${match[1]}${match[2]}`;
    if (isLikelyHondaModelFamily(family, normalizedName, match.index ?? 0)) families.add(family);
  }

  return Array.from(families);
}

function isLikelyHondaModelFamily(family: string, normalizedName: string, markerIndex: number) {
  const before = normalizedName.slice(Math.max(0, markerIndex - 18), markerIndex).replace(/[^a-z0-9]/g, "");
  if (before.includes("johndeere")) return false;
  return true;
}

function isTechnicalCodeToken(token: string) {
  return /^\d+(?:mm|ah|kva|hp|cc|l)$/.test(token);
}

function intersection(values: string[], set: Set<string>) {
  return values.filter((item) => set.has(item));
}

function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}

function emptyMatch(status: MatchStatus): PostventaProductMatch {
  return {
    candidates: [],
    medianMlPriceArs: null,
    ventVsMedianPct: null,
    status,
    bestConfidence: "descartar",
    strongCandidateCount: 0,
    excludedByPrice: 0,
    excludedByScore: 0,
    totalValidBeforeTop: 0,
  };
}

function clampNumber(value: number | undefined, min: number, max: number, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(value, max));
}

function clampInteger(value: number | undefined, min: number, max: number, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(Math.round(value), max));
}
