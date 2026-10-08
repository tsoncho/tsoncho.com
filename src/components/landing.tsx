"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const EMAIL = "terziiskitsoncho@gmail.com";
const THEME_KEY = "theme";
const ROUTES = ["/", "/explore", "/contact"] as const;

type Theme = "light" | "dark";
type PanelPath = (typeof ROUTES)[number];

const domains = [
  {
    id: "ai",
    word: "AI",
    line: "Exploring how intelligence becomes useful software.",
  },
  {
    id: "automation",
    word: "Automation",
    line: "Turning repetitive work into systems.",
  },
  {
    id: "experiments",
    word: "Experiments",
    line: "Trying ideas to see what happens.",
  },
] as const;

function pathFor(index: number): PanelPath {
  return ROUTES[Math.min(ROUTES.length - 1, Math.max(0, index))] ?? "/";
}

function indexFor(pathname: string): number {
  if (pathname.startsWith("/explore")) return 1;
  if (pathname.startsWith("/contact")) return 2;
  return 0;
}

function hashToPath(hash: string): PanelPath | null {
  if (hash === "#explore") return "/explore";
  if (hash === "#contact") return "/contact";
  if (hash === "#top" || hash === "#") return "/";
  return null;
}

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export function Landing() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [domainIndex, setDomainIndex] = useState(0);
  const [theme, setTheme] = useState<Theme>("dark");
  const domainIndexRef = useRef(0);
  const copyTimer = useRef<number | null>(null);
  const themeLocked = useRef(false);
  const goToRef = useRef<(index: number, instant?: boolean) => void>(() => {});
  const routerRef = useRef(router);
  const pathRef = useRef(pathname);
  const urlIndexRef = useRef(indexFor(pathname));

  routerRef.current = router;
  pathRef.current = pathname;

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    themeLocked.current = true;
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const field = document.createElement("textarea");
      field.value = EMAIL;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }

    setCopied(true);
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
  }

  useEffect(() => {
    domainIndexRef.current = domainIndex;
  }, [domainIndex]);

  useEffect(() => {
    return () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    const stored = readStoredTheme();
    themeLocked.current = stored !== null;
    const initial = stored ?? systemTheme();
    applyTheme(initial);
    setTheme(initial);

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onSystem = () => {
      if (themeLocked.current) return;
      const next = systemTheme();
      applyTheme(next);
      setTheme(next);
    };

    media.addEventListener("change", onSystem);
    return () => media.removeEventListener("change", onSystem);
  }, []);

  useEffect(() => {
    const legacy = hashToPath(window.location.hash);
    if (legacy && legacy !== pathRef.current) {
      routerRef.current.replace(legacy, { scroll: false });
      return;
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", pathRef.current);
    }
  }, []);

  useEffect(() => {
    const target = indexFor(pathname);
    urlIndexRef.current = target;
    goToRef.current(target, true);
  }, [pathname]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = prefersReduced();
    document.documentElement.dataset.motion = reduced ? "reduce" : "ok";
    document.documentElement.dataset.deck = reduced ? "free" : "snap";

    let frame = 0;
    let locked = false;
    let lockTimer = 0;
    let touchY = 0;
    let touchArmed = false;
    const lastDomain = domains.length - 1;

    const panels = () =>
      Array.from(root.querySelectorAll<HTMLElement>("[data-panel]"));

    const activeIndex = () => {
      const list = panels();
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      list.forEach((panel, index) => {
        const dist = Math.abs(panel.getBoundingClientRect().top);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      return best;
    };

    const syncUrl = (index: number) => {
      const path = pathFor(index);
      if (pathRef.current === path) {
        urlIndexRef.current = index;
        return;
      }
      urlIndexRef.current = index;
      routerRef.current.replace(path, { scroll: false });
    };

    const goTo = (index: number, instant = false) => {
      const list = panels();
      const next = Math.min(list.length - 1, Math.max(0, index));
      const panel = list[next];
      if (!panel) return;
      panel.scrollIntoView({
        behavior: instant || reduced ? "auto" : "smooth",
        block: "start",
      });
      syncUrl(next);
    };

    goToRef.current = goTo;

    const setDomain = (index: number) => {
      const next = Math.min(lastDomain, Math.max(0, index));
      domainIndexRef.current = next;
      setDomainIndex(next);
    };

    const measure = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      root.style.setProperty("--page", (window.scrollY / max).toFixed(4));

      const hero = root.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const local = Math.min(1, Math.max(0, -rect.top / Math.max(1, vh * 0.55)));
        hero.style.setProperty("--h", local.toFixed(4));
        if (local > 0.08) hero.setAttribute("data-scrolled", "");
        else hero.removeAttribute("data-scrolled");
      }

      const index = activeIndex();
      root.dataset.panel = String(index);
      panels().forEach((panel, i) => {
        panel.dataset.active = i === index ? "true" : "false";
      });

      if (index !== urlIndexRef.current) {
        syncUrl(index);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    const lockBriefly = () => {
      locked = true;
      window.clearTimeout(lockTimer);
      lockTimer = window.setTimeout(() => {
        locked = false;
      }, 780);
    };

    const step = (direction: 1 | -1) => {
      if (reduced || locked) return;

      const panel = activeIndex();
      const domain = domainIndexRef.current;

      // Explore panel: advance domains in place before leaving the section.
      if (panel === 1) {
        if (direction === 1 && domain < lastDomain) {
          lockBriefly();
          setDomain(domain + 1);
          return;
        }
        if (direction === -1 && domain > 0) {
          lockBriefly();
          setDomain(domain - 1);
          return;
        }
      }

      const nextPanel = panel + direction;
      if (nextPanel < 0 || nextPanel > panels().length - 1) return;

      lockBriefly();
      if (nextPanel === 1) {
        setDomain(direction === 1 ? 0 : lastDomain);
      }
      goTo(nextPanel);
    };

    const onWheel = (event: WheelEvent) => {
      if (reduced) return;
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      step(event.deltaY > 0 ? 1 : -1);
    };

    const onKey = (event: KeyboardEvent) => {
      if (reduced) return;
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        if (event.key === " " && event.target instanceof HTMLButtonElement) return;
        event.preventDefault();
        step(1);
      }
      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        step(-1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
      touchArmed = true;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (reduced || !touchArmed) return;
      const panel = activeIndex();
      if (panel !== 1) return;

      const currentY = event.touches[0]?.clientY ?? touchY;
      const delta = touchY - currentY;
      const domain = domainIndexRef.current;
      const canStay =
        (delta > 12 && domain < lastDomain) || (delta < -12 && domain > 0);

      if (canStay) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (reduced || !touchArmed) return;
      touchArmed = false;
      const endY = event.changedTouches[0]?.clientY ?? touchY;
      const delta = touchY - endY;
      if (Math.abs(delta) < 42) return;
      step(delta > 0 ? 1 : -1);
    };

    goTo(indexFor(pathRef.current), true);
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.clearTimeout(lockTimer);
      if (frame) cancelAnimationFrame(frame);
      delete document.documentElement.dataset.deck;
    };
  }, []);

  function openPanel(index: number) {
    goToRef.current(index);
  }

  return (
    <div className="page" ref={rootRef}>
      <div className="atmosphere" aria-hidden="true">
        <div className="atm-plane atm-a" />
        <div className="atm-plane atm-b" />
        <div className="atm-glow" />
        <div className="atm-grain" />
      </div>

      <header className="topbar">
        <Link
          className="brand"
          href="/"
          scroll={false}
          onClick={() => openPanel(0)}
        >
          Tsoncho
        </Link>
        <div className="topbar-end">
          <nav aria-label="Page">
            <Link href="/explore" scroll={false} onClick={() => openPanel(1)}>
              Explore
            </Link>
            <Link href="/contact" scroll={false} onClick={() => openPanel(2)}>
              Contact
            </Link>
          </nav>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <svg
                className="theme-icon"
                viewBox="0 0 24 24"
                width="15"
                height="15"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M5.6 18.4l1.1-1.1M17.3 6.7l1.1-1.1"
                />
              </svg>
            ) : (
              <svg
                className="theme-icon"
                viewBox="0 0 24 24"
                width="15"
                height="15"
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.2 13.6A7.8 7.8 0 0 1 10.4 3.8 7.4 7.4 0 1 0 20.2 13.6Z"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="deck">
        <section
          className="panel hero"
          data-panel
          data-hero
          aria-labelledby="hero-title"
        >
          <div className="frame hero-frame">
            <h1 id="hero-title" className="type-xl hero-title">
              <span className="hero-word hero-word--first">Tsoncho</span>
              <span className="hero-word hero-word--last">Terziyski</span>
            </h1>
          </div>
          <p className="scroll-cue" aria-hidden="true">
            Swipe
          </p>
        </section>

        <section
          className="panel explore"
          data-panel
          data-stage={domainIndex}
          aria-labelledby="domains-title"
        >
          <div className="frame explore-frame">
            <h2 id="domains-title" className="sr-only">
              What I do
            </h2>
            <div className="domain-stage">
              {domains.map((domain, index) => (
                <article
                  key={domain.id}
                  className="domain"
                  data-i={index}
                  data-active={domainIndex === index ? "true" : "false"}
                >
                  <p className="type-lg domain-word">{domain.word}</p>
                  <p className="body domain-line">{domain.line}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="panel contact"
          data-panel
          aria-labelledby="contact-title"
        >
          <div className="frame contact-frame">
            <h2 id="contact-title" className="type-xl contact-title">
              Let&apos;s talk.
            </h2>
            <button
              className={`copy-mail${copied ? " is-copied" : ""}`}
              type="button"
              onClick={copyEmail}
              aria-live="polite"
            >
              <span className="copy-mail-label">
                {copied ? "Copied" : "Email"}
              </span>
              <span className="copy-mail-address">{EMAIL}</span>
            </button>
          </div>
          <p className="page-foot">Tsoncho © 2026</p>
        </section>
      </main>
    </div>
  );
}
