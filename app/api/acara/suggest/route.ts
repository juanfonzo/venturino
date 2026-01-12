import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loadAcara } from "@/lib/data/loadAcara";
import { normalizeText } from "@/lib/normalize/text";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function tokenize(text: string) {
  return text.split(/\s+/).filter((token) => token.length >= 3);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand") ?? "";
    const model = searchParams.get("model") ?? "";
    const limit = Math.min(10, Math.max(3, Number(searchParams.get("limit") ?? 5)));

    const brandNorm = normalizeText(brand) ?? "";
    const modelNorm = normalizeText(model) ?? "";
    const modelTokens = tokenize(modelNorm);

    if (!brandNorm && !modelNorm) {
      return NextResponse.json({ rows: [] });
    }

    const acara = await loadAcara();

    const scored = acara.items.map((item) => {
      const brandScore = item.brand_norm === brandNorm ? 5 : 0;
      const desc = item.description_norm ?? "";
      const category = item.category_norm ?? "";
      const containsModel = modelNorm && desc.includes(modelNorm) ? 3 : 0;
      const tokenScore = modelTokens.reduce((sum, token) => (desc.includes(token) ? sum + 0.6 : sum), 0);
      const categoryBoost = category.includes("TRACTOR") ? 0.4 : 0;
      const score = brandScore + containsModel + tokenScore + categoryBoost;
      return { item, score };
    });

    const rows = scored
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((entry) => ({
        id: entry.item.id,
        brand: entry.item.brand,
        description: entry.item.description,
        category: entry.item.category,
      }));

    return NextResponse.json({ rows });
  } catch (error) {
    return NextResponse.json({ error: "No se pudo sugerir ACARA." }, { status: 500 });
  }
}
