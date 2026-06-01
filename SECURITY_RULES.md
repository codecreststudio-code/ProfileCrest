# 🛡️ Workspace Security Context & AI Coding Rules

This file serves as the **Security Context File** for the ProfileCrest workspace. All agentic AI models (such as Claude, GPT, or Copilot) interacting with this codebase must read, respect, and strictly enforce these instructions during any file edits, command execution, or package management.

---

## 🚦 Mandatory Rules for AI Agents

### 1. Zero-Trust Access & Minimal Agency
* **Least Privilege:** Never request wildcards (`*`), root-level, or broad folder-access permissions if a narrow directory context is sufficient.
* **No Unvetted Code Runs:** Never propose commands to download or execute unverified files from the internet (e.g. `curl | bash`, raw pip installs from random repos) without explicitly requesting the user to review the target code.

### 2. Prompt & Secrets Hygiene
* **Environment Variables:** Never introduce hardcoded credentials, secret keys, or private identifiers in any source code. If a service requires an API key, write standard `process.env.VARIABLE` bindings and list the placeholder key in a sample `.env.example` file.
* **Ignored Files:** Check [.gitignore](file:///c:/Users/new/Documents/Omer_DLS_Files/Github_profile_generator/temp-app/.gitignore) before creating any key storage configurations to verify they will not be indexed or committed to git.

### 3. Server-Side Request Validation (SSRF Prevention)
* **API Validation:** Any route performing dynamic fetches using server-side libraries (like standard `fetch` or `axios`) on user-supplied or dynamic API-sourced links **must** validate the destination before executing the request:
  * Ensure the protocol is strictly `http:` or `https:`.
  * Ensure hostnames do not resolve to local interfaces (`localhost`, `127.0.0.1`, `0.0.0.0`, `[::1]`).
  * Block private IP subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to protect internal networks.

### 4. Input Sanitation & XSS Mitigation
* **Encoding:** Ensure all dynamic data parsed into URLs or template tags are properly escaped and encoded using `encodeURIComponent` or standard HTML sanitizers.
* **Safe Rendering:** Use rehype filters, DOMPurify, or standard escaping when rendering user-submitted text as raw HTML to prevent Cross-Site Scripting (XSS).

---

## 📊 Vibe Coding Audit Score

* **React Doctor Score:** `98/100 Great` (Verified clean React components, dynamic cache invalidation, and lazy motion dynamic imports).
* **SSRF Protection:** `Active` (Mitigation implemented inside `app/api/meme/route.ts`).
* **Secrets Separation:** `Active` (Strict environment isolation via `.env*` git exclusion).
