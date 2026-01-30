const fs = require("fs/promises");
const path = require("path");

const BASE_LISTING_URL =
  "https://www.agrofy.com.ar/tractores/productos-con-precio?near=true&sort=most_relevant&p=";

const OUTPUT_PATH = path.join(process.cwd(), "data", "agrofy_tractores_con_precio.csv");

const MAX_PAGES = process.env.MAX_PAGES ? Number(process.env.MAX_PAGES) : null;
const CONCURRENCY = process.env.CONCURRENCY ? Number(process.env.CONCURRENCY) : 4;
const DELAY_MS = process.env.DELAY_MS ? Number(process.env.DELAY_MS) : 150;
const DEBUG = process.env.DEBUG === "1";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchHtml(url, attempt = 1) {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      "accept-language": "es-AR,es;q=0.9,en;q=0.8",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      referer: "https://www.agrofy.com.ar/",
    },
  });

  if (response.status === 429 || response.status >= 500) {
    if (attempt < 5) {
      const backoff = 700 * Math.pow(2, attempt - 1);
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
  clean = clean.replace(/<\/tr>/gi, "\n");
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

function extractProductUrlsFromListing(html) {
  const urls = new Set();
  const absoluteRegex = /https?:\/\/www\.agrofy\.com\.ar\/[^"'\s<>]+\.html/gi;
  let match = absoluteRegex.exec(html);
  while (match) {
    const raw = match[0];
    const normalized = decodeHtmlEntities(raw).replace(/[#?].*$/, "");
    urls.add(normalized);
    match = absoluteRegex.exec(html);
  }

  const hrefRegex = /href=["']([^"']+\.html)["']/gi;
  let hrefMatch = hrefRegex.exec(html);
  while (hrefMatch) {
    const rawHref = decodeHtmlEntities(hrefMatch[1] ?? "").trim();
    if (rawHref) {
      const cleaned = rawHref.replace(/[#?].*$/, "");
      const absolute = cleaned.startsWith("http")
        ? cleaned
        : cleaned.startsWith("/")
          ? `https://www.agrofy.com.ar${cleaned}`
          : `https://www.agrofy.com.ar/${cleaned}`;
      if (absolute.endsWith(".html")) urls.add(absolute);
    }
    hrefMatch = hrefRegex.exec(html);
  }
  return Array.from(urls);
}

function extractSection(text, startLabel, endLabel) {
  const lower = text.toLowerCase();
  const start = lower.indexOf(startLabel.toLowerCase());
  if (start < 0) return text;
  const slice = text.slice(start);
  const lowerSlice = slice.toLowerCase();
  const end = endLabel ? lowerSlice.indexOf(endLabel.toLowerCase()) : -1;
  if (end >= 0) return slice.slice(0, end);
  return slice;
}

function pickNextNonEmptyLine(lines, index) {
  for (let i = index + 1; i < Math.min(lines.length, index + 4); i += 1) {
    const line = (lines[i] ?? "").trim();
    if (line) return line;
  }
  return null;
}

function findTechValue(sectionText, label) {
  const lines = sectionText.split("\n");
  const labelLower = label.toLowerCase();

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? "";
    const lower = line.toLowerCase();
    const idx = lower.indexOf(labelLower);
    if (idx < 0) continue;

    let candidate = line.slice(idx + label.length).trim();
    if (candidate.startsWith(":")) candidate = candidate.slice(1).trim();

    if (!candidate) {
      const next = pickNextNonEmptyLine(lines, i);
      if (next) return next;
      continue;
    }

    return candidate;
  }

  return null;
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

function parseNumeric(raw) {
  if (!raw) return null;
  const digits = raw.toString().replace(/[^0-9]/g, "");
  if (!digits) return null;
  const value = Number(digits);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function parseHp(raw) {
  if (!raw) return null;
  const match = raw.toString().replace(",", ".").match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const value = Number(match[1]);
  if (!Number.isFinite(value) || value <= 0 || value > 1000) return null;
  return value;
}

function inferCurrencyFromSymbol(symbol) {
  const upper = (symbol ?? "").toString().trim().toUpperCase();
  if (upper === "U$" || upper === "US$" || upper === "USD") return "USD";
  if (upper === "$") return "ARS";
  return null;
}

function extractPriceFromText(text) {
  const match = text.match(/(U\$|US\$|USD|\$)\s*([0-9][0-9\.,]*)/i);
  if (!match) return { moneda: null, precio: null };
  const symbol = match[1];
  const amount = match[2]?.trim() ?? null;
  const moneda = inferCurrencyFromSymbol(symbol);
  return { moneda, precio: amount };
}

function extractPriceFromJsonLd(html) {
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
      const currency = (offer.priceCurrency ?? offer.currency ?? null)?.toString() ?? null;
      const priceRaw = offer.price ?? offer.lowPrice ?? offer.highPrice ?? null;
      const price =
        typeof priceRaw === "number" ? priceRaw.toString() : priceRaw?.toString?.() ?? null;
      if (!price) continue;
      return { moneda: currency ? currency.toUpperCase() : null, precio: price };
    }
  }

  return { moneda: null, precio: null };
}

function extractHorasFromText(text) {
  const match = text.match(/\b(horas|hs|hrs)\b\s*:?\s*([0-9][0-9\.,]*)/i);
  if (!match) return null;
  return parseNumeric(match[2]);
}

function deepFindStringByKey(obj, keyCandidates) {
  const seen = new Set();

  function visit(node, depth) {
    if (depth > 8) return null;
    if (!node) return null;

    if (typeof node === "string") return null;

    if (typeof node !== "object") return null;

    if (seen.has(node)) return null;
    seen.add(node);

    if (Array.isArray(node)) {
      for (const item of node) {
        const found = visit(item, depth + 1);
        if (found) return found;
      }
      return null;
    }

    for (const [key, value] of Object.entries(node)) {
      const normalizedKey = key.toLowerCase();
      if (keyCandidates.includes(normalizedKey)) {
        if (typeof value === "string" && value.trim()) return value.trim();
        if (value && typeof value === "object") {
          const name = value.name;
          if (typeof name === "string" && name.trim()) return name.trim();
        }
      }
    }

    for (const value of Object.values(node)) {
      const found = visit(value, depth + 1);
      if (found) return found;
    }

    return null;
  }

  return visit(obj, 0);
}

function extractEmpresa(html) {
  const jsonLd = [];
  const ldRegex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match = ldRegex.exec(html);
  while (match) {
    const raw = match[1]?.trim();
    if (raw) jsonLd.push(raw);
    match = ldRegex.exec(html);
  }

  for (const raw of jsonLd) {
    try {
      const parsed = JSON.parse(raw);
      const candidates = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of candidates) {
        if (!item || typeof item !== "object") continue;
        const offers = item.offers;
        const offer = Array.isArray(offers) ? offers[0] : offers;
        const seller = offer?.seller ?? item.seller ?? null;
        const sellerName =
          typeof seller === "string"
            ? seller
            : typeof seller?.name === "string"
              ? seller.name
              : null;
        if (sellerName && sellerName.trim()) return sellerName.trim();
      }
    } catch {
      // ignore
    }
  }

  const nextMatch = html.match(
    /<script[^>]*id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i,
  );
  if (nextMatch?.[1]) {
    try {
      const nextData = JSON.parse(nextMatch[1]);
      const found = deepFindStringByKey(nextData, [
        "seller",
        "sellername",
        "vendor",
        "vendorname",
        "empresa",
        "company",
        "companyname",
        "organization",
        "organizationname",
        "store",
        "storename",
        "dealer",
        "dealername",
        "publisher",
        "publishername",
      ]);
      if (found) return found;
    } catch {
      // ignore
    }
  }

  const regexes = [
    /"sellerName"\s*:\s*"([^"]+)"/i,
    /"vendorName"\s*:\s*"([^"]+)"/i,
    /"companyName"\s*:\s*"([^"]+)"/i,
    /"storeName"\s*:\s*"([^"]+)"/i,
  ];
  for (const re of regexes) {
    const m = html.match(re);
    if (m?.[1]) return decodeHtmlEntities(m[1]).trim();
  }

  return null;
}

