import { create } from "zustand";

export interface CustomTech {
  id: string;
  name: string;
  color: string;
}

export interface CustomSocial {
  id: string;
  name: string;
  url: string;
  color: string;
}

export interface Socials {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  youtube: string;
  devto: string;
  medium: string;
  hashnode: string;
  stackoverflow: string;
  codepen: string;
  kaggle: string;
  discord: string;
  reddit: string;
  twitch: string;
  codesandbox: string;
  dribbble: string;
  behance: string;
  facebook: string;
  threads: string;
  bluesky: string;
  mastodon: string;
  gitlab: string;
  bitbucket: string;
  jsfiddle: string;
  codeforces: string;
  leetcode: string;
  geeksforgeeks: string;
  producthunt: string;
  hackernews: string;
  whatsapp: string;
  telegram: string;
}

export interface Stats {
  showStats: boolean;
  statsTheme: string;
  showTopLanguages: boolean;
  languagesTheme: string;
  showStreak: boolean;
  streakTheme: string;
  showTrophies: boolean;
  trophyTheme: string;
  showActivityGraph: boolean;
  activityGraphTheme: string;
}

export interface VisitorCounter {
  enabled: boolean;
  color: string;
}

export interface Donations {
  buymeacoffee: string;
  kofi: string;
  patreon: string;
  paypal: string;
  liberapay: string;
  razorpay: string;
}

export interface Fun {
  showMeme: boolean;
  showQuote: boolean;
  quoteTheme: string;
  showJoke: boolean;
  jokeTheme: string;
}

export interface FormState {
  // Step 1 Basic Info
  username: string;
  name: string;
  subtitle: string;
  currentlyWorkingOn: string;
  currentlyLearning: string;
  collaborateOn: string;
  helpWith: string;
  askMeAbout: string;
  funFact: string;
  reachMeAt: string;
  pronouns: string;
  portfolioUrl: string;

  // Presets & Layout
  themePreset: string;
  layoutPreset: 'classic' | 'bento' | 'resume';
  showcaseProjects: { id: string; name: string; description: string; url: string; techTags: string }[];

  // Step 2 Socials
  socials: Socials;
  customSocials: CustomSocial[];

  // Step 3 Tech stack
  techStack: string[];
  customTech: CustomTech[];

  // Step 4 Stats
  stats: Stats;

  // Step 5 Visitor
  visitorCounter: VisitorCounter;

  // Step 6 Donations
  donations: Donations;

  // Step 7 Fun
  fun: Fun;

  // Advanced Features State
  customTheme: {
    enabled: boolean;
    badgeColor: string;
    cardBg: string;
    cardTitle: string;
    cardText: string;
    cardIcon: string;
  };
  bentoOrder: string[];
  wakatime: {
    show: boolean;
    username: string;
    theme: string;
  };
  blogFeed: {
    show: boolean;
    platform: string;
    username: string;
    limit: number;
  };
  language: "en" | "es" | "hi";
  statsToggles: {
    hideRank: boolean;
    showIcons: boolean;
    includeAllCommits: boolean;
    langsLayout: 'compact' | 'donut';
  };
  lanyard: {
    show: boolean;
    userId: string;
    theme: string;
  };
  techProficiencies: Record<string, number>;
  includeWatermark: boolean;
}

export interface FormActions {
  setField: (key: keyof Omit<FormState, "socials" | "customSocials" | "techStack" | "customTech" | "stats" | "visitorCounter" | "donations" | "fun" | "showcaseProjects" | "customTheme" | "bentoOrder" | "wakatime" | "blogFeed" | "language" | "statsToggles" | "lanyard" | "techProficiencies" | "includeWatermark">, value: string) => void;
  setSocial: (key: keyof Socials, value: string) => void;
  addCustomSocial: (name: string, url: string, color: string) => void;
  removeCustomSocial: (id: string) => void;
  toggleTech: (id: string) => void;
  addCustomTech: (name: string, color: string) => void;
  removeCustomTech: (id: string) => void;
  setStats: (update: Partial<Stats>) => void;
  setVisitorCounter: (update: Partial<VisitorCounter>) => void;
  setDonation: (key: keyof Donations, value: string) => void;
  setFun: (update: Partial<Fun>) => void;
  setThemePreset: (preset: string) => void;
  setLayoutPreset: (layout: 'classic' | 'bento' | 'resume') => void;
  addShowcaseProject: (name: string, description: string, url: string, techTags: string) => void;
  removeShowcaseProject: (id: string) => void;
  setCustomTheme: (update: Partial<FormState["customTheme"]>) => void;
  setBentoOrder: (order: string[]) => void;
  setWakaTime: (update: Partial<FormState["wakatime"]>) => void;
  setBlogFeed: (update: Partial<FormState["blogFeed"]>) => void;
  setLanguage: (lang: "en" | "es" | "hi") => void;
  setStatsToggles: (update: Partial<FormState["statsToggles"]>) => void;
  setLanyard: (update: Partial<FormState["lanyard"]>) => void;
  setTechProficiency: (techId: string, level: number) => void;
  setIncludeWatermark: (val: boolean) => void;
  reset: () => void;
}

