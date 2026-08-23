import type { ReactNode } from "react";

const Template = ({ children }: { children: ReactNode }) => (
  <div className="page-enter">{children}</div>
);

export default Template;