async function parseProduct(url) {
  const html = await fetchHtml(url);
  const text = htmlToText(html);

  const tech = extractSection(text, "Detalles Técnicos", "Descripción");
  const desc = extractSection(text, "Descripción", "Características Principales");

  const marca = findTechValue(tech, "Marca") ?? null;
  const modelo = findTechValue(tech, "Modelo") ?? null;
  const anio =
    parseYear(findTechValue(tech, "Año de Fabricación") ?? findTechValue(tech, "Año") ?? null) ??
    parseYear(text);

  const hp = parseHp(findTechValue(tech, "Potencia (HP)") ?? findTechValue(tech, "Potencia") ?? null);

  const horas = extractHorasFromText(desc) ?? extractHorasFromText(text);

  const priceLd = extractPriceFromJsonLd(html);
  const priceText = extractPriceFromText(text);
  const moneda = (priceLd.moneda ?? priceText.moneda ?? null)?.toString().toUpperCase() ?? null;
  const precio_publicado = priceLd.precio ?? priceText.precio ?? null;

  const empresa = extractEmpresa(html);

  return {
    marca,
    modelo,
    anio: anio ?? null,
    horas_uso: horas ?? null,
    hp_motor: hp ?? null,
    moneda,
    precio_publicado,
    empresa,
    url,
  };
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const text = value.toString();
  const needsQuotes = /[;"\n\r]/.test(text);
  const escaped = text.replaceAll('"', '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

async function mapPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let index = 0;

  async function runWorker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await worker(items[current], current);
    }
  }

  const workers = new Array(Math.max(1, concurrency)).fill(0).map(() => runWorker());
  await Promise.all(workers);
  return results;
}

