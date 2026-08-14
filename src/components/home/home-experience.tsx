import { Contact } from "@/components/home/contact";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { WhatIDo } from "@/components/home/what-i-do";
import { WorkEntry } from "@/components/home/work-entry";

export const HomeExperience = ({ projectCount }: { projectCount: number }) => (
  <main id="content" className="w-full overflow-x-clip">
    <Hero />
    <WhatIDo />
    <WorkEntry count={projectCount} />
    <Contact />
    <Footer />
  </main>
);
