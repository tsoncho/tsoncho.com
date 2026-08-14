import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Suspense } from "react";
import { CustomCursor } from "@/components/custom-cursor";
import { ExperienceProvider } from "@/components/experience-provider";
import { ProjectTransit } from "@/components/project-transit";
import { site } from "@/content/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.domainDisplay,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: ["Tsoncho Terziyski", "tsoncho.com", "LABEL", "MyForexBG"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.domainDisplay,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.github],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} h-full antialiased`}>
      <body className="relative min-h-full bg-ink text-paper">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Suspense fallback={null}>
          <ExperienceProvider>
            <CustomCursor />
            <ProjectTransit />
            {children}
          </ExperienceProvider>
        </Suspense>
      </body>
    </html>
  );
}
