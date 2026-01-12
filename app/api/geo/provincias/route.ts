import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GEO_PATH = path.join(process.cwd(), "data", "geo", "argentina-provincias.geojson");

export async function GET() {
  try {
    const raw = await fs.readFile(GEO_PATH, "utf8");
    return NextResponse.json(JSON.parse(raw));
  } catch (error) {
    return NextResponse.json(
      { type: "FeatureCollection", features: [] },
      { status: 200 },
    );
  }
}
