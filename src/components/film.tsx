"use client";

import { useEffect, useState } from "react";

const CUES: [number, string][] = [
  [200, "Tsoncho. Student. Software specialist. Entrepreneur."],
  [5600, "Junior Software Specialist. ATM and POS. Early career. Fast progression."],
  [11000, "Software. AI. Automation. Experiments. University. Fitness."],
  [19600, "Learn. Create. Automate. Improve."],
  [29600, "What's next?"],
  [33600, "Let's talk."],
];

const practice = ["Software", "AI", "Automation", "Experiments", "University", "Fitness"];

type FilmProps = {
  still: boolean;
  ended: boolean;
  onEnded: () => void;
  onSkip: () => void;
  onExplore: () => void;
};

export function Film({ still, ended, onEnded, onSkip, onExplore }: FilmProps) {
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
    const credits = window.setTimeout(() => setCreditsOn(true), 33300);
    const open = window.setTimeout(() => onEnded(), 34600);
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(credits);
      window.clearTimeout(open);
    };
  }, [still]);

  const className = ["reel", "is-playing", still ? "is-still" : "", ended ? "is-ended" : ""]
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

      <div className="marks" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <svg className="lattice" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
          <line x1="5" y1="14" x2="16" y2="24" />
          <line x1="16" y1="24" x2="11" y2="38" />
          <line x1="84" y1="12" x2="95" y2="24" />
          <line x1="84" y1="12" x2="90" y2="34" />
          <line x1="6" y1="82" x2="15" y2="68" />
          <line x1="86" y1="74" x2="95" y2="88" />
        </g>
      </svg>

      <div className="cam">
        <div className="shot intro">
          <p className="display name">Tsoncho</p>
          <p className="kicker">
            <span>Student.</span>
            <span>Software specialist.</span>
            <span>Entrepreneur.</span>
          </p>
        </div>

        <div className="shot career">
          <p className="display role-line">Junior Software Specialist</p>
          <p className="signal">ATM &amp; POS</p>
          <span className="rule" />
          <p className="note">Early career. Fast progression.</p>
        </div>

        <div className="shot practice">
          {practice.map((word, index) => (
            <p key={word} className={`display line l${index + 1}`}>
              {word}
            </p>
          ))}
        </div>

        <div className="shot momentum">
          <p className="display step s1">Learn</p>
          <p className="display step s2">Create</p>
          <p className="display step s3">Automate</p>
          <p className="display step s4">Improve</p>
        </div>

        <p className="display shot future">What&apos;s next?</p>

        <div className="credits" inert={creditsOn ? undefined : true}>
          <p className="display end-line">Let&apos;s talk.</p>
          <a className="mail" href="mailto:terziiskitsoncho@gmail.com">
            terziiskitsoncho@gmail.com
          </a>
          <button
            className="explore"
            type="button"
            onClick={onExplore}
            tabIndex={ended ? 0 : -1}
          >
            Enter portfolio
          </button>
        </div>
      </div>

      <button className="skip" type="button" onClick={onSkip}>
        Skip intro
      </button>
    </section>
  );
}
