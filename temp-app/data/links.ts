export interface SocialItem {
  id: string;
  name: string;
  placeholder: string;
  urlPrefix: string;
  color: string;
  logo: string;
}

export const socialLinks: SocialItem[] = [
  { id: "github", name: "GitHub", placeholder: "yourusername", urlPrefix: "https://github.com/", color: "181717", logo: "github" },
  { id: "linkedin", name: "LinkedIn", placeholder: "yourusername", urlPrefix: "https://linkedin.com/in/", color: "0077B5", logo: "linkedin" },
  { id: "twitter", name: "Twitter / X", placeholder: "yourusername", urlPrefix: "https://twitter.com/", color: "1DA1F2", logo: "twitter" },
  { id: "instagram", name: "Instagram", placeholder: "yourusername", urlPrefix: "https://instagram.com/", color: "E4405F", logo: "instagram" },
  { id: "youtube", name: "YouTube", placeholder: "yourchannel", urlPrefix: "https://youtube.com/c/", color: "FF0000", logo: "youtube" },
  { id: "devto", name: "Dev.to", placeholder: "yourusername", urlPrefix: "https://dev.to/", color: "0A0A0A", logo: "devdotto" },
  { id: "medium", name: "Medium", placeholder: "yourusername", urlPrefix: "https://medium.com/@", color: "12100E", logo: "medium" },
  { id: "hashnode", name: "Hashnode", placeholder: "yourusername", urlPrefix: "https://hashnode.com/@", color: "2962FF", logo: "hashnode" },
  { id: "stackoverflow", name: "Stack Overflow", placeholder: "userid/yourname", urlPrefix: "https://stackoverflow.com/users/", color: "FE7A16", logo: "stackoverflow" },
  { id: "codepen", name: "CodePen", placeholder: "yourusername", urlPrefix: "https://codepen.io/", color: "000000", logo: "codepen" },
  { id: "kaggle", name: "Kaggle", placeholder: "yourusername", urlPrefix: "https://www.kaggle.com/", color: "20BEFF", logo: "kaggle" },
  { id: "discord", name: "Discord", placeholder: "yourinvitelink", urlPrefix: "https://discord.gg/", color: "5865F2", logo: "discord" },
  { id: "reddit", name: "Reddit", placeholder: "yourusername", urlPrefix: "https://reddit.com/user/", color: "FF4500", logo: "reddit" },
  { id: "twitch", name: "Twitch", placeholder: "yourusername", urlPrefix: "https://www.twitch.tv/", color: "9146FF", logo: "twitch" },
  { id: "codesandbox", name: "CodeSandbox", placeholder: "yourusername", urlPrefix: "https://codesandbox.io/u/", color: "040404", logo: "codesandbox" },
  { id: "dribbble", name: "Dribbble", placeholder: "yourusername", urlPrefix: "https://dribbble.com/", color: "EA4C89", logo: "dribbble" },
  { id: "behance", name: "Behance", placeholder: "yourusername", urlPrefix: "https://www.behance.net/", color: "1769FF", logo: "behance" },
  { id: "facebook", name: "Facebook", placeholder: "yourusername", urlPrefix: "https://facebook.com/", color: "1877F2", logo: "facebook" },
  { id: "threads", name: "Threads", placeholder: "yourusername", urlPrefix: "https://threads.net/@", color: "000000", logo: "threads" },
  { id: "bluesky", name: "Bluesky", placeholder: "yourusername.bsky.social", urlPrefix: "https://bsky.app/profile/", color: "0285FF", logo: "bluesky" },
  { id: "mastodon", name: "Mastodon", placeholder: "@yourusername@server", urlPrefix: "https://mastodon.social/", color: "6364FF", logo: "mastodon" },
  { id: "gitlab", name: "GitLab", placeholder: "yourusername", urlPrefix: "https://gitlab.com/", color: "FC6D26", logo: "gitlab" },
  { id: "bitbucket", name: "Bitbucket", placeholder: "yourusername", urlPrefix: "https://bitbucket.org/", color: "0052CC", logo: "bitbucket" },
  { id: "jsfiddle", name: "JSFiddle", placeholder: "yourusername", urlPrefix: "https://jsfiddle.net/user/", color: "4679A4", logo: "jsfiddle" },
  { id: "codeforces", name: "Codeforces", placeholder: "yourhandle", urlPrefix: "https://codeforces.com/profile/", color: "B13030", logo: "codeforces" },
  { id: "leetcode", name: "LeetCode", placeholder: "yourusername", urlPrefix: "https://leetcode.com/u/", color: "FFA116", logo: "leetcode" },
  { id: "geeksforgeeks", name: "GeeksforGeeks", placeholder: "yourusername", urlPrefix: "https://auth.geeksforgeeks.org/user/", color: "2F8D46", logo: "geeksforgeeks" },
  { id: "producthunt", name: "Product Hunt", placeholder: "yourusername", urlPrefix: "https://www.producthunt.com/@", color: "DA552F", logo: "producthunt" },
  { id: "hackernews", name: "Hacker News", placeholder: "yourusername", urlPrefix: "https://news.ycombinator.com/user?id=", color: "FF6600", logo: "ycombinator" },
  { id: "whatsapp", name: "WhatsApp (Phone/Link)", placeholder: "yourphonenumber", urlPrefix: "https://wa.me/", color: "25D366", logo: "whatsapp" },
  { id: "telegram", name: "Telegram", placeholder: "yourusername", urlPrefix: "https://t.me/", color: "26A5E7", logo: "telegram" },
];

