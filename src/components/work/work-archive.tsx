"use client";

import { useEffect, useId, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useExperience } from "@/components/experience-provider";
import { categoryLabel, type Category, type Project } from "@/content/projects";
import { work } from "@/content/site";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | Category;

interface ProjectCardProps {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
}

const padIndex = (value: number) => String(value).padStart(2, "0");

export const ProjectCard = ({ project, index, open, onToggle }: ProjectCardProps) => {
  const reduce = useReducedMotion();
  const { beginEnter } = useExperience();
  const panelId = useId();
  const number = padIndex(index + 1);

  const handleVisit = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    event.preventDefault();
    const node = event.currentTarget;
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
    <article
      id={project.slug}
      className="scroll-mt-24 border-b border-paper/10"
    >
      <h2 className="sr-only">{project.title}</h2>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        data-cursor="open"
        className="group flex w-full items-start gap-4 py-7 text-left md:gap-8 md:py-9"
      >
        <span className="quiet mt-2 shrink-0 tabular-nums">{number}</span>
        <span className="min-w-0 flex-1">
          <span className="display block text-[clamp(1.85rem,6.5vw,3.35rem)] leading-[0.95] text-paper">
            {project.title}
          </span>
          <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="quiet">{categoryLabel[project.category]}</span>
            <span className="text-paper/20" aria-hidden>
              ·
            </span>
            <span className="quiet">{project.year}</span>
          </span>
        </span>
        <span
          aria-hidden
          className="relative mt-3 h-4 w-4 shrink-0"
        >
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-paper/55" />
          <span
            className={cn(
              "absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-paper/55 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open && "scale-y-0",
            )}
          />
        </span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div id={panelId} className="pb-10 md:pb-12">
            <p className="voice max-w-xl text-lg leading-relaxed text-paper-dim md:text-xl">
              {project.pitch}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/80 md:text-lg">
              {project.description}
            </p>

            <div className="mt-8 max-w-xl border-t border-paper/10 pt-8">
              <p className="quiet">{work.contribution}</p>
              <p className="voice mt-3 text-lg text-paper">{project.role}</p>
              <p className="mt-3 text-base leading-relaxed text-paper-dim md:text-[1.05rem]">
                {project.contribution}
              </p>
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              onClick={handleVisit}
              className="mt-8 inline-flex items-center gap-3 text-paper transition-opacity hover:opacity-65"
            >
              <span className="voice text-lg">{work.visit}</span>
              <span className="quiet">{project.urlHost}</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

interface WorkArchiveProps {
  projects: Project[];
  categories: Array<{ id: CategoryFilter; label: string }>;
  openSlug?: string;
}

export const WorkArchive = ({ projects, categories, openSlug }: WorkArchiveProps) => {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [open, setOpen] = useState<string | null>(openSlug ?? null);

  useEffect(() => {
    if (!openSlug) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(openSlug)?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [openSlug, reduce]);

  const visible = filter === "all" ? projects : projects.filter((project) => project.category === filter);

  return (
    <div className="relative z-10">
      <div className="shell-wide">
        <div className="flex flex-wrap gap-x-5 gap-y-3 border-b border-paper/10 pb-6">
          {categories.map((category) => {
            const active = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setFilter(category.id);
                  setOpen(null);
                }}
                aria-pressed={active}
                className={cn(
                  "quiet transition-colors",
                  active ? "text-paper" : "text-muted hover:text-paper-dim",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="shell-wide">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.div
              key={project.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <ProjectCard
                project={project}
                index={index}
                open={open === project.slug}
                onToggle={() => setOpen((current) => (current === project.slug ? null : project.slug))}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
