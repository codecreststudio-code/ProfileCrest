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
}

export interface FormActions {
  setField: (key: keyof Omit<FormState, "socials" | "customSocials" | "techStack" | "customTech" | "stats" | "visitorCounter" | "donations" | "fun" | "showcaseProjects">, value: string) => void;
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
  },
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
  reset: () => set(defaultState),
}));
