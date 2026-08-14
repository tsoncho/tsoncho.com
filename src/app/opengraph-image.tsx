import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "#0b0b0c",
          color: "#ece7dc",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 88,
            letterSpacing: "0.04em",
            lineHeight: 0.9,
          }}
        >
          TSONCHO
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 12,
            fontSize: 42,
            letterSpacing: "0.06em",
            lineHeight: 0.9,
            fontStyle: "italic",
            opacity: 0.55,
          }}
        >
          TERZIYSKI
        </div>
      </div>
    ),
    size,
  );
}
