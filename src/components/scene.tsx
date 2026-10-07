export function Scene() {
  return (
    <>
      <div className="scene" aria-hidden="true">
        <div className="shift">
          <div className="plane plane-accent" />
          <div className="plane plane-soft" />
          <div className="plane plane-pulse" />
          <div className="wash" />
        </div>
        <div className="vignette" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
