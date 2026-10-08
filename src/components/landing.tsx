"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "terziiskitsoncho@gmail.com";

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

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [domainIndex, setDomainIndex] = useState(0);
  const domainIndexRef = useRef(0);
  const copyTimer = useRef<number | null>(null);

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

    const goTo = (index: number) => {
      const list = panels();
      const next = Math.min(list.length - 1, Math.max(0, index));
      const panel = list[next];
      if (!panel) return;
      panel.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    };

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

  return (
    <div className="page" ref={rootRef}>
      <div className="atmosphere" aria-hidden="true">
        <div className="atm-plane atm-a" />
        <div className="atm-plane atm-b" />
        <div className="atm-glow" />
        <div className="atm-grain" />
      </div>

      <header className="topbar">
        <a className="brand" href="#top">
          Tsoncho
        </a>
        <nav aria-label="Page">
          <a href="#explore">Explore</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="deck">
        <section
          id="top"
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
          id="explore"
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
          id="contact"
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
            <p className="page-foot">Tsoncho © 2026</p>
          </div>
        </section>
      </main>
    </div>
  );
}
