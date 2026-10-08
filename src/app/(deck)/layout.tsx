import type { ReactNode } from "react";
import { Landing } from "@/components/landing";

export default function DeckLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Landing />
      {children}
    </>
  );
}
