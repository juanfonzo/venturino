export function hashString(input: string) {
  let hash = 5381;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

export function createStableId(parts: Array<string | null | undefined>) {
  const raw = parts.filter((part) => part && part.trim().length > 0).join("|");
  return raw.length > 0 ? hashString(raw) : hashString(Math.random().toString(36));
}
