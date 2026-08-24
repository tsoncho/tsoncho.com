import Link from "next/link";
import { RotatingContactLead } from "@/components/rotating-contact-lead";
import { home, site } from "@/content/site";

const HomePage = () => (
  <main id="content" className="home-viewport">
    <div className="home-content">
      <div className="home-stack">
        <div className="home-hero">
          <h1 className="text-hero reveal reveal-1">{home.identity}</h1>
          <p className="text-statement reveal reveal-2">{home.statement}</p>
        </div>

        <div className="text-body home-contact reveal reveal-3">
          <RotatingContactLead phrases={home.contactPhrases} />

          <p className="home-contact-email">
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
          </p>
        </div>

        <p className="home-cta reveal reveal-4">
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
      <time className="text-meta" dateTime={site.year}>
        {site.year}
      </time>
    </footer>
  </main>
);

export default HomePage;
