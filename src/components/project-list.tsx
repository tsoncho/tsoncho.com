import type { Project } from "@/content/projects";

interface ProjectListProps {
  projects: Project[];
}

const formatIndex = (index: number) =>
  String(index + 1).padStart(2, "0");

export const ProjectList = ({ projects }: ProjectListProps) => (
  <ul className="project-list">
    {projects.map((project, index) => (
      <li key={project.url}>
        <a
          href={project.url}
          className="project-row"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="project-index">{formatIndex(index)}</span>

          <div className="project-body">
            <span className="project-title">{project.title}</span>
            <span className="project-pitch">{project.pitch}</span>
          </div>

          <span className="project-meta">
            <span className="project-year">{project.year}</span>
            <span className="project-arrow" aria-hidden="true">
              →
            </span>
          </span>
        </a>
      </li>
    ))}
  </ul>
);
