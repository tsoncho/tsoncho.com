"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useExperience } from "@/components/experience-provider";
import { hero } from "@/content/site";
import { EASE, EASE_OUT, INTRO_MS, heroTiming } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface HeroLineProps {
  children: ReactNode;
  className?: string;
  delay: number;
  duration: number;
  skip: boolean;
  playing: boolean;
}

const HeroLine = ({ children, className, delay, duration, skip, playing }: HeroLineProps) => (
  <motion.div
    className={cn(playing && "will-change-[opacity,transform]", className)}
    initial={skip ? false : { opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={skip ? { duration: 0 } : { duration, delay, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);

export const Hero = () => {
  const { intro, completeIntro } = useExperience();
  const reduce = useReducedMotion();
  const playing = intro === "playing";
  const skip = intro === "done" || Boolean(reduce);
  const [firstName, lastName] = hero.name.split(" ");

  useEffect(() => {
    if (!playing) return undefined;
    const done = window.setTimeout(completeIntro, INTRO_MS);
    return () => window.clearTimeout(done);
  }, [playing, completeIntro]);

  useEffect(() => {
    if (!playing) return undefined;
    const handleSkip = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") {
        completeIntro();
      }
    };
    window.addEventListener("keydown", handleSkip);
    return () => window.removeEventListener("keydown", handleSkip);
  }, [playing, completeIntro]);

  return (
    <section className="relative z-10 flex min-h-[100svh] items-center justify-center overflow-x-clip px-6 py-16 md:py-24">
      <div className="mx-auto w-full max-w-3xl text-center">
        <h1 className="sr-only">
          {hero.greeting} {hero.intro} {hero.name}
        </h1>

        <HeroLine
          skip={skip}
          playing={playing}
          delay={heroTiming.greeting.delay}
          duration={heroTiming.greeting.duration}
          className="mb-5 md:mb-6"
        >
          <p className="voice text-lg tracking-[0.14em] text-paper-dim md:text-xl">
            {hero.greeting}
          </p>
        </HeroLine>

        <HeroLine
          skip={skip}
          playing={playing}
          delay={heroTiming.im.delay}
          duration={heroTiming.im.duration}
        >
          <p className="display text-[clamp(1.65rem,6.5vw,3rem)] italic text-paper/70">{hero.intro}</p>
        </HeroLine>

        <HeroLine
          skip={skip}
          playing={playing}
          delay={heroTiming.first.delay}
          duration={heroTiming.first.duration}
          className="mt-1 md:mt-2"
        >
          <p className="display whitespace-nowrap text-[clamp(3.4rem,18vw,6.75rem)] text-paper">{firstName}</p>
        </HeroLine>

        <HeroLine
          skip={skip}
          playing={playing}
          delay={heroTiming.last.delay}
          duration={heroTiming.last.duration}
        >
          <p className="display whitespace-nowrap text-[clamp(2.35rem,12vw,4.75rem)] italic text-paper/70">
            {lastName}
          </p>
        </HeroLine>

        <motion.div
          aria-hidden
          className="mx-auto mt-10 h-px w-24 origin-center bg-paper/20 md:mt-12 md:w-32"
          initial={skip ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={
            skip
              ? { duration: 0 }
              : {
                  duration: heroTiming.rule.duration,
                  delay: heroTiming.rule.delay,
                  ease: EASE,
                }
          }
        />

        <HeroLine
          skip={skip}
          playing={playing}
          delay={heroTiming.line.delay}
          duration={heroTiming.line.duration}
          className="mx-auto mt-10 max-w-xl md:mt-12"
        >
          <p className="voice text-base leading-relaxed text-paper-dim md:text-lg">
            {hero.line}
          </p>
        </HeroLine>
      </div>
    </section>
  );
};
