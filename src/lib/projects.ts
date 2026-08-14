import { projects, type Project } from "@/content/projects";

export const getProjects = (): Project[] =>
  [...projects].sort((a, b) => a.order - b.order);

export const getFeaturedProjects = (): Project[] =>
  getProjects().filter((project) => project.featured);

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const getProjectSlugs = (): string[] =>
  projects.map((project) => project.slug);