async function run() {
  const allUrls = [];

  let page = 1;
  while (true) {
    if (MAX_PAGES !== null && page > MAX_PAGES) break;

    const url = `${BASE_LISTING_URL}${page}`;
    let html;
    try {
      html = await fetchHtml(url);
    } catch (error) {
      const message = error?.message ? String(error.message) : "";
      if (message.includes("HTTP 404")) {
        break;
      }
      throw error;
    }

    const urls = extractProductUrlsFromListing(html);

    if (urls.length === 0) {
      if (DEBUG) {
        const hasHtml = html.includes(".html");
        const hrefCount = (html.match(/href=["'][^"']+\.html["']/gi) || []).length;
        console.log(
          `WARN: page=${page} sin URLs (hasHtml=${hasHtml}, hrefHtmlCount=${hrefCount}) url=${url}`,
        );
        console.log(`SNIPPET: ${html.slice(0, 400).replace(/\s+/g, " ")}`);
      }
      break;
    }

    urls.forEach((u) => allUrls.push(u));

    page += 1;
    await sleep(DELAY_MS);
  }

  const uniqueUrls = Array.from(new Set(allUrls));

  const rows = await mapPool(uniqueUrls, CONCURRENCY, async (url) => {
    try {
      const row = await parseProduct(url);
      await sleep(DELAY_MS);
      return row;
    } catch {
      await sleep(DELAY_MS);
      return {
        marca: null,
        modelo: null,
        anio: null,
        horas_uso: null,
        hp_motor: null,
        moneda: null,
        precio_publicado: null,
        empresa: null,
        url,
      };
    }
  });

  const header = [
    "marca",
    "modelo",
    "anio",
    "horas_uso",
    "hp_motor",
    "moneda",
    "precio_publicado",
    "empresa",
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
        csvEscape(row.empresa),
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
