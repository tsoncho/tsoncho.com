interface LogoProps {
  className?: string;
  title?: string;
  /** When true, hide from assistive tech (parent provides the label). */
  decorative?: boolean;
}

/**
 * Staggered serif TT monogram — brand mark for Tsoncho Terziyski.
 * Native <img> (not next/image) so there is no hydration/image-optimizer swap.
 */
export const Logo = ({
  className,
  title = "Tsoncho Terziyski",
  decorative = false,
}: LogoProps) => (
  // eslint-disable-next-line @next/next/no-img-element -- intentional: avoid Image optimizer/hydration flicker
  <img
    src="/brand/tt-monogram.png"
    alt={decorative ? "" : title}
    width={512}
    height={512}
    className={className}
    decoding="async"
    fetchPriority="high"
    aria-hidden={decorative || undefined}
  />
);
