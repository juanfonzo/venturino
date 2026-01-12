import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_PATH = path.join(process.cwd(), "data", "mappings.json");

async function readMappings() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function GET() {
  const data = await readMappings();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Formato invalido" }, { status: 400 });
    }
    await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), "utf8");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo guardar mappings." },
      { status: 500 },
    );
  }
}

export const PUT = POST;
