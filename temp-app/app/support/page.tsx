import type { Metadata } from "next";
import SupportPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Support CodeCrest Studio | Buy Us a Coffee ☕",
  description:
    "Support CodeCrest Studio's open-source developer tools like ProfileCrest. Buy us a coffee using Razorpay in USD, INR, EUR, or GBP to keep our platforms 100% free and active!",
  alternates: {
    canonical: "https://profilecrest.vercel.app/support",
  },
};

export default function SupportPage() {
  return <SupportPageClient />;
}
