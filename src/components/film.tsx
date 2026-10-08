"use client";

import { useEffect, useState } from "react";

const CUES: [number, string][] = [
  [350, "Tsoncho. Student. Software specialist. Entrepreneur."],
  [5100, "Junior Software Specialist. ATM and POS."],
  [7800, "Early in. Already moving."],
  [10200, "Software. AI. Automation. Experiments."],
  [17000, "Learn. Create. Automate. Improve."],
  [22200, "What's next?"],
  [23600, "Let's talk."],
];

const domains = [
  ["software", "Software"],
  ["ai", "AI"],
  ["auto", "Automation"],
  ["exp", "Experiments"],
] as const;

const cycle = [
  ["learn", "Learn"],
  ["create", "Create"],
  ["automate", "Automate"],
  ["improve", "Improve"],
] as const;

type FilmProps = {
  still: boolean;
  ended: boolean;
  exiting?: boolean;
  onEnded: () => void;
  onSkip: () => void;
  onExplore: () => void;
};

export function Film({ still, ended, exiting, onEnded, onSkip, onExplore }: FilmProps) {
  const [cue, setCue] = useState(still ? "Let's talk." : "");
  const [creditsOn, setCreditsOn] = useState(still);

  useEffect(() => {
    if (still) {
      setCue("Let's talk.");
      setCreditsOn(true);
      return;
    }

    setCue("");
    setCreditsOn(false);
    const timers = CUES.map(([at, text]) => window.setTimeout(() => setCue(text), at));
    const credits = window.setTimeout(() => setCreditsOn(true), 23400);
    const open = window.setTimeout(() => onEnded(), 25000);
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(credits);
      window.clearTimeout(open);
    };
  }, [still]);

  const className = [
    "reel",
    "is-playing",
    still ? "is-still" : "",
    ended ? "is-ended" : "",
    exiting ? "is-exiting" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={className} aria-label="Film">
      <div
        className="clock"
        onAnimationEnd={(event) => {
          if (event.animationName === "tick") onEnded();
        }}
      />
      <p className="sr-only" aria-live="polite">
        {cue}
      </p>

      <div className="cam">
        <div className="beat name-beat" aria-hidden="true">
          <p className="glyph name-glyph">Tsoncho</p>
        </div>

        <div className="beat id-beat" aria-hidden="true">
          <p className="id-line">
            <span>Student.</span>
            <span>Software specialist.</span>
            <span>Entrepreneur.</span>
          </p>
        </div>

        <div className="beat career-beat" aria-hidden="true">
          <p className="glyph role-glyph">Junior Software Specialist</p>
          <p className="signal-glyph">ATM &amp; POS</p>
        </div>

        <div className="beat drive-beat" aria-hidden="true">
          <p className="drive-early">Early in.</p>
          <p className="drive-already">Already</p>
          <p className="drive-moving">Moving.</p>
        </div>

        <div className="beat domain-beat" aria-hidden="true">
          {domains.map(([key, label]) => (
            <p key={key} className={`glyph domain domain-${key}`}>
              {label}
            </p>
          ))}
        </div>

        <div className="beat cycle-beat" aria-hidden="true">
          {cycle.map(([key, label]) => (
            <p key={key} className={`glyph cycle cycle-${key}`}>
              {label}
            </p>
          ))}
        </div>

        <p className="glyph beat future-beat" aria-hidden="true">
          What&apos;s next?
        </p>

        <div className="beat end-beat" inert={creditsOn ? undefined : true}>
          <p className="glyph end-line">Let&apos;s talk.</p>
          <a className="mail" href="mailto:terziiskitsoncho@gmail.com">
            terziiskitsoncho@gmail.com
          </a>
          <button
            className="explore"
            type="button"
            onClick={onExplore}
            tabIndex={ended || still ? 0 : -1}
          >
            Enter portfolio →
          </button>
        </div>
      </div>

      <button className="skip" type="button" onClick={onSkip}>
        Skip intro
      </button>
    </section>
  );
}
