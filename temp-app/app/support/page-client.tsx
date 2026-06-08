"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import toast, { Toaster } from "react-hot-toast";
import { LuGlobe, LuMail, LuHeart, LuUser } from "react-icons/lu";
import { FaInstagram, FaYoutube } from "react-icons/fa6";
import { useFormStore } from "@/store/formStore";
import { locales } from "@/data/locales";

interface Supporter {
  name: string;
  coffees: number;
  message: string;
  currency: string;
  amount: number;
  timestamp: string;
  paymentId?: string;
}

const CURRENCIES = [
  { code: "USD", symbol: "$", basePrice: 5 },
  { code: "INR", symbol: "₹", basePrice: 500 },
  { code: "EUR", symbol: "€", basePrice: 5 },
  { code: "GBP", symbol: "£", basePrice: 5 },
  { code: "CAD", symbol: "C$", basePrice: 7 },
  { code: "AUD", symbol: "A$", basePrice: 7 },
];

export default function SupportPageClient() {
  const [supporters, setSupporters] = useState<Supporter[] | undefined>(undefined);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { language, setLanguage } = useFormStore();
  const t = locales[language] || locales.en;

  // Fetch supporters database from Next.js serverless backend
  useEffect(() => {
    let active = true;
    window.fetch("/api/supporters")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch supporters database.");
        return res.json();
      })
      .then((data) => {
        if (active) {
          setSupporters(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load supporters:", err);
        if (active) {
          toast.error("Network error: failed to load live supporters.");
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const submitSupporter = useCallback(async (newSup: Omit<Supporter, "timestamp">) => {
    const loadingToast = toast.loading("Saving supporter record in database…");
    try {
      const res = await window.fetch("/api/supporters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSup),
      });

      if (res.ok) {
        const updatedList = await res.json();
        setSupporters(updatedList);
        toast.dismiss(loadingToast);
        toast.success("Thank you so much for your support! ☕🎉");
        return true;
      } else {
        const errData = await res.json();
        toast.dismiss(loadingToast);
        toast.error(errData.error || "Failed to persist supporter record.");
        return false;
      }
    } catch (err) {
      console.error("Failed to submit supporter:", err);
      toast.dismiss(loadingToast);
      toast.error("Network error: failed to write to backend.");
      return false;
    }
  }, []);

  const supportersCount = supporters ? supporters.length : 0;

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)", display: "flex", flexDirection: "column" }}>
      <Toaster position="top-right" toastOptions={{ style: { background: "#1c1c1f", color: "var(--accent)", border: "1px solid #27272a" } }} />
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        onLoad={() => setScriptLoaded(true)}
        onError={() => console.error("Failed to load Razorpay checkout script")}
      />

      {/* Nav */}
      <nav className="glass-nav" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Link 
            href="/" 
            style={{ textDecoration: "none", color: "var(--text-muted)", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}
          >
            {t.navbar.backHome}
          </Link>
        </div>

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

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
      </nav>

      {/* Hero Banner Area */}
      <div className="support-hero">
        <div className="support-hero-circle-1" />
        <div className="support-hero-circle-2" />
        <h1 style={{ 
          fontSize: "clamp(24px, 5vw, 42px)", 
          fontWeight: 800, 
          fontFamily: "'Cormorant Garamond', serif",
          textAlign: "center",
          color: "var(--text-primary)"
        }}>
          {t.support.title}
        </h1>
      </div>

      {/* Main Support Workspace */}
      <main style={{ maxWidth: 1100, width: "100%", margin: "0 auto", padding: "48px 24px", flex: 1 }}>
        <div className="support-workspace-grid">
          
          {/* Left Column: About and Supporters */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }} className="preview-panel">
            <AboutCard supportersCount={supportersCount} />
            <SupportersList supporters={supporters} isLoading={isLoading} />
          </div>

          {/* Right Column: Checkout Form */}
          <div className="support-form-card">
            <SupportForm submitSupporter={submitSupporter} scriptLoaded={scriptLoaded} />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 32px 32px", background: "var(--bg-secondary)", marginTop: "auto" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image src="/Logo01.webp" alt="ProfileCrest Logo" width={110} height={34} style={{ height: 34, width: "auto", objectFit: "contain" }} />
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
              {t.footer.tagline}
            </p>
          </div>
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

// ==========================================
// 🛡️ Focused Sub-Components (React Doctor Refactor)
// ==========================================

function AboutCard({ supportersCount }: { supportersCount: number }) {
  const { language } = useFormStore();
  const t = locales[language] || locales.en;

  return (
    <div className="support-about-card">
      <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 20 }}>
        <div className="crown-avatar">
          👑
        </div>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>{t.support.aboutTitle}</h2>
          <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <LuHeart style={{ width: 14, height: 14, fill: "var(--accent)" }} /> 
            {supportersCount} {t.support.supportersCount}
          </p>
        </div>
      </div>

      <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
        {t.support.aboutText1}
      </p>
      <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
        {t.support.aboutText2}
      </p>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", flexWrap: "wrap", gap: 16 }}>
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
    </div>
  );
}

function SupportersList({ supporters, isLoading }: { supporters: Supporter[] | undefined; isLoading: boolean }) {
  const { language } = useFormStore();
  const t = locales[language] || locales.en;
  const isListEmpty = !supporters || supporters.length === 0;

  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
        <LuUser style={{ width: 18, height: 18, color: "var(--accent)" }} />
        {t.support.recentSupporters} ({supporters ? supporters.length : 0})
      </h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {isLoading || !supporters ? (
          <div style={{ textAlign: "center", padding: "48px 0", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12 }}>
            <div className="float-animation" style={{ fontSize: 32, marginBottom: 12 }}>☕</div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.05em" }}>{t.support.loadingSupporters}</span>
          </div>
        ) : isListEmpty ? (
          <div style={{ textAlign: "center", padding: "48px 0", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12 }}>
            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{t.support.noSupporters}</span>
          </div>
        ) : (
          supporters.map((sup) => {
            const coffeeText = sup.coffees === 1 
              ? t.support.boughtCoffee 
              : t.support.boughtCoffees.replace("{count}", String(sup.coffees));
            return (
              <div 
                key={`${sup.name}-${sup.timestamp}`}
                style={{ 
                  background: "var(--bg-card)", 
                  border: "1px solid var(--border)", 
                  borderRadius: 12, 
                  padding: 20,
                  display: "flex",
                  gap: 16
                }}
              >
                <div className="supporter-coffee-icon">
                  ☕
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>{sup.name}</span>
                    <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600 }}>
                      {coffeeText}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.5, margin: "4px 0" }}>
                    {sup.message}
                  </p>
                  <span style={{ fontSize: 12, color: "var(--text-dim)", alignSelf: "flex-end" }}>
                    {new Date(sup.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

interface SupportFormProps {
  submitSupporter: (newSup: Omit<Supporter, "timestamp">) => Promise<boolean>;
  scriptLoaded: boolean;
}

function SupportForm({ submitSupporter, scriptLoaded }: SupportFormProps) {
  const { language } = useFormStore();
  const t = locales[language] || locales.en;

  const [formState, setFormState] = useState({
    currency: "USD",
    coffeeCount: 3,
    isCustomCount: false,
    customValue: "6",
    name: "",
    message: "",
  });

  const { currency, coffeeCount, isCustomCount, customValue, name, message } = formState;

  const setCoffeeCount = (val: number) => setFormState(prev => ({ ...prev, coffeeCount: val }));
  const setIsCustomCount = (val: boolean) => setFormState(prev => ({ ...prev, isCustomCount: val }));
  const setCustomValue = (val: string) => setFormState(prev => ({ ...prev, customValue: val }));
  const setName = (val: string) => setFormState(prev => ({ ...prev, name: val }));
  const setMessage = (val: string) => setFormState(prev => ({ ...prev, message: val }));

  const selectedCurr = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const finalCoffeeCount = isCustomCount ? (parseInt(customValue) || 1) : coffeeCount;
  const totalAmount = finalCoffeeCount * selectedCurr.basePrice;

  const handleSelectCount = (count: number) => {
    setFormState(prev => ({ ...prev, isCustomCount: false, coffeeCount: count }));
  };

  const handleCustomCountFocus = () => {
    setIsCustomCount(true);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isCustomCount) {
      const val = parseInt(customValue);
      if (!val || val <= 0) {
        toast.error("Please enter a valid number of coffees.");
        return;
      }
    }

    if (!scriptLoaded && !("Razorpay" in window)) {
      toast.error("Razorpay payment checkout library is still loading. Please try again in a moment!");
      return;
    }

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_CodeCrestKey";

    const options = {
      key: razorpayKey,
      amount: totalAmount * 100, // lowest currency unit (cents/paise)
      currency: currency,
      name: "CodeCrest Studio",
      description: `Bought ${finalCoffeeCount} Coffee${finalCoffeeCount > 1 ? "s" : ""} to support CodeCrest Studio`,
      image: "/Logo01.webp",
      handler: function (response: { razorpay_payment_id?: string }) {
        const newSup = {
          name: name.trim() || "Anonymous Supporter",
          coffees: finalCoffeeCount,
          message: message.trim() || "Bought a coffee to support open source!",
          currency: currency,
          amount: totalAmount,
          paymentId: response?.razorpay_payment_id || "simulated",
        };
        submitSupporter(newSup).then((success) => {
          if (success) {
            setName("");
            setMessage("");
            setCoffeeCount(3);
            setIsCustomCount(false);
          }
        });
      },
      prefill: {
        name: name,
        email: "",
        contact: "",
      },
      theme: {
        color: "#cc785c",
      },
      modal: {
        ondismiss: function () {
          // Simulation/Fallback support for development testing
          if (razorpayKey === "rzp_test_CodeCrestKey" || razorpayKey.startsWith("rzp_test_")) {
            const confirmTest = window.confirm(
              "Would you like to simulate a SUCCESSFUL sandbox payment transaction to test dynamic state updates?"
            );
            if (confirmTest) {
              const newSup = {
                name: name.trim() || "Anonymous Supporter",
                coffees: finalCoffeeCount,
                message: message.trim() || "Bought a coffee to support open source!",
                currency: currency,
                amount: totalAmount,
                paymentId: "simulated_test_" + Math.random().toString(36).substr(2, 9),
              };
              submitSupporter(newSup).then((success) => {
                if (success) {
                  setName("");
                  setMessage("");
                  setCoffeeCount(3);
                  setIsCustomCount(false);
                }
              });
            }
          }
        },
      },
    };

    try {
      const rzp = new (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } }).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Failed to open Razorpay:", err);
      toast.error("Failed to open payment gateway. Check browser settings.");
    }
  };

  return (
    <>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
        {t.support.formTitle}
      </h2>

      <form onSubmit={handleSupportSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        
        {/* Currency Selector */}
        <div>
          <label className="form-label" htmlFor="coffee-currency-select">
            {t.support.selectCurrency}
          </label>
          <select
            id="coffee-currency-select"
            value={currency}
            onChange={(e) => {
              setFormState(prev => ({ ...prev, currency: e.target.value, coffeeCount: 3, isCustomCount: false }));
            }}
            className="form-select"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} ({c.symbol}) - Base: {c.symbol}{c.basePrice}/coffee
              </option>
            ))}
          </select>
        </div>

        {/* Coffees Increments */}
        <div>
          <span className="form-label">{t.support.numberCoffees}</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            {[1, 3, 5, 10].map((num) => {
              const isSelected = isCustomCount === false && coffeeCount === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleSelectCount(num)}
                  className={`coffee-qty-btn ${isSelected ? "selected" : ""}`}
                >
                  {num}
                </button>
              );
            })}
            
            <button
              type="button"
              onClick={handleCustomCountFocus}
              className={`coffee-qty-btn ${isCustomCount ? "selected" : ""}`}
              style={{ fontSize: 13 }}
            >
              Custom
            </button>
          </div>
        </div>

        {/* Custom Number Input */}
        {isCustomCount === true && (
          <div className="animate-fade-in">
            <label className="form-label" htmlFor="coffee-custom-count-input">
              {t.support.customQtyLabel}
            </label>
            <input
              id="coffee-custom-count-input"
              type="number"
              min="1"
              max="100"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="form-input"
              placeholder={t.support.customQtyPlaceholder}
            />
          </div>
        )}

        {/* pricing Summary */}
        <div style={{ 
          background: "var(--bg-secondary)", 
          border: "1px solid var(--border)", 
          borderRadius: 12, 
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 500 }}>
            {t.support.totalAmount}
          </span>
          <span style={{ fontSize: 20, fontWeight: 800, color: "var(--accent)" }}>
            {selectedCurr.symbol}{totalAmount.toLocaleString()} {currency}
          </span>
        </div>

        {/* Name */}
        <div>
          <label className="form-label" htmlFor="supporter-name-input">
            {t.support.nameLabel}
          </label>
          <input
            id="supporter-name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.support.namePlaceholder}
            className="form-input"
            maxLength={50}
          />
        </div>

        {/* Message */}
        <div>
          <label className="form-label" htmlFor="supporter-message-input">
            {t.support.messageLabel}
          </label>
          <textarea
            id="supporter-message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.support.messagePlaceholder}
            className="form-input"
            style={{ minHeight: 90, resize: "vertical", fontFamily: "inherit" }}
            maxLength={250}
          />
        </div>

        {/* Support button */}
        <button
          type="submit"
          className="btn-generate-lg"
          style={{ 
            width: "100%", 
            justifyContent: "center", 
            padding: "16px 0", 
            fontSize: 16,
            fontWeight: 700,
            boxShadow: "0 4px 20px var(--accent-glow)"
          }}
        >
          {t.support.submitBtn} {selectedCurr.symbol}{totalAmount.toLocaleString()}
        </button>

        <p style={{ textAlign: "center", color: "var(--text-dim)", fontSize: 12 }}>
          {t.support.secureNotice}
        </p>

      </form>
    </>
  );
}
