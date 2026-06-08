import { FormState } from "@/store/formStore";
import { techStack } from "@/data/techStack";
import { socialLinks, donationLinks } from "@/data/links";
import { themePresets } from "@/data/presets";

function encode(str: string) {
  return encodeURIComponent(str);
}

function getProficiencyColor(p: number): string {
  if (p >= 90) return "brightgreen";
  if (p >= 75) return "green";
  if (p >= 60) return "yellowgreen";
  if (p >= 40) return "yellow";
  if (p >= 20) return "orange";
  return "red";
}

function buildStatsParams(f: FormState): string {
  const t = f.statsToggles || { hideRank: false, showIcons: true, includeAllCommits: true };
  const parts: string[] = [];
  parts.push(`hide_border=false`);
  if (t.hideRank) parts.push(`hide_rank=true`);
  if (t.showIcons) parts.push(`show_icons=true`);
  if (t.includeAllCommits) {
    parts.push(`include_all_commits=true`);
    parts.push(`count_private=true`);
  }
  parts.push(`cache_seconds=86400`);
  return parts.join("&");
}

function buildLangsParams(f: FormState): string {
  const t = f.statsToggles || { includeAllCommits: true, langsLayout: 'compact' };
  const parts: string[] = [];
  parts.push(`hide_border=false`);
  if (t.includeAllCommits) {
    parts.push(`include_all_commits=true`);
    parts.push(`count_private=true`);
  }
  parts.push(`layout=${t.langsLayout || 'compact'}`);
  parts.push(`cache_seconds=86400`);
  return parts.join("&");
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
  const style = f.badgeStyle || "for-the-badge";
  const socialBadges = socialLinks.flatMap((s) => {
    const handle = f.socials[s.id as keyof typeof f.socials];
    if (!handle) return [];
    const url = s.urlPrefix + handle;
    const color = f.customTheme.enabled 
      ? f.customTheme.badgeColor.replace("#", "") 
      : (usePresetColor && presetBadgeColor ? presetBadgeColor : s.color);
    return [`<a href="${url}" target="_blank"><img src="https://img.shields.io/badge/${encode(s.name)}-${color}?style=${style}&logo=${s.logo}&logoColor=white" alt="${s.name}" /></a>`];
  });

  const customSocialBadges = (f.customSocials || []).map((cs) => {
    const color = f.customTheme.enabled 
      ? f.customTheme.badgeColor.replace("#", "") 
      : (usePresetColor && presetBadgeColor ? presetBadgeColor : cs.color);
    return `<a href="${cs.url}" target="_blank"><img src="https://img.shields.io/badge/${encode(cs.name)}-${color}?style=${style}" alt="${cs.name}" /></a>`;
  });

  const allSocialBadges = [...socialBadges, ...customSocialBadges];
  return allSocialBadges.join("\n");
}

function buildTechBadges(f: FormState, usePresetColor: boolean, presetBadgeColor: string | null): string {
  const style = f.badgeStyle || "for-the-badge";
  const badges = f.techStack.flatMap((id) => {
    const t = techStack.find((item) => item.id === id);
    if (!t) return [];
    const color = f.customTheme.enabled 
      ? f.customTheme.badgeColor.replace("#", "") 
      : (usePresetColor && presetBadgeColor ? presetBadgeColor : t.color);
    const mainBadge = `<img src="https://img.shields.io/badge/${encode(t.name)}-${color}.svg?style=${style}&logo=${t.slug}&logoColor=white" alt="${t.name}"/>`;
    
    const proficiency = f.techProficiencies ? f.techProficiencies[id] : undefined;
    if (proficiency && proficiency > 0) {
      const progColor = getProficiencyColor(proficiency);
      const progBadge = `<img src="https://img.shields.io/badge/Proficiency-${proficiency}%25-${progColor}?style=flat-square" alt="${proficiency}%"/>`;
      return [`${mainBadge}${progBadge}`];
    }
    return [mainBadge];
  });

  const customBadges = (f.customTech || []).map((ct) => {
    const color = f.customTheme.enabled 
      ? f.customTheme.badgeColor.replace("#", "") 
      : (usePresetColor && presetBadgeColor ? presetBadgeColor : ct.color);
    const mainBadge = `<img src="https://img.shields.io/badge/${encode(ct.name)}-${color}.svg?style=${style}" alt="${ct.name}"/>`;
    
    const proficiency = f.techProficiencies ? f.techProficiencies[ct.id] : undefined;
    if (proficiency && proficiency > 0) {
      const progColor = getProficiencyColor(proficiency);
      const progBadge = `<img src="https://img.shields.io/badge/Proficiency-${proficiency}%25-${progColor}?style=flat-square" alt="${proficiency}%"/>`;
      return `${mainBadge}${progBadge}`;
    }
    return mainBadge;
  });

  return [...badges, ...customBadges].join("\n");
}

