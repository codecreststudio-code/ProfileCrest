import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://profile-crest.vercel.app"),
  title: "ProfileCrest – Premium GitHub Profile README Generator",
  description:
    "Design an exceptional, custom GitHub Profile README with interactive Bento grids, 300+ animated tech badges, dynamic real-time stats cards, and modern custom widgets. 100% free and SEO-optimized by CodeCrest Studio!",
  keywords: [
    "GitHub Profile README Generator",
    "ProfileCrest",
    "Bento Grid Portfolio",
    "Developer README Creator",
    "GitHub Profile Customizer",
    "GitHub Stats Card",
    "Tech Badges Creator",
    "CodeCrest Studio",
    "GitHub Profile Bio",
    "Open Source Portfolio Builder"
  ].join(", "),
  authors: [{ name: "CodeCrest Studio", url: "https://codecreststudio.vercel.app" }],
  creator: "CodeCrest Studio",
  publisher: "CodeCrest Studio",
  robots: "index, follow",
  alternates: {
    canonical: "https://profile-crest.vercel.app",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ProfileCrest – Premium GitHub Profile README Generator",
    description: "Design an exceptional, custom GitHub Profile README with interactive Bento grids, 300+ animated tech badges, dynamic real-time stats cards, and modern custom widgets.",
    url: "https://profile-crest.vercel.app",
    siteName: "ProfileCrest",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ProfileCrest OpenGraph Banner",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ProfileCrest – Premium GitHub Profile README Generator",
    description: "Design an exceptional, custom GitHub Profile README with interactive Bento grids, 300+ animated tech badges, dynamic real-time stats cards, and modern custom widgets.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://img.shields.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://github-readme-stats.vercel.app" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://streak-stats.demolab.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://github-profile-trophy.vercel.app" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://github-readme-activity-graph.vercel.app" crossOrigin="anonymous" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1950207410287535"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} ${firaCode.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
