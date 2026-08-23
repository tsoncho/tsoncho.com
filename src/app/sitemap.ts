import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const sitemap = (): MetadataRoute.Sitemap => [
  { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  {
    url: `${site.url}/projects`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

export default sitemap;
