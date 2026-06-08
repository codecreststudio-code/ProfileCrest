export interface ThemePreset {
  id: string;
  name: string;
  badgeColor: string; // HEX code for Shields.io (no #)
  statsTheme: string; // Anurag Hazra stats theme
  trophyTheme: string;
  visitorColor: string;
}

export const themePresets: ThemePreset[] = [
  {
    id: "default",
    name: "Standard Dark (Default)",
    badgeColor: "339933",
    statsTheme: "tokyonight",
    trophyTheme: "radical",
    visitorColor: "brightgreen",
  },
  {
    id: "tokyonight",
    name: "Tokyo Night (Neon Purple/Blue)",
    badgeColor: "7aa2f7",
    statsTheme: "tokyonight",
    trophyTheme: "tokyonight",
    visitorColor: "blue",
  },
  {
    id: "dracula",
    name: "Dracula (Vampire Pink/Purple)",
    badgeColor: "ff79c6",
    statsTheme: "dracula",
    trophyTheme: "dracula",
    visitorColor: "ff69b4",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk / Outrun (Neon Fuchsia)",
    badgeColor: "ff0055",
    statsTheme: "radical",
    trophyTheme: "radical",
    visitorColor: "orange",
  },
  {
    id: "nord",
    name: "Nord Ice (Arctic Clean Blue)",
    badgeColor: "88c0d0",
    statsTheme: "nord",
    trophyTheme: "nord",
    visitorColor: "blue",
  },
  {
    id: "monokai",
    name: "Monokai Retro (Vibrant Magenta/Yellow)",
    badgeColor: "f92672",
    statsTheme: "monokai",
    trophyTheme: "monokai",
    visitorColor: "yellow",
  },
  {
    id: "emerald",
    name: "Emerald Grass (Fresh Green)",
    badgeColor: "10b981",
    statsTheme: "vue",
    trophyTheme: "vue",
    visitorColor: "green",
  },
  {
    id: "minimalist-light",
    name: "Minimalist Light (Clean Gray)",
    badgeColor: "7f8c8d",
    statsTheme: "github_light",
    trophyTheme: "flat",
    visitorColor: "lightgrey",
  },
  {
    id: "matrix-terminal",
    name: "Matrix Terminal (Retro Green)",
    badgeColor: "00ff00",
    statsTheme: "matrix",
    trophyTheme: "matrix",
    visitorColor: "brightgreen",
  },
  {
    id: "warm-cream",
    name: "Warm Cream (ProfileCrest Brand)",
    badgeColor: "cc785c",
    statsTheme: "gruvbox",
    trophyTheme: "gruvbox",
    visitorColor: "orange",
  },
];
