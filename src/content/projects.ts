import { z } from "zod";

// Update `role` and `contribution` per project when credit is confirmed
// (founder, product, engineering, design, coaching, writing, etc).

export const categorySchema = z.enum([
  "product",
  "education",
  "commerce",
  "community",
  "brand",
]);

export type Category = z.infer<typeof categorySchema>;

export const categoryLabel: Record<Category, string> = {
  product: "Product",
  education: "Education",
  commerce: "Commerce",
  community: "Community",
  brand: "Brand",
};

export const categoryOrder: Category[] = [
  "product",
  "education",
  "commerce",
  "community",
  "brand",
];

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
  description: z.string(),
  contribution: z.string(),
  role: z.string(),
  year: z.string(),
  url: z.string().url(),
  urlHost: z.string(),
  category: categorySchema,
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
    description:
      "Nine scenes. One specific label. Instant entertainment. LABEL is a short, sharp social experiment — you answer, it names the pattern, and the result is meant to be shared.",
    role: "Build",
    contribution:
      "Designed and developed the live experience — from the idea to the site people use.",
    year: "2026",
    url: "https://getlabel.xyz",
    urlHost: "getlabel.xyz",
    category: "product",
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
    description:
      "MYFOREXBG is a Bulgarian trading education platform focused on XAUUSD — analysis, journal, risk, VIP structure, and a community built around discipline rather than noise.",
    role: "Build",
    contribution:
      "Designed and developed the live platform — structure, story, and the product people enter.",
    year: "2025",
    url: "https://myforexbg.com",
    urlHost: "myforexbg.com",
    category: "education",
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
  {
    slug: "orientalis",
    title: "Orientalis",
    pitch: "Luxury car air fresheners. Five scents. One box. Made in Bulgaria.",
    description:
      "Orientalis Premium is a Bulgarian commerce brand for the car — a 5×1 collection (Aventos, SWY, Tobakko, Nomad, Bakkarat) with a dense, long-wearing scent meant to travel with the drive.",
    role: "Build",
    contribution:
      "Designed and developed the storefront and the product story around the 5×1 collection.",
    year: "2026",
    url: "https://www.orientalisbg.com",
    urlHost: "orientalisbg.com",
    category: "commerce",
    theme: {
      background: "#120c08",
      foreground: "#f3e6d4",
      accent: "#d4a574",
      accentSoft: "rgba(212, 165, 116, 0.1)",
      muted: "#a89078",
      surface: "#1c1410",
      hairline: "rgba(243, 230, 212, 0.1)",
    },
    featured: true,
    order: 3,
  },
  {
    slug: "gymcademy",
    title: "Gymcademy",
    pitch: "Muscle and fat-loss programs. Stop guessing the plan.",
    description:
      "Gymcademy is a straight-to-the-point training and nutrition school — linear tracks for hypertrophy and fat loss, plus optional coaching. Technique, programming, and food in one place.",
    role: "Build",
    contribution:
      "Designed and developed the Gymcademy product experience — programs, story, and the path in.",
    year: "2026",
    url: "https://www.gymcademy.org",
    urlHost: "gymcademy.org",
    category: "education",
    theme: {
      background: "#0c0c0c",
      foreground: "#f4f1ea",
      accent: "#e8e2d6",
      accentSoft: "rgba(232, 226, 214, 0.08)",
      muted: "#9a958c",
      surface: "#161616",
      hairline: "rgba(244, 241, 234, 0.1)",
    },
    featured: true,
    order: 4,
  },
  {
    slug: "enough",
    title: "The Art of Having Enough",
    pitch: "A philosophy of money and life. One guide. Instant access.",
    description:
      "A digital guide on money as a tool, not a personality — mindset, methods, habits, and systems. Written to be used, not collected. One PDF, one price, no subscription.",
    role: "Build",
    contribution:
      "Shaped and shipped the guide and the site it lives on.",
    year: "2026",
    url: "https://www.theartofhavingenough.com",
    urlHost: "theartofhavingenough.com",
    category: "education",
    theme: {
      background: "#14110e",
      foreground: "#ece4d4",
      accent: "#c4b49a",
      accentSoft: "rgba(196, 180, 154, 0.1)",
      muted: "#9c917e",
      surface: "#1c1914",
      hairline: "rgba(236, 228, 212, 0.1)",
    },
    featured: true,
    order: 5,
  },
  {
    slug: "voryn",
    title: "VORYN",
    pitch: "Signal. Discipline. Quiet power.",
    description:
      "VORYN is a premium on-chain brand on Ethereum — a controlled, refined identity for people who move without noise. Token presence, official channels, and verification first.",
    role: "Build",
    contribution:
      "Designed and developed the brand site and the on-chain presentation.",
    year: "2026",
    url: "https://voryncoin.com",
    urlHost: "voryncoin.com",
    category: "brand",
    theme: {
      background: "#0a0a0b",
      foreground: "#ece7dc",
      accent: "#c9b896",
      accentSoft: "rgba(201, 184, 150, 0.1)",
      muted: "#8a857c",
      surface: "#121214",
      hairline: "rgba(236, 231, 220, 0.1)",
    },
    featured: true,
    order: 6,
  },
  {
    slug: "hashomer",
    title: "Hashomer",
    pitch: "A mobile app for Hashomer Hatzair — starting at Ken Sofia.",
    description:
      "A community-funded campaign to launch the app kens need: events, attendance, messaging, notifications, and roles for madrichim and hanichim. Built to grow beyond one city.",
    role: "Development",
    contribution:
      "Building the Hashomer Hatzair app and the campaign site. Credited as developer and madrich at Ken Sofia.",
    year: "2026",
    url: "https://landing-nu-virid.vercel.app",
    urlHost: "Hashomer App",
    category: "community",
    theme: {
      background: "#0d1210",
      foreground: "#e7eee8",
      accent: "#8fbf9a",
      accentSoft: "rgba(143, 191, 154, 0.1)",
      muted: "#8a9a8e",
      surface: "#141a17",
      hairline: "rgba(231, 238, 232, 0.1)",
    },
    featured: true,
    order: 7,
  },
] satisfies z.input<typeof projectSchema>[];

export const projects: Project[] = z.array(projectSchema).parse(projectList);
