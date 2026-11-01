# Website Plan: Awesome Apps & Skills

Plan and design brief for turning this repo into a discovery website. Companion to [validation-checklist.md](validation-checklist.md): this file covers what to build, that file covers whether to keep investing.

## 1. Decisions up front

| Question | Decision | Why |
|---|---|---|
| Is Algolia needed? | **No.** Use Fuse.js or MiniSearch in the browser. | 152 entries and 322 tags, about 100 KB of JSON. Client-side search is instant, free, offline-capable and has no vendor. Revisit only past roughly 5,000 entries. |
| Framework | **Next.js (App Router) + TypeScript + Tailwind**, in a `website/` folder at the repo root | Chosen so accounts can be added later in the same app without a rewrite. Pages are pre-rendered at build time with `generateStaticParams`, so it stays fast and SEO-friendly. |
| Source of truth | **The existing `categories/*.md` files** | Keeps PR contributions working. A build script parses them to JSON. No CMS, no database. |
| Hosting | Vercel | Free tier, preview deploys per PR. |
| Analytics | **Umami Cloud (Hobby, free)** for visitors, plus custom events for outbound clicks | Cookie-less, so no consent banner. Free tier: 100K events/month, 1 website, 6-month retention. Note that every stored event property counts as an extra event. See section 6. Revisit Mixpanel (free up to 1M events/month) once accounts exist. Plausible is paid after its trial. |
| Accounts / favourites | Phase 4 only. Start with localStorage favourites. | Matches the validation checklist: don't build accounts before there is proof of demand. |
| Tool detail pages | **None.** Cards link straight out to the tool. | Decided to keep the site simple. Cards must carry all the information themselves (section 4.5). |

## 2. Data model (what the build script extracts)

Repo facts (measured): 13 categories, 38 subcategories, 152 entries, 322 unique tags. Types: app 46, web-tool 40, skill 33, website 13, mcp-server 7, library 5, guide 4, starter 2, plugin 2. Pricing is present on only 77 of 152 entries (free 20, freemium 49, paid 8).

Each entry is parsed into:

```
{
  slug,            // derived from name, unique
  name,
  url,
  type,            // from the shields.io badge alt text
  category,        // file name, with emoji + title from the H1
  subcategory,     // from the H2
  description,     // the line after the <br>
  tags[],          // from the 🏷 line
  pricing,         // free | freemium | paid | unknown (from 💰, default unknown)
  platforms[],     // extra badges (React, etc.) where present
  addedAt,         // first git commit date touching the line, for "New" badges
  sponsored        // false for now; reserved for later
}
```

Build-time checks that fail the build: duplicate slug, entry with no type, URL that isn't https, empty description.

Gap to fix in the data: about half of entries have no pricing. Show "unknown" rather than guessing, and consider a one-time backfill.

## 3. Information architecture

```
/                       Home
/c/[category]           Category page (13)
/c/[category]#[sub]     Subcategory anchors on the same page
/tag/[tag]              Tag page (322, indexable long-tail SEO)
/search                 Full search results with filters
/type/[type]            Type page (skills, MCP servers, apps...)
/new                    Newest additions (by addedAt)
/favourites             Saved tools (localStorage)
/submit                 How to suggest a tool (links to GitHub PR/issue form)
/about                  Who curates this, how entries are chosen, sponsor policy
/privacy                What analytics collects (nothing personal)
/sitemap.xml, /rss.xml  Generated
404                     Custom
```

There are no per-tool detail pages: a click on a tool goes straight to the tool's own site. SEO therefore relies on the roughly 340 category, tag and type pages. If organic traffic stalls, per-tool pages ("X alternatives", "what is X") are the first thing to add back.

## 4. Page specs

### 4.1 Appbar (global)
- Left: logo + wordmark, links to `/`.
- Centre: search field with placeholder "Search 150+ tools, skills and apps". Shortcut hint `/` or `Cmd/Ctrl+K`.
- Right: "New" link, "Favourites" (heart with count), "Submit", GitHub star button, theme toggle.
- Sticky, slight blur on scroll, 1px bottom border only after scrolling.
- Mobile: logo, search icon (opens full-screen search), menu button. Theme toggle moves into the menu.

