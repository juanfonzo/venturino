"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Input } from "@/components/ui/Input";

type MultiSelectOption = {
  value: string;
  label: string;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  searchPlaceholder = "Buscar...",
  emptyText = "Sin opciones",
  className,
}: {
  options: MultiSelectOption[];
  value: string[];
  onChange: (nextValue: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current) return;
      if (containerRef.current.contains(event.target as Node)) return;
      setOpen(false);
    }

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredOptions = useMemo(() => {
    if (!normalizedQuery) return options;
    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery, options]);

  const selectedOptions = useMemo(() => {
    const selectedSet = new Set(value);
    return options.filter((option) => selectedSet.has(option.value));
  }, [options, value]);

  const summary = selectedOptions.length
    ? selectedOptions.map((option) => option.label).join(", ")
    : placeholder;

  function toggleOption(nextValue: string) {
    if (value.includes(nextValue)) {
      onChange(value.filter((item) => item !== nextValue));
      return;
    }
    onChange([...value, nextValue]);
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-[42px] w-full items-center justify-between gap-3 rounded-xl border border-jd-black/15 bg-white/80 px-3 py-2 text-left text-sm outline-none transition hover:border-jd-green focus:border-jd-green"
      >
        <span className={cn("truncate", selectedOptions.length === 0 ? "text-jd-black/45" : "text-jd-black")}>{summary}</span>
        <span className="shrink-0 text-xs text-jd-black/45">{selectedOptions.length}</span>
      </button>

      {open ? (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-jd-black/10 bg-white p-3 shadow-xl">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="mb-3"
          />

          <div className="max-h-72 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-2 py-3 text-sm text-jd-black/50">{emptyText}</div>
            ) : (
              <div className="flex flex-col gap-1">
                {filteredOptions.map((option) => {
                  const checked = value.includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-sm transition hover:bg-jd-cream/50"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOption(option.value)}
                        className="h-4 w-4 rounded border-jd-black/20 text-jd-green focus:ring-jd-green"
                      />
                      <span className="min-w-0 flex-1 truncate">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {selectedOptions.length > 0 ? (
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs font-semibold text-jd-black/60 hover:text-jd-black"
              >
                Limpiar selección
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
