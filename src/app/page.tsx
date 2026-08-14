import type { Metadata } from "next";
import { HomeExperience } from "@/components/home/home-experience";
import { site } from "@/content/site";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: site.url,
  },
};

export default function Home() {
  const projectCount = getProjects().length;
  return <HomeExperience projectCount={projectCount} />;
}
