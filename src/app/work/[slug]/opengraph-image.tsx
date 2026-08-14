import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { getProject, getProjectSlugs } from "@/lib/projects";

export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const generateStaticParams = () =>
  getProjectSlugs().map((slug) => ({ slug }));

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0b0b0c",
            color: "#ece7dc",
            fontSize: 64,
          }}
        >
          {site.name}
        </div>
      ),
      size,
    );
  }

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
          background: project.theme.background,
          color: project.theme.foreground,
          padding: 96,
        }}
      >
        <div
          style={{
            fontSize: project.title.length > 14 ? 52 : 96,
            letterSpacing: "-0.04em",
            lineHeight: 0.88,
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 28,
            fontStyle: "italic",
            opacity: 0.55,
            textAlign: "center",
            maxWidth: 720,
            lineHeight: 1.35,
          }}
        >
          {project.pitch}
        </div>
      </div>
    ),
    size,
  );
}