export interface DonationItem {
  id: string;
  name: string;
  placeholder: string;
  urlPrefix: string;
  color: string;
  logo: string;
}

export const donationLinks: DonationItem[] = [
  { id: "buymeacoffee", name: "Buy Me a Coffee", placeholder: "yourusername", urlPrefix: "https://buymeacoffee.com/", color: "FFDD00", logo: "buymeacoffee" },
  { id: "kofi", name: "Ko-fi", placeholder: "yourusername", urlPrefix: "https://ko-fi.com/", color: "F16061", logo: "kofi" },
  { id: "patreon", name: "Patreon", placeholder: "yourusername", urlPrefix: "https://patreon.com/", color: "F96854", logo: "patreon" },
  { id: "paypal", name: "PayPal", placeholder: "yourusername", urlPrefix: "https://paypal.me/", color: "00457C", logo: "paypal" },
  { id: "liberapay", name: "Liberapay", placeholder: "yourusername", urlPrefix: "https://liberapay.com/", color: "F6C915", logo: "liberapay" },
  { id: "razorpay", name: "Razorpay (Payment Link)", placeholder: "https://rzp.io/l/yourlink", urlPrefix: "", color: "008ECF", logo: "razorpay" },
];

export const statsThemes = [
  "dark", "radical", "merko", "gruvbox", "tokyonight", "onedark",
  "cobalt", "synthwave", "highcontrast", "dracula", "prussian",
  "monokai", "vue", "vue-dark", "shades-of-purple", "nightowl",
  "buefy", "algolia", "great-gatsby", "darcula", "bear",
  "solarized-dark", "solarized-light", "chartreuse-dark", "nord",
  "gotham", "material-palenight", "graywhite", "ayu-mirage",
  "midnight-purple", "calm", "ocean_dark", "city_lights",
  "github_dark", "github_dark_dimmed", "discord_old_blurple",
  "aura_dark", "panda", "cobalt2", "swift", "default",
];

export const activityGraphThemes = [
  "default",
  "react",
  "react-dark",
  "github",
  "github-compact",
  "xcode",
  "rogue",
  "merko",
  "vue",
  "tokyo-night",
  "high-contrast",
  "dracula",
];
