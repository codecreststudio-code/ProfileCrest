import type { Metadata } from "next";
import LandingPage from "./page-client";

export const metadata: Metadata = {
  title: "ProfileCrest – Premium GitHub Profile README Generator",
  description:
    "Design an exceptional, custom GitHub Profile README with interactive Bento grids, 300+ animated tech badges, dynamic real-time stats cards, and modern custom widgets. 100% free and SEO-optimized by CodeCrest Studio!",
  alternates: {
    canonical: "https://profilecrest.vercel.app",
  },
};

export default function Page() {
  return <LandingPage />;
}