function buildDonationBadges(f: FormState): string {
  const style = f.badgeStyle || "for-the-badge";
  return donationLinks
    .flatMap((d) => {
      const handle = f.donations[d.id as keyof typeof f.donations];
      if (!handle) return [];
      const url = d.urlPrefix + handle;
      const color = f.customTheme.enabled 
        ? f.customTheme.badgeColor.replace("#", "") 
        : d.color;
      return [`<a href="${url}"><img src="https://img.shields.io/badge/${encode(d.name)}-${color}?style=${style}&logo=${d.logo}&logoColor=white" alt="${d.name}"/></a>`];
    })
    .join("\n");
}

function buildFutureTechBadges(f: FormState, usePresetColor: boolean, presetBadgeColor: string | null): string {
  if (!f.futureTech || f.futureTech.length === 0) return "";
  const style = f.badgeStyle || "for-the-badge";
  const badges = f.futureTech.flatMap((id) => {
    const t = techStack.find((item) => item.id === id);
    if (!t) return [];
    const color = f.customTheme.enabled 
      ? f.customTheme.badgeColor.replace("#", "") 
      : (usePresetColor && presetBadgeColor ? presetBadgeColor : t.color);
    return [`<img src="https://img.shields.io/badge/${encode(t.name)}-${color}.svg?style=${style}&logo=${t.slug}&logoColor=white" alt="${t.name}"/>`];
  });
  return badges.join("\n");
}

function buildSpotifyCard(f: FormState): string {
  if (!f.spotify || !f.spotify.show || !f.spotify.trackName) return "";
  const track = encode(f.spotify.trackName);
  const artist = encode(f.spotify.artistName || "Unknown Artist");
  const link = f.spotify.spotifyUrl || "https://open.spotify.com";
  return `<p align="left">\n  <a href="${link}" target="_blank">\n    <img src="https://img.shields.io/badge/Playing%20on%20Spotify-${track}%20--%20${artist}-1DB954?style=for-the-badge&logo=spotify&logoColor=white" alt="Spotify Currently Playing" />\n  </a>\n</p>`;
}

function buildTimeline(f: FormState): string {
  if (!f.timeline || !f.timeline.show || !f.timeline.items || f.timeline.items.length === 0) return "";
  let md = "\n| Period | Event | Description |\n";
  md += "| :--- | :--- | :--- |\n";
  f.timeline.items.forEach((item) => {
    const date = item.date || "";
    const title = item.title || "";
    const desc = item.description || "";
    md += `| **${date}** | ${title} | ${desc} |\n`;
  });
  return md;
}

