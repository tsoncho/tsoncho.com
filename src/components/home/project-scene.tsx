"use client";

import { useRef, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { Reveal } from "@/components/reveal";
import { useExperience } from "@/components/experience-provider";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

interface ProjectSceneProps {
  project: Project;
  showLabel?: boolean;
}

export const ProjectScene = ({ project, showLabel = false }: ProjectSceneProps) => {
  const reduce = useReducedMotion();
  const { beginEnter, enter } = useExperience();
  const rootRef = useRef<HTMLAnchorElement>(null);
  const opening = enter?.slug === project.slug;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const titleX = useTransform(pointerX, [-0.5, 0.5], [-5, 5]);
  const titleY = useTransform(pointerY, [-0.5, 0.5], [-3, 3]);
  const lightX = useTransform(pointerX, [-0.5, 0.5], ["42%", "58%"]);
  const lightY = useTransform(pointerY, [-0.5, 0.5], ["38%", "62%"]);
  const light = useMotionTemplate`radial-gradient(ellipse 420px 280px at ${lightX} ${lightY}, ${project.theme.accentSoft}, transparent 72%)`;

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const node = rootRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleOpen = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    event.preventDefault();
    const node = rootRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    beginEnter({
      slug: project.slug,
      rect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
    });
  };

  return (
    <section className="section px-0">
      <div className="shell-wide text-center">
        {showLabel ? (
          <Reveal>
            <p className="quiet mb-14">Selected work</p>
          </Reveal>
        ) : null}

        <motion.a
          ref={rootRef}
          href={project.url}
          data-cursor="open"
          aria-label={`Open ${project.title}`}
          onClick={handleOpen}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className={cn(
            "group relative mx-auto block w-full max-w-[36rem] @container outline-none",
            opening && "pointer-events-none opacity-0",
          )}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{ background: light }}
          />

          <Reveal>
            <p className="pitch mx-auto max-w-md px-1">{project.pitch}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <motion.h2
              className="display fit-display mt-6 text-paper"
              style={{
                ["--fit-chars" as string]: String(project.title.length),
                ...(reduce ? undefined : { x: titleX, y: titleY }),
              }}
            >
              {project.title}
            </motion.h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="quiet mt-5">
              {project.year} · {project.urlHost}
            </p>
          </Reveal>
        </motion.a>
      </div>
    </section>
  );
};
