"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useExperience } from "@/components/experience-provider";
import { hero } from "@/content/site";
import { EASE, EASE_OUT, INTRO_MS, heroTiming } from "@/lib/motion";

export const Hero = () => {
  const { intro, completeIntro } = useExperience();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const playing = intro === "playing";
  const skip = intro === "done" || Boolean(reduce);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const driftY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const driftOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.88]);

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

  const reveal = (delay: number, duration: number) =>
    skip
      ? { initial: false as const, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: EASE_OUT },
        };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-[88dvh] items-center justify-center overflow-x-clip px-6 py-20 md:py-24"
    >
      <motion.div
        className="mx-auto w-full max-w-3xl text-center"
        style={skip ? undefined : { y: driftY, opacity: driftOpacity }}
      >
        <h1 className="sr-only">
          {hero.greeting} {hero.intro} {hero.name}
        </h1>

        <motion.p className="quiet mb-6 md:mb-8" {...reveal(heroTiming.greeting.delay, heroTiming.greeting.duration)}>
          {hero.greeting}
        </motion.p>

        <div className="overflow-hidden px-1">
          <motion.p
            className="display mx-auto max-w-full text-[clamp(2rem,8.5vw,5.25rem)] text-paper"
            initial={skip ? false : { opacity: 0, y: 22, letterSpacing: "0.06em" }}
            animate={skip ? { opacity: 1, y: 0, letterSpacing: "-0.04em" } : { opacity: 1, y: 0, letterSpacing: "-0.04em" }}
            transition={
              skip
                ? { duration: 0 }
                : {
                    opacity: { duration: heroTiming.name.duration, delay: heroTiming.name.delay, ease: EASE_OUT },
                    y: { duration: heroTiming.name.duration, delay: heroTiming.name.delay, ease: EASE_OUT },
                    letterSpacing: {
                      duration: heroTiming.name.duration + 0.15,
                      delay: heroTiming.name.delay,
                      ease: EASE,
                    },
                  }
            }
          >
            {hero.intro} {hero.name}
          </motion.p>
        </div>

        <motion.div
          aria-hidden
          className="mx-auto mt-10 h-px origin-center bg-paper/15 md:mt-12"
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

        <motion.div
          className="mx-auto mt-10 max-w-xl md:mt-12"
          {...reveal(heroTiming.line.delay, heroTiming.line.duration)}
        >
          <p className="text-base leading-relaxed text-paper-dim md:text-lg">{hero.line}</p>
        </motion.div>
      </motion.div>
    </section>
  );
};
