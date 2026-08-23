import Image from "next/image";

interface LogoProps {
  className?: string;
  title?: string;
  /** When true, hide from assistive tech (parent provides the label). */
  decorative?: boolean;
  priority?: boolean;
}

/** Staggered serif TT monogram — brand mark for Tsoncho Terziyski. */
export const Logo = ({
  className,
  title = "Tsoncho Terziyski",
  decorative = false,
  priority = false,
}: LogoProps) => (
  <Image
    src="/brand/tt-monogram.png"
    alt={decorative ? "" : title}
    width={120}
    height={126}
    className={className}
    priority={priority}
    aria-hidden={decorative || undefined}
  />
);
