import type { Metadata } from "next";
import { Projects } from "@/components/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects — coming soon.",
};

export default function ProjectsPage() {
  return <Projects />;
}
