const usdFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 0,
});

const yearFormatter = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 0,
  useGrouping: false,
});

const hpFormatter = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
  useGrouping: false,
});

export function formatUsd(value?: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "Sin dato";
  }
  return usdFormatter.format(value);
}

export function formatNumber(value?: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return numberFormatter.format(value);
}

export function formatYear(value?: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return yearFormatter.format(value);
}

export function formatHp(value?: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return hpFormatter.format(value);
}

export function formatPercent(value?: number | null, digits = 0) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return `${(value * 100).toFixed(digits)}%`;
}
