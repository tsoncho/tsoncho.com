export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_FILM = [0.65, 0, 0.35, 1] as const;
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const INTRO_STORAGE_KEY = "tsoncho-intro-seen";
export const INTRO_MS = 3200;
export const ENTER_MS = 1180;

export const heroTiming = {
  greeting: { delay: 0.2, duration: 0.65 },
  im: { delay: 0.5, duration: 0.7 },
  first: { delay: 0.85, duration: 0.75 },
  last: { delay: 1.15, duration: 0.7 },
  rule: { delay: 1.7, duration: 0.5 },
  line: { delay: 2.05, duration: 0.7 },
} as const;
