/cav<p align="center">
  <img src="./web/public/logo.png" width="96" alt="Klepto logo" />
</p>

# Klepto

> **Copy any UI component or full page from any website with resolved styles, animations, and component structure — ready for AI agents.**

Klepto is an offline, privacy-first Google Chrome extension (Manifest V3) that lets you inspect, deconstruct, and copy any UI component or full webpage directly to your clipboard.

Built by **Neural Nexus**.

[![Klepto demo](./web/public/demo.gif)](./web/public/demo.mp4)

<video controls width="100%">
  <source src="/demo.mp4" type="video/mp4">
</video>

---

## Why Klepto?

Standard browser DevTools ("Copy outerHTML") produces flat, unstyled DOM dumps missing external stylesheets, CSS variables, runtime animations, and framework hierarchy.

**Klepto deconstructs and captures the complete runtime context:**

- **Resolved Computed CSS:** References browser tag defaults to diff and serialize clean, minimal inline styles without CSS bloat.
- **Deep Animation Extraction:** Captures Web Animations API (WAAPI), CSS transitions, CSS keyframe definitions (`@keyframes`), and pseudo-state diffs (`:hover`, `:active`, `:focus`, `:focus-within`, `:focus-visible`).
- **Runtime Framework Animations:** Extracts GSAP tweens, timelines, ScrollTrigger instances, Framer Motion animation props, and Webflow IX2 interactions.
- **Component Hierarchy Recovery:** Traverses the React Fiber tree (`__reactFiber$*`) to reconstruct component topology, unwrap `memo`/`forwardRef`, extract sanitized props, and recover component names.
- **Web Fonts & Pseudo-Content:** Discovers and absolutizes dynamic `@font-face` definitions, resolving and materializing `::before` and `::after` content.
- **Pixel-Perfect High-DPI Screenshots:** Synchronously captures and crops high-DPI element screenshots via an offscreen canvas pipeline without UI artifacts.
- **AI-Optimized Markdown Payload:** Formats output into a structured, reverse-priority budget-capped (≤ 80KB) markdown bundle tailored for LLM coding agents (Cursor, Claude, Copilot, ChatGPT).

---

## System Architecture

Klepto executes across three distinct Chrome contexts to operate cleanly within Manifest V3 security boundaries:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Popup Context (React + Vite)                       │
│  - Mode toggle ('component' vs 'page')                                      │
│  - Screenshot capture toggle & preferences                                  │
│  - Live tech stack detection badge & inspect trigger buttons                │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Chrome Runtime Messages
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   Content Script Context (Isolated World)                   │
│                                                                             │
│  ┌───────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │      overlay.ts       │  │     extractor.ts     │  │ animation-       │  │
│  │ (Shadow DOM Highlight,│  │ (Computed Style Diff,│  │  extractor.ts    │  │
│  │  Keyboard Navigation, │  │  HTML Formatter,     │  │ (WAAPI, Keyframes│  │
│  │  Toast Notification)  │  │  Span/Sibling Merges)│  │  Pseudo-diffs)   │  │
│  └───────────┬───────────┘  └──────────┬───────────┘  └─────────┬────────┘  │
│              │                         │                        │           │
│  ┌───────────┴───────────┐  ┌──────────┴───────────┐  ┌─────────┴────────┐  │
│  │      detector.ts      │  │   font-extractor.ts  │  │ payload-builder  │  │
│  │ (DOM Heuristics &     │  │ (@font-face rules,   │  │ (Section Budgets,│  │
│  │  Stack Identification)│  │  Pseudo-content)     │  │  80KB Cap Engine)│  │
│  └───────────────────────┘  └──────────────────────┘  └──────────────────┘  │
└──────────────────────┬──────────────────────────────────────┬───────────────┘
                       │                                      │
        chrome.scripting.executeScript         chrome.tabs.captureVisibleTab
        (world: 'MAIN')                               (Cropping via OffscreenCanvas)
                       ▼                                      ▼
