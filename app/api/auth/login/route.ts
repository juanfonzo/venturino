import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_NAME,
  isSuperadmin,
  signToken,
  validateCredentials,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user, password } = body as { user?: string; password?: string };

    if (!user || !password) {
      return NextResponse.json({ error: "Usuario y contraseña requeridos" }, { status: 400 });
    }

    const session = validateCredentials(user, password);
    if (!session) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const token = await signToken(session);
    const res = NextResponse.json({
      ok: true,
      redirectTo: isSuperadmin(session) ? "/superadmin" : "/dashboard",
    });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
