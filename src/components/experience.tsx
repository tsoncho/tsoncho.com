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
  const [playId, setPlayId] = useState(0);

  useLayoutEffect(() => {
    document.documentElement.dataset.phase = phase;
    window.scrollTo(0, 0);
    if (phase === "site") {
      window.getSelection()?.removeAllRanges();
      return;
    }
    if (prefersReduced()) setStill(true);
  }, [phase]);

  useEffect(() => {
    if (phase !== "film" || !still) return;
    document.querySelector<HTMLButtonElement>(".explore")?.focus();
  }, [phase, still, playId]);

  function replay() {
    setPlayId((id) => id + 1);
    setStill(false);
    setPhase("film");
    if (prefersReduced()) setStill(true);
  }

  if (phase === "site") {
    return <Portfolio onReplay={replay} />;
  }

  return (
    <>
      <PointerField />
      <Scene key={`scene-${playId}`} />
      <Film key={`film-${playId}`} still={still} onExplore={() => setPhase("site")} />
    </>
  );
}