### 4.2 Search behaviour
- Matches name (highest weight), tags, description, category and subcategory.
- Typo tolerant, prefix match, results as you type, no network calls.
- Dropdown shows the top 8: icon by type, name, one-line description, category label. Arrow keys + Enter to open, Esc to close.
- "See all results" goes to `/search?q=`, which has full filters.
- Empty state: suggest popular tags and a link to `/submit`.

### 4.3 Home
1. **Hero**: one headline, one subline, large search field (same component as the appbar), and three to five quick-pick chips ("Claude skills", "MCP servers", "Free", "Video", "Coding"). Live stat line: "152 tools · 13 categories · updated this week". Headline candidate: "The tools you haven't heard of yet, but will use this week." (already in the README).
2. **Category grid**: 13 cards. Each has emoji/icon, name, one-line description from the markdown, tool count, and 2–3 subcategory names as a preview. The whole card links to the category.
3. **Browse by type** strip: Skills, MCP servers, Apps, Web tools, Libraries, Guides, with counts.
4. **New this week**: the 6–8 most recent entries.
5. **Newsletter** signup: one field, one line of copy, privacy line.
6. **Sponsor slot** (empty at launch): a single clearly labeled "Sponsored" card position, designed in but hidden until there is a sponsor.
7. **Footer**: category links, About, Submit, Privacy, GitHub, RSS, "Not affiliated with Anthropic".

### 4.4 Category page
- Header: emoji, title, description, tool count, breadcrumb.
- **Tag bar** at the top: most-used tags in that category as chips with counts, horizontally scrollable on mobile, "Show all tags" expander. Click a tag to filter, click again to clear, multiple tags combine as AND. Selected tags sync to the URL (`?tag=video&tag=react`) so filtered views are shareable.
- Extra filters beside the tag bar: type (multi-select), pricing (free / freemium / paid / unknown), sort (A–Z, newest).
- **Subcategory sections**: each subcategory is a heading with a count and a grid of tool cards. A sticky side list (desktop) or a dropdown (mobile) jumps between subcategories. When a filter is active, subcategories with no matches collapse.
- Result count and "Clear filters" always visible while filtering.
- Empty state when no tool matches the filter combination.

### 4.5 Tool card (the most reused component)
There is no detail page, so the card is the whole product. It must show everything a visitor needs to decide.
- Type badge (colour-coded: app, web-tool, skill, website, mcp-server, library, guide, plugin, starter).
- Name as a link straight to the tool, favicon from the URL's domain.
- Description clamped to 3 lines by default, with a "more" toggle that expands it in place.
- All tags, shown as clickable chips. On a tight card, show the first 3 and a `+N` that expands the rest.
- Pricing pill, hidden if unknown.
- Subcategory label (useful on search and tag pages, where cards from many categories mix).
- Footer actions: heart (favourite) and an outbound arrow "Visit". Both the name and "Visit" open the tool in a new tab with `rel="noopener noreferrer"` and fire the analytics event.
- Click tracking: direct link plus an analytics event for now. A `/go/[slug]` server redirect that counts clicks reliably (ad blockers can block client-side scripts) is the upgrade to add when the first sponsor appears.
- Hover/focus: subtle lift and border colour change. Fully keyboard accessible.
- "New" badge for entries added in the last 14 days.
- Sponsored variant: same card, "Sponsored" label top-right, never styled to look like organic content.

### 4.6 Search results page
`/search?q=` with the same filters as a category page (type, pricing, tags), results grouped by category, and the same tool card. Structured data (`ItemList`) goes on category, tag and type pages rather than on individual tools.

## 5. Theme: light, dark, system

