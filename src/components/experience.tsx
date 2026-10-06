"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { Film } from "@/components/film";
import { Portfolio } from "@/components/portfolio";
import { PointerField } from "@/components/pointer-field";
import { Scene } from "@/components/scene";

type Phase = "film" | "site";

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Experience() {
  const [phase, setPhase] = useState<Phase>("film");
  const [still, setStill] = useState(false);
  const [ended, setEnded] = useState(false);
  const [playId, setPlayId] = useState(0);

  useLayoutEffect(() => {
    document.documentElement.dataset.phase = phase;
    window.scrollTo(0, 0);
    if (phase === "site") {
      document.getElementById("top")?.focus();
      return;
    }
    if (prefersReduced()) {
      setStill(true);
      setEnded(true);
    }
  }, [phase]);

  useEffect(() => {
    if (!ended || phase !== "film") return;
    document.querySelector<HTMLButtonElement>(".explore")?.focus();
  }, [ended, phase, playId]);

  function replay() {
    setPlayId((id) => id + 1);
    setEnded(false);
    setStill(false);
    setPhase("film");
    if (prefersReduced()) {
      setStill(true);
      setEnded(true);
    }
  }

  if (phase === "site") {
    return <Portfolio onReplay={replay} />;
  }

  return (
    <>
      <PointerField />
      <Scene key={`scene-${playId}`} />
      <Film
        key={`film-${playId}`}
        still={still}
        ended={ended}
        onEnded={() => setEnded(true)}
        onSkip={() => setPhase("site")}
        onExplore={() => setPhase("site")}
      />
    </>
  );
}
