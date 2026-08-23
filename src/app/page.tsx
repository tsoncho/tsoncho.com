import Link from "next/link";
import { home, site } from "@/content/site";

const HomePage = () => (
  <main className="home-viewport">
    <div className="home-content">
      <div className="home-stack">
        <p className="text-eyebrow reveal reveal-1">{site.name}</p>

        <h1 className="text-hero reveal reveal-2">{home.hero}</h1>

        <p className="text-body home-contact reveal reveal-3">
          {home.contactLead} {home.contactAction}{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
          .
        </p>

        <p className="reveal reveal-4">
          <Link href="/projects" className="link-cta">
            {home.projectsLabel}
            <span className="link-cta-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </p>
      </div>
    </div>

    <footer className="home-meta reveal reveal-5">
      <span className="text-meta">{site.location}</span>
      <span className="text-meta">{site.year}</span>
    </footer>
  </main>
);

export default HomePage;