- Three-way toggle (sun / moon / monitor) in the appbar. Default is **System**.
- Choice persisted in localStorage; system mode follows `prefers-color-scheme` live.
- A tiny inline script in `<head>` sets `data-theme` before first paint to avoid the white flash on dark mode.
- All colours defined as CSS variables (tokens) on `:root`, with dark overrides under `[data-theme="dark"]`. No hard-coded hex values in components.
- Both themes must pass WCAG AA contrast (4.5:1 body text, 3:1 UI borders). Check the type-badge colours in both themes.

## 6. Analytics

**Goal:** unique visitors, which tools and categories get attention, which searches fail.

**Tool:** Umami Cloud Hobby (free: 100K events/month, 1 website, 6-month retention, custom events included, no cookie banner needed). Plausible is paid after its trial; Google Analytics needs a banner and is overkill here. Mixpanel's free plan (1M events/month) is a better fit later, when accounts make user-level funnels and retention useful. Do not run both.

**Event budget:** Umami counts each pageview as one event, plus one more for every stored event property. An `outbound_click` with four properties costs five events. Keep properties to what you will actually report on (tool slug, category, sponsored flag), debounce `search`, and expect to move to Pro ($20/month) or self-host somewhere around 10k visitors a month.

**Events to track** (name → properties):

| Event | Properties | Answers |
|---|---|---|
| pageview (automatic) | path, referrer | Unique visitors, top pages, traffic sources |
| `outbound_click` | tool slug, type, category, placement (grid / detail / search / new), sponsored flag | Most-clicked tools, sponsor reporting |
| `search` | query (debounced), result count | Popular queries |
| `search_no_results` | query | Missing tools, content ideas |
| `tag_filter` | category, tag | Which tags people use |
| `favourite_add` / `favourite_remove` | tool slug | Signal for whether accounts are worth building |
| `theme_change` | choice | Minor |
| `newsletter_signup` | placement | Conversion by placement |
| `submit_click` | source page | Supply interest |

**Rules:** never send personal data or full IP; truncate search queries to 100 chars; respect Do Not Track; list everything collected on `/privacy`.

**Dashboards you want:** weekly unique visitors, top 20 outbound clicks, top 20 searches, zero-result searches, traffic by source, newsletter conversion rate. These map directly to the Phase 1–2 targets in the validation checklist.

**Sponsor reporting:** the `outbound_click` event with a `sponsored` flag lets you give sponsors an impressions-and-clicks report later without new tooling. Count impressions by firing an event when a sponsored card enters the viewport.

## 7. What you didn't mention (recommended additions)

Must have for launch:
- **Tag pages** and **type pages** (section 3): with no per-tool pages, these are the SEO traffic engine.
- **SEO basics**: unique title and meta description per page, canonical URLs, Open Graph images (one per category), `sitemap.xml`, JSON-LD (`ItemList` on category, tag and type pages), `robots.txt`.
- **"New" section and RSS**: supports the weekly newsletter and returning visitors.
- **Type filter and pricing filter**: the data already has both.
- **Accessibility**: keyboard navigation everywhere, visible focus rings, semantic headings, `aria-live` for filter result counts, skip-to-content link, respects `prefers-reduced-motion`.
- **Responsive**: designed mobile-first at 375px, then 768px, 1280px, 1536px.
- **Submit flow**: link to a GitHub issue template and PR guide so the repo remains the single source.
- **Privacy page** and **sponsor disclosure** wording.
- **Custom 404** with search.

Nice to have, later:
- Command palette (Cmd+K) across tools, categories and pages.
- "Compare" two tools side by side.
- Collections (curated lists like "Starter pack for video editing").
- Per-tool GitHub stars and last-commit date, fetched in a scheduled build job, with a badge for "inactive" projects. This addresses the freshness risk from the evaluation.
- Share button on collections and filtered views.
- Email alert when a tag you favourited gets a new tool (needs accounts).

Explicitly deferred (do not build yet): user accounts, sponsor self-serve checkout, comments or ratings, admin dashboard.

## 8. Build phases

