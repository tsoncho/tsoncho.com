const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#interests", label: "Interests" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

type PortfolioProps = {
  onReplay: () => void;
};

export function Portfolio({ onReplay }: PortfolioProps) {
  return (
    <div className="site">
      <header className="site-nav">
        <a className="brand" href="#top">
          tsoncho.com
        </a>
        <nav aria-label="Portfolio">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section className="site-hero" aria-labelledby="top">
          <p className="eyebrow">Bulgaria</p>
          <h1 id="top" tabIndex={-1} className="display site-title">
            Tsoncho
          </h1>
          <p className="lede">Student, software specialist and entrepreneur.</p>
        </section>

        <section id="about" className="site-block">
          <h2 className="display">About</h2>
          <p>
            I am a Bulgarian student and a Junior Software Specialist. I am early
            in my career and progressing by looking for what can be improved.
          </p>
          <p>
            Outside of work, most of my time goes to university, technology,
            fitness, and learning.
          </p>
        </section>

        <section id="work" className="site-block">
          <h2 className="display">Work</h2>
          <p className="role">Junior Software Specialist — ATM &amp; POS</p>
          <p>
            I am early in my career. I look for what can be improved, then
            develop automations, internal tools, and practical software.
          </p>
        </section>

        <section id="interests" className="site-block">
          <h2 className="display">Interests</h2>
          <ul className="lines">
            <li>Software, AI, and automation</li>
            <li>University</li>
            <li>Fitness</li>
            <li>Business and entrepreneurship</li>
            <li>Learning</li>
          </ul>
        </section>

        <section id="projects" className="site-block">
          <h2 className="display">Future projects</h2>
          <p>
            Nothing is on display yet. This is where the work will go once it
            is ready to be shown.
          </p>
        </section>

        <section id="contact" className="site-block site-end">
          <h2 className="display">Contact</h2>
          <p>Let&apos;s talk.</p>
          <a className="mail" href="mailto:terziiskitsoncho@gmail.com">
            terziiskitsoncho@gmail.com
          </a>
        </section>
      </main>

      <footer className="site-foot">
        <button className="text-button" type="button" onClick={onReplay}>
          Play the film
        </button>
        <p>tsoncho.com</p>
      </footer>
    </div>
  );
}
