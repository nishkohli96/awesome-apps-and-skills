# Contributing

The easiest way: open Claude Code at the repo root and run the **"Add a resource with AI"** prompt from the [README](README.md#add-a-resource-with-ai) with your link. It verifies the link, picks the type and category, fills the metadata and adds the entry. Then open a PR.

To add one by hand, pick the file in `categories/` that matches **what the resource is used for**, then add the entry under the best-fitting `##` subsection (create a new one if none fits). Keep entries alphabetical by name inside each subsection. If the category's subtitle (the italic line under the title) doesn't cover what your tool is used for, extend it there and in the matching line of the category list in `README.md`:

```md
- **[Example](https://github.com/owner/example)** <img align="absmiddle" alt="skill" src="https://img.shields.io/badge/skill-d97757?style=flat-square"><br>
  One line, under 160 chars, no marketing fluff.<br>
  🏷 `typescript` `testing`<br>
  💰 free<br>
  🔗 [demo](https://...)
```

## Metadata lines

One item per line, in this order: 🏷 tags, 💰 pricing, 🔗 demo. Only tags are required.

- 🏷 tags: 2-4 lowercase keywords.
- 💰 pricing: free | freemium | paid (websites/tools).
- 🔗 demo: link to a live demo, if one exists.

## Type badges

Copy the badge for the entry's type, never change its color.

| Type | Hex | Badge markdown |
|---|---|---|
| `website` | 218bff | `<img align="absmiddle" alt="website" src="https://img.shields.io/badge/website-218bff?style=flat-square">` |
| `web-tool` | 4f46e5 | `<img align="absmiddle" alt="web-tool" src="https://img.shields.io/badge/web--tool-4f46e5?style=flat-square">` |
| `app` | 1f883d | `<img align="absmiddle" alt="app" src="https://img.shields.io/badge/app-1f883d?style=flat-square">` |
| `library` | 0a7ea4 | `<img align="absmiddle" alt="library" src="https://img.shields.io/badge/library-0a7ea4?style=flat-square">` |
| `skill` | d97757 | `<img align="absmiddle" alt="skill" src="https://img.shields.io/badge/skill-d97757?style=flat-square">` |
| `mcp-server` | 0969da | `<img align="absmiddle" alt="mcp-server" src="https://img.shields.io/badge/mcp--server-0969da?style=flat-square">` |
| `plugin` | bf3989 | `<img align="absmiddle" alt="plugin" src="https://img.shields.io/badge/plugin-bf3989?style=flat-square">` |
| `starter` | fb8500 | `<img align="absmiddle" alt="starter" src="https://img.shields.io/badge/starter-fb8500?style=flat-square">` |
| `guide` | 9a6700 | `<img align="absmiddle" alt="guide" src="https://img.shields.io/badge/guide-9a6700?style=flat-square">` |
| `newsletter` | cf222e | `<img align="absmiddle" alt="newsletter" src="https://img.shields.io/badge/newsletter-cf222e?style=flat-square">` |
| `video-channel` | 6e7781 | `<img align="absmiddle" alt="video-channel" src="https://img.shields.io/badge/video--channel-6e7781?style=flat-square">` |

## Framework badges

Don't add a language badge (node, python, rust and so on). Add a framework badge only when the tool belongs to a single framework, such as a React or Next.js library. Put it right after the type badge, and use the framework's official shields.io badge with its logo, as below.

| Framework | Badge markdown |
|---|---|
| React | `<img align="absmiddle" alt="React" src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB">` |
| Next.js | `<img align="absmiddle" alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white">` |

For any other framework, build the badge the same way: `https://img.shields.io/badge/<Name>-<bg hex>?style=flat-square&logo=<simple-icons slug>&logoColor=<logo hex>`. Take the slug from [simpleicons.org](https://simpleicons.org) and the hex colors from the framework's brand.

## Quality bar

- Works today: live link, a clear README or a working demo.
- Repos: licensed, with a commit in the last 12 months.
- Apps and starters: include a way to run them locally.
- No duplicates (search the URL in `categories/`), no affiliate or referral links.
- Description says what it does, not how great it is.
