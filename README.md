<p align="center">
  <img src="assets/logo.svg" alt="Awesome Apps and Skills logo" width="96" height="96" />
</p>

<h1 align="center">Awesome Apps &amp; Skills</h1>

<p align="center">
  <b>The tools you haven't heard of yet, but will use this week.</b>
</p>

<p align="center">
  Hand-picked apps, AI skills, MCP servers, plugins, web tools and learning resources, sorted by what you want to get done.<br>
  Built for developers, designers, founders and anyone who lives in a terminal or a browser.
</p>

<p align="center">
  <b>⭐ Star this repo to keep it close</b> ·
  <a href="CONTRIBUTING.md">Contribute</a> ·
  <a href="https://github.com/nishkohli96/awesome-apps-and-skills/issues/new?template=suggest-resource.yml">Suggest a resource</a>
</p>

<p align="center">
  <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
  <img alt="License: CC0" src="https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg" />
</p>

Each entry has a colored type badge:

![website](https://img.shields.io/badge/website-218bff?style=flat-square) ![web-tool](https://img.shields.io/badge/web--tool-4f46e5?style=flat-square) ![app](https://img.shields.io/badge/app-1f883d?style=flat-square) ![library](https://img.shields.io/badge/library-0a7ea4?style=flat-square) ![skill](https://img.shields.io/badge/skill-d97757?style=flat-square) ![mcp-server](https://img.shields.io/badge/mcp--server-0969da?style=flat-square) ![plugin](https://img.shields.io/badge/plugin-bf3989?style=flat-square) ![starter](https://img.shields.io/badge/starter-7d5ba6?style=flat-square) ![guide](https://img.shields.io/badge/guide-9a6700?style=flat-square) ![newsletter](https://img.shields.io/badge/newsletter-cf222e?style=flat-square) ![video-channel](https://img.shields.io/badge/video--channel-6e7781?style=flat-square)

## Categories

- [💻 Coding](categories/coding.md) – Skills, MCP servers and apps for writing, reviewing and shipping code.
- [✍️ Writing & Editing](categories/writing-and-editing.md) – Tools and apps for drafting, editing and publishing text.
- [📄 Documents & Files](categories/documents-and-files.md) – Create, edit, store and share documents, slides, PDFs and files.
- [🎬 Media](categories/media.md) – Tools for creating, editing, downloading and playing video, audio, images and 3D.
- [📣 Marketing & SEO](categories/marketing-and-seo.md) – Tools and skills for SEO audits, content strategy and growth.
- [💼 Business](categories/business.md) – Customer support, data, analytics and operations tools for running a business.
- [🔎 Research & Knowledge](categories/research-and-knowledge.md) – Research, data analysis, prediction and knowledge-base tooling.
- [🎨 Design & Frontend](categories/design-and-frontend.md) – Design inspiration, design and prototyping tools, motion, and frontend skills.
- [⚙️ Automation & DevOps](categories/automation-and-devops.md) – CI/CD, scheduling, and workflow automation.
- [📈 Career & Productivity](categories/career-and-productivity.md) – Resume, job search and personal productivity resources.
- [🤖 Agents & MCP](categories/agents-and-mcp.md) – MCP servers, agent frameworks and plugins, plus agent memory, LLM gateways and APIs, and web data tools for agents.
- [🔒 Security & Privacy](categories/security-and-privacy.md) – Password managers, privacy tools and security testing.
- [🎓 Learning](categories/learning.md) – Guides, books, newsletters and channels worth following.

## Add a resource with AI

Run this prompt in Claude Code from the repo root (or paste it into any coding agent), replacing `<URL>` with the link. Use the copy button on the block.

```
Add this resource to the list: <URL>

1. VERIFY the link. Fetch the page (and the GitHub README/repo metadata if it is a repo). Stop and tell me if the link is dead, redirects somewhere unrelated, is an affiliate/referral link, or its URL already exists in any file in categories/. Do not guess any detail you cannot see on the page.
2. CLASSIFY.
   - type, one of: website | web-tool | app | library | skill | mcp-server | plugin | starter | guide | newsletter | video-channel
   - category: read the title and description line of every categories/*.md and pick the single file that matches what the resource is USED FOR, not what it is built with.
3. FILL the entry using the exact format in CONTRIBUTING.md (colored type badge from the badge table there, plus a framework badge only for single-framework tools, then description, then one line per metadata item):
   - name: the official product/repo name.
   - description: one line, under 160 chars, says what it does, no marketing words.
   - tags: 2-4 lowercase keywords.
   - framework badge (only if the tool belongs to a single framework, e.g. a React or Next.js library; never a plain language), placed right after the type badge. Use the framework's official shields.io badge with its logo, copied from the Framework badges table in CONTRIBUTING.md, or built as https://img.shields.io/badge/<Name>-<bg hex>?style=flat-square&logo=<simple-icons slug>&logoColor=<logo hex> for other frameworks.
   - pricing (only for websites/tools): free | freemium | paid, taken from the pricing page.
   - demoUrl (only if a live demo is linked).
   - Omit optional fields you cannot verify. Put each metadata item on its own line (end each line but the last with <br>), in this order: 🏷 tags, 💰 pricing, 🔗 [demo](url).
4. QUALITY BAR (CONTRIBUTING.md): repos need a license and a commit in the last 12 months; apps/starters need a way to run locally. If it fails, tell me why and do not add it.
5. WRITE it into the chosen categories/*.md, under the best-fitting "##" subsection (read the existing subsection headings first). If none fits, create a new subsection with a short plain title. Keep entries alphabetical by name inside each subsection. If the file says "_No entries yet._", replace that line with a first subsection containing the entry.
6. CHECK THE CATEGORY DESCRIPTION: read the italic subtitle under the H1 of the chosen categories/*.md. If it does not already cover what this tool is used for, extend that sentence (keep it short, one line) and copy the same wording into the matching line of the category list in README.md, so the two always match.
7. REPORT: the chosen type, category and subsection with a one-line reason, whether you changed the category description, the final entry, and anything you could not verify. Do not commit.
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Add an entry to the matching file in [`categories/`](categories/), or run the AI prompt above.

## License

[CC0 1.0](LICENSE)
