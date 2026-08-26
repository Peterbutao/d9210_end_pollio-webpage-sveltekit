# End Polio Now — Rotary District 9210

> **Two drops can change a life.** An informational web platform for Rotary International District 9210's polio eradication campaign across Malawi, Mozambique, Zambia and Zimbabwe.

This is the public-facing website for the **End Polio Now** initiative in District 9210. It consolidates the district's campaign story, real-time progress data, field projects and volunteer pathways into a single, accessible hub — built for Rotarians, Rotaractors, health partners and the public.

Live district: **Malawi · Zambia · Zimbabwe · Northern Mozambique** — united since 1997 under one mission: **One District. Four Countries. Zero Polio.**

---

## About the Page

This is not a generic Rotary template. It is a **campaign-specific information and mobilisation site** for District 9210's PolioPlus efforts.

The site's purpose is to:

- **Tell the story** of Rotary's role in polio eradication within southern Africa.
- **Show the data** behind the campaign — without jargon, with downloadable transparency.
- **Connect people to action** — whether to donate, volunteer on an immunization day, or launch a local awareness campaign.

Content is centrally managed in `src/lib/data/content.ts:1` and rendered across dedicated routes. The design uses Rotary's red/gold identity, responsive carousels for field photography, and Chart.js dashboards to make the numbers immediate and shareable.

The homepage (`src/routes/+page.svelte:1`) acts as a campaign overview, with deeper pages providing focused detail.

---

## Polio in District 9210

### Why this district matters

Rotary District 9210 was formed in **1997** from the former District 9250 (`src/lib/data/content.ts:2`) to better serve a growing membership across south-eastern Africa. Since Rotary launched **PolioPlus in 1985** — when polio paralysed over 1,000 children every day in 125 endemic countries — eradication has been the district's defining cause.

Today wild poliovirus survives in only **two endemic countries** worldwide. District 9210 sits on the front line of **Africa's final mop-up**: maintaining high immunization coverage, vigilant surveillance, and cross-border coordination to prevent re-importation.

### Where we stand — district-reported figures (`src/lib/data/content.ts:10`)

> Last updated: **15 March 2026**

| Metric | Total |
|---|---|
| Children vaccinated | **1,450,000** |
| Polio cases prevented (est.) | **42,000** |
| Funds raised for PolioPlus | **US$540,000 / US$750,000** (72%) |
| Immunization days held | **38** |
| Volunteers mobilised | **2,800** |
| Countries covered | **4** |

Each dollar raised is **matched 2:1 by the Bill & Melinda Gates Foundation** — US$100 becomes US$300 for vaccines, cold-chain logistics and surveillance.

### The trend the site tracks

- **Cases:** `src/lib/data/content.ts:186` — Malawi and Mozambique reported the last confirmed wild/cVDPV cases in 2021–2023. **Zero cases district-wide since January 2025.** The homepage line chart (`src/routes/+page.svelte:187`) and statistics page visualise this decline year-by-year.
- **Coverage:** `src/lib/data/content.ts:195` — Routine immunization coverage has climbed steadily (e.g. Malawi 89% → 98%, Mozambique 82% → 94% between 2020–2025). Shown as bar/column charts by country.
- **Funding:** `src/lib/data/content.ts:204` — Annual raised vs. target tracked with CSV export on the statistics page.

### How eradication happens here

- **National Immunization Days (NIDs):** e.g. March 2026 NID in Malawi reached **120,000 children** across 14 districts with Rotarian support for transport, tally sheets and cold-chain monitoring.
- **Cross-border drives:** Joint Zambia–Zimbabwe campaigns along the Chirundu and Tete corridors targeting mobile populations (18,000 children reached in three days in the 2026 Chirundu drive).
- **Grassroots awareness:** Rotaract-led school campaigns (15,000 students reached in Nampula), Walk to End Polio events (3,000 participants, US$47,000 raised in Lusaka on World Polio Day 2025) and annual Project Fairs.
- **PolioPlus Society:** District 9210 now counts **412 sustaining members** (`src/lib/data/content.ts:80`) pledging ≥US$100/year until certification — leading the region. Featured on `src/routes/get-involved/+page.svelte:124`.
- **Partnership model:** District clubs coordinate directly with ministries of health, **WHO** and **UNICEF** — recognised by WHO for its cross-border data-sharing protocol (`src/lib/data/content.ts:103`).

The consistent message: the infrastructure built for polio — mobilisers, surveillance officers, cold-chain volunteers — protects against future health threats long after the last case.

---

## What the Website Informs Users On

