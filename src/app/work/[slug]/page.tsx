import { notFound, redirect } from "next/navigation";
import { getProject, getProjectSlugs } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () =>
  getProjectSlugs().map((slug) => ({ slug }));

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  redirect(project.url);
}
