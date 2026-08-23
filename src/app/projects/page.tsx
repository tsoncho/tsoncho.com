import type { Metadata } from "next";
import Link from "next/link";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/content/projects";
import { projectsPage, site } from "@/content/site";

export const metadata: Metadata = {
  title: projectsPage.title,
  description: projectsPage.description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `${projectsPage.title} — ${site.name}`,
    description: projectsPage.description,
    url: `${site.url}/projects`,
  },
};

const ProjectsPage = () => (
  <main id="content" className="projects-page">
    <div className="shell-projects">
      <header className="projects-header">
        <p className="projects-back">
          <Link href="/" className="link-muted text-meta">
            ← {projectsPage.back}
          </Link>
        </p>

        <h1 className="projects-title">{projectsPage.title}</h1>
      </header>

      <ProjectList projects={projects} />
    </div>
  </main>
);

export default ProjectsPage;
