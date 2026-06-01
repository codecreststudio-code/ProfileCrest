import { NextResponse } from "next/server";

// Curated list of reliable, high-quality, and clean programming meme image links as fallbacks
const FALLBACK_MEMES = [
  "https://media.giphy.com/media/26n6WywJyhXmXJv3y/giphy.gif",
  "https://media.giphy.com/media/13HgwGsXF09K4w/giphy.gif",
  "https://media.giphy.com/media/dW3jy9m0EW6suOfpAW/giphy.gif",
  "https://media.giphy.com/media/9Kwq3sLQN8hXy/giphy.gif",
  "https://media.giphy.com/media/Lg1zbcsqLP5sI/giphy.gif",
];

// Disallow loopback, local, and private address hostnames (SSRF Prevention)
const LOCAL_HOSTS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
  "localhost.localdomain",
];

export async function GET() {
  try {
    // Fetch a random programming meme from the free public meme API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 seconds timeout

    const apiResponse = await fetch("https://meme-api.com/gimme/programming", {
      signal: controller.signal,
      next: { revalidate: 0 }, // prevent Next.js caching
    });
    clearTimeout(timeoutId);

    if (!apiResponse.ok) {
      throw new Error("Meme API responded with non-200 code");
    }

    const data = await apiResponse.json();
    if (!data.url || data.nsfw) {
      throw new Error("Invalid or unsafe meme payload");
    }

    const memeImageUrl = data.url;

    // --- SSRF Prevention Guard ---
    try {
      const parsedUrl = new URL(memeImageUrl);
      
      // Ensure only HTTP/HTTPS protocols are allowed
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        throw new Error("Invalid protocol in meme URL");
      }

      const hostname = parsedUrl.hostname.toLowerCase();
      
      if (
        LOCAL_HOSTS.includes(hostname) ||
        hostname.endsWith(".local") ||
        hostname.endsWith(".internal") ||
        hostname.startsWith("10.") ||
        hostname.startsWith("192.168.") ||
        // Check for 172.16.0.0 - 172.31.255.255 range
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
        // Check for 127.x.x.x loopbacks
        /^127\./.test(hostname)
      ) {
        throw new Error("Restricted loopback or private host target blocked (SSRF attempt)");
      }
    } catch (urlErr: any) {
      throw new Error(`Security validation failed for meme image: ${urlErr.message}`);
    }
    // -----------------------------

    // Fetch the image bytes directly
    const imgController = new AbortController();
    const imgTimeoutId = setTimeout(() => imgController.abort(), 4000);

    const imageResponse = await fetch(memeImageUrl, {
      signal: imgController.signal,
      cache: "no-store",
    });
    clearTimeout(imgTimeoutId);

    if (!imageResponse.ok) {
      throw new Error("Failed to fetch image bytes from meme source");
    }

    const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await imageResponse.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (err) {
    console.error("Meme API Fetch failed, loading beautiful fallback:", err);
    try {
      const fallbackUrl = FALLBACK_MEMES[Math.floor(Math.random() * FALLBACK_MEMES.length)];
      const imgRes = await fetch(fallbackUrl, { cache: "no-store" });
      const contentType = imgRes.headers.get("content-type") || "image/gif";
      const arrayBuffer = await imgRes.arrayBuffer();

      return new Response(arrayBuffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
        },
      });
    } catch (fallbackErr) {
      // Return a plain generic error in JSON format if both external sources are unreachable
      return NextResponse.json({ error: "Meme service offline" }, { status: 502 });
    }
  }
}
