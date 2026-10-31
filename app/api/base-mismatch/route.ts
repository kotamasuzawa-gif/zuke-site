import { NextResponse } from "next/server";
import { getFreshCatalog } from "@/app/lib/base-catalog";
import { buildMismatchReport, parseSyncStage } from "@/app/lib/base-sync";
import { PRODUCTS } from "@/app/lib/products";

// 日次のずれ点検。画面は変えない。段階1以上かつ BASE_API_TOKEN があるときだけ BASE を読む。
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const stage = parseSyncStage(process.env.BASE_SYNC_STAGE);
  if (stage < 1) {
    const report = buildMismatchReport(PRODUCTS, stage, { status: "skipped", reason: "stage-below-1" });
    console.log(`BASE_MISMATCH ${JSON.stringify(report)}`);
    return NextResponse.json(report);
  }
  if (!process.env.BASE_API_TOKEN) {
    const report = buildMismatchReport(PRODUCTS, stage, { status: "skipped", reason: "no-token" });
    console.log(`BASE_MISMATCH ${JSON.stringify(report)}`);
    return NextResponse.json(report);
  }

  const fresh = await getFreshCatalog();
  const report = buildMismatchReport(PRODUCTS, stage, fresh.status === "error" ? { status: "error", message: fresh.message } : fresh);
  console.log(`BASE_MISMATCH ${JSON.stringify(report)}`);
  return NextResponse.json(report);
}
