import {
  categoryOrder,
  projects,
  type Category,
  type Project,
} from "@/content/projects";

export const getProjects = (): Project[] =>
  [...projects].sort((a, b) => a.order - b.order);

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const getProjectSlugs = (): string[] =>
  projects.map((project) => project.slug);

export const getUsedCategories = (): Category[] => {
  const present = new Set(getProjects().map((project) => project.category));
  return categoryOrder.filter((category) => present.has(category));
};
