"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SiteChrome } from "@/components/site-chrome";

const EMAIL = "terziiskitsoncho@gmail.com";
const ROUTES = ["/", "/explore", "/contact"] as const;

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

export function Landing() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [domainIndex, setDomainIndex] = useState(0);
  const domainIndexRef = useRef(0);
  const copyTimer = useRef<number | null>(null);
  const goToRef = useRef<(index: number, instant?: boolean) => void>(() => {});
  const routerRef = useRef(router);
  const pathRef = useRef(pathname);
  const urlIndexRef = useRef(indexFor(pathname));
  const ignorePathnameRef = useRef(false);
  const lockedRef = useRef(false);

  routerRef.current = router;

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
    const legacy = hashToPath(window.location.hash);
    if (legacy && legacy !== window.location.pathname) {
      ignorePathnameRef.current = true;
      pathRef.current = legacy;
      urlIndexRef.current = indexFor(legacy);
      routerRef.current.replace(legacy, { scroll: false });
      return;
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    pathRef.current = pathname;

    if (ignorePathnameRef.current) {
      ignorePathnameRef.current = false;
      urlIndexRef.current = indexFor(pathname);
      return;
    }

    const target = indexFor(pathname);
    if (target === urlIndexRef.current) return;
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
    let lockTimer = 0;
    let quietTimer = 0;
    let touchY = 0;
    let touchArmed = false;
    let pinExplore = false;
    let pinHero = false;
    let wheelQuietUntil = 0;
    const lastDomain = domains.length - 1;
    const EXPLORE = 1;
    const HOME = 0;

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

    const panelTop = (index: number) => {
      const panel = panels()[index];
      if (!panel) return window.scrollY;
      return Math.round(window.scrollY + panel.getBoundingClientRect().top);
    };

    const alignPanel = (index: number) => {
      const y = panelTop(index);
      if (Math.abs(window.scrollY - y) >= 1) {
        window.scrollTo(0, y);
      }
    };

    const enableSnap = (on: boolean) => {
      if (reduced) {
        document.documentElement.dataset.deck = "free";
        return;
      }
      document.documentElement.dataset.deck = on ? "snap" : "free";
    };

    const syncUrl = (index: number) => {
      const path = pathFor(index);
      urlIndexRef.current = index;
      if (pathRef.current === path) return;
      ignorePathnameRef.current = true;
      pathRef.current = path;
      window.history.replaceState(window.history.state ?? null, "", path);
    };

    const freezeHero = () => {
      const hero = root.querySelector<HTMLElement>("[data-hero]");
      if (!hero) return;
      hero.style.setProperty("--h", "0");
      hero.removeAttribute("data-scrolled");
    };

    const restAtmosphere = () => {
      root.style.setProperty("--page", "0");
    };

    const goTo = (index: number, instant = false) => {
      const list = panels();
      const next = Math.min(list.length - 1, Math.max(0, index));
      const panel = list[next];
      if (!panel) return;
      syncUrl(next);

      if (next === HOME) {
        pinHero = true;
        freezeHero();
        enableSnap(false);
        lockedRef.current = true;
        window.clearTimeout(lockTimer);
        if (instant || reduced) {
          window.scrollTo(0, panelTop(HOME));
          freezeHero();
          restAtmosphere();
          pinHero = false;
          lockedRef.current = false;
          enableSnap(true);
          return;
        }
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
        lockTimer = window.setTimeout(() => {
          alignPanel(HOME);
          freezeHero();
          restAtmosphere();
          pinHero = false;
          lockedRef.current = false;
          enableSnap(true);
          quietWheel(160);
          measure();
        }, 820);
        return;
      }

      if (instant || reduced) {
        enableSnap(false);
        window.scrollTo(0, panelTop(next));
        enableSnap(true);
        return;
      }
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
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
      const index = activeIndex();
      const hero = root.querySelector<HTMLElement>("[data-hero]");
      const heroTop = hero?.getBoundingClientRect().top ?? 0;
      const nearHome = index === HOME && Math.abs(heroTop) < 10;

      // Atmosphere tracks scroll live; only hard-rest when settled on the hero.
      if (nearHome && !pinHero) {
        restAtmosphere();
      } else {
        root.style.setProperty(
          "--page",
          (window.scrollY / max).toFixed(4),
        );
      }

      if (hero) {
        // Parallax only while leaving the hero — never while returning/settling.
        const leaving =
          index === HOME &&
          !nearHome &&
          !pinHero &&
          urlIndexRef.current === HOME &&
          !lockedRef.current;
        const local = leaving
          ? Math.min(1, Math.max(0, -heroTop / Math.max(1, vh * 0.55)))
          : 0;
        hero.style.setProperty("--h", local.toFixed(4));
        if (local > 0.08) hero.setAttribute("data-scrolled", "");
        else hero.removeAttribute("data-scrolled");
      }

      root.dataset.panel = String(index);
      panels().forEach((panel, i) => {
        panel.dataset.active = i === index ? "true" : "false";
      });

      if (!lockedRef.current && index !== urlIndexRef.current) {
        syncUrl(index);
      }
    };

    const onScroll = () => {
      if (pinExplore) {
        alignPanel(EXPLORE);
        return;
      }
      // While returning home, keep measuring so atmosphere eases with scroll
      // instead of freezing mid-trip and popping at the end.
      if (pinHero) {
        freezeHero();
      }
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    const lockBriefly = (ms = 780, settle?: 0 | typeof EXPLORE) => {
      lockedRef.current = true;
      window.clearTimeout(lockTimer);
      lockTimer = window.setTimeout(() => {
        if (settle === 0) {
          alignPanel(0);
          freezeHero();
          pinHero = false;
          enableSnap(true);
        }
        if (settle === EXPLORE) {
          alignPanel(EXPLORE);
        }
        lockedRef.current = false;
        measure();
      }, ms);
    };

    const quietWheel = (ms = 160) => {
      wheelQuietUntil = performance.now() + ms;
      window.clearTimeout(quietTimer);
      quietTimer = window.setTimeout(() => {
        wheelQuietUntil = 0;
      }, ms);
    };

    // Domain crossfade: freeze scroll + snap so nothing drifts after settle.
    const holdExploreDomain = (nextDomain: number) => {
      lockedRef.current = true;
      pinExplore = true;
      enableSnap(false);
      alignPanel(EXPLORE);
      setDomain(nextDomain);
      alignPanel(EXPLORE);
      quietWheel(220);

      window.clearTimeout(lockTimer);
      lockTimer = window.setTimeout(() => {
        alignPanel(EXPLORE);
        pinExplore = false;
        lockedRef.current = false;
        enableSnap(true);
        alignPanel(EXPLORE);
        quietWheel(180);
        measure();
      }, 720);
    };

    const step = (direction: 1 | -1) => {
      if (reduced || lockedRef.current) return;

      const panel = activeIndex();
      const domain = domainIndexRef.current;

      if (panel === EXPLORE) {
        if (direction === 1 && domain < lastDomain) {
          holdExploreDomain(domain + 1);
          return;
        }
        if (direction === -1 && domain > 0) {
          holdExploreDomain(domain - 1);
          return;
        }
      }

      const nextPanel = panel + direction;
      if (nextPanel < 0 || nextPanel > panels().length - 1) return;

      quietWheel(200);
      if (nextPanel === EXPLORE) {
        setDomain(direction === 1 ? 0 : lastDomain);
      }
      if (nextPanel !== HOME) lockBriefly();
      goTo(nextPanel);
    };

    const onWheel = (event: WheelEvent) => {
      if (reduced) return;
      event.preventDefault();
      if (Math.abs(event.deltaY) < 8) return;
      if (performance.now() < wheelQuietUntil) return;
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
      // Explore owns the gesture — never let native scroll bleed into snap.
      if (activeIndex() === EXPLORE || pinExplore) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (reduced || !touchArmed) return;
      touchArmed = false;
      const endY = event.changedTouches[0]?.clientY ?? touchY;
      const delta = touchY - endY;
      if (Math.abs(delta) < 42) {
        if (activeIndex() === EXPLORE) alignPanel(EXPLORE);
        return;
      }
      step(delta > 0 ? 1 : -1);
    };

    const start = indexFor(pathRef.current);
    urlIndexRef.current = start;
    if (start !== 0) {
      goTo(start, true);
    }
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
      window.clearTimeout(quietTimer);
      if (frame) cancelAnimationFrame(frame);
      delete document.documentElement.dataset.deck;
    };
  }, []);

  function openPanel(index: number) {
    lockedRef.current = true;
    window.setTimeout(() => {
      lockedRef.current = false;
    }, 780);
    goToRef.current(index);
  }

  return (
    <SiteChrome rootRef={rootRef} onHome={() => openPanel(0)}>
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
    </SiteChrome>
  );
}