0. **Design** (before any code): generate the designs from section 9 / `design-brief.md` and approve them.
1. **Foundation** (days 1–3): Next.js project in `website/`, markdown→JSON build script with validation, design tokens, theme system, layout, appbar, footer.
2. **Core pages** (days 4–7): home, category page with tag/type/pricing filters, tool card with expandable description, tag and type pages.
3. **Search and favourites** (days 8–9): Fuse.js index generated at build, search dropdown + results page, localStorage favourites page.
4. **SEO and analytics** (days 10–11): metadata, sitemap, RSS, OG images, JSON-LD, Umami events, `/privacy`.
5. **Polish and launch** (days 12–14): accessibility pass, Lighthouse ≥ 95 on every category, mobile QA, domain, Vercel deploy, announce.

Each phase ends with something deployable on a preview URL.

## 9. Design brief (paste into the design tool)

**Product in one line:** a fast, trustworthy, human-curated directory of Claude skills, MCP servers, apps and web tools, for developers, designers and founders who want to find something good in under 30 seconds.

**Audience:** technical and semi-technical people already using Claude Code or AI tools. They scan quickly, distrust marketing language and expect keyboard shortcuts and dark mode.

**Personality:** editorial and curated rather than corporate or "AI startup". Think a well-run reading list or design magazine crossed with a developer tool. Calm, confident, a little warm. Not a neon gradient AI template.

**Visual direction:**
- Typography: a distinctive but readable sans for UI and headings, optional serif or display face for the hero headline, a mono face for tags and counts. Tight, deliberate type scale.
- Colour: one strong accent (the repo's Claude-orange `#d97757` is the skill badge colour and could anchor the brand), plus neutral greys with a subtle warm tint. Type badges each get a colour but stay muted so cards don't look like a rainbow. Define light and dark palettes together.
- Layout: generous whitespace, 12-column grid, max content width about 1200px, cards on a consistent 8px spacing system.
- Surfaces: flat with 1px borders instead of heavy shadows; gentle shadow only on hover.
- Motion: small and purposeful (card hover lift, filter transitions, search dropdown fade). Respect reduced motion.
- Iconography: one consistent outline icon set; category emojis from the markdown can be used as playful anchors.

**Avoid:** purple-blue gradients, glassmorphism everywhere, stock illustrations of robots or brains, identical card grids with no hierarchy, autoplaying anything, cookie banners, popups.

**Deliverables to request from the design tool:**
1. Design tokens (colour, type, spacing, radius, shadow) for both themes.
2. Home page: desktop and mobile, light and dark.
3. Category page with active tag filter and an empty state.
4. Tool card in all states: default, hover, focus, favourited, new, sponsored, no pricing, description expanded, tags expanded.
5. Search dropdown: empty, typing, results, no results.
6. Search results page with filters.
7. Appbar: desktop, mobile, and the theme toggle open.
8. Component sheet: chips, buttons, badges, inputs, pills.

## 10. Risks and notes

- **Branding:** don't use the Claude/Anthropic logo or imply endorsement. Keep "Not affiliated with Anthropic" in the footer.
- **Licensing:** link out to tools and write your own descriptions. The repo is CC0, so reuse is fine, but external logos and screenshots belong to their owners.
- **Duplication of data:** the README and the website both render the same markdown. The build script is the only parser, so there is one place to fix format changes.
- **Sponsorship integrity:** sponsored cards are always labeled, in their own slot, and never change organic ordering.
- **Scope:** this plan is intentionally larger than the first release. Phases 1–5 in section 8 are the launch scope; section 7's "later" list is not.

## 11. Decisions and open questions

Decided:
- Framework: Next.js (App Router), chosen so accounts can be added later.
- Location: `website/` folder at the repo root, same repo as the data.
- Analytics: Umami Cloud Hobby to start.
- Tool detail pages: none, cards link straight to the tool.

Still open:
1. Domain name and brand name: keep "Awesome Apps & Skills" or rebrand?
2. Newsletter provider: Buttondown, Beehiiv or Substack?
3. Does the design tool need anything beyond `design-brief.md`, such as reference sites you like?
