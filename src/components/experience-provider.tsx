"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { INTRO_STORAGE_KEY } from "@/lib/motion";

export type CursorKind = "dot" | "open" | "hidden";
export type IntroPhase = "playing" | "done";

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

let introListeners: Array<() => void> = [];

const subscribeIntro = (callback: () => void) => {
  introListeners.push(callback);
  return () => {
    introListeners = introListeners.filter((listener) => listener !== callback);
  };
};

const notifyIntro = () => {
  introListeners.forEach((listener) => listener());
};

const readIntroSeen = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(INTRO_STORAGE_KEY) === "1";
};

const subscribeReducedMotion = (callback: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

const readReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const ExperienceProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const introSeen = useSyncExternalStore(subscribeIntro, readIntroSeen, () => false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    readReducedMotion,
    () => false,
  );
  const [enter, setEnter] = useState<ProjectEnter | null>(null);
  const [cursor, setCursor] = useState<CursorKind>("dot");

  const intro: IntroPhase =
    pathname !== "/" || introSeen || reducedMotion ? "done" : "playing";

  useEffect(() => {
    if (intro !== "playing") return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [intro]);

  useEffect(() => {
    if (!enter) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [enter]);

  const completeIntro = useCallback(() => {
    localStorage.setItem(INTRO_STORAGE_KEY, "1");
    notifyIntro();
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
