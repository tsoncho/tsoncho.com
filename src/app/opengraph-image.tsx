import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontFamily =
  "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

const getNameStyle = (name: string) => {
  const length = name.length;

  if (length > 24) {
    return { fontSize: 72, maxWidth: 920 };
  }

  if (length > 18) {
    return { fontSize: 84, maxWidth: 960 };
  }

  return { fontSize: 96, maxWidth: 1000 };
};

const OpenGraphImage = () => {
  const { fontSize, maxWidth } = getNameStyle(site.name);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafaf8",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth,
          }}
        >
          <div
            style={{
              fontSize,
              fontWeight: 600,
              letterSpacing: "-0.038em",
              lineHeight: 1.08,
              color: "#1d1d1f",
              fontFamily,
            }}
          >
            {site.name}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
};

export default OpenGraphImage;
