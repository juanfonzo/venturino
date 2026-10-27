import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { promisify } from "util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const execFileAsync = promisify(execFile);

const ALLOWED_CATEGORIES = new Set([
  "Tractores",
  "Cosechadoras",
  "Sembradoras",
  "Pulverizadoras",
]);

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const categoriaParam = searchParams.get("categoria");
  const soloActivosParam = searchParams.get("solo_activos");

  const categoria =
    categoriaParam && ALLOWED_CATEGORIES.has(categoriaParam) ? categoriaParam : null;
  const soloActivos = soloActivosParam === "1" || soloActivosParam === "true";

  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `venturino-vs-mercado-${dateStr}${categoria ? "-" + categoria.toLowerCase() : ""}.pdf`;
  const outPath = path.join(os.tmpdir(), `venturino-report-${randomUUID()}.pdf`);
  const scriptPath = path.join(process.cwd(), "scripts", "generateVenturinoReport.js");
  const args = [scriptPath, `--out=${outPath}`];
  if (categoria) args.push(`--categoria=${categoria}`);
  if (soloActivos) args.push("--solo-activos");

  try {
    await execFileAsync(process.execPath, args, {
      cwd: process.cwd(),
      env: process.env,
      timeout: 120_000,
      maxBuffer: 1024 * 1024,
    });
    const buffer = await fs.readFile(outPath);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    console.error("[api/reports/venturino] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await fs.unlink(outPath).catch(() => undefined);
  }
}
