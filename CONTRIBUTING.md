# Contributing

The easiest way: open Claude Code at the repo root and run the **"Add a resource with AI"** prompt from the [README](README.md#add-a-resource-with-ai) with your link. It verifies the link, picks the type and category, fills the metadata and adds the entry. Then open a PR.

To add one by hand, pick the file in `categories/` that matches **what the resource is used for**, and add an entry (alphabetical by name):

```md
- **[Example](https://github.com/owner/example)** ![skill](https://img.shields.io/badge/skill-d97757?style=flat-square) ![node](https://img.shields.io/badge/node-339933?style=flat-square)<br>
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
| `website` | 218bff | `![website](https://img.shields.io/badge/website-218bff?style=flat-square)` |
| `web-tool` | 4f46e5 | `![web-tool](https://img.shields.io/badge/web--tool-4f46e5?style=flat-square)` |
| `app` | 1f883d | `![app](https://img.shields.io/badge/app-1f883d?style=flat-square)` |
| `library` | 0a7ea4 | `![library](https://img.shields.io/badge/library-0a7ea4?style=flat-square)` |
| `skill` | d97757 | `![skill](https://img.shields.io/badge/skill-d97757?style=flat-square)` |
| `mcp-server` | 0969da | `![mcp-server](https://img.shields.io/badge/mcp--server-0969da?style=flat-square)` |
| `plugin` | bf3989 | `![plugin](https://img.shields.io/badge/plugin-bf3989?style=flat-square)` |
| `starter` | fb8500 | `![starter](https://img.shields.io/badge/starter-fb8500?style=flat-square)` |
| `guide` | 9a6700 | `![guide](https://img.shields.io/badge/guide-9a6700?style=flat-square)` |
| `newsletter` | cf222e | `![newsletter](https://img.shields.io/badge/newsletter-cf222e?style=flat-square)` |
| `video-channel` | 6e7781 | `![video-channel](https://img.shields.io/badge/video--channel-6e7781?style=flat-square)` |

## Language badges

For code repos, add one language badge right after the type badge. Use the repo's main language: `node`, `python`, `react`, `nextjs`, `rust`, `go` or `c`, or `other` for anything else. Skip it for websites and tools.

| Language | Hex | Badge markdown |
|---|---|---|
| `node` | 339933 | `![node](https://img.shields.io/badge/node-339933?style=flat-square)` |
| `python` | 3776ab | `![python](https://img.shields.io/badge/python-3776ab?style=flat-square)` |
| `react` | 61dafb | `![react](https://img.shields.io/badge/react-61dafb?style=flat-square)` |
| `nextjs` | 000000 | `![nextjs](https://img.shields.io/badge/nextjs-000000?style=flat-square)` |
| `rust` | b7410e | `![rust](https://img.shields.io/badge/rust-b7410e?style=flat-square)` |
| `go` | 00add8 | `![go](https://img.shields.io/badge/go-00add8?style=flat-square)` |
| `c` | 555555 | `![c](https://img.shields.io/badge/c-555555?style=flat-square)` |
| `other` | 6e7781 | `![other](https://img.shields.io/badge/other-6e7781?style=flat-square)` |

## Quality bar

- Works today: live link, a clear README or a working demo.
- Repos: licensed, with a commit in the last 12 months.
- Apps and starters: include a way to run them locally.
- No duplicates (search the URL in `categories/`), no affiliate or referral links.
- Description says what it does, not how great it is.
