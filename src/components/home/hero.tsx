"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useExperience } from "@/components/experience-provider";
import { hero } from "@/content/site";
import { EASE, EASE_FILM, INTRO_MS } from "@/lib/motion";

const MaskLine = ({
  children,
  delay = 0,
  playing,
  live,
  reduce,
  className,
}: {
  children: ReactNode;
  delay?: number;
  playing: boolean;
  live: boolean;
  reduce: boolean | null;
  className?: string;
}) => (
  <div className="overflow-hidden">
    <motion.div
      className={className}
      initial={reduce ? false : { y: "110%", opacity: 0, filter: "blur(6px)" }}
      animate={
        live
          ? { y: "0%", opacity: 1, filter: "blur(0px)" }
          : { y: "110%", opacity: 0, filter: "blur(6px)" }
      }
      transition={{
        duration: playing ? 1.35 : 0.7,
        delay: playing ? delay : 0,
        ease: EASE_FILM,
      }}
    >
      {children}
    </motion.div>
  </div>
);

export const Hero = () => {
  const { intro, completeIntro } = useExperience();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const playing = intro === "playing";
  const live = intro === "playing" || intro === "done";
  const ready = intro === "done";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const driftY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const driftOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.85]);

  useEffect(() => {
    if (!playing) return undefined;
    const done = window.setTimeout(completeIntro, INTRO_MS);
    return () => window.clearTimeout(done);
  }, [playing, completeIntro]);

  useEffect(() => {
    if (!playing) return undefined;
    const handleSkip = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab" || event.key === "Enter") {
        completeIntro();
      }
    };
    window.addEventListener("keydown", handleSkip);
    return () => window.removeEventListener("keydown", handleSkip);
  }, [playing, completeIntro]);

  const [firstName, lastName] = hero.name.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-[88dvh] items-center justify-center px-6 py-20 md:py-24"
    >
      <motion.div
        className="mx-auto max-w-3xl text-center"
        style={reduce ? undefined : { y: driftY, opacity: driftOpacity }}
      >
        <h1 className="sr-only">
          {hero.greeting} {hero.intro} {hero.name}
        </h1>

        <MaskLine playing={playing} live={live} reduce={reduce} delay={0.35} className="mb-5 md:mb-6">
          <p className="text-lg italic tracking-[0.12em] text-paper-dim md:text-xl">{hero.greeting}</p>
        </MaskLine>

        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 md:gap-x-4">
          <MaskLine playing={playing} live={live} reduce={reduce} delay={0.95}>
            <span className="display text-[clamp(1.8rem,5vw,3rem)] text-paper/70 italic">
              {hero.intro}
            </span>
          </MaskLine>

          <MaskLine playing={playing} live={live} reduce={reduce} delay={1.35}>
            <motion.span
              className="display text-[clamp(2.8rem,10vw,6.5rem)] text-paper"
              initial={reduce ? false : { letterSpacing: "0.18em" }}
              animate={live ? { letterSpacing: "-0.02em" } : { letterSpacing: "0.18em" }}
              transition={{
                duration: playing ? 1.8 : 0.7,
                delay: playing ? 1.35 : 0,
                ease: EASE_FILM,
              }}
            >
              {firstName}
            </motion.span>
          </MaskLine>

          <MaskLine playing={playing} live={live} reduce={reduce} delay={1.75}>
            <span className="display text-[clamp(2.2rem,7vw,4.8rem)] text-paper/65 italic">
              {lastName}
            </span>
          </MaskLine>
        </div>

        <motion.div
          aria-hidden
          className="mx-auto mt-10 h-px origin-center bg-paper/15 md:mt-12"
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          animate={live ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{
            duration: playing ? 1.2 : 0.6,
            delay: playing ? 2.15 : 0.1,
            ease: EASE_FILM,
          }}
        />

        <motion.div
          className="mx-auto mt-10 max-w-xl md:mt-12"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <p className="text-lg leading-relaxed text-paper-dim md:text-xl">{hero.line}</p>
        </motion.div>
      </motion.div>
    </section>
  );
};