┌──────────────────────────────────────────────┐ ┌────────────────────────────┐
│          Main World Execution Context        │ │ Background Service Worker  │
│  - react-main-world.ts: Accesses             │ │ (background/main.ts)       │
│    `__reactFiber$*` on live DOM elements     │ │ - Script injection broker  │
│  - gsap-main-world.ts: Accesses              │ │ - OffscreenCanvas cropper  │
│    `window.gsap`, `ScrollTrigger`,           │ │ - Tab messaging dispatch   │
│    and `globalTimeline`                      │ └────────────────────────────┘
└──────────────────────────────────────────────┘
```

### Key Technical Subsystems

1. **Overlay & Selection (`overlay.ts`):** Rendered inside a closed Shadow DOM host (`#__klepto-overlay-host`) so target page styles never leak in or out. Supports keyboard traversal (`ArrowUp` to parent, `ArrowDown` to child, `ArrowLeft`/`ArrowRight` to siblings, `Escape` to dismiss) and heuristic boundary expansion (`normalizeBoundary`).
2. **Computed Style Engine (`extractor.ts`):** Evaluates 80+ visual properties against a tag-default cache, collapsing box shorthands (`margin`, `padding`, `border`, `border-radius`), absolutizing URLs, simplifying transforms, merging split spans, and deduplicating repeated siblings.
3. **Multi-Tier Stack Detection (`detector.ts`):** Identifies site builders (Shopify, WordPress, Webflow, Framer, Wix, Squarespace), meta-frameworks (Next.js, Gatsby, Remix, Nuxt, SvelteKit, Astro), and reactive runtimes (React, Vue, Angular, Svelte, Solid).
4. **Main-World Runtime Extractors (`react-main-world.ts`, `gsap-main-world.ts`):** Safely probes main-world memory for React Fiber trees, Framer Motion configurations, and GSAP/ScrollTrigger timelines via `chrome.scripting.executeScript`.
5. **Budget-Capped Payload Assembly (`payload-builder.ts`):** Implements an 80KB hard cap with dedicated section targets and a reverse-priority cascade (`prompt` → `componentTree` → `fonts` → `interactions` → `animations` → `cssVariables` → `cssRules` → AST leaf-first `truncateHtml`).
6. **Isolated Clipboard & Toast Pipeline (`clipboard.ts`, `overlay.ts`):** In-page floating toast offers one-click copy for AI context and high-DPI screenshots, with an automatic 60-second security expiration timer that zeroes in-memory payload buffers.

---

## Privacy & Security

Klepto is **100% offline** — zero network calls, zero analytics, zero tracking, and no user accounts required.

- **Manifest Permissions:** `activeTab`, `scripting`, `clipboardWrite`, `storage` ([manifest.json](./extension/public/manifest.json))
- **Audit Rule:** Verify yourself with `grep -rE "fetch\(|XMLHttpRequest|sendBeacon|WebSocket" extension/src`. The only network-like call is reading an in-memory `data:` URL inside [background/main.ts](./extension/src/background/main.ts) to crop captured tab screenshots.

---

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (`>= 8.5.1`)

### Installation & Build

```bash
# Install workspace dependencies
pnpm install

# Build the Chrome extension (outputs to extension/dist)
pnpm build:ext
```

### Loading in Google Chrome

1. Navigate to `chrome://extensions` in Google Chrome.
2. Enable **Developer mode** (toggle in top-right corner).
3. Click **Load unpacked** and select the `extension/dist` folder.

---

## Development & Workflows

```bash
# Run extension in watch mode (Vite)
pnpm dev:ext

# Run marketing site (Next.js)
pnpm dev:web

# Run tests
pnpm test:ext

# Package release zip (runs tests, builds, and creates artifacts/klepto-extension-vX.Y.Z.zip)
pnpm release:ext
```

### Release Workflow

Pushing a version tag (`vX.Y.Z`) matching `extension/public/manifest.json` triggers the CI release workflow to test, build, zip, and attach the extension package to GitHub releases.

---

## Repository Structure

```
klepto/
├── extension/                      # Chrome Extension (Vite + React + TypeScript + Tailwind)
│   ├── public/                     # Manifest MV3 and extension icons
│   └── src/
│       ├── background/             # Service worker, main-world React & GSAP extractors
│       ├── content/                # Content scripts: overlay, extractor, animations, fonts
│       │   └── strategies/         # Framework strategies (React, Webflow, Framer, etc.)
│       ├── popup/                  # Extension popup UI (React)
│       └── shared/                 # Shared types, messages (MSG.*), and selector paths
├── web/                            # Marketing & landing website (Next.js App Router)
├── assets/                         # Chrome Web Store screenshots & promotional tiles
├── docs/                           # Architecture specifications (docs/ARCHITECTURE.md)
└── scripts/                        # Extension packaging and release scripts
```

---

## Documentation

For a deep dive into the internal algorithms, message schemas, and extraction pipeline, see [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

---

## License

[MIT](./LICENSE) © Neural Nexus
