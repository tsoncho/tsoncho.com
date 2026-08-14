import { HomeExperience } from "@/components/home/home-experience";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const projects = getFeaturedProjects();
  return <HomeExperience projects={projects} />;
}
