import { FormState } from "@/store/formStore";
import { techStack } from "@/data/techStack";
import { socialLinks, donationLinks } from "@/data/links";
import { themePresets } from "@/data/presets";

function encode(str: string) {
  return encodeURIComponent(str);
}

// Sub-component builders
function buildAbout(f: FormState): string {
  const aboutItems: string[] = [];
  if (f.currentlyWorkingOn) aboutItems.push(`- 🔭 I'm currently working on **${f.currentlyWorkingOn}**`);
  if (f.currentlyLearning) aboutItems.push(`- 🌱 I'm currently learning **${f.currentlyLearning}**`);
  if (f.collaborateOn) aboutItems.push(`- 👯 I'm looking to collaborate on **${f.collaborateOn}**`);
  if (f.helpWith) aboutItems.push(`- 🤝 I'm looking for help with **${f.helpWith}**`);
  if (f.askMeAbout) aboutItems.push(`- 💬 Ask me about **${f.askMeAbout}**`);
  if (f.reachMeAt) aboutItems.push(`- 📫 How to reach me **${f.reachMeAt}**`);
  if (f.portfolioUrl) aboutItems.push(`- 👨‍💻 All of my projects are available at [${f.portfolioUrl}](${f.portfolioUrl})`);
  if (f.funFact) aboutItems.push(`- ⚡ Fun fact **${f.funFact}**`);
  if (f.pronouns) aboutItems.push(`- 😄 Pronouns: **${f.pronouns}**`);

  return aboutItems.join("\n");
}

function buildAboutHtml(f: FormState): string {
  const aboutItems: string[] = [];
  if (f.currentlyWorkingOn) aboutItems.push(`• 🔭 I'm currently working on <b>${f.currentlyWorkingOn}</b>`);
  if (f.currentlyLearning) aboutItems.push(`• 🌱 I'm currently learning <b>${f.currentlyLearning}</b>`);
  if (f.collaborateOn) aboutItems.push(`• 👯 I'm looking to collaborate on <b>${f.collaborateOn}</b>`);
  if (f.helpWith) aboutItems.push(`• 🤝 I'm looking for help with <b>${f.helpWith}</b>`);
  if (f.askMeAbout) aboutItems.push(`• 💬 Ask me about <b>${f.askMeAbout}</b>`);
  if (f.reachMeAt) aboutItems.push(`• 📫 How to reach me <b>${f.reachMeAt}</b>`);
  if (f.portfolioUrl) aboutItems.push(`• 👨‍💻 All of my projects are available at <a href="${f.portfolioUrl}" target="_blank">${f.portfolioUrl}</a>`);
  if (f.funFact) aboutItems.push(`• ⚡ Fun fact <b>${f.funFact}</b>`);
  if (f.pronouns) aboutItems.push(`• 😄 Pronouns: <b>${f.pronouns}</b>`);

  return aboutItems.join("<br/>\n");
}

function buildSocialBadges(f: FormState, usePresetColor: boolean, presetBadgeColor: string | null): string {
  const socialBadges = socialLinks.flatMap((s) => {
    const handle = f.socials[s.id as keyof typeof f.socials];
    if (!handle) return [];
    const url = s.urlPrefix + handle;
    const color = usePresetColor && presetBadgeColor ? presetBadgeColor : s.color;
    return [`<a href="${url}" target="_blank"><img src="https://img.shields.io/badge/${encode(s.name)}-${color}?style=for-the-badge&logo=${s.logo}&logoColor=white" alt="${s.name}" /></a>`];
  });

  const customSocialBadges = (f.customSocials || []).map((cs) => {
    const color = usePresetColor && presetBadgeColor ? presetBadgeColor : cs.color;
    return `<a href="${cs.url}" target="_blank"><img src="https://img.shields.io/badge/${encode(cs.name)}-${color}?style=for-the-badge" alt="${cs.name}" /></a>`;
  });

  const allSocialBadges = [...socialBadges, ...customSocialBadges];
  return allSocialBadges.join("\n");
}

