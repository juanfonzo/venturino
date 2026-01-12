export function detectDelimiter(text: string) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const header = lines[0] ?? "";
  const semicolons = (header.match(/;/g) || []).length;
  const commas = (header.match(/,/g) || []).length;
  return semicolons >= commas ? ";" : ",";
}

export function parseCsv(text: string, delimiter: string) {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === delimiter && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if (char === "\n" && !inQuotes) {
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
      continue;
    }

    if (char === "\r") {
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  return rows;
}

export function parseCsvToObjects(text: string, delimiter: string) {
  const rows = parseCsv(text, delimiter);
  const header = rows.shift() || [];
  if (header.length === 0) {
    return [] as Record<string, string>[];
  }
  const normalizedHeader = header.map((cell, index) => {
    const clean = cell.replace(/^\uFEFF/, "").trim();
    return clean.length > 0 ? clean : `col_${index}`;
  });

  return rows
    .filter((row) => row.some((cell) => cell.trim().length > 0))
    .map((row) => {
      const record: Record<string, string> = {};
      normalizedHeader.forEach((key, index) => {
        record[key] = row[index] ?? "";
      });
      return record;
    });
}
