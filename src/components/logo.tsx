interface LogoProps {
  className?: string;
  title?: string;
  /** When true, hide from assistive tech (parent provides the label). */
  decorative?: boolean;
}

/** Inline PNG — paints with first HTML, no network/hydration flash. */
const MONOGRAM_SRC =
  "data:image/png;base64,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";

/**
 * Staggered serif TT monogram — brand mark for Tsoncho Terziyski.
 * Native <img> with inline source so the mark is present on first paint.
 */
export const Logo = ({
  className,
  title = "Tsoncho Terziyski",
  decorative = false,
}: LogoProps) => (
  // eslint-disable-next-line @next/next/no-img-element -- intentional: avoid Image optimizer/hydration flicker
  <img
    src={MONOGRAM_SRC}
    alt={decorative ? "" : title}
    width={120}
    height={126}
    className={className}
    decoding="sync"
    aria-hidden={decorative || undefined}
  />
);
