import Link from "next/link";
import { Logo } from "@/components/logo";
import { home, site } from "@/content/site";

const HomePage = () => (
  <main id="content" className="home-viewport">
    <Link
      href="/"
      className="site-logo reveal reveal-1"
      aria-label={`${site.name} — home`}
    >
      <Logo className="site-logo-mark" decorative priority />
    </Link>

    <div className="home-content">
      <div className="home-stack">
        <div className="home-hero">
          <h1 className="text-hero reveal reveal-2">{home.identity}</h1>
          <p className="text-statement reveal reveal-3">{home.statement}</p>
        </div>

        <p className="text-body home-contact reveal reveal-4">
          {home.contactLead} {home.contactAction}{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
          .
        </p>

        <p className="home-cta reveal reveal-5">
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
