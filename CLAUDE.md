# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run preview  # preview production build locally
```

No lint or test scripts are configured.

## Architecture

**Tech stack:** React 18 + Vite 5, plain JavaScript, all styling via inline CSS objects (no CSS-in-JS library, no Tailwind, no external stylesheets).

**Data layer** lives in two files:
- [src/data/apps.js](src/data/apps.js) — array of ~20 app objects, each with 30+ fields (boolean features, text metadata, `pros`, `cons`, `centralizationPoints`, and a `cellTooltips` map for per-cell hover hints). Boolean feature fields use `true | false | null` (null = N/A) plus sentinel strings like `"partial"` or `"planned"`.
- [src/data/categories.js](src/data/categories.js) — 6 architecture category definitions (label, hex color, description) used for filtering and consistent color-coding throughout the UI.

**UI layer** is almost entirely in [src/App.jsx](src/App.jsx) (~900 lines). All state lives in the root component `DecentralizedMessengerComparison`:
- `selectedApp` — drives the `DetailModal` overlay
- `compareList` — apps selected for side-by-side `ComparisonTable`
- `activeTab` — `"overview"` | `"compare"`
- `filterCat` — active category filter key
- `activeTooltip` — currently open tooltip in comparison table

Key internal components (all defined in App.jsx): `AppCard`, `ComparisonTable`, `DetailModal`, `CellTooltip`, `BoolCell`, `FeatureTag`, `FilterPill`.

**Tooltip system:** `CellTooltip` accepts either a plain string or a `{summary, good, bad}` object. `ComparisonTable` contains a hard-coded `architectureTradeoffs` map and a `getTextCellInsight()` function that dynamically generates tooltip content from it plus app-specific data. Tooltip placement (top/bottom) flips based on row index to avoid viewport clipping.

**Column type detection:** `ComparisonTable` inspects cell values across all apps to decide whether a column renders boolean icons or raw text — it checks for `boolean | null | undefined | "partial" | "planned"`.

**App logos** are served from [public/logos/](public/logos/) and referenced via the `logoFiles` map in apps.js; `AppLogo` renders a fallback SVG if the file is missing.
