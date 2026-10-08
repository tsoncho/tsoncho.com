"use client";

import { useEffect, useRef } from "react";

const domains = [
  {
    word: "Software",
    line: "Creating useful things with code.",
  },
  {
    word: "AI",
    line: "Exploring how intelligence becomes useful software.",
  },
  {
    word: "Automation",
    line: "Turning repetitive work into systems.",
  },
  {
    word: "Experiments",
    line: "Trying ideas to see what happens.",
  },
] as const;

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.documentElement.dataset.motion = prefersReduced() ? "reduce" : "ok";

    let frame = 0;

    const measure = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      root.style.setProperty("--page", (window.scrollY / max).toFixed(4));

      root.querySelectorAll<HTMLElement>("[data-track]").forEach((track) => {
        const rect = track.getBoundingClientRect();
        const travel = Math.max(1, track.offsetHeight - vh);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        track.style.setProperty("--p", progress.toFixed(4));

        const stages = Number(track.dataset.stages || "1");
        track.dataset.stage = String(
          Math.min(stages - 1, Math.floor(progress * stages)),
        );
      });

      const hero = root.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const local = Math.min(1, Math.max(0, 1 - rect.bottom / (vh * 1.1)));
        hero.style.setProperty("--h", local.toFixed(4));
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
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

      <main>
        <section id="top" className="hero" data-hero aria-labelledby="hero-title">
          <div className="frame hero-frame">
            <h1 id="hero-title" className="type-xl hero-title">
              <span className="hero-word hero-word--first">Tsoncho</span>
              <span className="hero-word hero-word--last">Terziyski</span>
            </h1>
          </div>
          <p className="scroll-cue" aria-hidden="true">
            Scroll
          </p>
        </section>

        <section
          id="explore"
          className="band domains"
          data-track
          data-stages="4"
          aria-labelledby="domains-title"
        >
          <div className="pin">
            <div className="frame">
              <p className="label">01 — Explore</p>
              <h2 id="domains-title" className="sr-only">
                What I do
              </h2>
              <div className="domain-stage">
                {domains.map((domain, index) => (
                  <article key={domain.word} className="domain" data-i={index}>
                    <p className="type-lg domain-word">{domain.word}</p>
                    <p className="body domain-line">{domain.line}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="band contact" aria-labelledby="contact-title">
          <div className="frame contact-frame">
            <p className="label">02 — Contact</p>
            <h2 id="contact-title" className="type-xl contact-title">
              Let&apos;s talk.
            </h2>
            <ul className="contact-links">
              <li>
                <a href="mailto:terziiskitsoncho@gmail.com">
                  Email <span aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/tsoncho" target="_blank" rel="noreferrer">
                  GitHub <span aria-hidden="true">→</span>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="page-foot">
        <p>Tsoncho © 2026</p>
      </footer>
    </div>
  );
}
