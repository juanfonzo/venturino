import { prisma } from "@/lib/db/prisma";
import type { TractorItem, TractorsDataset } from "@/lib/types";

// Infer the Listing type from Prisma client
type Listing = NonNullable<Awaited<ReturnType<typeof prisma.listing.findFirst>>>;

/**
 * Maps a Prisma Listing row to the legacy TractorItem interface
 * used throughout the UI and stats code.
 */
function listingToTractorItem(row: Listing): TractorItem {
  return {
    id: row.mongoId,
    origen: row.origen,
    categoria: row.categoria,
    empresa: row.vendedor,
    url: row.url,
    titulo: row.titulo,
    precio_raw: row.precioRaw,
    moneda_raw: row.monedaRaw,
    marca: row.marca,
    modelo: row.modelo,
    hp_motor: row.hp ? Number(row.hp) : null,
    anio: row.anio,
    horas_uso: row.horas ? Number(row.horas) : null,
    formas_pago: row.financiacion,
    ubicacion: row.ubicacionRaw,
    condicion: row.condicionRaw,
    descripcion: row.descripcion,
    precio_nor: row.precioUsd ? Number(row.precioUsd) : null,
    moneda_norm: row.monedaNorm as "USD" | "ARS" | null,
    estado_norm: row.condicion as "Nuevo" | "Usado" | null,
    provincia: row.provincia,
    ciudad: row.ciudad,
    marca_norm: row.marcaNorm,
    modelo_norm: row.modeloNorm,
    flags: row.flags,
  };
}

export interface ListingQuery {
  categoria?: string | null;
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
  page?: number;
  pageSize?: number;
  sortBy?: string | null;
  sortDir?: string | null;
}

/**
 * Load listings from PostgreSQL with server-side filtering, sorting, and pagination.
 */
export async function loadListings(query: ListingQuery = {}): Promise<{
  rows: TractorItem[];
  total: number;
  page: number;
  pageSize: number;
}> {
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, query.pageSize ?? 25));

  const where = buildWhere(query);
  const orderBy = buildOrderBy(query.sortBy, query.sortDir);

  const [rows, total] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.listing.count({ where }),
  ]);

  return {
    rows: rows.map(listingToTractorItem),
    total,
    page,
    pageSize,
  };
}

/**
 * Load ALL listings (no pagination) for stats computation.
 * Optionally filter by categoria.
 */
export async function loadAllListings(
  categoria?: string | null,
): Promise<TractorsDataset> {
  const where = categoria ? { categoria } : {};
  const rows = await prisma.listing.findMany({ where });

  return {
    rows: rows.map(listingToTractorItem),
    meta: {
      loadedAt: Date.now(),
      fileMtimeMs: null,
      delimiter: "postgres",
    },
  };
}

/**
 * Get distinct values for filter dropdowns.
 */
export async function getDistinctValues(categoria?: string | null) {
  const where = categoria ? { categoria } : {};

  const [origins, brands, provinces, categorias] = await Promise.all([
    prisma.listing.findMany({
      where,
      select: { origen: true },
      distinct: ["origen"],
      orderBy: { origen: "asc" },
    }),
    prisma.listing.findMany({
      where: { ...where, marcaNorm: { not: null } },
      select: { marcaNorm: true },
      distinct: ["marcaNorm"],
      orderBy: { marcaNorm: "asc" },
    }),
    prisma.listing.findMany({
      where: { ...where, provincia: { not: null } },
      select: { provincia: true },
      distinct: ["provincia"],
      orderBy: { provincia: "asc" },
    }),
    prisma.listing.findMany({
      select: { categoria: true },
      distinct: ["categoria"],
      orderBy: { categoria: "asc" },
    }),
  ]);

  return {
    origins: origins.map((r: { origen: string }) => r.origen),
    brands: brands.map((r: { marcaNorm: string | null }) => r.marcaNorm).filter(Boolean) as string[],
    provinces: provinces.map((r: { provincia: string | null }) => r.provincia).filter(Boolean) as string[],
    categorias: categorias.map((r: { categoria: string }) => r.categoria),
  };
}

