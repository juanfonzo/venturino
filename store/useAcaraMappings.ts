"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { AcaraMappings } from "@/lib/types";

const STORAGE_KEY = "acaraMappingsV1";

export function useAcaraMappings() {
  const [mappings, setMappings] = useState<AcaraMappings>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setMappings(JSON.parse(stored));
      }
    } catch {
      setMappings({});
    } finally {
      setLoaded(true);
    }
  }, []);

  const persist = useCallback((next: AcaraMappings) => {
    setMappings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const setMapping = useCallback(
    (key: string, acaraItemId: string) => {
      const next = {
        ...mappings,
        [key]: { acaraItemId, createdAt: new Date().toISOString() },
      };
      persist(next);
    },
    [mappings, persist],
  );

  const removeMapping = useCallback(
    (key: string) => {
      const next = { ...mappings };
      delete next[key];
      persist(next);
    },
    [mappings, persist],
  );

  const importMappings = useCallback(
    (payload: AcaraMappings) => {
      persist(payload);
    },
    [persist],
  );

  const exportMappings = useCallback(() => {
    return JSON.stringify(mappings, null, 2);
  }, [mappings]);

  const count = useMemo(() => Object.keys(mappings).length, [mappings]);

  return {
    mappings,
    loaded,
    count,
    setMapping,
    removeMapping,
    importMappings,
    exportMappings,
  };
}
