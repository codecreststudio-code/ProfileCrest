"use client";
import { useEffect, useState, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormStore, FormState, FormActions } from "@/store/formStore";
import { generateMarkdown } from "@/utils/markdownGenerator";
import { techStack, techCategories } from "@/data/techStack";
import { socialLinks, donationLinks, statsThemes, activityGraphThemes } from "@/data/links";
import { themePresets } from "@/data/presets";
import { locales } from "@/data/locales";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";

interface StepProps {
  store: FormState & FormActions;
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div style={{
        background: "var(--bg-primary)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--accent)",
        fontFamily: "sans-serif"
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <Image src="/Logo01.webp" alt="Loading Logo" width={52} height={52} style={{ height: 52, width: "auto", opacity: 0.8 }} className="float-animation" />
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.05em" }}>Loading ProfileCrest Generator…</div>
        </div>
      </div>
    }>
      <GeneratePageContent />
    </Suspense>
  );
}

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const store = useFormStore();
  const [step, setStep] = useState(1);
  const [previewMode, setPreviewMode] = useState<"rendered" | "raw">("rendered");
  const [copied, setCopied] = useState(false);

  const [origin, setOrigin] = useState("https://profile-crest.vercel.app");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentOrigin = window.location.origin;
      requestAnimationFrame(() => {
        setOrigin(currentOrigin);
      });
    }
  }, []);

  const setField = useFormStore((s) => s.setField);
  const storeUsername = useFormStore((s) => s.username);

  useEffect(() => {
    const u = searchParams.get("u");
    if (u && !storeUsername) {
      // Validate GitHub username structure to prevent reflected XSS via script elements
      const githubUsernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
      if (githubUsernameRegex.test(u)) {
        setField("username", u);
      } else {
        toast.error("Blocked invalid GitHub username from URL parameter.");
      }
    }
  }, [searchParams, storeUsername, setField]);

  const markdown = generateMarkdown(store, origin);
  const t = locales[store.language] || locales.en;

  const handleCopy = useCallback(async () => {
    try {
      const currentOrigin = typeof window !== "undefined" ? window.location.origin : "https://profile-crest.vercel.app";
      const snapshot = useFormStore.getState();
      const finalMarkdown = generateMarkdown(snapshot, currentOrigin);
      await navigator.clipboard.writeText(finalMarkdown);
      setCopied(true);
      toast.success("Copied to clipboard! 🎉");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy. Please select and copy manually.");
    }
  }, []);

  const handleDownload = useCallback(() => {
    const currentOrigin = typeof window !== "undefined" ? window.location.origin : "https://profile-crest.vercel.app";
    const snapshot = useFormStore.getState();
    const finalMarkdown = generateMarkdown(snapshot, currentOrigin);
    const blob = new Blob([finalMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded README.md!");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const localizedSteps = [
    { id: 1, label: store.language === "hi" ? "बुनियादी जानकारी" : store.language === "es" ? "Info Básica" : "Basic Info", icon: "👤" },
    { id: 2, label: store.language === "hi" ? "सोशल लिंक्स" : store.language === "es" ? "Redes Sociales" : "Socials", icon: "🌐" },
    { id: 3, label: store.language === "hi" ? "टेक स्टैक" : store.language === "es" ? "Tecnologías" : "Tech Stack", icon: "💻" },
    { id: 4, label: store.language === "hi" ? "गिटहब सांख्यिकी" : store.language === "es" ? "Estadísticas GitHub" : "GitHub Stats", icon: "📊" },
    { id: 5, label: store.language === "hi" ? "विज़िटर काउंटर" : store.language === "es" ? "Contador de Visitas" : "Visitor Counter", icon: "👁️" },
    { id: 6, label: store.language === "hi" ? "दान" : store.language === "es" ? "Donaciones" : "Donations", icon: "💰" },
    { id: 7, label: store.language === "hi" ? "मज़ा और पूर्वावलोकन" : store.language === "es" ? "Diversión y Vista Previa" : "Fun & Preview", icon: "🎉" },
  ];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Toaster position="top-right" toastOptions={{ style: { background: "#1c1c1f", color: "var(--accent)", border: "1px solid #27272a" } }} />

      {/* Top nav */}
      <nav className="generator-nav">
        <button type="button" onClick={() => router.push("/")} className="nav-logo-btn">
          <Image src="/Logo01.webp" alt="ProfileCrest Logo" width={124} height={38} style={{ height: 38, width: "auto", objectFit: "contain" }} priority />
        </button>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <select
            id="nav-lang-select"
            aria-label="Language Selector"
            value={store.language}
            onChange={(e) => store.setLanguage(e.target.value as "en" | "es" | "hi")}
            className="form-select"
            style={{ width: "auto", padding: "6px 10px", fontSize: 13, height: "auto", cursor: "pointer", background: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <option value="en">English (EN)</option>
            <option value="es">Español (ES)</option>
            <option value="hi">हिन्दी (HI)</option>
          </select>
          <Link
            href="/support"
            className="btn-coffee-sm"
          >
            ☕ {t.navbar.coffeeBtn}
          </Link>
          <button
            type="button"
            onClick={handleCopy}
            className={`btn-copy-markdown ${copied ? "copied" : ""}`}
          >
            {copied ? t.navbar.copied : `📋 ${t.navbar.copyBtn}`}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="btn-download-readme btn-glow"
          >
            ⬇ {t.navbar.downloadBtn}
          </button>
        </div>
      </nav>

      <div className="generator-container">
        {/* Left panel: Form */}
        <div className="form-panel">
          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 4 }}>
            {localizedSteps.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => setStep(s.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                >
                  <div className={`step-dot ${step === s.id ? "active" : step > s.id ? "completed" : ""}`}>
                    {step > s.id ? "✓" : s.id}
                  </div>
                  <span className="step-label" style={{ color: step === s.id ? "var(--accent)" : "var(--text-dim)" }}>{s.label}</span>
                </button>
                {i < localizedSteps.length - 1 && (
                  <div style={{ width: 32, height: 1, background: step > s.id ? "var(--accent-dark)" : "var(--border)", margin: "0 4px", flexShrink: 0 }} />
                )}
              </div>
            ))}
            <span style={{ marginLeft: 12, color: "var(--text-muted)", fontSize: 14, fontWeight: 500 }}>
              {localizedSteps[step - 1].icon} {localizedSteps[step - 1].label}
            </span>
          </div>

          {/* STEP 1: Basic Info */}
          {step === 1 && <BasicInfoStep store={store} />}

          {/* STEP 2: Social Links */}
          {step === 2 && <SocialsStep store={store} />}

          {/* STEP 3: Tech Stack */}
          {step === 3 && <TechStackStep store={store} />}

          {/* STEP 4: GitHub Stats & Custom Themes */}
          {step === 4 && <GitHubStatsStep store={store} />}

          {/* STEP 5: Visitor Counter */}
          {step === 5 && <VisitorCounterStep store={store} />}

          {/* STEP 6: Donations */}
          {step === 6 && <DonationsStep store={store} />}

          {/* STEP 7: Fun & Workflows */}
          {step === 7 && <WorkflowsStep store={store} />}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="generator-nav-prev-btn"
            >
              {t.generator.prevBtn}
            </button>
            <button
              type="button"
              onClick={() => step < 7 ? setStep((s) => s + 1) : handleCopy()}
              className="btn-glow"
              style={{ padding: "10px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}
            >
              {step < 7 ? t.generator.nextBtn : t.generator.copyReadmeBtn}
            </button>
          </div>
        </div>

        {/* Right panel: Preview */}
        <MarkdownPreviewPanel
          markdown={markdown}
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          handleCopy={handleCopy}
          handleDownload={handleDownload}
        />
      </div>
    </div>
  );
}

function MarkdownPreviewPanel({
  markdown,
  previewMode,
  setPreviewMode,
  handleCopy,
  handleDownload,
}: PreviewPanelProps) {
  const { language } = useFormStore();
  const t = locales[language] || locales.en;
  const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  return (
    <div className="preview-panel">
      {/* Preview toggle */}
      <div style={{
        padding: "12px 20px", borderBottom: "1px solid var(--border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "var(--bg-secondary)",
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>👁 {language === "hi" ? "लाइव पूर्वावलोकन" : language === "es" ? "Vista Previa en Vivo" : "Live Preview"}</span>
        <div style={{ display: "flex", gap: 6 }}>
          {(["rendered", "raw"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPreviewMode(m)}
              className={`preview-tab-btn ${previewMode === m ? "active" : ""}`}
            >
              {m === "rendered" 
                ? (language === "hi" ? "रेंडर किया गया" : language === "es" ? "Renderizado" : "Rendered")
                : (language === "hi" ? "कच्चा मार्कडाउन" : language === "es" ? "Markdown Puro" : "Raw Markdown")
              }
            </button>
          ))}
        </div>
      </div>

      {/* Preview content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }} suppressHydrationWarning>
        {isLocalhost && (
          <div style={{ background: "rgba(204, 120, 92, 0.08)", border: "1px solid rgba(204, 120, 92, 0.25)", padding: 14, borderRadius: 10, marginBottom: 16 }}>
            <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: 13, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              {t.generator.localhostWarningTitle}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: 12, lineHeight: 1.5 }}>
              {t.generator.localhostWarningDesc}
            </p>
          </div>
        )}
        {markdown ? (
          previewMode === "rendered" ? (
            <div className="markdown-preview-card">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ children }) => <h1 style={{ fontSize: 24, fontWeight: 700, borderBottom: "1px solid #30363d", paddingBottom: 8, marginBottom: 16, color: "#e6edf3" }}>{children}</h1>,
                  h2: ({ children }) => <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: "#e6edf3" }}>{children}</h2>,
                  h3: ({ children }) => <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, color: "#8b949e" }}>{children}</h3>,
                  p: ({ children }) => <p style={{ marginBottom: 12, color: "#e6edf3" }}>{children}</p>,
                  li: ({ children }) => <li style={{ marginBottom: 6, color: "#e6edf3" }}>{children}</li>,
                  a: ({ children, href }) => <a href={href} style={{ color: "#58a6ff" }} target="_blank" rel="noopener noreferrer">{children}</a>,
                  img: ({ src, alt }) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={String(src || "")}
                      alt={String(alt || "")}
                      style={{ maxWidth: "100%", height: "auto", borderRadius: 4, marginRight: 4, marginBottom: 4, display: "inline-block" }}
                    />
                  ),
                  td: (props) => {
                    const rest = { ...props } as Record<string, unknown>;
                    delete rest.node;
                    delete rest.vAlign;
                    return (
                      <td
                        style={{
                          ...(props.style as React.CSSProperties),
                          padding: "8px",
                          border: "1px solid #30363d",
                        }}
                        {...(rest as React.ComponentPropsWithoutRef<"td">)}
                      />
                    );
                  },
                  th: (props) => {
                    const rest = { ...props } as Record<string, unknown>;
                    delete rest.node;
                    delete rest.vAlign;
                    return (
                      <th
                        style={{
                          ...(props.style as React.CSSProperties),
                          padding: "8px",
                          border: "1px solid #30363d",
                          fontWeight: "bold",
                        }}
                        {...(rest as React.ComponentPropsWithoutRef<"th">)}
                      />
                    );
                  }
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          ) : (
            <pre className="markdown-preview" style={{
              background: "#0d1117",
              borderRadius: 12,
              padding: 24,
              border: "1px solid #30363d",
              overflow: "auto",
            }}>
              {markdown}
            </pre>
          )
        ) : (
          <div style={{ textAlign: "center", color: "var(--text-dim)", marginTop: 80 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>📝</div>
            <p style={{ fontSize: 16 }}>{t.generator.emptyPreview}</p>
          </div>
        )}
      </div>

      {/* Bottom copy bar */}
      <div style={{
        padding: "16px 24px", borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        display: "flex", gap: 10, justifyContent: "flex-end",
      }}>
        <button type="button" onClick={handleCopy} className="copy-markdown-btn-flat">
          📋 {language === "hi" ? "मार्कडाउन कॉपी करें" : language === "es" ? "Copiar Markdown" : "Copy Markdown"}
        </button>
        <button type="button" onClick={handleDownload} className="btn-glow" style={{
          padding: "10px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 600,
          border: "none", cursor: "pointer",
        }}>
          ⬇ {language === "hi" ? "README.md डाउनलोड करें" : language === "es" ? "Descargar README.md" : "Download README.md"}
        </button>
      </div>
    </div>
  );
}

function BasicInfoStep({ store }: StepProps) {
  const { language } = store;
  const [showcaseName, setShowcaseName] = useState("");
  const [showcaseDesc, setShowcaseDesc] = useState("");
  const [showcaseUrl, setShowcaseUrl] = useState("");
  const [showcaseTags, setShowcaseTags] = useState("");

  const labelTheme = language === "hi" ? "दृश्य थीम प्रीसेट" : language === "es" ? "Preajuste de Tema Visual" : "Visual Theme Preset";
  const labelUsername = language === "hi" ? "गिटहब यूजरनेम" : language === "es" ? "Usuario de GitHub" : "GitHub Username";
  const labelDisplayName = language === "hi" ? "प्रदर्शित नाम" : language === "es" ? "Nombre a Mostrar" : "Display Name";
  const labelSubtitle = language === "hi" ? "उपशीर्षक / टैगलाइन" : language === "es" ? "Subtítulo / Lema" : "Subtitle / Tagline";

  return (
    <div className="animate-fade-in-up">
      <div className="section-card">
        <p className="section-title">👤 {language === "hi" ? "बुनियादी जानकारी" : language === "es" ? "Información Básica" : "Basic Information"}</p>
        <div style={{ display: "grid", gap: 16 }}>
          <div>
            <label className="form-label" htmlFor="theme-preset-select">✨ {labelTheme}</label>
            <select
              id="theme-preset-select"
              className="form-select"
              value={store.themePreset}
              onChange={(e) => {
                store.setThemePreset(e.target.value);
                toast.success("Theme preset applied! All badges and cards updated. 🎨");
              }}
            >
              {themePresets.map((tp) => (
                <option key={tp.id} value={tp.id}>{tp.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="github-username-field">{labelUsername} *</label>
            <input id="github-username-field" className="form-input" placeholder="yourusername" value={store.username} onChange={(e) => store.setField("username", e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="display-name-field">{labelDisplayName}</label>
            <input id="display-name-field" className="form-input" placeholder="John Doe" value={store.name} onChange={(e) => store.setField("name", e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="subtitle-field">{labelSubtitle}</label>
            <input id="subtitle-field" className="form-input" placeholder="A passionate full-stack developer" value={store.subtitle} onChange={(e) => store.setField("subtitle", e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="currently-working-field">🔭 {language === "hi" ? "वर्तमान काम" : language === "es" ? "Trabajando en" : "Currently working on"}</label>
            <input id="currently-working-field" className="form-input" placeholder="My awesome project" value={store.currentlyWorkingOn} onChange={(e) => store.setField("currentlyWorkingOn", e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="currently-learning-field">🌱 {language === "hi" ? "वर्तमान सीख" : language === "es" ? "Aprendiendo" : "Currently learning"}</label>
            <input id="currently-learning-field" className="form-input" placeholder="Rust, WebAssembly" value={store.currentlyLearning} onChange={(e) => store.setField("currentlyLearning", e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="collaborate-on-field">👯 {language === "hi" ? "सहयोग करने के लिए" : language === "es" ? "Colaborar en" : "Looking to collaborate on"}</label>
            <input id="collaborate-on-field" className="form-input" placeholder="Open source projects" value={store.collaborateOn} onChange={(e) => store.setField("collaborateOn", e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="help-with-field">🤝 {language === "hi" ? "मदद की तलाश में" : language === "es" ? "Buscando ayuda con" : "Looking for help with"}</label>
            <input id="help-with-field" className="form-input" placeholder="Machine learning integration" value={store.helpWith} onChange={(e) => store.setField("helpWith", e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="ask-me-about-field">💬 {language === "hi" ? "मुझसे इसके बारे में पूछें" : language === "es" ? "Pregúntame sobre" : "Ask me about"}</label>
            <input id="ask-me-about-field" className="form-input" placeholder="React, Node.js" value={store.askMeAbout} onChange={(e) => store.setField("askMeAbout", e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="reach-me-at-field">📫 {language === "hi" ? "मुझ तक पहुँचें" : language === "es" ? "Contacto" : "Reach me at"}</label>
            <input id="reach-me-at-field" className="form-input" placeholder="your@email.com" value={store.reachMeAt} onChange={(e) => store.setField("reachMeAt", e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="portfolio-url-field">🌍 {language === "hi" ? "पोर्टफोलियो यूआरएल" : language === "es" ? "Sitio Web Portafolio" : "Portfolio URL"}</label>
            <input id="portfolio-url-field" className="form-input" placeholder="https://yourportfolio.dev" value={store.portfolioUrl} onChange={(e) => store.setField("portfolioUrl", e.target.value)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="form-label" htmlFor="pronouns-field">😄 {language === "hi" ? "सर्वनाम" : language === "es" ? "Pronombres" : "Pronouns"}</label>
              <input id="pronouns-field" className="form-input" placeholder="he/him" value={store.pronouns} onChange={(e) => store.setField("pronouns", e.target.value)} />
            </div>
            <div>
              <label className="form-label" htmlFor="fun-fact-field">⚡ {language === "hi" ? "मजेदार तथ्य" : language === "es" ? "Dato curioso" : "Fun fact"}</label>
              <input id="fun-fact-field" className="form-input" placeholder="I write code" value={store.funFact} onChange={(e) => store.setField("funFact", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="section-card" style={{ marginTop: 16 }}>
        <p className="section-title">📁 {language === "hi" ? "शोकेस प्रोजेक्ट्स" : language === "es" ? "Proyectos Destacados" : "Highlighted Showcase Projects"}</p>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
          Feature your best repositories or personal projects inside your README!
        </p>
        <div style={{ display: "grid", gap: 12 }}>
          <input
            className="form-input"
            placeholder="Project Name"
            id="showcase_name"
            aria-label="Project Name"
            value={showcaseName}
            onChange={(e) => setShowcaseName(e.target.value)}
          />
          <input
            className="form-input"
            placeholder="Project description…"
            id="showcase_desc"
            aria-label="Short description of the project"
            value={showcaseDesc}
            onChange={(e) => setShowcaseDesc(e.target.value)}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input
              className="form-input"
              placeholder="Project URL (https://…)"
              id="showcase_url"
              aria-label="Repository or Web URL"
              value={showcaseUrl}
              onChange={(e) => setShowcaseUrl(e.target.value)}
            />
            <input
              className="form-input"
              placeholder="Tech stack tags (React, Rust)"
              id="showcase_tags"
              aria-label="Tech stack tags"
              value={showcaseTags}
              onChange={(e) => setShowcaseTags(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              if (showcaseName.trim()) {
                store.addShowcaseProject(
                  showcaseName.trim(),
                  showcaseDesc.trim(),
                  showcaseUrl.trim(),
                  showcaseTags.trim()
                );
                setShowcaseName("");
                setShowcaseDesc("");
                setShowcaseUrl("");
                setShowcaseTags("");
                toast.success("Showcase project added! 🎉");
              } else {
                toast.error("Please enter a Project Name!");
              }
            }}
            className="btn-glow"
            style={{ padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", width: "fit-content" }}
          >
            + Add Project Card
          </button>
        </div>

        {store.showcaseProjects.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Your Showcase Projects:</p>
            <div style={{ display: "grid", gap: 8 }}>
              {store.showcaseProjects.map((p) => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px" }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "var(--accent)" }}>{p.name}</p>
                    {p.description && <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>{p.description}</p>}
                  </div>
                  <button type="button" onClick={() => store.removeShowcaseProject(p.id)} style={{ background: "none", border: "none", color: "red", fontSize: 18, cursor: "pointer" }}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SocialsStep({ store }: StepProps) {
  const { language } = store;
  const [customSocialName, setCustomSocialName] = useState("");
  const [customSocialUrl, setCustomSocialUrl] = useState("");
  const [customSocialColor, setCustomSocialColor] = useState("4A154B");

  return (
    <div className="animate-fade-in-up">
      <div className="section-card">
        <p className="section-title">🌐 {language === "hi" ? "सोशल नेटवर्क" : language === "es" ? "Redes Sociales" : "Social Links"}</p>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
          Only fill the platforms you use. Leave others blank.
        </p>
        <div style={{ display: "grid", gap: 14 }}>
          {socialLinks.map((s) => (
            <div key={s.id}>
              <label className="form-label" htmlFor={`social-${s.id}`}>{s.name}</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ color: "var(--text-dim)", fontSize: 13, flexShrink: 0, minWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {s.urlPrefix}
                </span>
                <input
                  id={`social-${s.id}`}
                  aria-label={s.name}
                  className="form-input"
                  placeholder={s.placeholder}
                  value={store.socials[s.id as keyof typeof store.socials] || ""}
                  onChange={(e) => store.setSocial(s.id as keyof typeof store.socials, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Custom Social Links Section */}
        <div style={{ marginTop: 24, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
          <p style={{ fontWeight: 600, fontSize: 14, color: "var(--accent)", marginBottom: 12 }}>➕ Add Custom Social Link</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <input
              id="custom-social-name-field"
              className="form-input"
              placeholder="Platform Name (e.g., Medium)"
              value={customSocialName}
              onChange={(e) => setCustomSocialName(e.target.value)}
              style={{ flex: 1, minWidth: 150 }}
              aria-label="Custom Platform Name"
            />
            <input
              id="custom-social-url-field"
              className="form-input"
              placeholder="Full URL (e.g., https://myblog.com)"
              value={customSocialUrl}
              onChange={(e) => setCustomSocialUrl(e.target.value)}
              style={{ flex: 2, minWidth: 200 }}
              aria-label="Custom Social Full URL"
            />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <label style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }} htmlFor="custom-social-color-field">HEX Color:</label>
              <input
                id="custom-social-color-field"
                className="form-input"
                placeholder="FF5733"
                value={customSocialColor}
                onChange={(e) => setCustomSocialColor(e.target.value)}
                style={{ width: 90 }}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (customSocialName.trim() && customSocialUrl.trim()) {
                  store.addCustomSocial(
                    customSocialName.trim(),
                    customSocialUrl.trim(),
                    customSocialColor.trim().replace("#", "")
                  );
                  setCustomSocialName("");
                  setCustomSocialUrl("");
                  toast.success("Custom social link added! 🎉");
                } else {
                  toast.error("Please fill Name and URL!");
                }
              }}
              className="btn-glow"
              style={{ padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}
            >
              Add Link
            </button>
          </div>

          {store.customSocials.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Your Custom Socials:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {store.customSocials.map((cs) => (
                  <span key={cs.id} className="selected-chip" style={{ background: `#${cs.color}22`, borderColor: `#${cs.color}44`, color: `#${cs.color}` }}>
                    {cs.name}
                    <button type="button" onClick={() => store.removeCustomSocial(cs.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "red", marginLeft: 6 }}>×</button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TechStackStep({ store }: StepProps) {
  const [techSearch, setTechSearch] = useState("");
  const [techCategory, setTechCategory] = useState("All");
  const [customTechName, setCustomTechName] = useState("");
  const [customTechColor, setCustomTechColor] = useState("4A5568");

  const filteredTech = techStack.filter((t) => {
    const matchesCategory = techCategory === "All" || t.category === techCategory;
    const matchesSearch = t.name.toLowerCase().includes(techSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in-up">
      <div className="section-card">
        <p className="section-title">💻 Tech Stack ({store.techStack.length + store.customTech.length} selected)</p>

        {/* Selected chips */}
        {(store.techStack.length > 0 || store.customTech.length > 0) && (
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {store.techStack.map((id) => {
                const t = techStack.find((x) => x.id === id);
                return t ? (
                  <span key={id} className="selected-chip">
                    {t.name}
                    <button type="button" onClick={() => store.toggleTech(id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: 14, lineHeight: 1 }}>×</button>
                  </span>
                ) : null;
              })}
              {store.customTech.map((ct) => (
                <span key={ct.id} className="selected-chip" style={{ background: `#${ct.color}22`, borderColor: `#${ct.color}44`, color: `#${ct.color}` }}>
                  {ct.name} (Custom)
                  <button type="button" onClick={() => store.removeCustomTech(ct.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "red", fontSize: 14, lineHeight: 1 }}>×</button>
                </span>
              ))}
            </div>

            {/* Tech stack proficiency sliders */}
            <div style={{ marginTop: 20, borderTop: "1px solid var(--border)", paddingTop: 16 }}>
              <p style={{ fontWeight: 600, fontSize: 13.5, color: "var(--accent)", marginBottom: 8 }}>📊 Adjust Proficiency (Optional)</p>
              <p style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 14 }}>
                Set a proficiency level to show a progress shield next to the tech logo (leave at 0 to hide).
              </p>
              <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))" }}>
                {store.techStack.map((id) => {
                  const t = techStack.find((x) => x.id === id);
                  if (!t) return null;
                  const val = store.techProficiencies[id] || 0;
                  return (
                    <div key={id} style={{ background: "var(--bg-secondary)", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 600 }}>{t.name}</span>
                        <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700 }}>{val > 0 ? `${val}%` : "None"}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        aria-label={`${t.name} proficiency slider`}
                        value={val}
                        onChange={(e) => store.setTechProficiency(id, parseInt(e.target.value))}
                        style={{ width: "100%", accentColor: "var(--accent)", cursor: "pointer" }}
                      />
                    </div>
                  );
                })}
                {store.customTech.map((ct) => {
                  const val = store.techProficiencies[ct.id] || 0;
                  return (
                    <div key={ct.id} style={{ background: "var(--bg-secondary)", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 600 }}>{ct.name} <span style={{ fontSize: 10, color: "var(--text-muted)" }}>(Custom)</span></span>
                        <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700 }}>{val > 0 ? `${val}%` : "None"}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        aria-label={`${ct.name} proficiency slider`}
                        value={val}
                        onChange={(e) => store.setTechProficiency(ct.id, parseInt(e.target.value))}
                        style={{ width: "100%", accentColor: "var(--accent)", cursor: "pointer" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Search and filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <input
            id="tech-search-field"
            className="form-input"
            placeholder="🔍 Search technologies…"
            value={techSearch}
            onChange={(e) => setTechSearch(e.target.value)}
            style={{ flex: 1, minWidth: 180 }}
            aria-label="Search technologies"
          />
          <select
            id="tech-category-select"
            className="form-select"
            value={techCategory}
            onChange={(e) => setTechCategory(e.target.value)}
            style={{ width: 160 }}
            aria-label="Filter technology by category"
          >
            <option value="All">All Categories</option>
            {techCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Tech grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8, maxHeight: 420, overflowY: "auto" }}>
          {filteredTech.map((t) => (
            <button type="button" key={t.id}
              onClick={() => store.toggleTech(t.id)}
              className={`tech-badge ${store.techStack.includes(t.id) ? "selected" : ""}`}
            >
              <span style={{ fontSize: 12 }}>
                {store.techStack.includes(t.id) ? "✓" : "+"}
              </span>
              {t.name}
            </button>
          ))}
          {filteredTech.length === 0 && (
            <p style={{ color: "var(--text-dim)", fontSize: 13, gridColumn: "1/-1" }}>No technologies found.</p>
          )}
        </div>

        {/* Custom Tech Stack Form */}
        <div style={{ marginTop: 24, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
          <p style={{ fontWeight: 600, fontSize: 14, color: "var(--accent)", marginBottom: 12 }}>➕ Add Custom Technology</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <input
              id="custom-tech-name-field"
              className="form-input"
              placeholder="Tech Name (e.g., Mojo, Bun)"
              value={customTechName}
              onChange={(e) => setCustomTechName(e.target.value)}
              style={{ flex: 1, minWidth: 150 }}
              aria-label="Custom Technology Name"
            />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <label style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }} htmlFor="custom-tech-color-field">Badge Color (HEX):</label>
              <input
                id="custom-tech-color-field"
                className="form-input"
                placeholder="4A5568"
                value={customTechColor}
                onChange={(e) => setCustomTechColor(e.target.value)}
                style={{ width: 100 }}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (customTechName.trim()) {
                  store.addCustomTech(
                    customTechName.trim(),
                    customTechColor.trim().replace("#", "") || "4A5568"
                  );
                  setCustomTechName("");
                  toast.success("Custom technology badge added! 🎉");
                } else {
                  toast.error("Please enter a name for the technology!");
                }
              }}
              className="btn-glow"
              style={{ padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}
            >
              Add Tech
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GitHubStatsStep({ store }: StepProps) {
  const isPresetActive = store.themePreset !== "default";
  
  return (
    <div className="animate-fade-in-up">
      <div className="section-card">
        <p className="section-title">📊 GitHub Stats</p>

        <div style={{ background: "rgba(204, 120, 92, 0.08)", border: "1px solid rgba(204, 120, 92, 0.25)", padding: 14, borderRadius: 10, marginBottom: 16 }}>
          <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: 13.5, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
            ⚠️ Note for Organizations:
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: 12.5, lineHeight: 1.5 }}>
            Personal metrics (such as Streaks, Trophies, Activity Graphs, and global Stats Cards) are only supported for personal GitHub user profiles by standard API providers. If you are generating a README for a GitHub Organization, please disable these cards to avoid broken images on GitHub.
          </p>
        </div>

        {[
          { key: "showStats", label: "GitHub Stats Card", desc: "Stars, commits, PRs, issues overview" },
          { key: "showTopLanguages", label: "Top Languages Card", desc: "Most used programming languages" },
          { key: "showStreak", label: "Streak Stats", desc: "Current streak & longest streak" },
          { key: "showTrophies", label: "GitHub Trophies", desc: "Achievement trophies showcase" },
          { key: "showActivityGraph", label: "Activity Graph", desc: "Contribution graph over the year" },
        ].map((item) => (
          <div key={item.key} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 0", borderBottom: "1px solid var(--border)",
          }}>
            <div>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-primary)" }}>{item.label}</p>
              <p style={{ color: "var(--text-muted)", fontSize: 12 }}>{item.desc}</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                aria-label={`Toggle ${item.label}`}
                checked={store.stats[item.key as keyof typeof store.stats] as boolean}
                onChange={(e) => store.setStats({ [item.key]: e.target.checked })}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        ))}
      </div>

      {/* Advanced Stats Options */}
      {(store.stats.showStats || store.stats.showTopLanguages) && (
        <div className="section-card" style={{ marginTop: 16 }}>
          <p className="section-title">⚙️ Advanced Stats Options</p>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
            Customize display parameters of your GitHub Stats and Languages cards.
          </p>
          <div style={{ display: "grid", gap: 14 }}>
            {store.stats.showStats && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-primary)" }}>Hide Rank</p>
                    <p style={{ color: "var(--text-muted)", fontSize: 12 }}>Hide global commit rank badge (e.g. S, A+)</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      aria-label="Hide global rank in stats card"
                      checked={store.statsToggles?.hideRank || false}
                      onChange={(e) => store.setStatsToggles({ hideRank: e.target.checked })}
                    />
                    <span className="toggle-slider" />
                  </label>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-primary)" }}>Show Icons</p>
                    <p style={{ color: "var(--text-muted)", fontSize: 12 }}>Display icons next to numerical stats</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      aria-label="Show icons in stats card"
                      checked={store.statsToggles?.showIcons ?? true}
                      onChange={(e) => store.setStatsToggles({ showIcons: e.target.checked })}
                    />
                    <span className="toggle-slider" />
                  </label>
                </div>
              </>
            )}
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-primary)" }}>Include Private Commits</p>
                <p style={{ color: "var(--text-muted)", fontSize: 12 }}>Count contributions from private repositories</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  aria-label="Include private commits in stats"
                  checked={store.statsToggles?.includeAllCommits ?? true}
                  onChange={(e) => store.setStatsToggles({ includeAllCommits: e.target.checked })}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            {store.stats.showTopLanguages && (
              <div>
                <label className="form-label" htmlFor="languages-layout-select">Top Languages Layout</label>
                <select
                  id="languages-layout-select"
                  className="form-select"
                  value={store.statsToggles?.langsLayout || "compact"}
                  onChange={(e) => store.setStatsToggles({ langsLayout: e.target.value as 'compact' | 'donut' })}
                >
                  <option value="compact">Compact List</option>
                  <option value="donut">Donut Chart</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="section-card">
        <p className="section-title">🎨 Themes</p>

        {isPresetActive && (
          <div style={{ background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.3)", padding: "10px 14px", borderRadius: 8, marginBottom: 14 }}>
            <p style={{ color: "#818cf8", fontWeight: 600, fontSize: 12.5, margin: 0 }}>
              🎨 Theme preset active: <strong>{store.themePreset}</strong>
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 4, marginBottom: 0 }}>
              These dropdowns are overridden by your selected preset. To use custom per-card themes, set the preset to <strong>Standard Dark (Default)</strong> on Step 1.
            </p>
          </div>
        )}

        <div style={{ display: "grid", gap: 14, opacity: isPresetActive || store.customTheme.enabled ? 0.5 : 1, pointerEvents: isPresetActive || store.customTheme.enabled ? "none" : "auto" }}>
          {store.stats.showStats && (
            <div>
              <label className="form-label" htmlFor="stats-card-theme-select">Stats Card Theme</label>
              <select id="stats-card-theme-select" className="form-select" value={store.stats.statsTheme} onChange={(e) => store.setStats({ statsTheme: e.target.value })}>
                {statsThemes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          )}
          {store.stats.showTopLanguages && (
            <div>
              <label className="form-label" htmlFor="languages-card-theme-select">Languages Card Theme</label>
              <select id="languages-card-theme-select" className="form-select" value={store.stats.languagesTheme} onChange={(e) => store.setStats({ languagesTheme: e.target.value })}>
                {statsThemes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          )}
          {store.stats.showStreak && (
            <div>
              <label className="form-label" htmlFor="streak-stats-theme-select">Streak Stats Theme</label>
              <select id="streak-stats-theme-select" className="form-select" value={store.stats.streakTheme} onChange={(e) => store.setStats({ streakTheme: e.target.value })}>
                {statsThemes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          )}
          {store.stats.showTrophies && (
            <div>
              <label className="form-label" htmlFor="trophies-theme-select">Trophies Theme</label>
              <select id="trophies-theme-select" className="form-select" value={store.stats.trophyTheme} onChange={(e) => store.setStats({ trophyTheme: e.target.value })}>
                {statsThemes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          )}
          {store.stats.showActivityGraph && (
            <div>
              <label className="form-label" htmlFor="activity-graph-theme-select">Activity Graph Theme</label>
              <select id="activity-graph-theme-select" className="form-select" value={store.stats.activityGraphTheme} onChange={(e) => store.setStats({ activityGraphTheme: e.target.value })}>
                {activityGraphThemes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Custom Theme Color Palette Builder */}
        <div style={{ marginTop: 24, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <p style={{ fontWeight: 600, fontSize: 14, color: "var(--accent)" }}>🎨 Custom Color Palette Builder</p>
              <p style={{ color: "var(--text-muted)", fontSize: 12 }}>Override themes with custom colors</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                aria-label="Enable Custom Theme"
                checked={store.customTheme.enabled}
                onChange={(e) => store.setCustomTheme({ enabled: e.target.checked })}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {store.customTheme.enabled && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginTop: 14 }} className="animate-fade-in">
              <div>
                <label className="form-label" htmlFor="custom-badge-color">Badge Color</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    id="custom-badge-color"
                    type="color"
                    value={"#" + store.customTheme.badgeColor.replace("#", "")}
                    onChange={(e) => store.setCustomTheme({ badgeColor: e.target.value.replace("#", "") })}
                    style={{ width: 36, height: 36, padding: 0, border: "none", borderRadius: 4, cursor: "pointer", background: "none" }}
                  />
                  <input
                    id="custom-badge-hex"
                    aria-label="Custom badge HEX color"
                    className="form-input"
                    value={store.customTheme.badgeColor}
                    onChange={(e) => store.setCustomTheme({ badgeColor: e.target.value })}
                    style={{ flex: 1, textTransform: "uppercase" }}
                  />
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="custom-card-bg">Card Bg</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    id="custom-card-bg"
                    type="color"
                    value={"#" + store.customTheme.cardBg.replace("#", "")}
                    onChange={(e) => store.setCustomTheme({ cardBg: e.target.value.replace("#", "") })}
                    style={{ width: 36, height: 36, padding: 0, border: "none", borderRadius: 4, cursor: "pointer", background: "none" }}
                  />
                  <input
                    id="custom-card-bg-hex"
                    aria-label="Custom card bg HEX color"
                    className="form-input"
                    value={store.customTheme.cardBg}
                    onChange={(e) => store.setCustomTheme({ cardBg: e.target.value })}
                    style={{ flex: 1, textTransform: "uppercase" }}
                  />
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="custom-card-title">Card Title</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    id="custom-card-title"
                    type="color"
                    value={"#" + store.customTheme.cardTitle.replace("#", "")}
                    onChange={(e) => store.setCustomTheme({ cardTitle: e.target.value.replace("#", "") })}
                    style={{ width: 36, height: 36, padding: 0, border: "none", borderRadius: 4, cursor: "pointer", background: "none" }}
                  />
                  <input
                    id="custom-card-title-hex"
                    aria-label="Custom card title HEX color"
                    className="form-input"
                    value={store.customTheme.cardTitle}
                    onChange={(e) => store.setCustomTheme({ cardTitle: e.target.value })}
                    style={{ flex: 1, textTransform: "uppercase" }}
                  />
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="custom-card-text">Card Text</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    id="custom-card-text"
                    type="color"
                    value={"#" + store.customTheme.cardText.replace("#", "")}
                    onChange={(e) => store.setCustomTheme({ cardText: e.target.value.replace("#", "") })}
                    style={{ width: 36, height: 36, padding: 0, border: "none", borderRadius: 4, cursor: "pointer", background: "none" }}
                  />
                  <input
                    id="custom-card-text-hex"
                    aria-label="Custom card text HEX color"
                    className="form-input"
                    value={store.customTheme.cardText}
                    onChange={(e) => store.setCustomTheme({ cardText: e.target.value })}
                    style={{ flex: 1, textTransform: "uppercase" }}
                  />
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="custom-card-icon">Card Icon</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    id="custom-card-icon"
                    type="color"
                    value={"#" + store.customTheme.cardIcon.replace("#", "")}
                    onChange={(e) => store.setCustomTheme({ cardIcon: e.target.value.replace("#", "") })}
                    style={{ width: 36, height: 36, padding: 0, border: "none", borderRadius: 4, cursor: "pointer", background: "none" }}
                  />
                  <input
                    id="custom-card-icon-hex"
                    aria-label="Custom card icon HEX color"
                    className="form-input"
                    value={store.customTheme.cardIcon}
                    onChange={(e) => store.setCustomTheme({ cardIcon: e.target.value })}
                    style={{ flex: 1, textTransform: "uppercase" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VisitorCounterStep({ store }: StepProps) {
  const { language } = store;
  return (
    <div className="animate-fade-in-up">
      <div className="section-card">
        <p className="section-title">👁️ {language === "hi" ? "विज़िटर काउंटर" : language === "es" ? "Contador de Visitas" : "Visitor Counter"}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <p style={{ fontWeight: 500, fontSize: 14 }}>Enable Visitor Counter</p>
            <p style={{ color: "var(--text-muted)", fontSize: 12 }}>Show how many people viewed your profile</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" aria-label="Enable Visitor Counter" checked={store.visitorCounter.enabled} onChange={(e) => store.setVisitorCounter({ enabled: e.target.checked })} />
            <span className="toggle-slider" />
          </label>
        </div>
        {store.visitorCounter.enabled && (
          <div>
            <label className="form-label" htmlFor="visitor-counter-color-select">Badge Color</label>
            <select id="visitor-counter-color-select" className="form-select" value={store.visitorCounter.color} onChange={(e) => store.setVisitorCounter({ color: e.target.value })}>
              {["brightgreen", "green", "yellow", "orange", "red", "blue", "blueviolet", "ff69b4", "lightgrey"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {store.username && (
              <div style={{ marginTop: 16 }}>
                <p className="form-label">Preview:</p>
                <Image
                  src={`https://komarev.com/ghpvc/?username=${store.username}&label=Profile%20views&color=${store.visitorCounter.color}&style=flat`}
                  alt="Visitor counter preview"
                  width={120}
                  height={20}
                  unoptimized
                  style={{ height: 20, width: "auto" }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DonationsStep({ store }: StepProps) {
  const { language } = store;
  return (
    <div className="animate-fade-in-up">
      <div className="section-card">
        <p className="section-title">💰 {language === "hi" ? "दान लिंक" : language === "es" ? "Donaciones / Apoyo" : "Support / Donation Links"}</p>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
          Enter your username/handle for each donation platform you use.
        </p>
        <div style={{ display: "grid", gap: 14 }}>
          {donationLinks.map((d) => (
            <div key={d.id}>
              <label className="form-label" htmlFor={`donation-${d.id}`}>{d.name}</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ color: "var(--text-dim)", fontSize: 12, flexShrink: 0 }}>{d.urlPrefix}</span>
                <input
                  id={`donation-${d.id}`}
                  aria-label={d.name}
                  className="form-input"
                  placeholder={d.placeholder}
                  value={store.donations[d.id as keyof typeof store.donations] || ""}
                  onChange={(e) => store.setDonation(d.id as keyof typeof store.donations, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkflowsStep({ store }: StepProps) {
  const { language } = store;

  const moveItem = (index: number, direction: "up" | "down") => {
    const newOrder = [...store.bentoOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      const temp = newOrder[index];
      newOrder[index] = newOrder[targetIndex];
      newOrder[targetIndex] = temp;
      store.setBentoOrder(newOrder);
      toast.success("Bento layout reordered! 🍱");
    }
  };

  return (
    <div className="animate-fade-in-up">
      {/* Layout Preset Selector Card */}
      <div className="section-card">
        <p className="section-title">📐 {language === "hi" ? "लेआउट प्रीसेट" : language === "es" ? "Diseño de Perfil" : "Layout Preset Selector"}</p>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
          Choose how your GitHub profile is organized. Standard Stack, Bento Grid, or Hiring Resume layout!
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
          {[
            { id: "classic", name: "Classic Vertical", icon: "🥞", desc: "Sequential list elements" },
            { id: "bento", name: "Bento Dashboard", icon: "🍱", desc: "Structured dynamic table grids" },
            { id: "resume", name: "Developer Resume", icon: "📄", desc: "Summary, highlights & contact first" },
          ].map((lay) => (
            <button
              key={lay.id}
              type="button"
              onClick={() => {
                store.setLayoutPreset(lay.id as FormState["layoutPreset"]);
                toast.success(`Layout changed to ${lay.name}! 🎉`);
              }}
              className={`tech-badge ${store.layoutPreset === lay.id ? "selected" : ""}`}
              style={{ display: "flex", flexDirection: "column", gap: 6, padding: "16px 12px", height: "auto", textAlign: "center", alignItems: "center" }}
            >
              <span style={{ fontSize: 24 }}>{lay.icon}</span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{lay.name}</span>
              <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{lay.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Resume PDF Exporter Card */}
      <div className="section-card" style={{ marginTop: 16 }}>
        <p className="section-title">📄 One-Click Resume PDF Exporter</p>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
          Generate a beautifully formatted, printer-friendly PDF copy of your profile. (Tip: works best with the <strong>Developer Resume</strong> layout!)
        </p>
        <button
          type="button"
          onClick={() => {
            window.print();
            toast.success("Opening system print dialog… 🖨️");
          }}
          className="btn-glow"
          style={{ padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          🖨️ Export PDF Resume
        </button>
      </div>

      {/* Bento Grid Row Reordering Controls */}
      {store.layoutPreset === "bento" && (
        <div className="section-card" style={{ marginTop: 16 }}>
          <p className="section-title">🍱 Bento Grid Row Reordering</p>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
            Customize the vertical stacking sequence of your Bento Grid rows using the Up & Down controls.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {store.bentoOrder.map((blockId, idx) => {
              const labelMap: Record<string, string> = {
                about_stats: "🔭 Profile Summary & Stats Card",
                tech: "💻 Languages and Tools",
                achievements: "🏆 Achievements, Streaks & WakaTime",
                showcase: "📁 Featured Showcase Projects",
                connect_support: "🌐 Connect Links & Support Gateways"
              };
              return (
                <div key={blockId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-secondary)", border: "1px solid var(--border)", padding: "10px 14px", borderRadius: 8 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600 }}>{labelMap[blockId] || blockId}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveItem(idx, "up")}
                      className="btn-glow"
                      style={{ padding: "4px 10px", fontSize: 12, borderRadius: 4, cursor: idx === 0 ? "not-allowed" : "pointer", opacity: idx === 0 ? 0.4 : 1 }}
                    >
                      ▲ Up
                    </button>
                    <button
                      type="button"
                      disabled={idx === store.bentoOrder.length - 1}
                      onClick={() => moveItem(idx, "down")}
                      className="btn-glow"
                      style={{ padding: "4px 10px", fontSize: 12, borderRadius: 4, cursor: idx === store.bentoOrder.length - 1 ? "not-allowed" : "pointer", opacity: idx === store.bentoOrder.length - 1 ? 0.4 : 1 }}
                    >
                      ▼ Down
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* WakaTime Metrics Integration Card */}
      <div className="section-card" style={{ marginTop: 16 }}>
        <p className="section-title">⏱️ WakaTime Coding Activity Card</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <p style={{ fontWeight: 500, fontSize: 14 }}>Show WakaTime Metrics</p>
            <p style={{ color: "var(--text-muted)", fontSize: 12 }}>Display your weekly coding hours directly in your profile</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              aria-label="Toggle WakaTime Metrics"
              checked={store.wakatime.show}
              onChange={(e) => store.setWakaTime({ show: e.target.checked })}
            />
            <span className="toggle-slider" />
          </label>
        </div>
        {store.wakatime.show && (
          <div className="animate-fade-in" style={{ display: "grid", gap: 12 }}>
            <div>
              <label className="form-label" htmlFor="wakatime-username-field">WakaTime Username</label>
              <input
                id="wakatime-username-field"
                className="form-input"
                placeholder="Enter WakaTime username"
                value={store.wakatime.username}
                onChange={(e) => store.setWakaTime({ username: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="wakatime-theme-select">WakaTime Theme</label>
              <select
                id="wakatime-theme-select"
                className="form-select"
                value={store.wakatime.theme}
                onChange={(e) => store.setWakaTime({ theme: e.target.value })}
              >
                {statsThemes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* RSS Blog Feed Integration Card */}
      <div className="section-card" style={{ marginTop: 16 }}>
        <p className="section-title">📝 Dynamic RSS Blog Feed Placeholder</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <p style={{ fontWeight: 500, fontSize: 14 }}>Show RSS Blog Posts</p>
            <p style={{ color: "var(--text-muted)", fontSize: 12 }}>Automatically pull your latest articles into your README</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              aria-label="Toggle RSS Blog Posts"
              checked={store.blogFeed.show}
              onChange={(e) => store.setBlogFeed({ show: e.target.checked })}
            />
            <span className="toggle-slider" />
          </label>
        </div>
        {store.blogFeed.show && (
          <div className="animate-fade-in" style={{ display: "grid", gap: 12 }}>
            <div>
              <label className="form-label" htmlFor="blog-platform-select">Platform</label>
              <select
                id="blog-platform-select"
                className="form-select"
                value={store.blogFeed.platform}
                onChange={(e) => store.setBlogFeed({ platform: e.target.value })}
              >
                <option value="medium">Medium</option>
                <option value="devto">Dev.to</option>
                <option value="hashnode">Hashnode</option>
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="blog-username-field">Platform Username</label>
              <input
                id="blog-username-field"
                className="form-input"
                placeholder="e.g. yourname"
                value={store.blogFeed.username}
                onChange={(e) => store.setBlogFeed({ username: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {/* Lanyard Discord & Spotify Status Widget */}
      <div className="section-card" style={{ marginTop: 16 }}>
        <p className="section-title">👾 Live Discord & Spotify Status (Lanyard)</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <p style={{ fontWeight: 500, fontSize: 14 }}>Show Live Discord Status</p>
            <p style={{ color: "var(--text-muted)", fontSize: 12 }}>Display your real-time Discord activity and Spotify track in your profile</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              aria-label="Toggle Lanyard Status Widget"
              checked={store.lanyard?.show || false}
              onChange={(e) => store.setLanyard({ show: e.target.checked })}
            />
            <span className="toggle-slider" />
          </label>
        </div>
        {store.lanyard?.show && (
          <div className="animate-fade-in" style={{ display: "grid", gap: 12 }}>
            <div>
              <label className="form-label" htmlFor="lanyard-userid-field">Discord User ID *</label>
              <input
                id="lanyard-userid-field"
                className="form-input"
                placeholder="e.g. 197825227749818368"
                value={store.lanyard?.userId || ""}
                onChange={(e) => store.setLanyard({ userId: e.target.value })}
              />
              <p style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4 }}>
                Find your Discord ID: Settings &gt; Advanced &gt; Enable Developer Mode, then right-click your profile and choose &quot;Copy User ID&quot;.
              </p>
            </div>
            <div>
              <label className="form-label" htmlFor="lanyard-theme-select">Widget Theme</label>
              <select
                id="lanyard-theme-select"
                className="form-select"
                value={store.lanyard?.theme || "dark"}
                onChange={(e) => store.setLanyard({ theme: e.target.value })}
              >
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic GitHub Action Workflows */}
      <div className="section-card" style={{ marginTop: 16 }}>
        <p className="section-title">⚙️ Dynamic GitHub Action Workflows</p>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
          Automate your profile README with live widgets. Copy these YAML workflows and create them in `.github/workflows/main.yml`!
        </p>
        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <p style={{ fontWeight: 600, fontSize: 13, color: "var(--accent)", marginBottom: 6 }}>1. 🐍 Animated Contribution Snake Game</p>
            <p style={{ color: "var(--text-dim)", fontSize: 12, marginBottom: 8 }}>Generates an SVG of a snake eating your contribution dots every 24 hours.</p>
            <pre className="code-block-yaml">
{`name: generate-snake

on:
  schedule:
    - cron: "0 */24 * * *" # Every 24 hours
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: Platane/snk@v3
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
      - name: Push Snake SVG to Output Branch
        uses: crazy-max/ghaction-github-pages@v3
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`}
            </pre>
            <button
              type="button"
              onClick={() => {
                const yaml = `name: generate-snake

on:
  schedule:
    - cron: "0 */24 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: Platane/snk@v3
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
      - name: Push Snake SVG to Output Branch
        uses: crazy-max/ghaction-github-pages@v3
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`;
                navigator.clipboard.writeText(yaml);
                toast.success("Snake workflow YAML copied! 🐍");
              }}
              className="btn-glow"
              style={{ padding: "6px 14px", borderRadius: 6, fontSize: 12, marginTop: 8, border: "none", cursor: "pointer" }}
            >
              📋 Copy Snake YAML
            </button>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
            <p style={{ fontWeight: 600, fontSize: 13, color: "var(--accent)", marginBottom: 6 }}>2. 📝 Automated Blog Posts RSS Feed</p>
            <p style={{ color: "var(--text-dim)", fontSize: 12, marginBottom: 8 }}>Automatically fetches and renders your latest Medium / Dev.to / Hashnode articles in your profile README.</p>
            <pre className="code-block-yaml">
{`name: Latest Blog Posts Workflow

on:
  schedule:
    - cron: '0 * * * *' # Every hour
  workflow_dispatch:

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: gautamkrishnar/blog-post-workflow@master
        with:
          feed_list: "https://medium.com/feed/@yourusername"`}
            </pre>
            <button
              type="button"
              onClick={() => {
                const feedUrl = store.blogFeed.platform === "medium" 
                  ? `https://medium.com/feed/@${store.blogFeed.username || "yourusername"}`
                  : store.blogFeed.platform === "devto"
                  ? `https://dev.to/feed/${store.blogFeed.username || "yourusername"}`
                  : `https://feed.hashnode.com/@${store.blogFeed.username || "yourusername"}`;

                const yaml = `name: Latest Blog Posts Workflow

on:
  schedule:
    - cron: '0 * * * *'
  workflow_dispatch:

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: gautamkrishnar/blog-post-workflow@master
        with:
          feed_list: "${feedUrl}"`;
                navigator.clipboard.writeText(yaml);
                toast.success("Blog Feed workflow YAML copied! 📝");
              }}
              className="btn-glow"
              style={{ padding: "6px 14px", borderRadius: 6, fontSize: 12, marginTop: 8, border: "none", cursor: "pointer" }}
            >
              📋 Copy Blog Feed YAML
            </button>
          </div>
        </div>
      </div>

      {/* Standard Fun Components */}
      <div className="section-card" style={{ marginTop: 16 }}>
        <p className="section-title">🎉 Fun Components</p>
        {[
          { key: "showMeme", label: "Random Dev Meme", desc: "Auto-refreshing programming meme on every visit" },
          { key: "showQuote", label: "Dev Quote", desc: "Inspiring developer quote widget" },
          { key: "showJoke", label: "Developer Joke Card", desc: "Themed programmer setup & punchline SVG card" },
        ].map((item) => (
          <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
            <div>
              <p style={{ fontWeight: 500, fontSize: 14 }}>{item.label}</p>
              <p style={{ color: "var(--text-muted)", fontSize: 12 }}>{item.desc}</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                aria-label={`Toggle ${item.label}`}
                checked={item.key === "showJoke" ? (store.fun.showJoke || false) : (store.fun[item.key as keyof typeof store.fun] as boolean)}
                onChange={(e) => {
                  if (item.key === "showJoke") {
                    store.setFun({ showJoke: e.target.checked });
                  } else {
                    store.setFun({ [item.key]: e.target.checked });
                  }
                }}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        ))}
        {store.fun.showQuote && (
          <div style={{ marginTop: 16 }}>
            <label className="form-label" htmlFor="quote-theme-select">Quote Theme</label>
            <select id="quote-theme-select" className="form-select" value={store.fun.quoteTheme} onChange={(e) => store.setFun({ quoteTheme: e.target.value })}>
              {["light", "dark", "radical", "merko", "gruvbox", "tokyonight", "onedark"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}
        {store.fun.showJoke && (
          <div style={{ marginTop: 16 }}>
            <label className="form-label" htmlFor="joke-theme-select">Developer Joke Theme</label>
            <select id="joke-theme-select" className="form-select" value={store.fun.jokeTheme || "dark"} onChange={(e) => store.setFun({ jokeTheme: e.target.value })}>
              {["light", "dark", "radical", "merko", "gruvbox", "tokyonight", "onedark"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Social Share Buttons */}
      <div className="section-card" style={{ marginTop: 16 }}>
        <p className="section-title">📢 Share Your New Profile README!</p>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
          Wowed by your new profile README? Share ProfileCrest with other developers on social media!
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out my brand new developer README generated using ProfileCrest by CodeCrest Studio! 🚀 Create yours at https://profile-crest.vercel.app #GitHub #OpenSource #Developer")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-coffee"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            🐦 Share on Twitter / X
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://profile-crest.vercel.app")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-coffee"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: "#0a66c2", borderColor: "#0a66c2" }}
          >
            💼 Share on LinkedIn
          </a>
          <a
            href={`https://www.reddit.com/submit?url=${encodeURIComponent("https://profile-crest.vercel.app")}&title=${encodeURIComponent("Check out ProfileCrest - Generate a premium Bento-Grid or Classic GitHub Profile README! 🚀")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-coffee"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: "#ff4500", borderColor: "#ff4500" }}
          >
            🤖 Share on Reddit
          </a>
          <a
            href={`https://news.ycombinator.com/submitlink?u=${encodeURIComponent("https://profile-crest.vercel.app")}&t=${encodeURIComponent("Show HN: ProfileCrest - Premium GitHub Profile README Generator with Bento Grids")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-coffee"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: "#ff6600", borderColor: "#ff6600" }}
          >
            🧡 Share on Hacker News
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://profile-crest.vercel.app")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-coffee"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: "#1877f2", borderColor: "#1877f2" }}
          >
            🔵 Share on Facebook
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Create a gorgeous GitHub Profile README with ProfileCrest: https://profile-crest.vercel.app")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-coffee"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: "#25d366", borderColor: "#25d366" }}
          >
            💬 Share via WhatsApp
          </a>
          <a
            href={`https://telegram.me/share/url?url=${encodeURIComponent("https://profile-crest.vercel.app")}&text=${encodeURIComponent("Create a gorgeous GitHub Profile README with ProfileCrest!")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-coffee"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: "#229ed9", borderColor: "#229ed9" }}
          >
            ✈️ Share via Telegram
          </a>
        </div>
      </div>

      <div className="section-card" style={{ marginTop: 16 }}>
        <p className="section-title">🎊 You&apos;re all set!</p>
        <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
          Your README is generated and ready to use! Copy it and paste it into your GitHub profile repository.
        </p>
        <div style={{ background: "var(--bg-secondary)", borderRadius: 8, padding: 16, border: "1px solid var(--border)" }}>
          <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: 13, marginBottom: 8 }}>📋 How to use:</p>
          <ol style={{ color: "var(--text-muted)", fontSize: 13, paddingLeft: 20, lineHeight: 2 }}>
            <li>Go to <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>github.com/new</a></li>
            <li>Create a repo named exactly as your GitHub username</li>
            <li>Initialize with a README</li>
            <li>Copy the generated markdown and paste it</li>
            <li>Commit and enjoy your new profile! 🚀</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

interface PreviewPanelProps {
  markdown: string;
  previewMode: "rendered" | "raw";
  setPreviewMode: (mode: "rendered" | "raw") => void;
  handleCopy: () => void;
  handleDownload: () => void;
}
