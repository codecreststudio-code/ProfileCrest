import type { Metadata } from "next";
import GeneratePage from "./page-client";

export const metadata: Metadata = {
  title: "Create Your GitHub README | ProfileCrest",
  description:
    "Design and customize your GitHub developer profile layout, choose visual theme presets, select technology stacks, add donation cards, and live-preview your portfolio README instantly. 100% free by CodeCrest Studio!",
  alternates: {
    canonical: "https://profile-crest.vercel.app/generate",
  },
  openGraph: {
    title: "Create Your GitHub README | ProfileCrest",
    description: "Design and customize your GitHub developer profile README. Choose theme presets, select tech badges, add real-time stats cards, and preview instantly. 100% free.",
    url: "https://profile-crest.vercel.app/generate",
    siteName: "ProfileCrest",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ProfileCrest Developer README Generator",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your GitHub README | ProfileCrest",
    description: "Design and customize your GitHub developer profile README. Choose theme presets, select tech badges, add real-time stats cards, and preview instantly. 100% free.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Generate a GitHub Profile README",
    "description": "Learn how to build and customize a premium developer profile README for your GitHub portfolio using Bento grids, custom widgets, and real-time stats cards.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter GitHub Username",
        "text": "Provide your GitHub username to connect real-time contributions and stats widgets.",
        "url": "https://profile-crest.vercel.app/generate",
      },
      {
        "@type": "HowToStep",
        "name": "Add Social and Tech Badges",
        "text": "Fill in your active developer profiles and select your technology stack from 300+ Shields.io vector icons.",
        "url": "https://profile-crest.vercel.app/generate",
      },
      {
        "@type": "HowToStep",
        "name": "Customize Stats and Visual Themes",
        "text": "Choose custom themes, streaks, top languages, or contribution graph templates.",
        "url": "https://profile-crest.vercel.app/generate",
      },
      {
        "@type": "HowToStep",
        "name": "Copy or Download Markdown",
        "text": "Live preview the generated layout, copy the markdown, and paste it directly into your GitHub username repository's README.md.",
        "url": "https://profile-crest.vercel.app/generate",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GeneratePage />
    </>
  );
}
