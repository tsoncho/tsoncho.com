import { z } from "zod";

// Add a future project by appending one object to `projectList`.

const themeSchema = z.object({
  background: z.string(),
  foreground: z.string(),
  accent: z.string(),
  accentSoft: z.string(),
  muted: z.string(),
  surface: z.string(),
  hairline: z.string(),
});

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  pitch: z.string(),
  year: z.string(),
  url: z.string().url(),
  urlHost: z.string(),
  theme: themeSchema,
  featured: z.boolean(),
  order: z.number(),
});

export type Project = z.infer<typeof projectSchema>;

const projectList = [
  {
    slug: "label",
    title: "LABEL",
    pitch: "A social experiment that turns your behavior into a label.",
    year: "2026",
    url: "https://getlabel.xyz",
    urlHost: "getlabel.xyz",
    theme: {
      background: "#050505",
      foreground: "#f5f5f5",
      accent: "#c8ff00",
      accentSoft: "rgba(200, 255, 0, 0.08)",
      muted: "#8a8a8a",
      surface: "#0f0f0f",
      hairline: "rgba(255, 255, 255, 0.08)",
    },
    featured: true,
    order: 1,
  },
  {
    slug: "myforexbg",
    title: "MYFOREXBG",
    pitch: "A Bulgarian platform for XAUUSD trading education and community.",
    year: "2025",
    url: "https://myforexbg.com",
    urlHost: "myforexbg.com",
    theme: {
      background: "#05070d",
      foreground: "#f8fafc",
      accent: "#47b5ff",
      accentSoft: "rgba(71, 181, 255, 0.08)",
      muted: "#94a3b8",
      surface: "#111827",
      hairline: "rgba(148, 163, 184, 0.12)",
    },
    featured: true,
    order: 2,
  },
] satisfies z.input<typeof projectSchema>[];

export const projects: Project[] = z.array(projectSchema).parse(projectList);
