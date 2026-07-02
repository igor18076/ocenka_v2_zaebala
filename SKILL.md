---
name: ocenka-design
description: Use this skill to generate well-branded interfaces and assets for Оценка PRO (Ocenka) — a B2B SaaS web app for real-estate appraisers — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `readme.md` — brand context, content & visual foundations, iconography, full manifest.
- `styles.css` — the single stylesheet to link; pulls in all tokens + component CSS + Golos Text / IBM Plex Mono.
- `tokens/` — colors, typography, spacing, elevation tokens (CSS custom properties).
- `components/` — React primitives (Button, Input, Select, Checkbox, Switch, Card, Badge, StatusBadge, KpiCard, ProgressBar, Table, Avatar, Tabs) with `.d.ts` + `.prompt.md`.
- `ui_kits/ocenka-app/` — full appraiser-workspace prototype (dashboard, requests, object card, analogs, calculation, ФСО check, report).
- `assets/mark.svg` — brand mark.

## House rules
- Russian copy, professional tone, realistic data — never Lorem ipsum, never emoji.
- Deep blue primary, emerald only for value/success, graphite neutrals, lots of air, flat cards with a 1px ring.
- Use Lucide icons (CDN). Tabular figures for money and tables.
