import { Contact } from "@/components/home/contact";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { ProjectScene } from "@/components/home/project-scene";
import { WhatIDo } from "@/components/home/what-i-do";
import type { Project } from "@/content/projects";

export const HomeExperience = ({ projects }: { projects: Project[] }) => (
  <main id="content" className="w-full overflow-x-clip">
    <Hero />
    <WhatIDo />
    <div id="work" className="scroll-mt-28">
      {projects.map((project, index) => (
        <ProjectScene key={project.slug} project={project} showLabel={index === 0} />
      ))}
    </div>
    <Contact />
    <Footer />
  </main>
);
