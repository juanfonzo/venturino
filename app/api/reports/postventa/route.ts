import { execFile } from "child_process";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { promisify } from "util";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getPostventaReportData } from "@/lib/postventa/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const execFileAsync = promisify(execFile);

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const reportData = await getPostventaReportData({
    analysisRunId: parseNumberParam(searchParams.get("analysisRunId")),
    search: searchParams.get("search"),
    status: searchParams.get("status"),
    confidence: searchParams.get("confidence"),
    sortBy: searchParams.get("sortBy"),
    sortDir: searchParams.get("sortDir"),
  });

  if (!reportData.analysisRun) {
    return NextResponse.json({ error: "No hay una corrida de análisis Postventa disponible" }, { status: 404 });
  }

  const dateStr = new Date().toISOString().slice(0, 10);
  const suffix = reportData.filters.status ? `-${slugify(reportData.filters.status)}` : "";
  const filename = `postventa-vs-ml-${dateStr}${suffix}.pdf`;
  const outPath = path.join(os.tmpdir(), `postventa-report-${randomUUID()}.pdf`);
  const inputPath = path.join(os.tmpdir(), `postventa-report-${randomUUID()}.json`);
  const scriptPath = path.join(process.cwd(), "scripts", "generatePostventaReport.js");

  try {
    await fs.writeFile(inputPath, JSON.stringify(reportData), "utf8");
    await execFileAsync(process.execPath, [scriptPath, `--input=${inputPath}`, `--out=${outPath}`], {
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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("[api/reports/postventa] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await Promise.all([fs.unlink(inputPath).catch(() => undefined), fs.unlink(outPath).catch(() => undefined)]);
  }
}

function parseNumberParam(value: string | null) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}
