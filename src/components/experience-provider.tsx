"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { INTRO_STORAGE_KEY } from "@/lib/motion";

export type CursorKind = "dot" | "open" | "hidden";
export type IntroPhase = "pending" | "playing" | "done";

export interface EnterRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ProjectEnter {
  slug: string;
  rect: EnterRect;
}

interface ExperienceValue {
  intro: IntroPhase;
  completeIntro: () => void;
  enter: ProjectEnter | null;
  beginEnter: (next: ProjectEnter) => void;
  clearEnter: () => void;
}

interface CursorValue {
  cursor: CursorKind;
  setCursor: (kind: CursorKind) => void;
}

const ExperienceContext = createContext<ExperienceValue | null>(null);
const CursorContext = createContext<CursorValue | null>(null);

export const ExperienceProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [intro, setIntro] = useState<IntroPhase>("pending");
  const [enter, setEnter] = useState<ProjectEnter | null>(null);
  const [cursor, setCursor] = useState<CursorKind>("dot");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
    const next: IntroPhase = pathname !== "/" || reduce || seen ? "done" : "playing";
    const frame = window.setTimeout(() => setIntro(next), 0);
    return () => window.clearTimeout(frame);
  }, [pathname]);

  useEffect(() => {
    const locked = intro === "playing" || Boolean(enter);
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [intro, enter]);

  const completeIntro = useCallback(() => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    setIntro("done");
  }, []);

  const beginEnter = useCallback((next: ProjectEnter) => {
    setEnter((current) => current ?? next);
  }, []);

  const clearEnter = useCallback(() => setEnter(null), []);

  const experience = useMemo(
    () => ({ intro, completeIntro, enter, beginEnter, clearEnter }),
    [intro, completeIntro, enter, beginEnter, clearEnter],
  );

  const cursorValue = useMemo(() => ({ cursor, setCursor }), [cursor]);

  return (
    <ExperienceContext.Provider value={experience}>
      <CursorContext.Provider value={cursorValue}>{children}</CursorContext.Provider>
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }
  return context;
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within ExperienceProvider");
  }
  return context;
};
