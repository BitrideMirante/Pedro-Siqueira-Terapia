import { NextRequest, NextResponse } from "next/server";
import { gravarStatus, lerStatus } from "@/lib/kv";

export const dynamic = "force-dynamic"; // nunca cachear — status muda ao longo do dia

export async function GET() {
  const status = await lerStatus();
  return NextResponse.json(status);
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.ativo !== "boolean") {
    return NextResponse.json({ erro: "Corpo inválido" }, { status: 400 });
  }

  const status = await gravarStatus({
    ativo: body.ativo,
    local: typeof body.local === "string" ? body.local : "",
    horario: typeof body.horario === "string" ? body.horario : "",
  });

  return NextResponse.json(status);
}
