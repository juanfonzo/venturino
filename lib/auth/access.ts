export const ACCESS_LEVELS = ["VENTURINO", "SUPERADMIN"] as const;
export type AccessLevel = (typeof ACCESS_LEVELS)[number];

export interface AuthSession {
  user: string;
  accessLevel: AccessLevel;
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

export function validateCredentials(
  user: string,
  password: string,
  env: NodeJS.ProcessEnv = process.env,
): AuthSession | null {
  const normalizedUser = user.trim();
  const venturinoUser = (env.AUTH_USER || "admin").trim();
  const venturinoPassword = env.AUTH_PASSWORD || "admin";
  const superadminUser = env.SUPERADMIN_USER?.trim() || "";
  const superadminPassword = env.SUPERADMIN_PASSWORD || "";

  const superadminConfigured = superadminUser.length > 0
    && superadminPassword.length > 0
    && !safeEqual(superadminUser, venturinoUser);
  if (
    superadminConfigured
    && safeEqual(normalizedUser, superadminUser)
    && safeEqual(password, superadminPassword)
  ) {
    return { user: superadminUser, accessLevel: "SUPERADMIN" };
  }

  if (safeEqual(normalizedUser, venturinoUser) && safeEqual(password, venturinoPassword)) {
    return { user: venturinoUser, accessLevel: "VENTURINO" };
  }

  return null;
}

export function normalizeAuthPayload(payload: Record<string, unknown>): AuthSession | null {
  if (typeof payload.user !== "string" || payload.user.trim().length === 0) return null;
  return {
    user: payload.user,
    // Compatibilidad: los tokens previos no tenían accessLevel.
    accessLevel: payload.accessLevel === "SUPERADMIN" ? "SUPERADMIN" : "VENTURINO",
  };
}

export function isSuperadmin(session: AuthSession | null | undefined) {
  return session?.accessLevel === "SUPERADMIN";
}
