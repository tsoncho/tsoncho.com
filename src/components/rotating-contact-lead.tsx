"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./rotating-contact-lead.module.css";

const ROTATE_INTERVAL_MS = 2800;
const TRANSITION_MS = 950;

interface RotatingContactLeadProps {
  phrases: readonly string[];
}

export const RotatingContactLead = ({ phrases }: RotatingContactLeadProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const sizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phrases.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => {
        setPreviousIndex(current);
        return (current + 1) % phrases.length;
      });
    }, ROTATE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [phrases.length]);

  useEffect(() => {
    if (previousIndex === null) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPreviousIndex(null);
    }, TRANSITION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [previousIndex, activeIndex]);

  useLayoutEffect(() => {
    const node = sizerRef.current;
    if (!node) {
      return;
    }

    const measure = () => {
      setHeight(node.offsetHeight);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);

    return () => observer.disconnect();
  }, [activeIndex, phrases]);

  if (phrases.length === 0) {
    return null;
  }

  const isAnimating = previousIndex !== null;

  return (
    <div className={styles.root} aria-live="polite" aria-atomic="true">
      <div
        className={styles.viewport}
        style={height === null ? undefined : { height }}
      >
        <div ref={sizerRef} className={styles.sizer} aria-hidden="true">
          {phrases[activeIndex]}
        </div>

        {previousIndex !== null ? (
          <div className={`${styles.phrase} ${styles.exit}`} aria-hidden="true">
            {phrases[previousIndex]}
          </div>
        ) : null}

        <div
          className={`${styles.phrase} ${isAnimating ? styles.enter : styles.static}`}
        >
          {phrases[activeIndex]}
        </div>
      </div>
    </div>
  );
};
