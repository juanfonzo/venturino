import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  COOKIE_NAME,
  type AuthSession,
  isSuperadmin,
  verifyToken,
} from "@/lib/auth";

export async function getCurrentSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return token ? verifyToken(token) : null;
}

export async function getRequestSession(request: NextRequest): Promise<AuthSession | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return token ? verifyToken(token) : null;
}

export async function requireSuperadminPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  if (!isSuperadmin(session)) redirect("/dashboard");
  return session;
}

export async function requireSuperadminApi(request: NextRequest) {
  const session = await getRequestSession(request);
  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 }),
    } as const;
  }
  if (!isSuperadmin(session)) {
    return {
      session,
      response: NextResponse.json({ ok: false, error: "Acceso restringido" }, { status: 403 }),
    } as const;
  }
  return { session, response: null } as const;
}