function buildDevPlatforms(f: FormState): string {
  if (!f.devPlatforms || !f.devPlatforms.show) return "";
  const parts: string[] = [];
  const theme = f.themePreset === "default" ? "tokyonight" : f.themePreset;
  
  if (f.devPlatforms.leetcode) {
    parts.push(`<a href="https://leetcode.com/${f.devPlatforms.leetcode}" target="_blank"><img src="https://github-readme-leetcode.vercel.app/api?username=${f.devPlatforms.leetcode}&theme=${theme}" alt="LeetCode Status" /></a>`);
  }
  if (f.devPlatforms.stackoverflow) {
    parts.push(`<a href="https://stackoverflow.com/users/${f.devPlatforms.stackoverflow}" target="_blank"><img src="https://stackexchange-readme-profile.vercel.app/api?user=${f.devPlatforms.stackoverflow}" alt="StackOverflow Profile" /></a>`);
  }
  if (f.devPlatforms.chess) {
    parts.push(`<a href="https://chess.com/member/${f.devPlatforms.chess}" target="_blank"><img src="https://chess-readme-stats.vercel.app/api?username=${f.devPlatforms.chess}&theme=${theme}" alt="Chess.com Profile" /></a>`);
  }
  
  if (parts.length === 0) return "";
  return `<p align="left">\n${parts.join("\n")}\n</p>`;
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
  const validGraphThemes = [
    "default", "react", "react-dark", "github", "github-compact", 
    "xcode", "rogue", "merko", "vue", "tokyo-night", "high-contrast"
  ];
  if (validGraphThemes.includes(theme)) {
    return theme;
  }
  return "github-compact";
}

function buildWakaTime(f: FormState, useCustom: boolean, defaultTheme: string): string {
  if (!f.wakatime.show || !f.wakatime.username) return "";
  const query = useCustom
    ? `bg_color=${f.customTheme.cardBg.replace("#", "")}&title_color=${f.customTheme.cardTitle.replace("#", "")}&text_color=${f.customTheme.cardText.replace("#", "")}&icon_color=${f.customTheme.cardIcon.replace("#", "")}`
    : `theme=${f.wakatime.theme || defaultTheme}`;
  return `<img src="https://github-readme-stats.vercel.app/api/wakatime?username=${f.wakatime.username}&${query}&hide_border=false" alt="WakaTime Stats" />`;
}

function buildBlogFeed(f: FormState): string {
  if (!f.blogFeed.show) return "";
  return `\n### 📝 Latest Blog Posts\n<!-- START_SECTION:blogs -->\n<!-- END_SECTION:blogs -->\n`;
}

