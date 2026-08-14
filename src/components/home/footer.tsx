import { site } from "@/content/site";

export const Footer = () => (
  <footer className="relative z-10 pb-14 pt-4">
    <div className="shell text-center text-sm text-paper-dim">
      <p>{site.name}</p>
      <p className="mt-1">{site.domain}</p>
    </div>
  </footer>
);
