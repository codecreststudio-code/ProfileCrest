// Curated list of 30+ funny developer/programmer jokes
const DEVELOPER_JOKES = [
  "Why do programmers wear glasses?\nBecause they can't C#.",
  "There are 10 types of people in this world:\nThose who understand binary, and those who don't.",
  "How many programmers does it take to change a light bulb?\nNone, that's a hardware problem.",
  "A SQL query goes into a bar, walks up to two tables and asks:\n'Can I join you?'",
  "Why did the programmer quit his job?\nBecause he didn't get arrays.",
  "['hip', 'hip']\n(hip hip array!)",
  "To understand what recursion is,\nyou must first understand what recursion is.",
  "What is a programmer's favorite hangout place?\nFoo Bar.",
  "Why do Java developers wear glasses?\nBecause they don't C#.",
  "An optimist says: 'The glass is half-full.'\nA pessimist says: 'The glass is half-empty.'\nA programmer says: 'The glass is twice as large as it needs to be.'",
  "Why did the developer go broke?\nBecause he used up all his cache.",
  "What do you call a programmer from Finland?\nNerdic.",
  "Why was the JavaScript developer sad?\nBecause they didn't know how to 'null' their feelings.",
  "Why do programmers prefer dark mode?\nBecause light attracts bugs!",
  "There is no place like 127.0.0.1",
  "A programmer is told to 'go to the store and buy a loaf of bread. If they have eggs, buy a dozen.'\nThe programmer returns with 12 loaves of bread.",
  "What is a developer's favorite key on the keyboard?\nThe escape key.",
  "How do you tell HTML from HTML5?\nOpen it in Internet Explorer. If it breaks, it's HTML5.",
  "Why did the database administrator leave his wife?\nShe had one-to-many relationships.",
  "What is the most used language in programming?\nProfanity.",
  "A good programmer is someone who always looks both ways before crossing a one-way street.",
  "In theory, there is no difference between theory and practice.\nBut, in practice, there is.",
  "Why did the functional programmer get thrown out of the class?\nBecause they didn't have side effects.",
  "Why do Git developers love tree structures?\nBecause they can branch out.",
  "There are two ways to write error-free programs;\nonly the third one works.",
  "Debugging is like being the detective in a crime movie\nwhere you are also the murderer.",
  "What do you call a group of 8 Hobbits?\nA Hobbyte.",
  "Why did the CSS developer go to therapy?\nTo resolve their layout issues.",
  "There are only two hard things in Computer Science:\ncache invalidation, naming things, and off-by-one errors.",
  "A software developer's wife asks: 'Could you buy some milk?'\nAs he leaves, she adds: 'And if they have eggs, get ten.'\nHe comes home with 10 cartons of milk. She asks: 'Why?!'\nHe replies: 'They had eggs.'",
  "How many developers does it take to change a lightbulb?\nNone, they just declare darkness the new standard.",
];

function wrapText(text: string, maxChars: number): string[] {
  const paragraphs = text.split("\n");
  const lines: string[] = [];
  for (const para of paragraphs) {
    if (para === "") {
      lines.push(""); // empty line placeholder
      continue;
    }
    const words = para.split(" ");
    let currentLine = "";
    for (const word of words) {
      if ((currentLine + " " + word).trim().length <= maxChars) {
        currentLine = (currentLine + " " + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
  }
  return lines;
}

const THEMES: Record<string, { bg: string; border: string; text: string; accent: string; accent2: string; iconColor: string }> = {
  light: { bg: "#faf9f5", border: "#e6dfd8", text: "#141413", accent: "#cc785c", accent2: "#e8a55a", iconColor: "#cc785c" },
  dark: { bg: "#1c1c1f", border: "#2d2d30", text: "#f3f4f6", accent: "#cc785c", accent2: "#e8a55a", iconColor: "#cc785c" },
  radical: { bg: "#143f6b", border: "#1d5693", text: "#feb326", accent: "#f55353", accent2: "#feb326", iconColor: "#f55353" },
  merko: { bg: "#0a0f0d", border: "#1d2f28", text: "#68b0ab", accent: "#8fc0a9", accent2: "#c8d6af", iconColor: "#8fc0a9" },
  gruvbox: { bg: "#282828", border: "#3c3836", text: "#ebdbb2", accent: "#fe8019", accent2: "#fabd2f", iconColor: "#fe8019" },
  tokyonight: { bg: "#1a1b26", border: "#24283b", text: "#a9b1d6", accent: "#7aa2f7", accent2: "#bb9af3", iconColor: "#7aa2f7" },
  onedark: { bg: "#282c34", border: "#353b45", text: "#abb2bf", accent: "#61afef", accent2: "#c678dd", iconColor: "#61afef" },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const themeParam = searchParams.get("theme") || "dark";
  const theme = THEMES[themeParam] || THEMES.dark;

  const joke = DEVELOPER_JOKES[Math.floor(Math.random() * DEVELOPER_JOKES.length)];
  const lines = wrapText(joke, 60);

  const lineHeight = 22;
  const baseHeight = 150;
  const contentLines = lines.length;
  // Calculate extra height based on total line count
  const extraLines = Math.max(0, contentLines - 3);
  const svgHeight = baseHeight + extraLines * lineHeight;

  const startY = Math.round(svgHeight * 0.48 - ((contentLines - 1) * lineHeight) / 2);

  const tspanElements = lines
    .map((line, idx) => {
      if (line === "") {
        return `<tspan x="60" dy="${lineHeight}">&nbsp;</tspan>`;
      }
      return `<tspan x="60" dy="${idx === 0 ? 0 : lineHeight}">${line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</tspan>`;
    })
    .join("");

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="${svgHeight}" viewBox="0 0 600 ${svgHeight}">
    <defs>
      <linearGradient id="crest-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.accent}" />
        <stop offset="100%" stop-color="${theme.accent2}" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" rx="12" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1.5"/>
    <g>
      <!-- Branding Tag -->
      <text x="570" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="url(#crest-grad)" letter-spacing="1px" text-anchor="end">DEV JOKE</text>
      
      <!-- Tech/Joke Icon (Decorative Terminal Icon) -->
      <path d="M 28 35 L 38 43 L 28 51 M 42 51 L 52 51" stroke="${theme.iconColor}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
      
      <!-- Multi-line SVG-compatible text representation -->
      <text x="60" y="${startY}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="${theme.text}" font-weight="500">
        ${tspanElements}
      </text>
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
