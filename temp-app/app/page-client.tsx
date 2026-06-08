"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaInstagram, FaYoutube } from "react-icons/fa6";
import { LuGlobe, LuMail, LuZap, LuTrendingUp, LuCode, LuCoffee, LuTrophy, LuSmile, LuUsers } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import HeroSvg from "../components/HeroSvg";

const features = [
  {
    icon: <LuZap style={{ width: 22, height: 22, color: "var(--accent)" }} />,
    title: "Bespoke Bento Dashboards",
    desc: "Structure your engineering journey with beautifully aligned, high-fidelity grid layouts. Modular card sections showcase your focus, accomplishments, and tech stack in a balanced visual system.",
  },
  {
    icon: <LuGlobe style={{ width: 22, height: 22, color: "var(--accent)" }} />,
    title: "Unified Digital Footprint",
    desc: "Build professional credibility by seamlessly embedding verified, responsive badges linking to your LinkedIn, X, YouTube, Dev.to, and 15+ engineering communities.",
  },
  {
    icon: <LuTrendingUp style={{ width: 22, height: 22, color: "var(--accent)" }} />,
    title: "Live Engineering Metrics",
    desc: "Showcase your git velocity, active streaks, and language proficiency with sleek, real-time cards that auto-update dynamically to reflect your daily commits.",
  },
  {
    icon: <LuCode style={{ width: 22, height: 22, color: "var(--accent)" }} />,
    title: "Curated Tech Stack Badges",
    desc: "Select from 300+ customized modern technology shields. Highlight your software toolbox with cohesive, clean vector badges instead of cluttered markup.",
  },
  {
    icon: <LuUsers style={{ width: 22, height: 22, color: "var(--accent)" }} />,
    title: "Privacy-First Traffic Analytics",
    desc: "Understand your profile reach and engagement securely. Embed lightweight page-view counters that track traffic metrics without cookies or tracker scripts.",
  },
  {
    icon: <LuCoffee style={{ width: 22, height: 22, color: "var(--accent)" }} />,
    title: "Open-Source Support Gateways",
    desc: "Simplify developer sponsorship by integrating direct, call-to-action badges for leading donation platforms like Razorpay, Buy Me a Coffee, and Patreon.",
  },
  {
    icon: <LuSmile style={{ width: 22, height: 22, color: "var(--accent)" }} />,
    title: "Self-Updating Developer Widgets",
    desc: "Animate your bio with ProfileCrest's secure serverless quote cards and developer meme feeds that fetch fresh, engaging items on every single page load.",
  },
  {
    icon: <LuTrophy style={{ width: 22, height: 22, color: "var(--accent)" }} />,
    title: "Gamified Trophies & Badges",
    desc: "Unlock and display elegant, vector-rendered GitHub achievements, milestones, and consistency streaks that celebrate your contributions to open source.",
  },
];

