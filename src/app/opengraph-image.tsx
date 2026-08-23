import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OpenGraphImage = async () => {
  const mark = await readFile(
    join(process.cwd(), "public/brand/tt-monogram.png"),
  );
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
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
        <img
          src={markSrc}
          width={320}
          height={336}
          alt=""
          style={{ marginBottom: 56 }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 500,
            letterSpacing: "-0.032em",
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
};

export default OpenGraphImage;
