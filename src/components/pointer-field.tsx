"use client";

import { useEffect } from "react";

export function PointerField() {
  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches || reduce.matches) return;

    const root = document.documentElement;

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 14;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      root.style.setProperty("--mx", `${x.toFixed(2)}px`);
      root.style.setProperty("--my", `${y.toFixed(2)}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
