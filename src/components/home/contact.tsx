import { Reveal } from "@/components/reveal";
import { contact, site } from "@/content/site";

export const Contact = () => (
  <section id="contact" className="section scroll-mt-28">
    <Reveal>
      <div className="shell text-center">
        <p className="quiet">{contact.prompt}</p>
        <p className="display mt-6 text-[clamp(2rem,11vw,4.5rem)]">{contact.action}</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-10 inline-block text-lg text-paper transition-opacity hover:opacity-65 md:text-xl"
        >
          {site.email}
        </a>
      </div>
    </Reveal>
  </section>
);
