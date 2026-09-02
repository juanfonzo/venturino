import { SignJWT, jwtVerify } from "jose";
import {
  normalizeAuthPayload,
  type AuthSession,
} from "@/lib/auth/access";

const COOKIE_NAME = "venturino_token";
const TOKEN_EXPIRY = "7d";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET || "venturino-dev-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: AuthSession): Promise<string> {
  return new SignJWT({ user: payload.user, accessLevel: payload.accessLevel })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getJwtSecret());
}

export async function verifyToken(token: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return normalizeAuthPayload(payload as Record<string, unknown>);
  } catch {
    return null;
  }
}

export {
  ACCESS_LEVELS,
  isSuperadmin,
  normalizeAuthPayload,
  validateCredentials,
  type AccessLevel,
  type AuthSession,
} from "@/lib/auth/access";
export { COOKIE_NAME };
