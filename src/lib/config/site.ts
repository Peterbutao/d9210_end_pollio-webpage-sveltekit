// Central SEO / site metadata — single source of truth for Google, AI crawlers and social cards.
// Update `url` to your production domain when deploying.
export const SITE = {
  // Canonical production URL — change to your deployed domain.
  url: "https://d9210-endpolio.org",
  name: "End Polio Now — Rotary District 9210",
  shortName: "End Polio Now D9210",
  // Primary SEO title (homepage). Other pages append " — District 9210"
  title: "End Polio Now — Rotary District 9210 | Malawi · Zambia · Zimbabwe · Mozambique",
  description:
    "Rotary District 9210's End Polio Now campaign — tracking polio eradication across Malawi, Zambia, Zimbabwe and northern Mozambique since 1997. Data, projects, news and how to join the fight. Two drops can change a life.",
  keywords: [
    "Rotary District 9210",
    "End Polio Now",
    "PolioPlus",
    "Rotary polio eradication",
    "Malawi polio",
    "Zambia polio",
    "Zimbabwe polio",
    "Mozambique polio",
    "National Immunization Day",
    "Rotaract",
    "WHO polio",
    "UNICEF polio",
    "polio vaccine Africa",
  ],
  author: "Rotary International District 9210",
  locale: "en_ZA",
  language: "en",
  // Open Graph / Twitter image — absolute path, 1200×630 recommended. Uses hero field photo.
  // For best card quality, replace with a dedicated 1200×630 OG image at /og-image.jpg
  ogImage: "/hero-caro(1).jpg",
  ogImageAlt:
    "Rotary District 9210 volunteers vaccinating children — End Polio Now campaign across Malawi, Zambia, Zimbabwe and Mozambique",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterHandle: "@RotaryD9210",
  twitterCard: "summary_large_image" as const,
  themeColor: "#EE1C25", // rotary-red
  backgroundColor: "#ffffff",
  // For JSON-LD Organization
  foundingDate: "1997",
  areaServed: ["Malawi", "Zambia", "Zimbabwe", "Mozambique"] as const,
  // Contact for structured data
  email: "polioplus@rotary9210.org",
} as const;

export type SiteConfig = typeof SITE;

// Per-route SEO overrides — used by SEO component and sitemap
export const ROUTES = [
  {
    path: "/",
    title: "End Polio Now — Rotary District 9210",
    description:
      "One district. Four countries. Zero polio. Track vaccinations, funding, and field projects across Malawi, Zambia, Zimbabwe & N. Mozambique.",
    priority: 1.0,
  },
  {
    path: "/about",
    title: "About District 9210 — History, Leadership & Focus",
    description:
      "Rotary District 9210 since 1997: history, leadership, and why Disease Prevention & Treatment powers the End Polio Now mission.",
    priority: 0.8,
  },
  {
    path: "/statistics",
    title: "Polio Statistics & Impact Dashboard",
    description:
      "Transparent polio data: cases by country/year, immunization coverage, funding vs target. Download CSV. Zero cases since Jan 2025.",
    priority: 0.9,
  },
  {
    path: "/clubs",
    title: "Clubs Directory — Find a Rotary or Rotaract Club",
    description: "Find 16 Rotary and Rotaract clubs across Malawi, Mozambique, Zambia and Zimbabwe. Filter by country, type and meeting day.",
    priority: 0.7,
  },
  {
    path: "/projects",
    title: "Projects & Campaigns — Immunization Drives & Cross-Border Work",
    description:
      "Field projects: NIDs, Chirundu cross-border drives, Walks to End Polio, school campaigns and project fairs across District 9210.",
    priority: 0.8,
  },
  {
    path: "/news",
    title: "News & Updates from District 9210",
    description:
      "Latest from the district: National Immunization Days, cross-border campaigns, PolioPlus milestones and WHO partnerships.",
    priority: 0.7,
  },
  {
    path: "/get-involved",
    title: "Get Involved — Donate, Volunteer, Start a Campaign",
    description:
      "Give to PolioPlus (2:1 Gates match), join an immunization day, or start a local campaign. Join 400+ PolioPlus Society members.",
    priority: 0.9,
  },
  {
    path: "/contact",
    title: "Contact & Newsletter — Reach the PolioPlus Committee",
    description:
      "Contact the District 9210 PolioPlus committee or subscribe to the monthly End Polio Now newsletter — campaign results and stories from the field.",
    priority: 0.6,
  },
] as const;