/**
 * Load Venturino's own inventory from PostgreSQL (origen='venturino').
 * Optionally filter by categoria.
 */
export async function loadVenturinoListings(
  categoria?: string | null,
): Promise<TractorsDataset> {
  const where: Record<string, unknown> = { origen: "venturino" };
  if (categoria) where.categoria = categoria;

  const rows = await prisma.listing.findMany({ where });

  return {
    rows: rows.map(listingToTractorItem),
    meta: {
      loadedAt: Date.now(),
      fileMtimeMs: null,
      delimiter: "postgres",
    },
  };
}

// ─── Private helpers ─────────────────────────────────────

function normalizeTextUpper(value?: string | null) {
  if (!value) return null;
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function buildWhere(query: ListingQuery) {
  const conditions: Record<string, unknown>[] = [];

  if (query.categoria) {
    conditions.push({ categoria: query.categoria });
  }

  if (query.q) {
    const q = query.q.trim();
    if (q) {
      const searchFields =
        query.searchScope === "core"
          ? [
              { titulo: { contains: q, mode: "insensitive" as const } },
              { marca: { contains: q, mode: "insensitive" as const } },
              { modelo: { contains: q, mode: "insensitive" as const } },
            ]
          : [
              { titulo: { contains: q, mode: "insensitive" as const } },
              { marca: { contains: q, mode: "insensitive" as const } },
              { modelo: { contains: q, mode: "insensitive" as const } },
              { descripcion: { contains: q, mode: "insensitive" as const } },
            ];
      conditions.push({ OR: searchFields });
    }
  }

  if (query.origin) {
    const originNorm = normalizeTextUpper(query.origin);
    if (originNorm) {
      conditions.push({
        origen: { equals: query.origin, mode: "insensitive" as const },
      });
    }
  }

  if (query.brand) {
    const brandNorm = normalizeTextUpper(query.brand);
    if (brandNorm) {
      conditions.push({ marcaNorm: brandNorm });
    }
  }

  if (query.model) {
    const modelNorm = normalizeTextUpper(query.model);
    if (modelNorm) {
      conditions.push({
        modeloNorm: { contains: modelNorm, mode: "insensitive" as const },
      });
    }
  }

  if (query.estado) {
    const estadoNorm = normalizeTextUpper(query.estado);
    if (estadoNorm === "NUEVO") {
      conditions.push({ condicion: "Nuevo" });
    } else if (estadoNorm === "USADO") {
      conditions.push({ condicion: "Usado" });
    }
  }

  if (query.province) {
    const provNorm = normalizeTextUpper(query.province);
    if (provNorm) {
      conditions.push({
        provincia: { equals: query.province, mode: "insensitive" as const },
      });
    }
  }

  if (query.yearMin !== null && query.yearMin !== undefined) {
    conditions.push({ anio: { gte: query.yearMin } });
  }
  if (query.yearMax !== null && query.yearMax !== undefined) {
    conditions.push({ anio: { lte: query.yearMax } });
  }
  if (query.hpMin !== null && query.hpMin !== undefined) {
    conditions.push({ hp: { gte: query.hpMin } });
  }
  if (query.hpMax !== null && query.hpMax !== undefined) {
    conditions.push({ hp: { lte: query.hpMax } });
  }

  if (query.hasPrice === true) {
    conditions.push({ precioUsd: { not: null } });
  } else if (query.hasPrice === false) {
    conditions.push({ precioUsd: null });
  }

  if (conditions.length === 0) return {};
  if (conditions.length === 1) return conditions[0];
  return { AND: conditions };
}

function buildOrderBy(sortBy?: string | null, sortDir?: string | null) {
  const dir = sortDir === "asc" ? ("asc" as const) : ("desc" as const);
  if (!sortBy) return { id: "asc" as const };

  switch (sortBy) {
    case "price_nor":
      return { precioUsd: dir };
    case "year":
      return { anio: dir };
    case "hp":
      return { hp: dir };
    default:
      return { id: "asc" as const };
  }
}
