import type { ReactNode } from "react";
import { Landing } from "@/components/landing";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Landing />
      {children}
    </>
  );
}
