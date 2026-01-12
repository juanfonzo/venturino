import { headers } from "next/headers";

export function getBaseUrl() {
  const headerList = headers();
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}
