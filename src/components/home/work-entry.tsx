import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { work } from "@/content/site";

export const WorkEntry = ({ count }: { count: number }) => {
  const countLabel = String(count).padStart(2, "0");

  return (
    <section id="work" className="section scroll-mt-28">
      <Reveal>
        <div className="shell-wide text-center">
          <p className="quiet">{work.kicker}</p>
          <Link href="/work" data-cursor="open" className="group mt-8 block outline-none">
            <h2 className="display text-[clamp(2.6rem,10vw,5.75rem)] text-paper transition-opacity group-hover:opacity-70 group-focus-visible:opacity-70">
              {work.title}
            </h2>
            <p className="voice mx-auto mt-8 max-w-md text-lg text-paper-dim md:text-xl">
              {work.line}
            </p>
            <p className="quiet mt-10 text-paper/70 transition-colors group-hover:text-paper">
              {work.action}
              <span className="mx-3 text-paper/25" aria-hidden>
                ·
              </span>
              {countLabel}
            </p>
          </Link>
        </div>
      </Reveal>
    </section>
  );
};
