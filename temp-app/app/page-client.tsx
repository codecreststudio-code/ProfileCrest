"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaInstagram, FaYoutube } from "react-icons/fa6";
import { LuGlobe, LuMail, LuZap, LuTrendingUp, LuCode, LuCoffee, LuTrophy, LuSmile, LuUsers } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import HeroSvg from "../components/HeroSvg";
import { useFormStore } from "@/store/formStore";
import { locales } from "@/data/locales";

export default function LandingPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { language, setLanguage } = useFormStore();
  const t = locales[language] || locales.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/generate?u=${encodeURIComponent(username.trim())}`);
    }
  };

  const features = [
    {
      icon: <LuZap style={{ width: 22, height: 22, color: "var(--accent)" }} />,
      title: t.features.list.bento.title,
      desc: t.features.list.bento.desc,
    },
    {
      icon: <LuGlobe style={{ width: 22, height: 22, color: "var(--accent)" }} />,
      title: t.features.list.footprint.title,
      desc: t.features.list.footprint.desc,
    },
    {
      icon: <LuTrendingUp style={{ width: 22, height: 22, color: "var(--accent)" }} />,
      title: t.features.list.metrics.title,
      desc: t.features.list.metrics.desc,
    },
    {
      icon: <LuCode style={{ width: 22, height: 22, color: "var(--accent)" }} />,
      title: t.features.list.tech.title,
      desc: t.features.list.tech.desc,
    },
    {
      icon: <LuUsers style={{ width: 22, height: 22, color: "var(--accent)" }} />,
      title: t.features.list.analytics.title,
      desc: t.features.list.analytics.desc,
    },
    {
      icon: <LuCoffee style={{ width: 22, height: 22, color: "var(--accent)" }} />,
      title: t.features.list.donation.title,
      desc: t.features.list.donation.desc,
    },
    {
      icon: <LuSmile style={{ width: 22, height: 22, color: "var(--accent)" }} />,
      title: t.features.list.widgets.title,
      desc: t.features.list.widgets.desc,
    },
    {
      icon: <LuTrophy style={{ width: 22, height: 22, color: "var(--accent)" }} />,
      title: t.features.list.trophies.title,
      desc: t.features.list.trophies.desc,
    },
  ];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)" }}>
      {/* Gradient Banner */}
      <div className="gradient-banner" style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <a href="https://codecreststudio.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: "white", fontWeight: 500, fontSize: 14, letterSpacing: "0.03em" }}>
          {t.navbar.banner}
        </a>
      </div>

      {/* Navbar */}
      <nav className="glass-nav" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
        {/* Left Side: Language Switcher */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <select
            id="nav-lang-select"
            aria-label="Language Selector"
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "es" | "hi")}
            className="form-select"
            style={{ width: "auto", padding: "6px 10px", fontSize: 13, height: "auto", cursor: "pointer", background: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <option value="en">English (EN)</option>
            <option value="es">Español (ES)</option>
            <option value="hi">हिन्दी (HI)</option>
          </select>
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
            ☕<span className="nav-btn-text">{t.navbar.coffeeBtn}</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-container" style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Text and Form Content */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <h1 className="hero-heading" style={{ fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 32 }}>
            {t.hero.titlePrefix}
            <br />
            <span className="gradient-text">{t.hero.titleSpan}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 18, marginBottom: 32, maxWidth: 480 }}>
            {t.hero.desc}
          </p>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input
              type="text"
              id="github-username-hero-input"
              aria-label="GitHub Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t.hero.placeholder}
              className="form-input"
              style={{ maxWidth: 320, fontSize: 16 }}
            />
            <button
              type="submit"
              className="btn-generate"
            >
              {t.hero.btn}
            </button>
          </form>
          <p style={{ marginTop: 16, color: "var(--text-dim)", fontSize: 13 }}>
            {t.hero.subtext}
          </p>
        </div>

        {/* Vector SVG Illustration Container */}
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
        <p style={{ textAlign: "center", color: "var(--accent)", fontWeight: 600, letterSpacing: "0.1em", fontSize: 13, textTransform: "uppercase", marginBottom: 12 }}>{t.features.tag}</p>
        <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginBottom: 12 }}>{t.features.title}</h2>
        <p style={{ textAlign: "center", color: "var(--text-muted)", maxWidth: 560, margin: "0 auto 48px", fontSize: 16 }}>
          {t.features.desc}
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
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>{t.cta.title}</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 28, fontSize: 16 }}>
            {t.cta.desc}
          </p>
          <button
            onClick={() => router.push("/generate")}
            className="btn-generate-lg"
            type="button"
          >
            {t.cta.btn}
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq-section" style={{ padding: "80px 32px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 40, textAlign: "center" }}>{t.faq.title}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {t.faq.questions.map((item, i) => (
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
              {t.footer.tagline}
            </p>
          </div>

          {/* Social Links Panel */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
            <a href="https://codecreststudio.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <LuGlobe style={{ width: 16, height: 16 }} /> {t.footer.links.website}
            </a>
            <a href="https://www.instagram.com/codecrest__studio/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <FaInstagram style={{ width: 16, height: 16 }} /> {t.footer.links.instagram}
            </a>
            <a href="https://www.youtube.com/@CodeCrest_Studio" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <FaYoutube style={{ width: 16, height: 16 }} /> {t.footer.links.youtube}
            </a>
            <a href="mailto:codecreststudio@gmail.com" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <LuMail style={{ width: 16, height: 16 }} /> {t.footer.links.email}
            </a>
          </div>

          {/* Attribution and copyright */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, width: "100%", textAlign: "center" }}>
            <p style={{ color: "var(--text-dim)", fontSize: 13 }}>
              {t.footer.attribution}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
