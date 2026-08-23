import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OpenGraphImage = () =>
  new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafaf8",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 48,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            color: "#1d1d1f",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          {site.name}
        </div>
      </div>
    ),
    { ...size },
  );

export default OpenGraphImage;
