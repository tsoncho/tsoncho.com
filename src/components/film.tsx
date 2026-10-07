"use client";

import { useEffect, useState, type CSSProperties } from "react";

const practice = ["Software", "AI", "Automation", "Experiments"] as const;
const verbs = ["Learn", "Create", "Automate", "Improve"] as const;

type SceneKey = "intro" | "career" | "practice" | "momentum" | "future" | "ending";
type Beat = "enter" | "hold" | "leave";

const SCENES: {
  key: SceneKey;
  cue: string;
  settleAt: number;
  final?: boolean;
}[] = [
  {
    key: "intro",
    cue: "Tsoncho. Student. Software specialist. Entrepreneur.",
    settleAt: 2050,
  },
  {
    key: "career",
    cue: "Junior Software Specialist. ATM and POS. Early in. Already moving.",
    settleAt: 1700,
  },
  {
    key: "practice",
    cue: "Software. AI. Automation. Experiments.",
    settleAt: 1900,
  },
  {
    key: "momentum",
    cue: "Learn. Create. Automate. Improve.",
    settleAt: 4200,
  },
  {
    key: "future",
    cue: "What's next?",
    settleAt: 1200,
  },
  {
    key: "ending",
    cue: "Let's talk.",
    settleAt: 2000,
    final: true,
  },
];

const LEAVE_MS = 900;

type FilmProps = {
  still: boolean;
  onExplore: () => void;
};

export function Film({ still, onExplore }: FilmProps) {
  const [index, setIndex] = useState(still ? SCENES.length - 1 : 0);
  const [beat, setBeat] = useState<Beat>(still ? "hold" : "enter");
  const [runId, setRunId] = useState(0);
  const [ready, setReady] = useState(still);
  const [ended, setEnded] = useState(still);

  const scene = SCENES[index];
  const cue = scene.cue;
  const isFinal = Boolean(scene.final);
  const showContinue = ready && !isFinal && beat === "hold";
  const progress = (index + (beat === "leave" ? 1 : ready || isFinal ? 1 : 0.55)) / SCENES.length;

  useEffect(() => {
    if (still) {
      setIndex(SCENES.length - 1);
      setBeat("hold");
      setReady(true);
      setEnded(true);
      return;
    }

    if (beat !== "enter") return;

    setReady(false);
    setEnded(false);

    const settle = window.setTimeout(() => {
      setBeat("hold");
      setReady(true);
      if (SCENES[index].final) setEnded(true);
    }, SCENES[index].settleAt);

    return () => window.clearTimeout(settle);
  }, [still, index, runId, beat]);

  useEffect(() => {
    if (!ended) return;
    document.querySelector<HTMLButtonElement>(".explore")?.focus();
  }, [ended, runId]);

  useEffect(() => {
    if (!showContinue) return;
    const node = document.querySelector<HTMLButtonElement>(".continue");
    node?.focus({ preventScroll: true });
  }, [showContinue, runId]);

  function goTo(next: number) {
    setReady(false);
    setEnded(false);
    setBeat("leave");
    window.setTimeout(() => {
      setIndex(next);
      setBeat("enter");
      setRunId((id) => id + 1);
    }, LEAVE_MS);
  }

  function onContinue() {
    if (!showContinue || index >= SCENES.length - 1) return;
    goTo(index + 1);
  }

  function onSkip() {
    if (isFinal && beat !== "leave") return;
    goTo(SCENES.length - 1);
  }

  useEffect(() => {
    if (!showContinue) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Enter" && event.key !== " ") return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "A" || tag === "BUTTON" || tag === "INPUT" || tag === "TEXTAREA") return;
      event.preventDefault();
      if (index >= SCENES.length - 1) return;
      goTo(index + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showContinue, index]);

  const className = [
    "reel",
    "is-playing",
    still ? "is-still" : "",
    ended ? "is-ended" : "",
    ready ? "is-ready" : "",
    showContinue ? "is-continue" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={className}
      aria-label="Film"
      data-scene={scene.key}
      data-beat={beat}
      data-run={runId}
      style={{ "--film-progress": String(Math.min(1, Math.max(0, progress))) } as CSSProperties}
    >
      <div
        className="progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${Math.min(1, Math.max(0, progress))})` }}
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

      <div className="cam" key={`cam-${runId}-${scene.key}`}>
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
          <p className="note">Early in. Already moving.</p>
        </div>

        <div className="shot practice">
          {practice.map((word, i) => (
            <p key={word} className={`display line l${i + 1}`}>
              {word}
            </p>
          ))}
        </div>

        <div className="shot momentum">
          <div className="relay-stage" aria-hidden="true">
            {verbs.map((word, i) => (
              <p key={word} className={`display step s${i + 1}`}>
                {word}
              </p>
            ))}
          </div>
          <p className="display phrase">
            {verbs.map((word, i) => (
              <span key={word} className="phrase-part">
                {i > 0 ? <span className="phrase-arrow">→</span> : null}
                <span>{word}</span>
              </span>
            ))}
          </p>
        </div>

        <p className="display shot future">What&apos;s next?</p>

        <div className="credits" inert={ended || still ? undefined : true}>
          <p className="display end-line">Let&apos;s talk.</p>
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

      <button
        className="continue"
        type="button"
        onClick={onContinue}
        tabIndex={showContinue ? 0 : -1}
        aria-hidden={!showContinue}
        aria-label="Continue to next scene"
      >
        <span className="continue-rail" aria-hidden="true" />
        <span className="continue-row">
          <span className="continue-label">Continue</span>
          <span className="continue-mark" aria-hidden="true">
            <span className="continue-chevron" />
          </span>
        </span>
        <span className="continue-hint" aria-hidden="true">
          press enter
        </span>
      </button>

      <button
        className="skip"
        type="button"
        onClick={onSkip}
        tabIndex={isFinal ? -1 : 0}
        aria-hidden={isFinal}
      >
        Skip intro
      </button>
    </section>
  );
}