| Section | Route | What it tells you |
|---|---|---|
| **Home / Campaign Overview** | `/` (`src/routes/+page.svelte:250`) | Hero carousel (field photography), at-a-glance stats (vaccinated / prevented / raised / countries), district map, latest 3 news highlights, projects timeline, impact dashboard previews (Chart.js), and three Get Involved pathways. |
| **About District 9210** | `/about` (`src/routes/about/+page.svelte:50`) | History (1997 formation, PolioPlus legacy), auto-playing field gallery, **District Leadership** (Governor, PolioPlus Chair, Secretaries etc. from `src/lib/data/content.ts:21`) and **Rotary's 7 Areas of Focus** with Disease Prevention & Treatment highlighted as the home of End Polio Now. |
| **News & Updates** | `/news` (`src/routes/news/+page.svelte:25`) | 7 curated stories (`src/lib/data/content.ts:58`) — NIDs, cross-border drives, PolioPlus milestones, Walk to End Polio, WHO recognition. Filterable by topic (Immunization / Fundraising / Awareness / Partnerships) and presented in a gold timeline. |
| **Projects & Campaigns** | `/projects` (`src/routes/projects/+page.svelte:18`) | 8 field projects (`src/lib/data/content.ts:123`) — immunization days, cross-border drives, fundraisers and awareness campaigns — with country, year tag and summary. Ends with a call to submit club project stories. |
| **Statistics / Impact Dashboard** | `/statistics` (`src/routes/statistics/+page.svelte:51`) | Dedicated data page. Four stat cards, **cases by country/year** (stacked bar + max-scaling), **coverage % by year** (per-country columns), **funding raised vs target** (progress bar + yearly breakdown). All tables offer **Download CSV** (`src/routes/statistics/+page.svelte:24`) for transparency. Notes zero cases since Jan 2025 and the Gates 2:1 match. |
| **Clubs Directory** | `/clubs` (`src/routes/clubs/+page.svelte:19`) | Searchable directory of **16 clubs** (`src/lib/data/content.ts:39`) — Rotary vs. Rotaract, by country (Malawi, Mozambique, Zambia, Zimbabwe) and meeting day. Homepage embeds a compact filterable version (`src/routes/+page.svelte:99`). |
| **Get Involved** | `/get-involved` (`src/routes/get-involved/+page.svelte:37`) | Three concrete actions: **Give to PolioPlus** (external link to endpolio.org with Gates match explainer), **Join an Immunization Drive** (links to clubs directory), **Start a Local Campaign** (Walk to End Polio, light-ups, school events). Plus a dedicated **PolioPlus Society** explainer: US$100/yr sustaining pledge, 2:1 match, 400+ D9210 members. |
| **Contact & Newsletter** | `/contact` (`src/routes/contact/+page.svelte:43`) | Validated contact form (Zod, `src/routes/contact/+page.svelte:6`) that opens a `mailto:polioplus@rotary9210.org` draft, district email + geography display, and a **Supabase-backed newsletter** subscription (`src/lib/components/NewsletterForm.svelte:1`) — monthly End Polio Now updates, no spam. |
| **Site-wide** | `src/lib/components/SiteHeader.svelte:1` + `SiteFooter.svelte:1` | Persistent Rotary branding, responsive navigation, and footer with district context. |

In short: a visitor can go from **"why polio matters here" → "what's been achieved" → "what's happening now" → "how to help"** in under four clicks.

---

## Data & Content

All campaign data is typed and versioned in one place: `src/lib/data/content.ts:1`

- `DISTRICT` — name, formation year, countries
- `CAMPAIGN_STATS` — headline metrics and `lastUpdated`
- `LEADERSHIP`, `FOCUS_AREAS`, `CLUBS` — directory data
- `NEWS`, `PROJECTS` — editorial content
- `CASES_BY_YEAR`, `COVERAGE_BY_YEAR`, `FUNDING_BY_YEAR` — time-series for charts
- `formatNumber()` / `formatUsd()` — display helpers

Update that file, and every route, chart and CSV export reflects the change.

---

## Tech Stack (brief)

SvelteKit 2 + Svelte 5 (runes), TypeScript, Tailwind CSS 4, Chart.js 4, Supabase (newsletter/auth), Zod validation. Deployed via `@sveltejs/adapter-auto`. No installation guide needed to use the site — content is static-first with client-side interactivity for charts and filters.

---

## First Commit Note

This commit (`master`) captures the complete initial build: homepage, about, clubs, news, projects, statistics, get-involved and contact routes; shared components and Supabase integration; static assets and district content.

- `.env` and `node_modules/` are git-ignored (see `.gitignore:1`). No secrets are committed.
- `.svelte-kit/` build artefacts are ignored.
- Supabase project `jwdszdptxlkyzklfvnit` configured via `supabase/config.toml:1`.

---

*Built for District 9210 — so that the next generation never knows polio.*
