"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useTheme } from "@/hooks/use-theme";

type SiteChromeProps = {
  children: ReactNode;
  rootRef?: React.RefObject<HTMLDivElement | null>;
  onHome?: () => void;
};

function ThemeIcon({ theme }: { theme: "light" | "dark" }) {
  if (theme === "dark") {
    return (
      <svg
        className="theme-icon"
        viewBox="0 0 24 24"
        width="15"
        height="15"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M5.6 18.4l1.1-1.1M17.3 6.7l1.1-1.1"
        />
      </svg>
    );
  }

  return (
    <svg
      className="theme-icon"
      viewBox="0 0 24 24"
      width="15"
      height="15"
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.2 13.6A7.8 7.8 0 0 1 10.4 3.8 7.4 7.4 0 1 0 20.2 13.6Z"
      />
    </svg>
  );
}

export function SiteChrome({ children, rootRef, onHome }: SiteChromeProps) {
  const pathname = usePathname() || "/";
  const { theme, toggleTheme } = useTheme();
  const deck = !pathname.startsWith("/projects");

  return (
    <div className="page" ref={rootRef}>
      <div className="atmosphere" aria-hidden="true">
        <div className="atm-plane atm-a" />
        <div className="atm-plane atm-b" />
        <div className="atm-glow" />
        <div className="atm-grain" />
      </div>

      <header className="topbar">
        <Link
          className="brand"
          href="/"
          scroll={false}
          onClick={(event) => {
            if (deck && onHome) {
              event.preventDefault();
              onHome();
            }
          }}
        >
          Tsoncho
        </Link>
        <div className="topbar-end">
          <nav aria-label="Page">
            <Link
              href="/projects"
              aria-current={pathname.startsWith("/projects") ? "page" : undefined}
            >
              Projects
            </Link>
          </nav>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <ThemeIcon theme={theme} />
          </button>
        </div>
      </header>

      {children}
    </div>
  );
}