const defaultState: FormState = {
  username: "",
  name: "",
  subtitle: "",
  currentlyWorkingOn: "",
  currentlyLearning: "",
  collaborateOn: "",
  helpWith: "",
  askMeAbout: "",
  funFact: "",
  reachMeAt: "",
  pronouns: "",
  portfolioUrl: "",
  themePreset: "default",
  layoutPreset: "classic",
  showcaseProjects: [],
  socials: {
    github: "", linkedin: "", twitter: "", instagram: "",
    youtube: "", devto: "", medium: "", hashnode: "",
    stackoverflow: "", codepen: "", kaggle: "", discord: "",
    reddit: "", twitch: "", codesandbox: "", dribbble: "", behance: "",
    facebook: "", threads: "", bluesky: "", mastodon: "", gitlab: "",
    bitbucket: "", jsfiddle: "", codeforces: "", leetcode: "", geeksforgeeks: "",
    producthunt: "", hackernews: "", whatsapp: "", telegram: "",
  },
  customSocials: [],
  techStack: [],
  customTech: [],
  stats: {
    showStats: true,
    statsTheme: "tokyonight",
    showTopLanguages: true,
    languagesTheme: "tokyonight",
    showStreak: true,
    streakTheme: "tokyonight",
    showTrophies: true,
    trophyTheme: "radical",
    showActivityGraph: false,
    activityGraphTheme: "github-compact",
  },
  visitorCounter: {
    enabled: true,
    color: "brightgreen",
  },
  donations: {
    buymeacoffee: "", kofi: "", patreon: "", paypal: "", liberapay: "", razorpay: "",
  },
  fun: {
    showMeme: false,
    showQuote: false,
    quoteTheme: "dark",
    showJoke: false,
    jokeTheme: "dark",
  },
  customTheme: {
    enabled: false,
    badgeColor: "cc785c",
    cardBg: "faf9f5",
    cardTitle: "cc785c",
    cardText: "141413",
    cardIcon: "cc785c",
  },
  bentoOrder: ["about_stats", "tech", "achievements", "showcase", "connect_support"],
  wakatime: {
    show: false,
    username: "",
    theme: "tokyonight",
  },
  blogFeed: {
    show: false,
    platform: "medium",
    username: "",
    limit: 5,
  },
  language: "en",
  statsToggles: {
    hideRank: false,
    showIcons: true,
    includeAllCommits: true,
    langsLayout: 'compact',
  },
  lanyard: {
    show: false,
    userId: "",
    theme: "dark",
  },
  techProficiencies: {},
  includeWatermark: true,
};

export const useFormStore = create<FormState & FormActions>((set) => ({
  ...defaultState,
  setField: (key, value) => set({ [key]: value }),
  setSocial: (key, value) =>
    set((s) => ({ socials: { ...s.socials, [key]: value } })),
  addCustomSocial: (name, url, color) =>
    set((s) => ({
      customSocials: [
        ...s.customSocials,
        { id: Date.now().toString(), name, url, color },
      ],
    })),
  removeCustomSocial: (id) =>
    set((s) => ({
      customSocials: s.customSocials.filter((cs) => cs.id !== id),
    })),
  toggleTech: (id) =>
    set((s) => ({
      techStack: s.techStack.includes(id)
        ? s.techStack.filter((t) => t !== id)
        : [...s.techStack, id],
    })),
  addCustomTech: (name, color) =>
    set((s) => ({
      customTech: [
        ...s.customTech,
        { id: Date.now().toString(), name, color },
      ],
    })),
  removeCustomTech: (id) =>
    set((s) => ({
      customTech: s.customTech.filter((ct) => ct.id !== id),
    })),
  setStats: (update) =>
    set((s) => ({ stats: { ...s.stats, ...update } })),
  setVisitorCounter: (update) =>
    set((s) => ({ visitorCounter: { ...s.visitorCounter, ...update } })),
  setDonation: (key, value) =>
    set((s) => ({ donations: { ...s.donations, [key]: value } })),
  setFun: (update) =>
    set((s) => ({ fun: { ...s.fun, ...update } })),
  setThemePreset: (preset) => set({ themePreset: preset }),
  setLayoutPreset: (layout) => set({ layoutPreset: layout }),
  addShowcaseProject: (name, description, url, techTags) =>
    set((s) => ({
      showcaseProjects: [
        ...s.showcaseProjects,
        { id: Date.now().toString(), name, description, url, techTags },
      ],
    })),
  removeShowcaseProject: (id) =>
    set((s) => ({
      showcaseProjects: s.showcaseProjects.filter((p) => p.id !== id),
    })),
  setCustomTheme: (update) => set((s) => ({ customTheme: { ...s.customTheme, ...update } })),
  setBentoOrder: (order) => set({ bentoOrder: order }),
  setWakaTime: (update) => set((s) => ({ wakatime: { ...s.wakatime, ...update } })),
  setBlogFeed: (update) => set((s) => ({ blogFeed: { ...s.blogFeed, ...update } })),
  setLanguage: (lang) => set({ language: lang }),
  setStatsToggles: (update) => set((s) => ({ statsToggles: { ...s.statsToggles, ...update } })),
  setLanyard: (update) => set((s) => ({ lanyard: { ...s.lanyard, ...update } })),
  setTechProficiency: (techId, level) => set((s) => ({
    techProficiencies: { ...s.techProficiencies, [techId]: level }
  })),
  setIncludeWatermark: (val) => set({ includeWatermark: val }),
  reset: () => set(defaultState),
}));
