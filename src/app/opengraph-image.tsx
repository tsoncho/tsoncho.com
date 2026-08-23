import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const loadGoogleFont = async (weight: number) => {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`,
      { cache: "force-cache" },
    )
  ).text();

  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);

  if (!match?.[1]) {
    throw new Error("Failed to load Inter font");
  }

  return fetch(match[1]).then((response) => response.arrayBuffer());
};

const getNameStyle = (name: string) => {
  const length = name.length;

  if (length > 24) {
    return { fontSize: 80, maxWidth: 920 };
  }

  if (length > 18) {
    return { fontSize: 92, maxWidth: 960 };
  }

  return { fontSize: 108, maxWidth: 1000 };
};

const OpenGraphImage = async () => {
  const { fontSize, maxWidth } = getNameStyle(site.name);
  const interBlack = await loadGoogleFont(900);

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
              fontWeight: 900,
              letterSpacing: "-0.042em",
              lineHeight: 1.06,
              color: "#1d1d1f",
              fontFamily: "Inter",
            }}
          >
            {site.name}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interBlack,
          weight: 900,
          style: "normal",
        },
      ],
    },
  );
};

export default OpenGraphImage;
