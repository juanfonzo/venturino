const MIN_VALID_LISTING_USD_PRICE = 1000;

export function normalizeListingPriceUsd(value: unknown) {
  if (value === null || value === undefined) return null;
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue < MIN_VALID_LISTING_USD_PRICE) return null;
  return numericValue;
}
