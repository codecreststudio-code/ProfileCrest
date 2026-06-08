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
        hostname.startsWith("169.254.") || // Block Link-Local range (SSRF Metadata endpoints)
        hostname.startsWith("0.") ||       // Block Zero-configuration local routes
        // Check for 172.16.0.0 - 172.31.255.255 range
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
        // Check for 127.x.x.x loopbacks
        /^127\./.test(hostname)
      ) {
        throw new Error("Restricted loopback, private, or link-local host target blocked (SSRF attempt)");
      }
    } catch (urlErr) {
      const errMsg = urlErr instanceof Error ? urlErr.message : String(urlErr);
      throw new Error(`Security validation failed for meme image: ${errMsg}`);
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
    console.error("Meme API Fetch failed, attempting GIF fallback:", err);

    // Try a random fallback GIF first (Bug #7 fix: FALLBACK_MEMES was declared but never used)
    try {
      const fallbackUrl = FALLBACK_MEMES[Math.floor(Math.random() * FALLBACK_MEMES.length)];
      const fallbackRes = await fetch(fallbackUrl, { cache: "no-store" });
      if (fallbackRes.ok) {
        const contentType = fallbackRes.headers.get("content-type") || "image/gif";
        const arrayBuffer = await fallbackRes.arrayBuffer();
        return new Response(arrayBuffer, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
            "Pragma": "no-cache",
            "Expires": "0",
          },
        });
      }
    } catch {
      console.error("Fallback GIF also failed, serving SVG joke.");
    }

    // Final fallback: SVG dev joke card
    const DEVELOPER_JOKES = [
      { q: "Why do programmers wear glasses?", a: "Because they can't C#!" },
      { q: "A SQL query walks into a bar, walks up to two tables and asks...", a: '"Can I join you?"' },
      { q: "What is a programmer's favorite hangout place?", a: "Foo Bar" },
      { q: "How many programmers does it take to change a light bulb?", a: "None. It's a hardware problem!" },
      { q: "Why did the programmer quit their job?", a: "Because they didn't get arrays!" },
      { q: "['hip', 'hip']", a: "(hip hip array!)" },
    ];

    const joke = DEVELOPER_JOKES[Math.floor(Math.random() * DEVELOPER_JOKES.length)];

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="200" viewBox="0 0 600 200">
      <defs>
        <linearGradient id="joke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#cc785c" />
          <stop offset="100%" stop-color="#e8a55a" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" rx="12" fill="#faf9f5" stroke="#e6dfd8" stroke-width="1.5"/>
      <g>
        <!-- Branding header -->
        <text x="30" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="9" font-weight="700" fill="url(#joke-grad)" letter-spacing="1.5px">DAILY DEV JOKE</text>

        <!-- Big quote decoration -->
        <text x="570" y="50" font-family="Georgia, serif" font-size="36" font-weight="700" fill="#cc785c" opacity="0.2" text-anchor="end">&#8220;</text>

        <!-- Question -->
        <text x="40" y="86" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#141413">${joke.q}</text>

        <!-- Answer -->
        <text x="40" y="132" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#cc785c">${joke.a}</text>

        <!-- Branding tagline -->
        <text x="570" y="175" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="8" font-weight="600" fill="#8b949e" letter-spacing="0.5px" text-anchor="end">PROFILECREST GENERATOR</text>
      </g>
    </svg>
    `;

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  }
}
