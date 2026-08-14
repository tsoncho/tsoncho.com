import type { Metadata } from "next";
import { WorkExperience } from "@/components/work/work-experience";
import { site, work } from "@/content/site";
import { getProject, getProjects, getUsedCategories } from "@/lib/projects";

interface WorkPageProps {
  searchParams: Promise<{ open?: string }>;
}

export const metadata: Metadata = {
  title: work.pageTitle,
  description: work.pageLine,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: `${work.pageTitle} — ${site.name}`,
    description: work.pageLine,
    url: `${site.url}/work`,
  },
};

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const { open } = await searchParams;
  const projects = getProjects();
  const requested = open ? getProject(open) : undefined;

  return (
    <WorkExperience
      projects={projects}
      categories={getUsedCategories()}
      openSlug={requested?.slug}
    />
  );
}
