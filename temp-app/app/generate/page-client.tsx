"use client";
import { useEffect, useState, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormStore } from "@/store/formStore";
import { generateMarkdown } from "@/utils/markdownGenerator";
import { techStack, techCategories } from "@/data/techStack";
import { socialLinks, donationLinks, statsThemes } from "@/data/links";
import { themePresets } from "@/data/presets";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import toast, { Toaster } from "react-hot-toast";

const STEPS = [
  { id: 1, label: "Basic Info", icon: "👤" },
  { id: 2, label: "Socials", icon: "🌐" },
  { id: 3, label: "Tech Stack", icon: "💻" },
  { id: 4, label: "GitHub Stats", icon: "📊" },
  { id: 5, label: "Visitor Counter", icon: "👁️" },
  { id: 6, label: "Donations", icon: "💰" },
  { id: 7, label: "Fun & Preview", icon: "🎉" },
];

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
      setOrigin(window.location.origin);
    }
  }, []);

  // Pre-fill username from URL (with proper dependency tracking)
  useEffect(() => {
    const u = searchParams.get("u");
    if (u && !store.username) {
      store.setField("username", u);
    }
  }, [searchParams, store]);

  const markdown = generateMarkdown(store, origin);

  const handleCopy = useCallback(async () => {
    try {
      const currentOrigin = typeof window !== "undefined" ? window.location.origin : "https://profile-crest.vercel.app";
      const finalMarkdown = generateMarkdown(store, currentOrigin);
      await navigator.clipboard.writeText(finalMarkdown);
      setCopied(true);
      toast.success("Copied to clipboard! 🎉");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy. Please select and copy manually.");
    }
  }, [store]);

  const handleDownload = useCallback(() => {
    const currentOrigin = typeof window !== "undefined" ? window.location.origin : "https://profile-crest.vercel.app";
    const finalMarkdown = generateMarkdown(store, currentOrigin);
    const blob = new Blob([finalMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded README.md!");
  }, [store]);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Toaster position="top-right" toastOptions={{ style: { background: "#1c1c1f", color: "var(--accent)", border: "1px solid #27272a" } }} />

      {/* Top nav */}
      <nav className="generator-nav">
        <button type="button" onClick={() => router.push("/")} className="nav-logo-btn">
          <Image src="/Logo01.webp" alt="ProfileCrest Logo" width={124} height={38} style={{ height: 38, width: "auto", objectFit: "contain" }} priority />
        </button>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link
            href="/support"
            className="btn-coffee-sm"
          >
            ☕ Get Me a Coffee
          </Link>
          <button
            type="button"
            onClick={handleCopy}
            className={`btn-copy-markdown ${copied ? "copied" : ""}`}
          >
            {copied ? "✓ Copied!" : "📋 Copy Markdown"}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="btn-download-readme btn-glow"
          >
            ⬇ Download
          </button>
        </div>
      </nav>

      <div className="generator-container">
        {/* Left panel: Form */}
        <div className="form-panel">
          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 4 }}>
            {STEPS.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => setStep(s.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                >
                  <div className={`step-dot ${step === s.id ? "active" : step > s.id ? "completed" : ""}`}>
                    {step > s.id ? "✓" : s.id}
                  </div>
                  <span style={{ fontSize: 12, color: step === s.id ? "var(--accent)" : "var(--text-dim)", display: "none" }}>{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 32, height: 1, background: step > s.id ? "var(--accent-dark)" : "var(--border)", margin: "0 4px", flexShrink: 0 }} />
                )}
              </div>
            ))}
            <span style={{ marginLeft: 12, color: "var(--text-muted)", fontSize: 14, fontWeight: 500 }}>
              {STEPS[step - 1].icon} {STEPS[step - 1].label}
            </span>
          </div>

          {/* STEP 1: Basic Info */}
          {step === 1 && <BasicInfoStep store={store} />}

          {/* STEP 2: Social Links */}
          {step === 2 && <SocialsStep store={store} />}

          {/* STEP 3: Tech Stack */}
          {step === 3 && <TechStackStep store={store} />}

          {/* STEP 4: GitHub Stats */}
          {step === 4 && <GitHubStatsStep store={store} />}

          {/* STEP 5: Visitor Counter */}
          {step === 5 && <VisitorCounterStep store={store} />}

          {/* STEP 6: Donations */}
          {step === 6 && <DonationsStep store={store} />}

          {/* STEP 7: Fun */}
          {step === 7 && <WorkflowsStep store={store} />}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="generator-nav-prev-btn"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={() => step < 7 ? setStep((s) => s + 1) : handleCopy()}
              className="btn-glow"
              style={{ padding: "10px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}
            >
              {step < 7 ? "Next →" : "📋 Copy README"}
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

interface PreviewPanelProps {
  markdown: string;
  previewMode: "rendered" | "raw";
  setPreviewMode: (mode: "rendered" | "raw") => void;
  handleCopy: () => void;
  handleDownload: () => void;
}

function MarkdownPreviewPanel({
  markdown,
  previewMode,
  setPreviewMode,
  handleCopy,
  handleDownload,
}: PreviewPanelProps) {
  const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  return (
    <div className="preview-panel">
      {/* Preview toggle */}
      <div style={{
        padding: "12px 20px", borderBottom: "1px solid var(--border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "var(--bg-secondary)",
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>👁 Live Preview</span>
        <div style={{ display: "flex", gap: 6 }}>
          {(["rendered", "raw"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPreviewMode(m)}
              className={`preview-tab-btn ${previewMode === m ? "active" : ""}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Preview content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }} suppressHydrationWarning>
        {isLocalhost && (
          <div style={{ background: "rgba(204, 120, 92, 0.08)", border: "1px solid rgba(204, 120, 92, 0.25)", padding: 14, borderRadius: 10, marginBottom: 16 }}>
            <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: 13, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              ⚠️ Local Development Warning:
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: 12, lineHeight: 1.5 }}>
              You are running locally on localhost. The self-hosted quote and random meme cards generated point to your local URL (<code style={{ background: "rgba(0,0,0,0.05)", padding: "1px 4px", borderRadius: 4 }}>http://localhost:3000</code>). GitHub's proxy servers cannot access localhost, so these two images will appear broken on your real GitHub profile README. 
              <br/><br/>
              <strong>To fix this:</strong> Deploy your ProfileCrest generator repository to Vercel (or any host) first, and copy the final markdown from your deployed website!
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
                  td: ({ node, ...props }) => {
                    const { vAlign, style, ...rest } = props as any;
                    return (
                      <td
                        style={{
                          ...style,
                          verticalAlign: vAlign || undefined,
                          padding: "8px",
                          border: "1px solid #30363d",
                        }}
                        {...rest}
                      />
                    );
                  },
                  th: ({ node, ...props }) => {
                    const { vAlign, style, ...rest } = props as any;
                    return (
                      <th
                        style={{
                          ...style,
                          verticalAlign: vAlign || undefined,
                          padding: "8px",
                          border: "1px solid #30363d",
                          fontWeight: "bold",
                        }}
                        {...rest}
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
            <p style={{ fontSize: 16 }}>Fill in the form to see your README preview here</p>
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
          📋 Copy Markdown
        </button>
        <button type="button" onClick={handleDownload} className="btn-glow" style={{
          padding: "10px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 600,
          border: "none", cursor: "pointer",
        }}>
          ⬇ Download README.md
        </button>
      </div>
    </div>
  );
}


// ==========================================
// 🛡️ Step Sub-Components (React Doctor Refactor)
// ==========================================

interface StepProps {
  store: any;
}

function BasicInfoStep({ store }: StepProps) {
  return (
    <div className="animate-fade-in-up">
              <div className="section-card">
                <p className="section-title">👤 Basic Information</p>
                <div style={{ display: "grid", gap: 16 }}>
                  {/* Theme Preset Selector */}
                  <div>
                    <label className="form-label" htmlFor="theme-preset-select">✨ Visual Theme Preset (1-Click Color Sync)</label>
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
                    <label className="form-label" htmlFor="github-username-field">GitHub Username *</label>
                    <input id="github-username-field" className="form-input" placeholder="yourusername" value={store.username} onChange={(e) => store.setField("username", e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="display-name-field">Display Name</label>
                    <input id="display-name-field" className="form-input" placeholder="John Doe" value={store.name} onChange={(e) => store.setField("name", e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="subtitle-field">Subtitle / Tagline</label>
                    <input id="subtitle-field" className="form-input" placeholder="A passionate full-stack developer from India" value={store.subtitle} onChange={(e) => store.setField("subtitle", e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="currently-working-field">🔭 Currently working on</label>
                    <input id="currently-working-field" className="form-input" placeholder="My awesome project" value={store.currentlyWorkingOn} onChange={(e) => store.setField("currentlyWorkingOn", e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="currently-learning-field">🌱 Currently learning</label>
                    <input id="currently-learning-field" className="form-input" placeholder="Rust, WebAssembly" value={store.currentlyLearning} onChange={(e) => store.setField("currentlyLearning", e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="collaborate-on-field">👯 Looking to collaborate on</label>
                    <input id="collaborate-on-field" className="form-input" placeholder="Open source projects" value={store.collaborateOn} onChange={(e) => store.setField("collaborateOn", e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="help-with-field">🤝 Looking for help with</label>
                    <input id="help-with-field" className="form-input" placeholder="Machine learning integration" value={store.helpWith} onChange={(e) => store.setField("helpWith", e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="ask-me-about-field">💬 Ask me about</label>
                    <input id="ask-me-about-field" className="form-input" placeholder="React, Node.js, System Design" value={store.askMeAbout} onChange={(e) => store.setField("askMeAbout", e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="reach-me-at-field">📫 Reach me at</label>
                    <input id="reach-me-at-field" className="form-input" placeholder="your@email.com" value={store.reachMeAt} onChange={(e) => store.setField("reachMeAt", e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="portfolio-url-field">🌍 Portfolio URL</label>
                    <input id="portfolio-url-field" className="form-input" placeholder="https://yourportfolio.dev" value={store.portfolioUrl} onChange={(e) => store.setField("portfolioUrl", e.target.value)} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label className="form-label" htmlFor="pronouns-field">😄 Pronouns</label>
                      <input id="pronouns-field" className="form-input" placeholder="he/him" value={store.pronouns} onChange={(e) => store.setField("pronouns", e.target.value)} />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="fun-fact-field">⚡ Fun fact</label>
                      <input id="fun-fact-field" className="form-input" placeholder="I think I'm funny" value={store.funFact} onChange={(e) => store.setField("funFact", e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlighted Showcase Projects Card */}
              <div className="section-card" style={{ marginTop: 16 }}>
                <p className="section-title">📁 Highlighted Showcase Projects</p>
                <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
                  Feature your best repositories or personal projects inside your README!
                </p>
                <div style={{ display: "grid", gap: 12 }}>
                  <input
                    className="form-input"
                    placeholder="Project Name (e.g., My Awesome Library)"
                    id="showcase_name"
                    aria-label="Project Name"
                  />
                  <input
                    className="form-input"
                    placeholder="Short description of what the project does…"
                    id="showcase_desc"
                    aria-label="Short description of the project"
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input
                      className="form-input"
                      placeholder="Repository/Web URL (https://…)"
                      id="showcase_url"
                      aria-label="Repository or Web URL"
                    />
                    <input
                      className="form-input"
                      placeholder="Tech stack tags (React, Rust)"
                      id="showcase_tags"
                      aria-label="Tech stack tags"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const nameEl = document.getElementById("showcase_name") as HTMLInputElement;
                      const descEl = document.getElementById("showcase_desc") as HTMLInputElement;
                      const urlEl = document.getElementById("showcase_url") as HTMLInputElement;
                      const tagsEl = document.getElementById("showcase_tags") as HTMLInputElement;
                      if (nameEl && nameEl.value.trim()) {
                        store.addShowcaseProject(
                          nameEl.value.trim(),
                          descEl ? descEl.value.trim() : "",
                          urlEl ? urlEl.value.trim() : "",
                          tagsEl ? tagsEl.value.trim() : ""
                        );
                        nameEl.value = "";
                        if (descEl) descEl.value = "";
                        if (urlEl) urlEl.value = "";
                        if (tagsEl) tagsEl.value = "";
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
                      {store.showcaseProjects.map((p: any) => (
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
  const [customSocialName, setCustomSocialName] = useState("");
  const [customSocialUrl, setCustomSocialUrl] = useState("");
  const [customSocialColor, setCustomSocialColor] = useState("4A154B");

  return (
    <div className="animate-fade-in-up">
              <div className="section-card">
                <p className="section-title">🌐 Social Links</p>
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
                        {store.customSocials.map((cs: any) => (
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
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {store.techStack.map((id: string) => {
                      const t = techStack.find((x) => x.id === id);
                      return t ? (
                        <span key={id} className="selected-chip">
                          {t.name}
                          <button type="button" onClick={() => store.toggleTech(id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: 14, lineHeight: 1 }}>×</button>
                        </span>
                      ) : null;
                    })}
                    {store.customTech.map((ct: any) => (
                      <span key={ct.id} className="selected-chip" style={{ background: `#${ct.color}22`, borderColor: `#${ct.color}44`, color: `#${ct.color}` }}>
                        {ct.name} (Custom)
                        <button type="button" onClick={() => store.removeCustomTech(ct.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "red", fontSize: 14, lineHeight: 1 }}>×</button>
                      </span>
                    ))}
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

              <div className="section-card">
                <p className="section-title">🎨 Themes</p>
                <div style={{ display: "grid", gap: 14 }}>
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
                </div>
              </div>
            </div>
  );
}

function VisitorCounterStep({ store }: StepProps) {
  return (
    <div className="animate-fade-in-up">
              <div className="section-card">
                <p className="section-title">👁️ Visitor Counter</p>
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
  return (
    <div className="animate-fade-in-up">
              <div className="section-card">
                <p className="section-title">💰 Support / Donation Links</p>
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
  return (
    <div className="animate-fade-in-up">
              {/* Layout Preset Selector Card */}
              <div className="section-card">
                <p className="section-title">📐 Layout Preset Selector</p>
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
                        store.setLayoutPreset(lay.id as any);
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

              {/* Dynamic Workflows Selector Card */}
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
          feed_list: "https://medium.com/feed/@yourusername"`;
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
                ].map((item) => (
                  <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: 14 }}>{item.label}</p>
                      <p style={{ color: "var(--text-muted)", fontSize: 12 }}>{item.desc}</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" aria-label={`Toggle ${item.label}`} checked={store.fun[item.key as keyof typeof store.fun] as boolean} onChange={(e) => store.setFun({ [item.key]: e.target.checked })} />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                ))}
                {store.fun.showQuote && (
                  <div style={{ marginTop: 16 }}>
                    <label className="form-label" htmlFor="quote-theme-select">Quote Theme</label>
                    <select id="quote-theme-select" className="form-select" value={store.fun.quoteTheme} onChange={(e) => store.setFun({ quoteTheme: e.target.value })}>
                      {["dark", "radical", "merko", "gruvbox", "tokyonight", "onedark"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="section-card" style={{ marginTop: 16 }}>
                <p className="section-title">🎊 You're all set!</p>
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