function buildTechBadges(f: FormState, usePresetColor: boolean, presetBadgeColor: string | null): string {
  const badges = f.techStack.flatMap((id) => {
    const t = techStack.find((item) => item.id === id);
    if (!t) return [];
    const color = usePresetColor && presetBadgeColor ? presetBadgeColor : t.color;
    return [`<img src="https://img.shields.io/badge/${encode(t.name)}-${color}.svg?style=for-the-badge&logo=${t.slug}&logoColor=white" alt="${t.name}"/>`];
  });

  const customBadges = (f.customTech || []).map((ct) => {
    const color = usePresetColor && presetBadgeColor ? presetBadgeColor : ct.color;
    return `<img src="https://img.shields.io/badge/${encode(ct.name)}-${color}.svg?style=for-the-badge" alt="${ct.name}"/>`;
  });

  return [...badges, ...customBadges].join("\n");
}

function buildDonationBadges(f: FormState): string {
  return donationLinks
    .flatMap((d) => {
      const handle = f.donations[d.id as keyof typeof f.donations];
      if (!handle) return [];
      const url = d.urlPrefix + handle;
      return [`<a href="${url}"><img src="https://img.shields.io/badge/${encode(d.name)}-${d.color}?style=for-the-badge&logo=${d.logo}&logoColor=white" alt="${d.name}"/></a>`];
    })
    .join("\n");
}

function buildShowcaseContent(f: FormState): string {
  if (!f.showcaseProjects || f.showcaseProjects.length === 0) return "";
  
  let md = "";
  f.showcaseProjects.forEach((p) => {
    md += `\n<h4>📁 <a href="${p.url || "#"}">${p.name}</a></h4>\n`;
    if (p.description) md += `<p>${p.description}</p>\n`;
    if (p.techTags) md += `<p><sub><b>Built with:</b> ${p.techTags}</sub></p>\n`;
  });
  return md;
}

// Bug #3 fix: maps a stats theme name to the activity graph's theme format
function toActivityGraphTheme(theme: string): string {
  if (theme === "tokyonight") return "tokyo-night";
  if (theme === "dracula") return "dracula";
  if (theme === "github_dark" || theme === "github_dark_dimmed") return "github-dark";
  // If the theme is already a valid activity-graph theme (like 'react', 'vue', etc.), return it as is
  const validGraphThemes = [
    "default", "react", "react-dark", "github", "github-compact", 
    "xcode", "rogue", "merko", "vue", "tokyo-night", "high-contrast"
  ];
  if (validGraphThemes.includes(theme)) {
    return theme;
  }
  return "github-compact";
}

