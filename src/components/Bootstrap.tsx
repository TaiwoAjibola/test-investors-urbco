"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/appStore";

// Loads real assets from the API on mount; silently keeps mock data if unavailable.
export function Bootstrap() {
  const loadProperties = useAppStore((s) => s.loadProperties);
  useEffect(() => {
    loadProperties();
  }, [loadProperties]);
  return null;
}
