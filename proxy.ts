import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, isSuperadmin, verifyToken } from "@/lib/auth";

const PUBLIC_PATHS = [
  "/login",
  "/api/auth/login",
  "/api/auth/logout",
  "/api/postventa/analyze",
  "/api/v1/market-references",
];

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isSuperadminPath(pathname: string) {
  return pathname === "/superadmin"
    || pathname.startsWith("/superadmin/")
    || isSuperadminApiPath(pathname);
}

function isSuperadminApiPath(pathname: string) {
  return pathname === "/api/superadmin"
    || pathname.startsWith("/api/superadmin/")
    || pathname === "/api/admin/processes";
}

function isStaticAsset(pathname: string) {
  return (
    pathname.startsWith("/_next")
    || pathname.startsWith("/favicon")
    || pathname.endsWith(".ico")
    || pathname.endsWith(".png")
    || pathname.endsWith(".jpg")
    || pathname.endsWith(".svg")
    || pathname.endsWith(".css")
    || pathname.endsWith(".js")
  );
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isStaticAsset(pathname) || isPublic(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    if (isSuperadminApiPath(pathname)) {
      return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const session = await verifyToken(token);
  if (!session) {
    const res = isSuperadminApiPath(pathname)
      ? NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 })
      : NextResponse.redirect(new URL("/login", req.url));
    res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
    return res;
  }

  if (isSuperadminPath(pathname) && !isSuperadmin(session)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "Acceso restringido" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
