import type { Metadata } from "next";
import LandingPage from "./page-client";

export const metadata: Metadata = {
  title: "ProfileCrest – Premium GitHub Profile README Generator",
  description:
    "Design an exceptional, custom GitHub Profile README with interactive Bento grids, 300+ animated tech badges, dynamic real-time stats cards, and modern custom widgets. 100% free and SEO-optimized by CodeCrest Studio!",
  alternates: {
    canonical: "https://profile-crest.vercel.app",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://profile-crest.vercel.app/#website",
        "url": "https://profile-crest.vercel.app",
        "name": "ProfileCrest",
        "description": "Premium GitHub Profile README Generator",
        "publisher": {
          "@type": "Organization",
          "name": "CodeCrest Studio",
          "url": "https://codecreststudio.vercel.app",
          "logo": {
            "@type": "ImageObject",
            "url": "https://profile-crest.vercel.app/Logo01.webp",
          },
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://profile-crest.vercel.app/#software",
        "name": "ProfileCrest",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "description": "Design an exceptional, custom GitHub Profile README with interactive Bento grids, 300+ animated tech badges, dynamic real-time stats cards, and modern custom widgets. 100% free.",
        "publisher": {
          "@type": "Organization",
          "name": "CodeCrest Studio",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://profile-crest.vercel.app/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Are all profile details and fields mandatory?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not at all. Every block — including Bento grids, social icons, and stats widgets — is completely modular and optional. The only required field is your GitHub username. Configure and style your layout as you see fit!",
            },
          },
          {
            "@type": "Question",
            "name": "Do I need HTML or Markdown experience?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No coding is required! ProfileCrest automates the entire compilation process, outputting clean, semantic, and standardized Markdown that you can copy and paste with a single click.",
            },
          },
          {
            "@type": "Question",
            "name": "How do I publish this README to my GitHub profile?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply create a public repository on GitHub with a name matching your username exactly (e.g., 'octocat/octocat'), initialize it with a README.md file, and paste the generated markup directly into it. GitHub will render it automatically!",
            },
          },
          {
            "@type": "Question",
            "name": "Are there any licensing restrictions or usage fees?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ProfileCrest is a 100% free, open-source portfolio suite created by CodeCrest Studio. There are no paywalls, locked premium features, or subscription fees — it is built to empower the global developer community.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I update or change my portfolio details later?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! You can return to ProfileCrest at any time, adjust your tech stacks, add new projects, or switch layouts. The generator updates your markup instantly for easy redeployment.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </>
  );
}
