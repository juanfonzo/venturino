import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, signToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user, password } = body as { user?: string; password?: string };

    if (!user || !password) {
      return NextResponse.json({ error: "Usuario y contraseña requeridos" }, { status: 400 });
    }

    if (!validateCredentials(user, password)) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const token = await signToken({ user });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
