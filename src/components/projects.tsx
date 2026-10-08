"use client";

import { SiteChrome } from "@/components/site-chrome";

export function Projects() {
  return (
    <SiteChrome>
      <main className="deck">
        <section
          className="panel projects-soon"
          aria-labelledby="projects-title"
        >
          <div className="frame projects-frame">
            <h1 id="projects-title" className="type-xl projects-title">
              Soon
            </h1>
          </div>
          <p className="page-foot">Tsoncho © 2026</p>
        </section>
      </main>
    </SiteChrome>
  );
}
