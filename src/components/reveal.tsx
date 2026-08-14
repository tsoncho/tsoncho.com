"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_FILM } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export const Reveal = ({ children, className, delay = 0, y = 24 }: RevealProps) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE_FILM }}
    >
      {children}
    </motion.div>
  );
};
