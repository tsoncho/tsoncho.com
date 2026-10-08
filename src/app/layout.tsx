import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  themeColor: "#0c0d0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
