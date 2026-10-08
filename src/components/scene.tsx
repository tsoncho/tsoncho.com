export function Scene() {
  return (
    <>
      <div className="scene" aria-hidden="true">
        <div className="shift">
          <div className="env-void" />
          <div className="env-depth" />
          <div className="env-beam" />
          <div className="env-rim" />
          <div className="env-point" />
          <div className="env-haze" />
        </div>
        <div className="vignette" />
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="progress" aria-hidden="true" />
    </>
  );
}
