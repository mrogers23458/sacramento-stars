import type { Metadata } from "next";
import { Anton, Geist } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { StickyCta } from "@/components/sticky-cta";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: {
    default: "Sacramento Stars · 10U–13U travel baseball",
    template: "%s · Sacramento Stars",
  },
  description:
    "Higher-level travel baseball for committed players, 10U through 13U, in North Natomas, Sacramento. Join the interest list.",
  openGraph: {
    title: "Sacramento Stars · 10U–13U travel baseball",
    description:
      "Higher-level travel baseball for committed players in North Natomas. Join the interest list.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${anton.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
