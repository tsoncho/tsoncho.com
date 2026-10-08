import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tsoncho.com"),
  title: {
    default: "Tsoncho",
    template: "%s — Tsoncho",
  },
  description:
    "Tsoncho — Bulgarian student, software specialist and entrepreneur. Early in. Already moving.",
  authors: [{ name: "Tsoncho", url: "https://tsoncho.com" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Tsoncho",
    description:
      "Bulgarian student, software specialist and entrepreneur. Early in. Already moving.",
    url: "https://tsoncho.com",
    siteName: "tsoncho.com",
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tsoncho",
    description:
      "Bulgarian student, software specialist and entrepreneur. Early in. Already moving.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d0f" },
  ],
  colorScheme: "dark light",
};

const themeInit = `(function(){try{var s=localStorage.getItem("theme");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
