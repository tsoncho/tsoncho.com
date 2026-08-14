"use client";

import { useEffect, useRef, useState } from "react";
import { useCursor, type CursorKind } from "@/components/experience-provider";
import { cn } from "@/lib/utils";

const isFinePointer = () =>
  window.matchMedia("(pointer: fine) and (hover: hover)").matches;

export const CustomCursor = () => {
  const { cursor, setCursor } = useCursor();
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !isFinePointer()) return undefined;

    const enable = window.setTimeout(() => {
      setEnabled(true);
      document.documentElement.classList.add("has-custom-cursor");
    }, 0);

    const pos = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;

    const handleMove = (event: PointerEvent) => {
      pos.tx = event.clientX;
      pos.ty = event.clientY;
    };

    const tick = () => {
      pos.x += (pos.tx - pos.x) * 0.16;
      pos.y += (pos.ty - pos.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const tagged = target.closest("[data-cursor]");
      if (tagged instanceof HTMLElement) {
        setCursor((tagged.dataset.cursor as CursorKind) ?? "dot");
        return;
      }
      if (target.closest("a[href]")) {
        setCursor("open");
        return;
      }
      setCursor("dot");
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(enable);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      cancelAnimationFrame(raf);
    };
  }, [setCursor]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
      style={{ transform: "translate3d(-100px,-100px,0)" }}
    >
      <div
        className={cn(
          "-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/0 bg-white transition-[width,height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          cursor === "dot" && "h-1 w-1",
          cursor === "open" && "h-5 w-5 bg-transparent border-white/70",
          cursor === "hidden" && "h-0 w-0 opacity-0",
        )}
      />
    </div>
  );
};
