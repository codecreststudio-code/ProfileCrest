import type { Metadata } from "next";
import GeneratePage from "./page-client";

export const metadata: Metadata = {
  title: "Create Your GitHub README | ProfileCrest",
  description:
    "Design and customize your GitHub developer profile layout, choose visual theme presets, select technology stacks, add donation cards, and live-preview your portfolio README instantly. 100% free by CodeCrest Studio!",
  alternates: {
    canonical: "https://profile-crest.vercel.app/generate",
  },
};

export default function Page() {
  return <GeneratePage />;
}