export function generateMarkdown(f: FormState, baseUrl: string = "https://profile-crest.vercel.app"): string {
  // 1. Resolve Theme Presets values
  const activePreset = themePresets.find((p) => p.id === f.themePreset) || themePresets[0];
  const usePresetColor = f.themePreset !== "default";
  const useCustom = f.customTheme.enabled;

  const badgeColor = useCustom 
    ? f.customTheme.badgeColor.replace("#", "")
    : (usePresetColor ? activePreset.badgeColor : null);

  const statsTheme = usePresetColor ? activePreset.statsTheme : f.stats.statsTheme;
  const languagesTheme = usePresetColor ? activePreset.statsTheme : f.stats.languagesTheme;
  const streakTheme = usePresetColor ? activePreset.statsTheme : f.stats.streakTheme;
  const trophyTheme = usePresetColor ? activePreset.trophyTheme : f.stats.trophyTheme;
  const visitorColor = useCustom
    ? f.customTheme.badgeColor.replace("#", "")
    : (usePresetColor ? activePreset.visitorColor : f.visitorCounter.color);

  const activityGraphTheme = toActivityGraphTheme(
    usePresetColor ? activePreset.statsTheme : f.stats.activityGraphTheme
  );

  const customColorQuery = useCustom
    ? `bg_color=${f.customTheme.cardBg.replace("#", "")}&title_color=${f.customTheme.cardTitle.replace("#", "")}&text_color=${f.customTheme.cardText.replace("#", "")}&icon_color=${f.customTheme.cardIcon.replace("#", "")}`
    : null;

  let finalMd = "";

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
    
    const order = f.bentoOrder || ["about_stats", "tech", "achievements", "showcase", "connect_support"];
    order.forEach((blockId) => {
      if (blockId === "about_stats") {
        md += `  <tr>\n`;
        md += `    <td width="55%" valign="top">\n`;
        md += `      <h3>🔭 Profile summary</h3>\n`;
        const summary = buildAboutHtml(f);
        md += summary || "I am a passionate software developer.";
        md += `\n    </td>\n`;
        md += `    <td width="45%" valign="top" align="center">\n`;
        md += `      <h3>📊 Contributions & stats</h3>\n`;
        if (f.username && f.stats.showStats) {
          const query = useCustom && customColorQuery ? customColorQuery : `theme=${statsTheme}`;
          const params = buildStatsParams(f);
          md += `      <img src="https://github-readme-stats.vercel.app/api?username=${f.username}&${query}&${params}" alt="GitHub Stats" width="100%" />\n`;
        } else {
          md += `      Stats card disabled or username missing\n`;
        }
        md += `    </td>\n`;
        md += `  </tr>\n`;
      } else if (blockId === "tech") {
        const techBadges = buildTechBadges(f, usePresetColor || useCustom, badgeColor);
        const futureTechBadges = buildFutureTechBadges(f, usePresetColor || useCustom, badgeColor);
        if (techBadges || futureTechBadges) {
          md += `  <tr>\n`;
          md += `    <td colspan="2" valign="top">\n`;
          md += `      <h3>💻 Languages and Tools</h3>\n`;
          if (techBadges) {
            md += `      <p align="left">\n${techBadges}\n</p>\n`;
          }
          if (futureTechBadges) {
            md += `      <h4>🚀 Future Focus (Skills I am learning):</h4>\n`;
            md += `      <p align="left">\n${futureTechBadges}\n</p>\n`;
          }
          md += `    </td>\n`;
          md += `  </tr>\n`;
        }
      } else if (blockId === "achievements") {
        if (f.username && (f.stats.showTrophies || f.stats.showStreak || f.wakatime.show || f.devPlatforms?.show)) {
          md += `  <tr>\n`;
          md += `    <td colspan="2" valign="top">\n`;
          md += `      <h3>🏆 Achievements, streaks & velocity</h3>\n`;
          md += `      <p align="left">\n`;
          if (f.stats.showTrophies) {
            md += `        <a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://github-profile-trophy.vercel.app/?username=${f.username}&theme=${trophyTheme}" alt="Trophies" /></a><br/><br/>\n`;
          }
          if (f.stats.showStreak) {
            const query = useCustom && customColorQuery ? customColorQuery : `theme=${streakTheme}`;
            md += `        <img src="https://streak-stats.demolab.com/?user=${f.username}&${query}&hide_border=false&cache_seconds=86400" alt="Streak Stats" /><br/><br/>\n`;
          }
          if (f.wakatime.show && f.wakatime.username) {
            md += `        ${buildWakaTime(f, useCustom, statsTheme)}<br/><br/>\n`;
          }
          const devPlat = buildDevPlatforms(f);
          if (devPlat) {
            md += `      </p>\n      <h4>🏆 Coding Profiles</h4>\n      ${devPlat}\n      <p>\n`;
          }
          md += `      </p>\n`;
          md += `    </td>\n`;
          md += `  </tr>\n`;
        }
      } else if (blockId === "showcase") {
        const showcaseStr = buildShowcaseContent(f);
        const timelineStr = buildTimeline(f);
        if (showcaseStr || timelineStr) {
          md += `  <tr>\n`;
          md += `    <td colspan="2" valign="top">\n`;
          if (showcaseStr) {
            md += `      <h3>📁 Featured Projects</h3>\n`;
            md += showcaseStr;
          }
          if (timelineStr) {
            md += `      <h3>📅 Career & Project Timeline</h3>\n`;
            md += timelineStr;
          }
          md += `    </td>\n`;
          md += `  </tr>\n`;
        }
      } else if (blockId === "connect_support") {
        const socialBadges = buildSocialBadges(f, usePresetColor || useCustom, badgeColor);
        const donationBadges = buildDonationBadges(f);
        if (socialBadges || donationBadges) {
          md += `  <tr>\n`;
          md += `    <td width="50%" valign="top">\n`;
          if (socialBadges) {
            md += `      <h3>🌐 Connect with me</h3>\n`;
            md += `      <p align="left">\n${socialBadges}\n</p>\n`;
            if (f.lanyard && f.lanyard.show && f.lanyard.userId) {
              const themeQuery = f.lanyard.theme ? `?theme=${f.lanyard.theme}` : "";
              md += `      <p align="left">\n        <a href="https://discord.com/users/${f.lanyard.userId}" target="_blank">\n          <img src="https://lanyard.vercel.app/api/${f.lanyard.userId}${themeQuery}" alt="Discord Status" width="100%" />\n        </a>\n      </p>\n`;
            }
            const spotifyStr = buildSpotifyCard(f);
            if (spotifyStr) {
              md += `      <h4>🎵 Currently Playing</h4>\n      ${spotifyStr}\n`;
            }
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
      }
    });
    md += `</table>\n\n`;

    // Activity graph
    if (f.stats.showActivityGraph && f.username) {
      md += `\n### 📈 Weekly Contribution Graph\n\n`;
      const query = useCustom
        ? `bg_color=${f.customTheme.cardBg.replace("#", "")}&title_color=${f.customTheme.cardTitle.replace("#", "")}&text_color=${f.customTheme.cardText.replace("#", "")}&line=${f.customTheme.cardIcon.replace("#", "")}&point=${f.customTheme.cardTitle.replace("#", "")}`
        : `theme=${activityGraphTheme}`;
      md += `[![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${f.username}&${query})](https://github.com/ashutosh00710/github-readme-activity-graph)\n`;
    }

    // Blog RSS Feed
    if (f.blogFeed.show) {
      md += buildBlogFeed(f);
    }

    // Meme and Quote and Joke
    if (f.fun.showQuote) {
      md += `\n<p align="center"><img src="${baseUrl}/api/quote?theme=${f.fun.quoteTheme}" alt="Quote" /></p>\n`;
    }
    if (f.fun.showJoke) {
      md += `\n<p align="center"><img src="${baseUrl}/api/joke?theme=${f.fun.jokeTheme || 'dark'}" alt="Developer Joke" /></p>\n`;
    }
    if (f.fun.showMeme) {
      md += `\n### 😄 Random Dev Meme\n\n<img src="${baseUrl}/api/meme" style="height: 400px;" alt="Random meme"/>\n`;
    }

    finalMd = md.trim();
  } else if (f.layoutPreset === "resume") {
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
    const techBadges = buildTechBadges(f, usePresetColor || useCustom, badgeColor);
    if (techBadges) {
      md += `## 💻 Core Technologies\n<p align="left">\n${techBadges}\n</p>\n\n`;
    }
    const futureTech = buildFutureTechBadges(f, usePresetColor || useCustom, badgeColor);
    if (futureTech) {
      md += `### 🚀 Future Focus\n<p align="left">\n${futureTech}\n</p>\n\n`;
    }

    // Featured Highlights
    const showcaseStr = buildShowcaseContent(f);
    if (showcaseStr) {
      md += `## 📁 Highlighted Projects\n${showcaseStr}\n`;
    }
    const timelineStr = buildTimeline(f);
    if (timelineStr) {
      md += `## 📅 Experience & Project Timeline\n${timelineStr}\n\n`;
    }

    // Professional Connections
    const socialBadges = buildSocialBadges(f, usePresetColor || useCustom, badgeColor);
    if (socialBadges) {
      md += `## 🌐 Professional Profiles\n<p align="left">\n${socialBadges}\n</p>\n\n`;
      if (f.lanyard && f.lanyard.show && f.lanyard.userId) {
        const themeQuery = f.lanyard.theme ? `?theme=${f.lanyard.theme}` : "";
        md += `<p align="left">\n  <a href="https://discord.com/users/${f.lanyard.userId}" target="_blank">\n    <img src="https://lanyard.vercel.app/api/${f.lanyard.userId}${themeQuery}" alt="Discord Status" />\n  </a>\n</p>\n\n`;
      }
      const spotifyStr = buildSpotifyCard(f);
      if (spotifyStr) {
        md += `### 🎵 Currently Playing\n${spotifyStr}\n\n`;
      }
    }

    // GitHub stats summary
    if (f.username && (f.stats.showStats || f.stats.showStreak || f.stats.showTrophies || f.wakatime.show)) {
      md += `## 📈 GitHub Metrics\n<p align="left">\n`;
      if (f.stats.showStats) {
        const query = useCustom && customColorQuery ? customColorQuery : `theme=${statsTheme}`;
        const params = buildStatsParams(f);
        md += `  <img align="center" src="https://github-readme-stats.vercel.app/api?username=${f.username}&${query}&${params}" alt="GitHub Stats" /><br/><br/>\n`;
      }
      if (f.stats.showStreak) {
        const query = useCustom && customColorQuery ? customColorQuery : `theme=${streakTheme}`;
        md += `  <img align="center" src="https://streak-stats.demolab.com/?user=${f.username}&${query}&hide_border=false&cache_seconds=86400" alt="Streak Stats" /><br/><br/>\n`;
      }
      if (f.wakatime.show && f.wakatime.username) {
        md += `  ${buildWakaTime(f, useCustom, statsTheme)}<br/><br/>\n`;
      }
      md += `</p>\n`;
    }
    const devPlat = buildDevPlatforms(f);
    if (devPlat) {
      md += `## 🏆 Coding Profiles\n${devPlat}\n\n`;
    }

    // Blog RSS Feed
    if (f.blogFeed.show) {
      md += buildBlogFeed(f);
    }

    // Donations
    const donationBadges = buildDonationBadges(f);
    if (donationBadges) {
      md += `## 💰 Support my open source journey\n<p align="left">\n${donationBadges}\n</p>\n`;
    }

    // Fun Corner for Resume
    if (f.fun.showQuote || f.fun.showJoke || f.fun.showMeme) {
      md += `\n## 🎈 Fun Corner\n<p align="left">\n`;
      if (f.fun.showQuote) {
        md += `  <img align="center" src="${baseUrl}/api/quote?theme=${f.fun.quoteTheme}" alt="Quote" /><br/><br/>\n`;
      }
      if (f.fun.showJoke) {
        md += `  <img align="center" src="${baseUrl}/api/joke?theme=${f.fun.jokeTheme || 'dark'}" alt="Developer Joke" /><br/><br/>\n`;
      }
      if (f.fun.showMeme) {
        md += `  <img align="center" src="${baseUrl}/api/meme" style="height: 400px;" alt="Random meme"/><br/><br/>\n`;
      }
      md += `</p>\n`;
    }

    finalMd = md.trim();
  } else {
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

  // Fun: Quote & Joke
  if (f.fun.showQuote) {
    md += `\n<p align="center"><img src="${baseUrl}/api/quote?theme=${f.fun.quoteTheme}" alt="Quote" /></p>\n`;
  }
  if (f.fun.showJoke) {
    md += `\n<p align="center"><img src="${baseUrl}/api/joke?theme=${f.fun.jokeTheme || 'dark'}" alt="Developer Joke" /></p>\n`;
  }

  // Social connections
  const socialBadges = buildSocialBadges(f, usePresetColor || useCustom, badgeColor);
  if (socialBadges) {
    md += `\n<h3 align="left">Connect with me:</h3>\n<p align="left">\n${socialBadges}\n</p>\n`;
    if (f.lanyard && f.lanyard.show && f.lanyard.userId) {
      const themeQuery = f.lanyard.theme ? `?theme=${f.lanyard.theme}` : "";
      md += `\n<p align="left">\n  <a href="https://discord.com/users/${f.lanyard.userId}" target="_blank">\n    <img src="https://lanyard.vercel.app/api/${f.lanyard.userId}${themeQuery}" alt="Discord Status" />\n  </a>\n</p>\n`;
    }
    const spotifyStr = buildSpotifyCard(f);
    if (spotifyStr) {
      md += `\n<h4 align="left">Currently Playing:</h4>\n${spotifyStr}\n`;
    }
  }

  // Tech stack
  const techBadges = buildTechBadges(f, usePresetColor || useCustom, badgeColor);
  if (techBadges) {
    md += `\n<h3 align="left">Languages and Tools:</h3>\n<p align="left">\n${techBadges}\n</p>\n`;
  }
  const futureTech = buildFutureTechBadges(f, usePresetColor || useCustom, badgeColor);
  if (futureTech) {
    md += `\n<h4 align="left">Future Focus (Skills I am learning):</h4>\n<p align="left">\n${futureTech}\n</p>\n`;
  }

  // Highlights
  const showcaseStr = buildShowcaseContent(f);
  if (showcaseStr) {
    md += `\n<h3 align="left">Featured Projects:</h3>\n${showcaseStr}\n`;
  }
  const timelineStr = buildTimeline(f);
  if (timelineStr) {
    md += `\n<h3 align="left">Career & Project Timeline:</h3>\n${timelineStr}\n`;
  }

  // GitHub Stats
  if (f.username && (f.stats.showStats || f.stats.showTopLanguages || f.stats.showStreak)) {
    md += `\n<h3 align="left">GitHub Stats:</h3>\n<p align="left">\n`;
    if (f.stats.showStats) {
      const query = useCustom && customColorQuery ? customColorQuery : `theme=${statsTheme}`;
      const params = buildStatsParams(f);
      md += `<img align="center" src="https://github-readme-stats.vercel.app/api?username=${f.username}&${query}&${params}" alt="GitHub Stats" /><br/>\n`;
    }
    if (f.stats.showTopLanguages) {
      const query = useCustom && customColorQuery ? customColorQuery : `theme=${languagesTheme}`;
      const params = buildLangsParams(f);
      md += `<img align="center" src="https://github-readme-stats.vercel.app/api/top-langs?username=${f.username}&${query}&${params}" alt="Top Languages" /><br/>\n`;
    }
    if (f.stats.showStreak) {
      const query = useCustom && customColorQuery ? customColorQuery : `theme=${streakTheme}`;
      md += `<img align="center" src="https://streak-stats.demolab.com/?user=${f.username}&${query}&hide_border=false&cache_seconds=86400" alt="GitHub Streak" /><br/>\n`;
    }
    md += `</p>\n`;
  }
  const devPlat = buildDevPlatforms(f);
  if (devPlat) {
    md += `\n<h3 align="left">Coding Profiles:</h3>\n${devPlat}\n`;
  }

  // Activity Graph
  if (f.stats.showActivityGraph && f.username) {
    const query = useCustom
      ? `bg_color=${f.customTheme.cardBg.replace("#", "")}&title_color=${f.customTheme.cardTitle.replace("#", "")}&text_color=${f.customTheme.cardText.replace("#", "")}&line=${f.customTheme.cardIcon.replace("#", "")}&point=${f.customTheme.cardTitle.replace("#", "")}`
      : `theme=${activityGraphTheme}`;
    md += `\n[![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${f.username}&${query})](https://github.com/ashutosh00710/github-readme-activity-graph)\n`;
  }

  // WakaTime Coding Activity
  if (f.wakatime.show && f.wakatime.username) {
    md += `\n<h3 align="left">WakaTime Coding Activity:</h3>\n<p align="left">\n`;
    md += `  ${buildWakaTime(f, useCustom, statsTheme)}\n`;
    md += `</p>\n`;
  }

  // Blog RSS Feed
  if (f.blogFeed.show) {
    md += buildBlogFeed(f);
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

  finalMd = md.trim();
  }

  if (f.includeWatermark) {
    const resolvedBadgeColor = badgeColor || "cc785c";
    finalMd += `\n\n<br />\n\n<p align="center">\n  <a href="https://profile-crest.vercel.app" target="_blank">\n    <img src="https://img.shields.io/badge/Generated%20with-ProfileCrest-${resolvedBadgeColor}?style=for-the-badge&logo=github&logoColor=white" alt="ProfileCrest" />\n  </a>\n</p>`;
  }

  return finalMd;
}
