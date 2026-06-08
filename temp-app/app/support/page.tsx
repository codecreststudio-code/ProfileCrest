import type { Metadata } from "next";
import SupportPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Support CodeCrest Studio | Buy Us a Coffee ☕",
  description:
    "Support CodeCrest Studio's open-source developer tools like ProfileCrest. Buy us a coffee using Razorpay in USD, INR, EUR, or GBP to keep our platforms 100% free and active!",
  alternates: {
    canonical: "https://profile-crest.vercel.app/support",
  },
  openGraph: {
    title: "Support CodeCrest Studio | Buy Us a Coffee ☕",
    description: "Support CodeCrest Studio's open-source developer tools like ProfileCrest. Buy us a coffee using Razorpay in USD, INR, EUR, or GBP to keep our platforms 100% free!",
    url: "https://profile-crest.vercel.app/support",
    siteName: "ProfileCrest",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Support ProfileCrest",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Support CodeCrest Studio | Buy Us a Coffee ☕",
    description: "Support CodeCrest Studio's open-source developer tools like ProfileCrest. Buy us a coffee using Razorpay in USD, INR, EUR, or GBP to keep our platforms 100% free!",
    images: ["/og-image.png"],
  },
};

export default function SupportPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://profile-crest.vercel.app/support/#webpage",
        "url": "https://profile-crest.vercel.app/support",
        "name": "Support CodeCrest Studio",
        "description": "Support open-source developer tools like ProfileCrest by buying us a coffee."
      },
      {
        "@type": "DonateAction",
        "agent": {
          "@type": "Person",
          "name": "Developer"
        },
        "recipient": {
          "@type": "Organization",
          "name": "CodeCrest Studio",
          "url": "https://codecreststudio.vercel.app"
        },
        "price": "5.00",
        "priceCurrency": "USD"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SupportPageClient />
    </>
  );
}
