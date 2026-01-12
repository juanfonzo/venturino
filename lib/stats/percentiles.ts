export function percentile(sortedValues: number[], p: number) {
  if (sortedValues.length === 0) return null;
  const index = (sortedValues.length - 1) * p;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sortedValues[lower];
  const weight = index - lower;
  return sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight;
}

export function getPercentiles(values: number[]) {
  if (values.length === 0) {
    return { p25: null, p50: null, p75: null };
  }
  const sorted = [...values].sort((a, b) => a - b);
  return {
    p25: percentile(sorted, 0.25),
    p50: percentile(sorted, 0.5),
    p75: percentile(sorted, 0.75),
  };
}
