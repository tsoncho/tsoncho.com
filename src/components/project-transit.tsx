"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useExperience } from "@/components/experience-provider";
import { getProject } from "@/lib/projects";
import { EASE_FILM, ENTER_MS } from "@/lib/motion";

export const ProjectTransit = () => {
  const { enter, clearEnter } = useExperience();
  const reduce = useReducedMotion();
  const project = enter ? getProject(enter.slug) : undefined;

  useEffect(() => {
    if (!enter || !project || reduce) return undefined;
    const open = window.setTimeout(() => {
      window.location.assign(project.url);
    }, ENTER_MS);
    return () => window.clearTimeout(open);
  }, [enter, project, reduce]);

  useEffect(() => {
    if (!enter) return undefined;
    const failSafe = window.setTimeout(clearEnter, ENTER_MS + 800);
    return () => window.clearTimeout(failSafe);
  }, [enter, clearEnter]);

  return (
    <AnimatePresence>
      {enter && project && !reduce ? (
        <motion.div
          key={enter.slug}
          className="pointer-events-none fixed inset-0 z-[80]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_FILM }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.85, ease: EASE_FILM }}
            style={{ background: project.theme.background }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            initial={{
              top: enter.rect.top,
              left: enter.rect.left,
              width: enter.rect.width,
              height: enter.rect.height,
            }}
            animate={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
            transition={{ duration: ENTER_MS / 1000, ease: EASE_FILM }}
          >
            <motion.h2
              className="display px-8 text-center text-[clamp(3rem,14vw,9rem)]"
              initial={{ scale: 0.94, opacity: 0.75, letterSpacing: "0.02em" }}
              animate={{ scale: 1, opacity: 1, letterSpacing: "-0.03em" }}
              transition={{ duration: ENTER_MS / 1000, ease: EASE_FILM }}
              style={{ color: project.theme.foreground }}
            >
              {project.title}
            </motion.h2>
          </motion.div>

          <span className="sr-only">Opening {project.title}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
