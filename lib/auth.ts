import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "venturino-dev-secret-change-me";
const AUTH_USER = process.env.AUTH_USER || "admin";
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "admin";

const COOKIE_NAME = "venturino_token";
const TOKEN_EXPIRY = "7d";

function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET);
}

export async function signToken(payload: { user: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getSecretKey());
}

export async function verifyToken(token: string): Promise<{ user: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as { user: string };
  } catch {
    return null;
  }
}

export function validateCredentials(user: string, password: string): boolean {
  return user === AUTH_USER && password === AUTH_PASSWORD;
}

export { COOKIE_NAME };
