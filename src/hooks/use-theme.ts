"use client";

import { useEffect, useRef, useState } from "react";
import {
  applyTheme,
  readStoredTheme,
  storeTheme,
  systemTheme,
  type Theme,
} from "@/lib/theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  const locked = useRef(false);

  useEffect(() => {
    const stored = readStoredTheme();
    locked.current = stored !== null;
    const initial = stored ?? systemTheme();
    applyTheme(initial);
    setTheme(initial);

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onSystem = () => {
      if (locked.current) return;
      const next = systemTheme();
      applyTheme(next);
      setTheme(next);
    };

    media.addEventListener("change", onSystem);
    return () => media.removeEventListener("change", onSystem);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    locked.current = true;
    applyTheme(next);
    setTheme(next);
    storeTheme(next);
  }

  return { theme, toggleTheme };
}
