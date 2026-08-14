import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <main
      id="content"
      className="relative z-10 flex min-h-dvh items-center justify-center px-6"
    >
      <Link href="/" className="display text-[clamp(2rem,8vw,4rem)] text-paper/60">
        {site.shortName}
      </Link>
    </main>
  );
}
