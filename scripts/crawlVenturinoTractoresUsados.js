const fs = require("fs/promises");
const path = require("path");

const CATALOG_PAGES = [
  "https://ricardoventurino.com.ar/catalogo/?yith_wcan=1&product_cat=tractores+usado&product-page=1",
  "https://ricardoventurino.com.ar/catalogo/?yith_wcan=1&product_cat=tractores+usado&product-page=2",
];

const OUTPUT_PATH = path.join(process.cwd(), "data", "venturino_tractores_usados.csv");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchHtml(url, attempt = 1) {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (response.status === 429 || response.status >= 500) {
    if (attempt < 4) {
      const backoff = 500 * Math.pow(2, attempt - 1);
      await sleep(backoff);
      return fetchHtml(url, attempt + 1);
    }
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} al pedir ${url}`);
  }

  return response.text();
}

function decodeHtmlEntities(input) {
  return input
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
      const codePoint = Number.parseInt(hex, 16);
      if (!Number.isFinite(codePoint)) return _;
      try {
        return String.fromCodePoint(codePoint);
      } catch {
        return _;
      }
    })
    .replace(/&#(\d+);/g, (_, num) => {
      const codePoint = Number.parseInt(num, 10);
      if (!Number.isFinite(codePoint)) return _;
      try {
        return String.fromCodePoint(codePoint);
      } catch {
        return _;
      }
    })
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("\u00a0", " ");
}

function htmlToText(html) {
  let clean = html;
  clean = clean.replace(/<script[\s\S]*?<\/script>/gi, " ");
  clean = clean.replace(/<style[\s\S]*?<\/style>/gi, " ");
  clean = clean.replace(/<br\s*\/?>/gi, "\n");
  clean = clean.replace(/<\/p>/gi, "\n");
  clean = clean.replace(/<\/li>/gi, "\n");
  clean = clean.replace(/<\/div>/gi, "\n");
  clean = clean.replace(/<[^>]+>/g, " ");
  clean = decodeHtmlEntities(clean);
  clean = clean.replace(/\r/g, "");
  clean = clean
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
  return clean;
}

function extractDetailsBlock(text) {
  const idx = text.toLowerCase().indexOf("marca:");
  if (idx < 0) return text;
  return text.slice(idx, idx + 1200);
}

function extractProductUrlsFromCatalog(html) {
  const urls = new Set();
  const regex = /https?:\/\/ricardoventurino\.com\.ar\/producto\/[^"'\s<>]+/gi;
  let match = regex.exec(html);
  while (match) {
    const raw = match[0];
    const normalized = decodeHtmlEntities(raw).replace(/[#?].*$/, "");
    urls.add(normalized);
    match = regex.exec(html);
  }
  return Array.from(urls);
}

function extractMetaTitle(html) {
  const ogMatch = html.match(
    /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["'][^>]*>/i,
  );
  if (ogMatch?.[1]) return decodeHtmlEntities(ogMatch[1]).trim();

  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch?.[1]) return decodeHtmlEntities(titleMatch[1]).trim();

  return null;
}

function findLabelValue(text, label) {
  const re = new RegExp(`${label}\\s*:\\s*([^\\n]+)`, "i");
  const match = text.match(re);
  return match?.[1] ? match[1].trim() : null;
}

function findHorasValue(blockText) {
  const direct = findLabelValue(blockText, "Horas");
  if (direct) return direct;

  const altMatch = blockText.match(/\b(horas|hs|hrs)\b\s*:?\s*([^\n]+)/i);
  return altMatch?.[2] ? altMatch[2].trim() : null;
}

function findHpValue(blockText) {
  const potencia = findLabelValue(blockText, "Potencia");
  if (potencia) return potencia;

  const hpLabel = findLabelValue(blockText, "HP");
  if (hpLabel) return hpLabel;

  const inline = blockText.match(/\b(\d{1,3}(?:[\.,]\d{1,2})?)\s*hp\b/i);
  return inline?.[1] ? inline[1].trim() : null;
}

function parseNumeric(raw) {
  if (!raw) return null;
  const digits = raw.toString().replace(/[^0-9]/g, "");
  if (!digits) return null;
  const value = Number(digits);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function parseYear(raw) {
  if (!raw) return null;
  const match = raw.toString().match(/\b(19\d{2}|20\d{2})\b/);
  if (!match) return null;
  const value = Number(match[1]);
  const currentYear = new Date().getFullYear();
  if (!Number.isFinite(value) || value < 1950 || value > currentYear + 1) return null;
  return value;
}

function normalizeCurrencySymbol(raw) {
  if (!raw) return null;
  const upper = raw.toString().trim().toUpperCase();
  if (upper === "$") return "$";
  if (upper.includes("USD") || upper.includes("US$") || upper.includes("U$")) return "USD";
  if (upper.includes("ARS")) return "ARS";
  return upper;
}

function formatThousandsDot(value) {
  if (!Number.isFinite(value)) return null;
  const rounded = Math.round(value);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function inferCurrency(html, text) {
  if (/(textContent\s*=\s*['"]USD['"])|(\bUSD\b)/i.test(html) || /\bUSD\b/i.test(text)) {
    return "USD";
  }
  if (/\bARS\b/i.test(html) || /\bARS\b/i.test(text)) return "ARS";
  return null;
}

function extractPriceFromJsonLd(html, fallbackCurrency) {
  const scripts = [];
  const regex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match = regex.exec(html);
  while (match) {
    const raw = match[1]?.trim();
    if (raw) scripts.push(raw);
    match = regex.exec(html);
  }

  for (const raw of scripts) {
    let json;
    try {
      json = JSON.parse(raw);
    } catch {
      continue;
    }

    const nodes = Array.isArray(json) ? json : [json];
    const flattened = [];
    nodes.forEach((node) => {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node["@graph"])) flattened.push(...node["@graph"]);
      flattened.push(node);
    });

    for (const node of flattened) {
      if (!node || typeof node !== "object") continue;
      const offers = node.offers;
      const offer = Array.isArray(offers) ? offers[0] : offers;
      if (!offer || typeof offer !== "object") continue;
      const currency =
        normalizeCurrencySymbol(offer.priceCurrency ?? offer.currency ?? null) ?? fallbackCurrency;
      const priceRaw = offer.price ?? offer.lowPrice ?? offer.highPrice ?? null;
      const value =
        typeof priceRaw === "number" ? priceRaw : Number(priceRaw?.toString().replace(",", "."));
      if (!Number.isFinite(value) || value <= 0) continue;
      const formatted = formatThousandsDot(value);
      if (!formatted) continue;
      return { moneda: currency ?? null, precio: formatted };
    }
  }

  return null;
}

function parsePrice(text, html) {
  const currencyHint = inferCurrency(html, text);
  const jsonLdPrice = extractPriceFromJsonLd(html, currencyHint);
  if (jsonLdPrice) return jsonLdPrice;

  const match = text.match(/(USD|US\$|U\$S|U\$|\$)\s*([0-9][0-9\.,]*)/i);
  if (!match) return { moneda: currencyHint, precio: null };
  const symbolCurrency = normalizeCurrencySymbol(match[1]);
  const moneda = symbolCurrency === "$" ? currencyHint ?? "ARS" : symbolCurrency;
  const amount = match[2].trim();
  if (!amount) return { moneda, precio: null };
  return { moneda, precio: amount };
}

function parseBrandModelFromTitle(title, marcaFromLabel) {
  if (!title) return { marca: marcaFromLabel ?? null, modelo: null };

  let t = title;
  t = t.replace(/\s*-\s*Venturino\s*$/i, "").trim();
  t = t.replace(/^Tractor\s+/i, "").trim();
  const firstSegment = t.split(",")[0]?.trim() ?? "";

  const marca = marcaFromLabel ?? null;

  if (marca && firstSegment.toLowerCase().startsWith(marca.toLowerCase())) {
    const modelPart = firstSegment.slice(marca.length).trim();
    return { marca, modelo: modelPart || null };
  }

  return { marca, modelo: null };
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const text = value.toString();
  const needsQuotes = /[;"\n\r]/.test(text);
  const escaped = text.replaceAll('"', '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

async function parseProduct(url) {
  const html = await fetchHtml(url);
  const text = htmlToText(html);
  const title = extractMetaTitle(html);
  const detailsBlock = extractDetailsBlock(text);

  const marcaLabel = findLabelValue(detailsBlock, "Marca") ?? findLabelValue(text, "Marca");
  const modeloLabel = findLabelValue(detailsBlock, "Modelo") ?? findLabelValue(text, "Modelo");
  const yearLabel =
    findLabelValue(detailsBlock, "Año") ??
    findLabelValue(detailsBlock, "Años") ??
    findLabelValue(text, "Año") ??
    findLabelValue(text, "Años");
  const horasLabel = findHorasValue(detailsBlock) ?? findHorasValue(text);
  const hpLabel = findHpValue(detailsBlock) ?? findHpValue(text);

  const { marca: marcaFromTitle, modelo: modeloFromTitle } = parseBrandModelFromTitle(
    title,
    marcaLabel,
  );

  const marca = marcaLabel ?? marcaFromTitle ?? null;
  let modelo = modeloLabel ?? modeloFromTitle ?? null;
  if (marca && modelo) {
    const marcaLower = marca.toLowerCase();
    const modeloLower = modelo.toLowerCase();
    if (modeloLower.startsWith(marcaLower)) {
      const trimmed = modelo.slice(marca.length).trim();
      if (trimmed) modelo = trimmed;
    }
  }
  const anio = parseYear(yearLabel) ?? parseYear(title);
  const horas = parseNumeric(horasLabel);
  const hp_motor = hpLabel ? Number(hpLabel.toString().replace(",", ".").match(/\d+(?:\.\d+)?/)?.[0] ?? NaN) : null;
  const hp_motor_safe = Number.isFinite(hp_motor) && hp_motor > 0 && hp_motor <= 1000 ? hp_motor : null;
  const price = parsePrice(text, html);

  return {
    marca,
    modelo,
    anio: anio ?? null,
    horas_uso: horas ?? null,
    hp_motor: hp_motor_safe,
    moneda: price.moneda ?? null,
    precio_publicado: price.precio ?? null,
    url,
  };
}

async function run() {
  const productUrls = new Set();

  for (const catalogUrl of CATALOG_PAGES) {
    const html = await fetchHtml(catalogUrl);
    const urls = extractProductUrlsFromCatalog(html);
    urls.forEach((u) => productUrls.add(u));
    await sleep(250);
  }

  const urls = Array.from(productUrls);

  const rows = [];
  for (let i = 0; i < urls.length; i += 1) {
    const url = urls[i];
    try {
      const row = await parseProduct(url);
      rows.push(row);
    } catch (error) {
      rows.push({
        marca: null,
        modelo: null,
        anio: null,
        horas_uso: null,
        precio_publicado: null,
        url,
      });
    }
    await sleep(250);
  }

  const header = [
    "marca",
    "modelo",
    "anio",
    "horas_uso",
    "hp_motor",
    "moneda",
    "precio_publicado",
    "url",
  ];
  const lines = [header.join(";")];
  rows.forEach((row) => {
    lines.push(
      [
        csvEscape(row.marca),
        csvEscape(row.modelo),
        csvEscape(row.anio),
        csvEscape(row.horas_uso),
        csvEscape(row.hp_motor),
        csvEscape(row.moneda),
        csvEscape(row.precio_publicado),
        csvEscape(row.url),
      ].join(";"),
    );
  });

  await fs.writeFile(OUTPUT_PATH, lines.join("\n") + "\n", "utf8");

  console.log(`OK: ${rows.length} items -> ${OUTPUT_PATH}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
