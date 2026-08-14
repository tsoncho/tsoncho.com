import { Reveal } from "@/components/reveal";
import { whatIDo } from "@/content/site";

export const WhatIDo = () => (
  <section className="section">
    <div className="shell-wide text-center">
      <Reveal>
        <p className="display text-2xl font-normal italic leading-snug md:text-3xl">{whatIDo.lead}</p>
      </Reveal>

      <div className="mt-14 space-y-10 md:mt-16 md:space-y-12">
        {whatIDo.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06}>
            <div className="mx-auto max-w-md">
              <p className="quiet">{item.title}</p>
              <p className="voice mt-3 text-lg leading-relaxed text-paper-dim md:text-xl">
                {item.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
