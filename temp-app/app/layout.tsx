import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://profilecrest.vercel.app"),
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
    canonical: "https://profilecrest.vercel.app",
  },
  icons: {
    icon: "/favicon.webp",
  },
  openGraph: {
    title: "ProfileCrest – Premium GitHub Profile README Generator",
    description: "Design an exceptional, custom GitHub Profile README with interactive Bento grids, 300+ animated tech badges, dynamic real-time stats cards, and modern custom widgets.",
    url: "https://profilecrest.vercel.app",
    siteName: "ProfileCrest",
    type: "website",
    images: [
      {
        url: "/Logo01.webp",
        width: 800,
        height: 800,
        alt: "ProfileCrest Brand Logo",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ProfileCrest – Premium GitHub Profile README Generator",
    description: "Design an exceptional, custom GitHub Profile README with interactive Bento grids, 300+ animated tech badges, dynamic real-time stats cards, and modern custom widgets.",
    images: ["/Logo01.webp"],
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1950207410287535"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
