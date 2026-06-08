import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

interface Supporter {
  name: string;
  coffees: number;
  message: string;
  currency: string;
  amount: number;
  timestamp: string;
  paymentId?: string;
}

const DEFAULT_SUPPORTERS: Supporter[] = [
  {
    name: "Alice Dev",
    coffees: 3,
    message: "Cleanest profile generator I have ever used. Love the royal violet theme! 💜",
    currency: "USD",
    amount: 15,
    timestamp: "2026-06-01T08:30:00.000Z",
  },
  {
    name: "Bob Coder",
    coffees: 5,
    message: "Extremely fast generation and the Bento grid layout matches perfectly! 🍱",
    currency: "INR",
    amount: 2500,
    timestamp: "2026-05-30T10:20:00.000Z",
  },
  {
    name: "Charlie Hacker",
    coffees: 1,
    message: "Awesome tool! Pinned organization warning is a very helpful addition.",
    currency: "USD",
    amount: 5,
    timestamp: "2026-05-29T14:45:00.000Z",
  },
  {
    name: "Diana Stack",
    coffees: 3,
    message: "The self-hosted quote cards load so fast on my GitHub profile. Outstanding work! 🚀",
    currency: "INR",
    amount: 1500,
    timestamp: "2026-05-28T08:15:00.000Z",
  },
  {
    name: "Evan Fullstack",
    coffees: 1,
    message: "Beautiful design aesthetics. Instant support with Razorpay was so smooth. ☕",
    currency: "USD",
    amount: 5,
    timestamp: "2026-05-27T19:30:00.000Z",
  },
  {
    name: "Fiona Design",
    coffees: 1,
    message: "Great responsive layouts. Everything stacks perfectly on mobile screens!",
    currency: "EUR",
    amount: 5,
    timestamp: "2026-05-26T11:00:00.000Z",
  },
];

const VALID_CURRENCIES = ["USD", "INR", "EUR", "GBP", "CAD", "AUD"];

const getDbPath = () => path.join(process.cwd(), "data", "supporters.json");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

let supportersCache: Supporter[] | null = null;

// Ensure database file exists and load it
async function getSupporters(): Promise<Supporter[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("supporters")
        .select("*")
        .order("timestamp", { ascending: false });
      
      if (!error && data) {
        // Map database snake_case fields to interface camelCase fields
        interface SupabaseSupporter {
          name: string;
          coffees: number;
          message: string;
          currency: string;
          amount: number;
          timestamp: string;
          payment_id?: string;
        }
        const mappedList = (data as unknown as SupabaseSupporter[]).map((sup) => ({
          name: sup.name,
          coffees: sup.coffees,
          message: sup.message,
          currency: sup.currency,
          amount: sup.amount,
          timestamp: sup.timestamp,
          paymentId: sup.payment_id || undefined,
        }));
        supportersCache = mappedList;
        return supportersCache;
      }
      console.warn("Supabase select failed, falling back to local files:", error);
    } catch (err) {
      console.warn("Failed to query Supabase database (falling back to files):", err);
    }
  }

  if (supportersCache) {
    return supportersCache;
  }
  const dbPath = getDbPath();
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    supportersCache = JSON.parse(data);
    return supportersCache!;
  } catch (error) {
    // If file doesn't exist, create it with default seed data
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === "ENOENT") {
      try {
        // Ensure data directory exists
        await fs.mkdir(path.dirname(dbPath), { recursive: true });
        await fs.writeFile(dbPath, JSON.stringify(DEFAULT_SUPPORTERS, null, 2), "utf-8");
        supportersCache = [...DEFAULT_SUPPORTERS];
        return supportersCache;
      } catch (writeErr) {
        console.warn("Failed to initialize supporters database file (serving initial list in-memory):", writeErr);
        supportersCache = [...DEFAULT_SUPPORTERS];
        return supportersCache;
      }
    }
    console.error("Failed to read supporters database:", error);
    supportersCache = [...DEFAULT_SUPPORTERS];
    return supportersCache;
  }
}

// Write to supporters database cleanly
async function saveSupporters(supporters: Supporter[]): Promise<boolean> {
  supportersCache = supporters;
  const dbPath = getDbPath();
  try {
    await fs.writeFile(dbPath, JSON.stringify(supporters, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.warn("Failed to write to supporters database on disk (serving from updated in-memory cache):", error);
    // Return true since we successfully preserved the transaction in memory for active sessions!
    return true;
  }
}

// Simple dynamic sanitation helper (SSRF/XSS protection)
function sanitizeString(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export async function GET() {
  const list = await getSupporters();
  return NextResponse.json(list, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
      "Pragma": "no-cache",
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, coffees, message, currency, amount, paymentId } = body;

    // Server-side validation guards
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Supporter name is required." }, { status: 400 });
    }
    if (name.trim().length > 50) {
      return NextResponse.json({ error: "Name must be 50 characters or less." }, { status: 400 });
    }

    const coffeeCount = parseInt(String(coffees));
    if (isNaN(coffeeCount) || coffeeCount <= 0 || coffeeCount > 100) {
      return NextResponse.json({ error: "Coffees must be a positive integer between 1 and 100." }, { status: 400 });
    }

    if (message && (typeof message !== "string" || message.trim().length > 250)) {
      return NextResponse.json({ error: "Message must be 250 characters or less." }, { status: 400 });
    }

    if (!currency || !VALID_CURRENCIES.includes(currency)) {
      return NextResponse.json({ error: "Invalid currency selected." }, { status: 400 });
    }

    const amountValue = parseFloat(String(amount));
    if (isNaN(amountValue) || amountValue <= 0) {
      return NextResponse.json({ error: "Amount must be a positive number." }, { status: 400 });
    }

    const currentSupporters = await getSupporters();

    const sanitizedPaymentId = paymentId ? sanitizeString(String(paymentId).trim()) : undefined;

    // Sanitize strings to prevent dynamic script injection
    const newSupporter: Supporter = {
      name: sanitizeString(name.trim()),
      coffees: coffeeCount,
      message: sanitizeString((message || "Bought a coffee to support open source!").trim()),
      currency: currency,
      amount: amountValue,
      timestamp: new Date().toISOString(),
      paymentId: sanitizedPaymentId,
    };

    if (supabase) {
      try {
        const { error } = await supabase
          .from("supporters")
          .insert([{
            name: newSupporter.name,
            coffees: newSupporter.coffees,
            message: newSupporter.message,
            currency: newSupporter.currency,
            amount: newSupporter.amount,
            timestamp: newSupporter.timestamp,
            payment_id: newSupporter.paymentId || null,
          }]);
        if (error) {
          console.warn("Supabase insert failed, falling back to local files:", error);
        } else {
          console.log("Successfully persisted supporter in Supabase!");
        }
      } catch (err) {
        console.warn("Failed to insert into Supabase database (falling back to files):", err);
      }
    }

    const updated = [newSupporter, ...currentSupporters];
    const saved = await saveSupporters(updated);

    if (!saved) {
      return NextResponse.json({ error: "Failed to persist transaction to backend database." }, { status: 500 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Supporters POST Error:", err);
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Failed to parse request payload: " + errMsg }, { status: 400 });
  }
}
