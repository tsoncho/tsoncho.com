import Link from "next/link";
import { Footer } from "@/components/home/footer";
import { Reveal } from "@/components/reveal";
import { WorkArchive } from "@/components/work/work-archive";
import { categoryLabel, type Category, type Project } from "@/content/projects";
import { site, work } from "@/content/site";

interface WorkExperienceProps {
  projects: Project[];
  categories: Category[];
  openSlug?: string;
}

export const WorkExperience = ({ projects, categories, openSlug }: WorkExperienceProps) => {
  const filters = [
    { id: "all" as const, label: work.all },
    ...categories.map((category) => ({ id: category, label: categoryLabel[category] })),
  ];

  return (
    <main id="content" className="relative z-10 w-full overflow-x-clip">
      <header className="px-6 pt-8 md:pt-10">
        <div className="shell-wide flex items-center justify-between">
          <Link href="/" className="quiet transition-colors hover:text-paper">
            {work.back}
          </Link>
          <p className="quiet">{site.shortName}</p>
        </div>
      </header>

      <section className="relative z-10 pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="shell-wide text-center">
          <Reveal>
            <p className="quiet">{work.pageKicker}</p>
            <h1 className="display mt-6 text-[clamp(2.6rem,10vw,5.5rem)]">{work.pageTitle}</h1>
            <p className="voice mx-auto mt-8 max-w-md text-lg text-paper-dim md:text-xl">
              {work.pageLine}
            </p>
          </Reveal>
        </div>
      </section>

      <WorkArchive
        key={openSlug ?? "work"}
        projects={projects}
        categories={filters}
        openSlug={openSlug}
      />

      <div className="pt-8">
        <Footer />
      </div>
    </main>
  );
};
