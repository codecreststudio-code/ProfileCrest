// Curated list of 30+ inspiring, smart, and funny developer quotes
const DEVELOPER_QUOTES = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "Fix the cause, not the symptom.", author: "Steve Maguire" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "One of my most productive days was throwing away 1000 lines of code.", author: "Ken Thompson" },
  { text: "There are only two hard things in Computer Science: cache invalidation and naming things.", author: "Phil Karlton" },
  { text: "Java is to JavaScript what car is to Carpet.", author: "Chris Heilmann" },
  { text: "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.", author: "John Woods" },
  { text: "Computers are good at following instructions, but not at reading your mind.", author: "Donald Knuth" },
  { text: "If debugging is the process of removing software bugs, then programming must be the process of putting them in.", author: "Edsger W. Dijkstra" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
  { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
  { text: "In order to be irreplaceable one must always be different.", author: "Coco Chanel" },
  { text: "Knowledge is power.", author: "Francis Bacon" },
  { text: "Optimism is an occupational hazard of programming: feedback is the treatment.", author: "Kent Beck" },
  { text: "Make it simple, but significant.", author: "Don Draper" },
  { text: "Strive for simplicity, not complexity.", author: "Unknown" },
  { text: "The best thing about a boolean is even if you are wrong, you are only off by a bit.", author: "Unknown" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Testing leads to failure, and failure leads to understanding.", author: "Dino Esposito" },
  { text: "Perfect practice makes perfect.", author: "Vince Lombardi" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "You can't have a great software product without a great team.", author: "Unknown" },
  { text: "Walking on water and developing software from a specification are easy if both are frozen.", author: "Edward V. Berard" },
  { text: "The most disastrous thing that you can do is learn your first programming language perfectly.", author: "Alan Perlis" },
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  { text: "The function of good software is to make the complex appear simple.", author: "Grady Booch" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "Clean code always looks like it was written by someone who cares.", author: "Michael Feathers" },
];

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
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
  return lines;
}

export async function GET() {
  const quote = DEVELOPER_QUOTES[Math.floor(Math.random() * DEVELOPER_QUOTES.length)];
  const lines = wrapText(`"${quote.text}"`, 62);

  // Bug #6 fix: SVG height was fixed at 150px causing text to clip for long quotes (4+ lines).
  // Dynamically calculate height based on number of wrapped lines (min 150, 24px per extra line).
  const lineHeight = 22;
  const baseHeight = 150;
  const contentLines = lines.length;
  // Base layout uses ~3 lines. For each extra line beyond 3 add 24px to height.
  const extraLines = Math.max(0, contentLines - 3);
  const svgHeight = baseHeight + extraLines * lineHeight;

  // startY positions the text block vertically centered within the content area
  const startY = Math.round(svgHeight * 0.45 - ((contentLines - 1) * lineHeight) / 2);

  const tspanElements = lines
    .map((line, idx) => `<tspan x="55" dy="${idx === 0 ? 0 : lineHeight}">${line}</tspan>`)
    .join("");

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="${svgHeight}" viewBox="0 0 600 ${svgHeight}">
    <defs>
      <linearGradient id="crest-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#cc785c" />
        <stop offset="100%" stop-color="#e8a55a" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" rx="12" fill="#faf9f5" stroke="#e6dfd8" stroke-width="1.5"/>
    <g>
      <!-- Sleek Branding Tag -->
      <text x="570" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="url(#crest-grad)" letter-spacing="1px" text-anchor="end">PROFILECREST</text>
      
      <!-- Big Decorative Quote Mark -->
      <text x="30" y="52" font-family="Georgia, serif" font-size="32" font-weight="700" fill="#cc785c" opacity="0.35">&#8220;</text>
      
      <!-- Multi-line SVG-compatible text representation -->
      <text x="55" y="${startY}" font-family="Georgia, 'Times New Roman', serif" font-size="15" fill="#141413" font-style="italic">
        ${tspanElements}
      </text>
      
      <!-- Styled Author attribution -->
      <text x="570" y="${svgHeight - 25}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" font-weight="600" fill="#cc785c" text-anchor="end">— ${quote.author}</text>
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