const faq = [
  {
    q: "Are all profile details and fields mandatory?",
    a: "Not at all. Every block — including Bento grids, social icons, and stats widgets — is completely modular and optional. The only required field is your GitHub username. Configure and style your layout as you see fit!",
  },
  {
    q: "Do I need HTML or Markdown experience?",
    a: "No coding is required! ProfileCrest automates the entire compilation process, outputting clean, semantic, and standardized Markdown that you can copy and paste with a single click.",
  },
  {
    q: "How do I publish this README to my GitHub profile?",
    a: "Simply create a public repository on GitHub with a name matching your username exactly (e.g., 'octocat/octocat'), initialize it with a README.md file, and paste the generated markup directly into it. GitHub will render it automatically!",
  },
  {
    q: "Are there any licensing restrictions or usage fees?",
    a: "ProfileCrest is a 100% free, open-source portfolio suite created by CodeCrest Studio. There are no paywalls, locked premium features, or subscription fees — it is built to empower the global developer community.",
  },
  {
    q: "Can I update or change my portfolio details later?",
    a: "Absolutely! You can return to ProfileCrest at any time, adjust your tech stacks, add new projects, or switch layouts. The generator updates your markup instantly for easy redeployment.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/generate?u=${encodeURIComponent(username.trim())}`);
    }
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)" }}>
      {/* Gradient Banner */}
      <div className="gradient-banner" style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <a href="https://codecreststudio.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: "white", fontWeight: 500, fontSize: 14, letterSpacing: "0.03em" }}>
          ⭐ Created by CodeCrest Studio – Visit our Website!
        </a>
      </div>

      {/* Navbar */}
      <nav className="glass-nav" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
        {/* Left Side: Empty spacer to perfectly center the logo */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          {/* Spacer */}
        </div>

        {/* Center: Large Logo */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link 
            href="/" 
            style={{ display: "flex", alignItems: "center", textDecoration: "none", cursor: "pointer" }}
          >
            <Image 
              src="/Logo01.webp" 
              alt="ProfileCrest Logo" 
              width={180} 
              height={55} 
              style={{ height: 55, width: "auto", objectFit: "contain" }} 
              priority 
            />
          </Link>
        </div>

        {/* Right Side: Get Me a Coffee Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            href="/support"
            className="btn-coffee"
          >
            ☕<span className="nav-btn-text"> Get Me a Coffee</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-container" style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Text and Form Content */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <h1 className="hero-heading" style={{ fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 32 }}>
            Best Profile
            <br />
            <span className="gradient-text">Generator</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 18, marginBottom: 32, maxWidth: 480 }}>
            Create a premium, gorgeous GitHub Profile README with Bento grids, custom tech stacks, trophies, and dynamic synced memes & quotes, all for <strong style={{ color: "var(--accent)" }}>free</strong>!
          </p>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input
              type="text"
              id="github-username-hero-input"
              aria-label="GitHub Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your GitHub username…"
              className="form-input"
              style={{ maxWidth: 320, fontSize: 16 }}
            />
            <button
              type="submit"
              className="btn-generate"
            >
              Generate README →
            </button>
          </form>
          <p style={{ marginTop: 16, color: "var(--text-dim)", fontSize: 13 }}>
            No account required · Takes less than 60 seconds
          </p>
        </div>

        {/* Vector SVG Illustration Container (aligned to right on desktop, fully responsive, animated with Framer Motion) */}
        <div style={{
          flex: 1,
          minWidth: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0",
        }}>
          <HeroSvg />
        </div>
      </section>

      {/* Features */}
      <section id="features-section" style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ textAlign: "center", color: "var(--accent)", fontWeight: 600, letterSpacing: "0.1em", fontSize: 13, textTransform: "uppercase", marginBottom: 12 }}>Features</p>
        <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginBottom: 12 }}>We got everything that you need!</h2>
        <p style={{ textAlign: "center", color: "var(--text-muted)", maxWidth: 560, margin: "0 auto 48px", fontSize: 16 }}>
          Create your perfect GitHub Profile README in the best possible way. Lots of features and tools included, all for free!
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon-wrapper">
                {f.icon}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "60px 32px", display: "flex", justifyContent: "center" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(204,120,92,0.1), rgba(232,165,90,0.05))",
          border: "1px solid rgba(204,120,92,0.2)",
          borderRadius: 20,
          padding: "48px 60px",
          textAlign: "center",
          maxWidth: 640,
          width: "100%",
        }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Ready to stand out?</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 28, fontSize: 16 }}>
            Join thousands of developers who already use ProfileCrest to create stunning GitHub profiles.
          </p>
          <button
            onClick={() => router.push("/generate")}
            className="btn-generate-lg"
            type="button"
          >
            Create My README →
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq-section" style={{ padding: "80px 32px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 40, textAlign: "center" }}>Frequently Asked Questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faq.map((item, i) => (
            <div
              key={item.q}
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${openFaq === i ? "var(--border-accent)" : "var(--border)"}`,
                borderRadius: 10,
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="faq-trigger-btn"
              >
                {item.q}
                <span style={{ color: "var(--accent)", fontSize: 20, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 20px 18px", color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 32px 32px", background: "var(--bg-secondary)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          {/* Brand and Tagline */}
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image src="/Logo01.webp" alt="ProfileCrest Logo" width={110} height={34} style={{ height: 34, width: "auto", objectFit: "contain" }} />
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
              Premium GitHub Profile README Creator Suite by CodeCrest Studio
            </p>
          </div>

          {/* Social Links Panel */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
            <a href="https://codecreststudio.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <LuGlobe style={{ width: 16, height: 16 }} /> Website
            </a>
            <a href="https://www.instagram.com/codecrest__studio/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <FaInstagram style={{ width: 16, height: 16 }} /> Instagram
            </a>
            <a href="https://www.youtube.com/@CodeCrest_Studio" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <FaYoutube style={{ width: 16, height: 16 }} /> YouTube
            </a>
            <a href="mailto:codecreststudio@gmail.com" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <LuMail style={{ width: 16, height: 16 }} /> Email (Gmail)
            </a>
          </div>

          {/* Attribution and copyright */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, width: "100%", textAlign: "center" }}>
            <p style={{ color: "var(--text-dim)", fontSize: 13 }}>
              Created with 💜 by <a href="https://codecreststudio.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>CodeCrest Studio</a>. © 2026 ProfileCrest.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