export function generateMarkdown(f: FormState, baseUrl: string = "https://profile-crest.vercel.app"): string {
  // 1. Resolve Theme Presets values
  const activePreset = themePresets.find((p) => p.id === f.themePreset) || themePresets[0];
  const usePresetColor = f.themePreset !== "default";

  const badgeColor = usePresetColor ? activePreset.badgeColor : null;
  const statsTheme = usePresetColor ? activePreset.statsTheme : f.stats.statsTheme;
  const languagesTheme = usePresetColor ? activePreset.statsTheme : f.stats.languagesTheme;
  const streakTheme = usePresetColor ? activePreset.statsTheme : f.stats.streakTheme;
  const trophyTheme = usePresetColor ? activePreset.trophyTheme : f.stats.trophyTheme;
  const visitorColor = usePresetColor ? activePreset.visitorColor : f.visitorCounter.color;
  // Activity graph theme: use preset's statsTheme (mapped) when a preset is active,
  // otherwise use the user's own activityGraphTheme selection from step 4.
  const activityGraphTheme = toActivityGraphTheme(
    usePresetColor ? activePreset.statsTheme : f.stats.activityGraphTheme
  );

  // Render layouts
  if (f.layoutPreset === "bento") {
    let md = "";

    // Visitor Counter at top
    if (f.visitorCounter.enabled && f.username) {
      md += `<p align="left"> <img src="https://komarev.com/ghpvc/?username=${f.username}&label=Profile%20views&color=${visitorColor}&style=flat" alt="${f.username}" /> </p>\n\n`;
    }

    // Header
    const displayName = f.name || f.username || "Your Name";
    md += `<h1 align="center">Hi 👋, I'm ${displayName}</h1>\n`;
    if (f.subtitle) {
      md += `<h3 align="center">${f.subtitle}</h3>\n`;
    }

    // Bento Table Grid
    md += `\n<table border="0" width="100%">\n`;
    md += `  <tr>\n`;
    md += `    <td width="55%" valign="top">\n`;
    md += `      <h3>🔭 Profile summary</h3>\n`;
    const summary = buildAboutHtml(f);
    md += summary || "I am a passionate software developer.";
    md += `\n    </td>\n`;
    md += `    <td width="45%" valign="top" align="center">\n`;
    md += `      <h3>📊 Contributions & stats</h3>\n`;
    if (f.username && f.stats.showStats) {
      md += `      <img src="https://github-readme-stats.vercel.app/api?username=${f.username}&theme=${statsTheme}&hide_border=false&include_all_commits=true&count_private=true&cache_seconds=86400" alt="GitHub Stats" width="100%" />\n`;
    } else {
      md += `      Stats card disabled or username missing\n`;
    }
    md += `    </td>\n`;
    md += `  </tr>\n`;

    // Row 2: Tech stack badges
    const techBadges = buildTechBadges(f, usePresetColor, badgeColor);
    if (techBadges) {
      md += `  <tr>\n`;
      md += `    <td colspan="2" valign="top">\n`;
      md += `      <h3>💻 Languages and Tools</h3>\n`;
      md += `      <p align="left">\n${techBadges}\n</p>\n`;
      md += `    </td>\n`;
      md += `  </tr>\n`;
    }

    // Row 3: Streaks and achievements
    if (f.username && (f.stats.showTrophies || f.stats.showStreak)) {
      md += `  <tr>\n`;
      md += `    <td colspan="2" valign="top">\n`;
      md += `      <h3>🏆 Achievements & streaks</h3>\n`;
      md += `      <p align="left">\n`;
      if (f.stats.showTrophies) {
        md += `        <a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://github-profile-trophy.vercel.app/?username=${f.username}&theme=${trophyTheme}" alt="Trophies" /></a><br/><br/>\n`;
      }
      if (f.stats.showStreak) {
        md += `        <img src="https://streak-stats.demolab.com/?user=${f.username}&theme=${streakTheme}&hide_border=false&cache_seconds=86400" alt="Streak Stats" />\n`;
      }
      md += `      </p>\n`;
      md += `    </td>\n`;
      md += `  </tr>\n`;
    }

    // Row 4: Highlighted Projects
    const showcaseStr = buildShowcaseContent(f);
    if (showcaseStr) {
      md += `  <tr>\n`;
      md += `    <td colspan="2" valign="top">\n`;
      md += `      <h3>📁 Featured Projects</h3>\n`;
      md += showcaseStr;
      md += `    </td>\n`;
      md += `  </tr>\n`;
    }

    // Row 5: Socials & Support
    const socialBadges = buildSocialBadges(f, usePresetColor, badgeColor);
    const donationBadges = buildDonationBadges(f);
    if (socialBadges || donationBadges) {
      md += `  <tr>\n`;
      md += `    <td width="50%" valign="top">\n`;
      if (socialBadges) {
        md += `      <h3>🌐 Connect with me</h3>\n`;
        md += `      <p align="left">\n${socialBadges}\n</p>\n`;
      }
      md += `    </td>\n`;
      md += `    <td width="50%" valign="top">\n`;
      if (donationBadges) {
        md += `      <h3>💰 Support my work</h3>\n`;
        md += `      <p align="left">\n${donationBadges}\n</p>\n`;
      }
      md += `    </td>\n`;
      md += `  </tr>\n`;
    }
    md += `</table>\n\n`;

    // Activity graph
    if (f.stats.showActivityGraph && f.username) {
      md += `\n### 📈 Weekly Contribution Graph\n\n`;
      md += `[![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${f.username}&theme=${activityGraphTheme})](https://github.com/ashutosh00710/github-readme-activity-graph)\n`;
    }

    // Meme and Quote
    if (f.fun.showQuote) {
      md += `\n<p align="center"><img src="${baseUrl}/api/quote" alt="Quote" /></p>\n`;
    }
    if (f.fun.showMeme) {
      md += `\n### 😄 Random Dev Meme\n\n<img src="${baseUrl}/api/meme" style="height: 400px;" alt="Random meme"/>\n`;
    }

    return md.trim();
  }

  if (f.layoutPreset === "resume") {
    let md = "";

    // Name & subtitle
    const displayName = f.name || f.username || "Your Name";
    md += `<h1 align="center">${displayName}</h1>\n`;
    if (f.subtitle) {
      md += `<h3 align="center">${f.subtitle}</h3>\n\n`;
    }

    // Quick contact details header
    const contactInfo: string[] = [];
    if (f.reachMeAt) contactInfo.push(`📧 Email: [${f.reachMeAt}](mailto:${f.reachMeAt})`);
    if (f.portfolioUrl) contactInfo.push(`🌐 Portfolio: [${f.portfolioUrl}](${f.portfolioUrl})`);
    if (f.pronouns) contactInfo.push(`💬 Pronouns: **${f.pronouns}**`);
    if (contactInfo.length > 0) {
      md += `<p align="center">${contactInfo.join(" &nbsp;•&nbsp; ")}</p>\n\n`;
    }

    // Professional summary / About me
    md += `## 🚀 Professional Summary\n`;
    const summary = buildAbout(f);
    md += summary ? summary : "I am a skilled developer looking to create impactful software solutions.";
    md += "\n\n";

    // Core Technologies
    const techBadges = buildTechBadges(f, usePresetColor, badgeColor);
    if (techBadges) {
      md += `## 💻 Core Technologies\n<p align="left">\n${techBadges}\n</p>\n\n`;
    }

    // Featured Highlights
    const showcaseStr = buildShowcaseContent(f);
    if (showcaseStr) {
      md += `## 📁 Highlighted Projects\n${showcaseStr}\n`;
    }

    // Professional Connections
    const socialBadges = buildSocialBadges(f, usePresetColor, badgeColor);
    if (socialBadges) {
      md += `## 🌐 Professional Profiles\n<p align="left">\n${socialBadges}\n</p>\n\n`;
    }

    // GitHub stats summary
    if (f.username && (f.stats.showStats || f.stats.showStreak || f.stats.showTrophies)) {
      md += `## 📈 GitHub Metrics\n<p align="left">\n`;
      if (f.stats.showStats) {
        md += `  <img align="center" src="https://github-readme-stats.vercel.app/api?username=${f.username}&theme=${statsTheme}&hide_border=false&include_all_commits=true&count_private=true&cache_seconds=86400" alt="GitHub Stats" /><br/><br/>\n`;
      }
      if (f.stats.showStreak) {
        md += `  <img align="center" src="https://streak-stats.demolab.com/?user=${f.username}&theme=${streakTheme}&hide_border=false&cache_seconds=86400" alt="Streak Stats" /><br/><br/>\n`;
      }
      md += `</p>\n`;
    }

    // Donations
    const donationBadges = buildDonationBadges(f);
    if (donationBadges) {
      md += `## 💰 Support my open source journey\n<p align="left">\n${donationBadges}\n</p>\n`;
    }

    return md.trim();
  }

  // CLASSIC VERTICAL LAYOUT (Standard Stack)
  let md = "";

  // Visitor Counter
  if (f.visitorCounter.enabled && f.username) {
    md += `<p align="left"> <img src="https://komarev.com/ghpvc/?username=${f.username}&label=Profile%20views&color=${visitorColor}&style=flat" alt="${f.username}" /> </p>\n\n`;
  }

  // Header
  const displayName = f.name || f.username || "Your Name";
  md += `<h1 align="center">Hi 👋, I'm ${displayName}</h1>\n`;

  if (f.subtitle) {
    md += `<h3 align="center">${f.subtitle}</h3>\n`;
  }

  // Trophy section
  if (f.stats.showTrophies && f.username) {
    md += `\n<p align="left"> <a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://github-profile-trophy.vercel.app/?username=${f.username}&theme=${trophyTheme}" alt="${f.username}" /></a> </p>\n`;
  }

  // About summary
  const summary = buildAbout(f);
  if (summary) {
    md += `\n${summary}\n`;
  }

  // Fun: Quote
  if (f.fun.showQuote) {
    md += `\n<p align="center"><img src="${baseUrl}/api/quote" alt="Quote" /></p>\n`;
  }

  // Social connections
  const socialBadges = buildSocialBadges(f, usePresetColor, badgeColor);
  if (socialBadges) {
    md += `\n<h3 align="left">Connect with me:</h3>\n<p align="left">\n${socialBadges}\n</p>\n`;
  }

  // Tech stack
  const techBadges = buildTechBadges(f, usePresetColor, badgeColor);
  if (techBadges) {
    md += `\n<h3 align="left">Languages and Tools:</h3>\n<p align="left">\n${techBadges}\n</p>\n`;
  }

  // Highlights
  const showcaseStr = buildShowcaseContent(f);
  if (showcaseStr) {
    md += `\n<h3 align="left">Featured Projects:</h3>\n${showcaseStr}\n`;
  }

  // GitHub Stats
  if (f.username && (f.stats.showStats || f.stats.showTopLanguages || f.stats.showStreak)) {
    md += `\n<h3 align="left">GitHub Stats:</h3>\n<p align="left">\n`;
    if (f.stats.showStats) {
      md += `<img align="center" src="https://github-readme-stats.vercel.app/api?username=${f.username}&theme=${statsTheme}&hide_border=false&include_all_commits=true&count_private=true&cache_seconds=86400" alt="GitHub Stats" /><br/>\n`;
    }
    if (f.stats.showTopLanguages) {
      md += `<img align="center" src="https://github-readme-stats.vercel.app/api/top-langs?username=${f.username}&theme=${languagesTheme}&hide_border=false&include_all_commits=true&count_private=true&layout=compact&cache_seconds=86400" alt="Top Languages" /><br/>\n`;
    }
    if (f.stats.showStreak) {
      md += `<img align="center" src="https://streak-stats.demolab.com/?user=${f.username}&theme=${streakTheme}&hide_border=false&cache_seconds=86400" alt="GitHub Streak" /><br/>\n`;
    }
    md += `</p>\n`;
  }

  // Activity Graph
  if (f.stats.showActivityGraph && f.username) {
    md += `\n[![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${f.username}&theme=${activityGraphTheme})](https://github.com/ashutosh00710/github-readme-activity-graph)\n`;
  }

  // Meme
  if (f.fun.showMeme) {
    md += `\n<h3 align="left">Random Dev Meme:</h3>\n<img src="${baseUrl}/api/meme" style="height: 400px;" alt="Random meme"/>\n`;
  }

  // Support
  const donationBadges = buildDonationBadges(f);
  if (donationBadges) {
    md += `\n<h3 align="left">Support me:</h3>\n<p align="left">\n${donationBadges}\n</p>\n`;
  }

  return md.trim();
}
