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

const verbs = ["Learn", "Create", "Automate", "Improve"] as const;

const nowItems = [
  "Junior Software Specialist",
  "ATM & POS",
  "Software",
  "AI",
  "Automation",
  "Experiments",
] as const;

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = prefersReduced();
    document.documentElement.dataset.motion = reduced ? "reduce" : "ok";

    let frame = 0;

    const measure = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      const scroll = window.scrollY / max;
      root.style.setProperty("--page", scroll.toFixed(4));

      root.querySelectorAll<HTMLElement>("[data-track]").forEach((track) => {
        const rect = track.getBoundingClientRect();
        const travel = Math.max(1, track.offsetHeight - vh);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        track.style.setProperty("--p", progress.toFixed(4));

        const stages = Number(track.dataset.stages || "1");
        const stage = Math.min(stages - 1, Math.floor(progress * stages));
        track.dataset.stage = String(stage);
      });

      const hero = root.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const local = Math.min(1, Math.max(0, 1 - rect.bottom / (vh * 1.15)));
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
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="top" className="hero" data-hero aria-labelledby="hero-title">
          <p className="eyebrow">Bulgaria</p>
          <h1 id="hero-title" className="display hero-title">
            Tsoncho
          </h1>
          <p className="hero-kicker">
            <span>Student.</span>
            <span>Software Specialist.</span>
            <span>Entrepreneur.</span>
          </p>
          <p className="scroll-cue" aria-hidden="true">
            Scroll
          </p>
        </section>

        <section id="about" className="band identity" data-track data-stages="5" aria-labelledby="identity-title">
          <div className="pin">
            <p className="mark">01 — Identity</p>
            <h2 id="identity-title" className="display statement">
              I make things move.
            </h2>
            <div className="verb-stage" aria-hidden="true">
              {verbs.map((verb, index) => (
                <p key={verb} className="display verb" data-i={index}>
                  {verb}.
                </p>
              ))}
            </div>
            <ul className="sr-only">
              {verbs.map((verb) => (
                <li key={verb}>{verb}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="work" className="band role" data-track data-stages="3" aria-labelledby="role-title">
          <div className="pin">
            <p className="mark">02 — Role</p>
            <div className="role-stage">
              <h2 id="role-title" className="display role-line" data-i="0">
                Junior Software Specialist
              </h2>
              <p className="display role-line accent-line" data-i="1">
                ATM &amp; POS
              </p>
              <p className="display role-line focus-line" data-i="2">
                Early in. Already moving.
              </p>
            </div>
          </div>
        </section>

        <section className="band domains" data-track data-stages="4" aria-labelledby="domains-title">
          <div className="pin">
            <p className="mark">03 — Explore</p>
            <h2 id="domains-title" className="sr-only">
              What I do
            </h2>
            <div className="domain-stage">
              {domains.map((domain, index) => (
                <article key={domain.word} className="domain" data-i={index}>
                  <p className="display domain-word">{domain.word}</p>
                  <p className="domain-line">{domain.line}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band think" data-track data-stages="1" aria-labelledby="think-title">
          <div className="pin think-pin">
            <p className="mark">04 — System</p>
            <h2 id="think-title" className="sr-only">
              How I think
            </h2>
            <div className="chain" aria-hidden="true">
              {verbs.map((verb, index) => (
                <span key={verb} className="chain-item">
                  <span className="display chain-word">{verb}</span>
                  {index < verbs.length - 1 ? (
                    <span className="chain-arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
            <p className="chain-caption">A continuous loop.</p>
            <p className="sr-only">Learn, create, automate, improve.</p>
          </div>
        </section>

        <section className="band now" aria-labelledby="now-title">
          <div className="now-inner">
            <p className="mark">05 — Now</p>
            <h2 id="now-title" className="display now-title">
              Now
            </h2>
            <ul className="now-list">
              {nowItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="display now-end">Exploring what&apos;s next.</p>
          </div>
        </section>

        <section className="band future" aria-labelledby="future-title">
          <div className="future-inner">
            <h2 id="future-title" className="display future-title">
              What&apos;s next?
            </h2>
            <ul className="future-lines">
              <li>Create more.</li>
              <li>Learn faster.</li>
              <li>Go further.</li>
            </ul>
          </div>
        </section>

        <section id="contact" className="band contact" aria-labelledby="contact-title">
          <div className="contact-inner">
            <p className="mark">06 — Contact</p>
            <h2 id="contact-title" className="display contact-title">
              Let&apos;s talk.
            </h2>
            <ul className="contact-links">
              <li>
                <a href="mailto:terziiskitsoncho@gmail.com">
                  Email <span aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/tsoncho"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <span aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/tsoncho" target="_blank" rel="noreferrer">
                  GitHub <span aria-hidden="true">→</span>
                </a>
              </li>
            </ul>
            <p className="contact-mail">terziiskitsoncho@gmail.com</p>
          </div>
        </section>
      </main>

      <footer className="page-foot">
        <p>tsoncho.com</p>
      </footer>
    </div>
  );
}
