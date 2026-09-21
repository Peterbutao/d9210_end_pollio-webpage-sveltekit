export const DISTRICT = {
  name: "Rotary District 9210",
  formed: 1997,
  formedFrom: "District 9250",
  countries: ["Malawi", "Mozambique", "Zambia", "Zimbabwe"] as const,
};

export type Country = (typeof DISTRICT.countries)[number];

export const CAMPAIGN_STATS = {
  childrenVaccinated: 1_450_000,
  casesPrevented: 42_000,
  fundsRaisedUsd: 540_000,
  fundsTargetUsd: 750_000,
  countriesCovered: 4,
  immunizationDaysHeld: 38,
  volunteersMobilised: 2_800,
  lastUpdated: "2026-03-15",
} as const;

export const LEADERSHIP = [
  { name: "Dr. Grace Banda", role: "District Governor", club: "Lilongwe Rotary", country: "Malawi" },
  { name: "Tendai Moyo", role: "PolioPlus Chair", club: "Harare Sunrise", country: "Zimbabwe" },
  { name: "Mulenga Chibesa", role: "District Secretary", club: "Lusaka Central", country: "Zambia" },
  { name: "Helena Omar", role: "District Treasurer", club: "Maputo Bay", country: "Mozambique" },
  { name: "Samuel Phiri", role: "Rotaract Chair", club: "Blantyre City", country: "Malawi" },
  { name: "Chipo Dube", role: "Public Image Chair", club: "Bulawayo", country: "Zimbabwe" },
] as const;

export const FOCUS_AREAS = [
  { name: "Peace & Conflict Resolution", highlighted: false },
  { name: "Disease Prevention & Treatment", highlighted: true },
  { name: "Water, Sanitation & Hygiene", highlighted: false },
  { name: "Maternal & Child Health", highlighted: false },
  { name: "Basic Education & Literacy", highlighted: false },
  { name: "Community Economic Development", highlighted: false },
] as const;

export const CLUBS = [
  { name: "Lilongwe Rotary", city: "Lilongwe", country: "Malawi", type: "Rotary", meetingDay: "Tuesday" },
  { name: "Blantyre City", city: "Blantyre", country: "Malawi", type: "Rotary", meetingDay: "Wednesday" },
  { name: "Mzuzu Dawn", city: "Mzuzu", country: "Malawi", type: "Rotary", meetingDay: "Thursday" },
  { name: "Lilongwe Rotaract", city: "Lilongwe", country: "Malawi", type: "Rotaract", meetingDay: "Monday" },
  { name: "Zomba University", city: "Zomba", country: "Malawi", type: "Rotaract", meetingDay: "Friday" },
  { name: "Maputo Bay", city: "Maputo", country: "Mozambique", type: "Rotary", meetingDay: "Tuesday" },
  { name: "Nampula Horizon", city: "Nampula", country: "Mozambique", type: "Rotary", meetingDay: "Wednesday" },
  { name: "Beira Coast", city: "Beira", country: "Mozambique", type: "Rotaract", meetingDay: "Thursday" },
  { name: "Lusaka Central", city: "Lusaka", country: "Zambia", type: "Rotary", meetingDay: "Monday" },
  { name: "Ndola Copperbelt", city: "Ndola", country: "Zambia", type: "Rotary", meetingDay: "Tuesday" },
  { name: "Livingstone Falls", city: "Livingstone", country: "Zambia", type: "Rotary", meetingDay: "Thursday" },
  { name: "Lusaka Rotaract", city: "Lusaka", country: "Zambia", type: "Rotaract", meetingDay: "Wednesday" },
  { name: "Harare Sunrise", city: "Harare", country: "Zimbabwe", type: "Rotary", meetingDay: "Wednesday" },
  { name: "Bulawayo", city: "Bulawayo", country: "Zimbabwe", type: "Rotary", meetingDay: "Tuesday" },
  { name: "Mutare Gateway", city: "Mutare", country: "Zimbabwe", type: "Rotary", meetingDay: "Monday" },
  { name: "Harare Rotaract", city: "Harare", country: "Zimbabwe", type: "Rotaract", meetingDay: "Thursday" },
] as const;


export const NEWS = [
  {
    slug: "malawi-polio-response-february-2026",
    title: "Malawi vaccinates 1.3 million children in polio outbreak response",
    excerpt:
      "Malawi vaccinated around 1.3 million children during a four-day campaign after a circulating variant poliovirus type 2 case was detected in late January 2026.",
    date: "2026-02-24",
    country: "Malawi",
    topic: "Immunization" as const,
    link:
      "https://www.afro.who.int/countries/malawi/news/malawi-vaccinates-13-million-children-response-polio-outbreak",
    image:
      "https://www.afro.who.int/sites/default/files/styles/1920x1080_top/public/2026-02/41.png.webp?itok=CKMSLGPj",
  },
  {
    slug: "malawi-national-polio-campaign-march-2026",
    title: "Malawi nationwide polio campaign reaches more than 6.2 million children",
    excerpt:
      "Malawi’s nationwide polio vaccination campaign ran from 24 to 27 March 2026 and reached 6,223,422 children under the age of 10 across all districts.",
    date: "2026-03-27",
    country: "Malawi",
    topic: "Immunization" as const,
    link:
      "https://www.afro.who.int/countries/malawi/photo-story/power-science-health-malawis-milestones-transforming-lives",
    image: "/VAC.webp",
  },
  {
    slug: "zambia-first-polio-round-april-2026",
    title: "Zambia launches campaign targeting 3.7 million children",
    excerpt:
      "Zambia launched a nationwide subnational immunization campaign in April 2026, targeting children under five in Lusaka, Southern, Eastern, Central, Western, and Muchinga provinces.",
    date: "2026-04-22",
    country: "Zambia",
    topic: "Immunization" as const,
    link:
      "https://www.afro.who.int/countries/zambia/news/zambia-launches-nationwide-polio-vaccination-campaign-protect-every-child-under-five",
    image:
      "https://www.afro.who.int/sites/default/files/styles/1920x1080_top/public/2026-04/235A3153.JPG.webp?itok=EwJlZbCi",
  },
  {
    slug: "zambia-final-polio-round-july-2026",
    title: "Zambia launches final polio campaign round for 3.9 million children",
    excerpt:
      "The final 2026 round of Zambia’s polio campaign targeted about 3.9 million children under five in six priority provinces from 21 to 26 July.",
    date: "2026-07-28",
    country: "Zambia",
    topic: "Immunization" as const,
    link:
      "https://www.afro.who.int/countries/zambia/news/zambia-launches-final-round-polio-vaccination-campaign-targeting-39-million-children",
    image:
      "https://www.afro.who.int/sites/default/files/styles/1920x1080_top/public/2026-07/Polio%20Launch_0.jpg.webp?itok=a6aubvCZ",
  },
  {
    slug: "mozambique-second-polio-round-june-2026",
    title: "Mozambique targets more than 6 million children in second polio round",
    excerpt:
      "Mozambique conducted its second 2026 polio vaccination round from 17 to 20 June across 64 districts in seven provinces, targeting more than 6 million children under five.",
    date: "2026-06-20",
    country: "Mozambique",
    topic: "Immunization" as const,
    link:
      "https://www.afro.who.int/photo-story/two-drops-confidence-communities-and-healthcare-professionals-join-forces-protect?country=Mozambique&name=Mozambique",
    image: "/VOL.webp",
  },
  {
    slug: "mozambique-polio-campaign-july-2026",
    title: "Mozambique continues polio vaccination rounds across high-risk districts",
    excerpt:
      "Mozambique continued its synchronized polio response with additional vaccination activities, urging families to vaccinate children under 10 against paralysis.",
    date: "2026-07-12",
    country: "Mozambique",
    topic: "Awareness" as const,
    link:
      "https://www.afro.who.int/countries/mozambique/news",
    image: "/D9210.webp",
  },
  {
    slug: "zimbabwe-synchronized-polio-campaigns-2026",
    title: "Zimbabwe completes three synchronized polio vaccination rounds",
    excerpt:
      "Zimbabwe completed three synchronized nOPV2 campaigns in April, June, and July 2026, vaccinating 936,618, 997,941, and 1,025,806 children respectively.",
    date: "2026-07-23",
    country: "Zimbabwe",
    topic: "Immunization" as const,
    link:
      "https://www.afro.who.int/countries/zimbabwe/news/united-against-polio-zimbabwe-strengthens-regional-immunity-through-synchronized-vaccination",
    image:
      "https://www.afro.who.int/sites/default/files/styles/1920x1080_top/public/2026-07/DSC_2404_0.JPG.webp?itok=Nq5AjF30",
  },
  {
    slug: "zimbabwe-regional-polio-response",
    title: "Zimbabwe strengthens regional immunity through synchronized vaccination",
    excerpt:
      "Zimbabwe joined Malawi, Mozambique, Zambia, Namibia, and Botswana in a coordinated subregional response focused on border areas and densely populated urban centres at higher risk of virus importation.",
    date: "2026-07-23",
    country: "Zimbabwe",
    topic: "Partnerships" as const,
    link:
      "https://www.afro.who.int/countries/zimbabwe/news/united-against-polio-zimbabwe-strengthens-regional-immunity-through-synchronized-vaccination",
    image: "/zambia.webp",
  },
] as const;



export const PROJECTS = [
  {
    title: "Malawi National Polio Vaccination Campaigns 2026",
    tag: "Immunization Day",
    year: "2026",
    country: "Malawi",
    summary:
      "In 2026, Malawi ran multiple nationwide nOPV2 polio campaigns (including a major round in March) reaching millions of children under 10 across all districts, with Rotary among the partners supporting mobilization and advocacy. Exact district-level support (transport, tally sheets, cold-chain monitoring) should be confirmed from district reports.",
    sources: [
      "https://www.afro.who.int/countries/malawi/news/malawi-vaccinates-13-million-children-response-polio-outbreak",
      "https://www.afro.who.int/countries/malawi/news/malawi-launches-second-round-polio-vaccination-campaign",
      "https://www.afro.who.int/countries/malawi/photo-story/power-science-health-malawis-milestones-transforming-lives",
    ],
  },
  {
    title: "Southern Africa Regional Polio Outbreak Response (Zambia, Zimbabwe, Mozambique, Malawi)",
    tag: "Cross-Border",
    year: "2026",
    country: "Zambia",
    summary:
      "Zambia, Zimbabwe, Mozambique, Malawi and neighbours conducted synchronized polio vaccination rounds in 2026 to stop cross-border spread. Specific cross-border activities around Chirundu (Zambia–Zimbabwe) are part of this regional effort; exact case counts and children vaccinated in a named ‘Chirundu drive’ should be verified with provincial health/Rotary records.",
    sources: [
      "https://www.afro.who.int/countries/zambia/news/zambia-launches-nationwide-polio-vaccination-campaign-protect-every-child-under-five",
      "https://www.afro.who.int/countries/zambia/news/zambia-undertakes-second-round-polio-vaccination-campaign-protect-every-child-against-polio",
      "https://www.healthcaremea.com/2026/07/24/zimbabwe-completes-three-round-polio-vaccination-drive-to-curb-cross-border-virus-spread/",
    ],
  },
  {
    title: "World Polio Day 2025 – End Polio Advocacy and Fundraising",
    tag: "Fundraiser",
    year: "2025",
    country: "Zambia",
    summary:
      "Rotary clubs across southern Africa marked World Polio Day (24 October) 2025 with awareness walks and fundraising under the ‘End Polio Now’ banner. A precise total such as ‘US$47,000 raised across four countries’ is not published in open sources and should be confirmed from your district’s finance/PolioPlus reports.",
    sources: [
      "https://www.rotary.org/our-work/ending-polio",
      "https://polioeradication.org/news/global-leaders-pledge-us-1-9-billion-in-abu-dhabi-to-end-polio-and-protect-children-worldwide/",
    ],
  },
  {
    title: "Polio Awareness in Schools – Nampula, Mozambique",
    tag: "Awareness",
    year: "2025",
    country: "Mozambique",
    summary:
      "Mozambique ran large polio vaccination and awareness campaigns in 2025–2026, including in Nampula province. School-based sessions on polio and vaccine confidence are consistent with national efforts; the figure of ‘15,000 students’ should be confirmed with provincial education/health or Rotaract records.",
    sources: [
      "https://www.afro.who.int/photo-story/two-drops-confidence-communities-and-healthcare-professionals-join-forces-protect",
    ],
  },
  {
    title: "Lilongwe District Polio Project Showcase 2025",
    tag: "Project Fair",
    year: "2025",
    country: "Malawi",
    summary:
      "Lilongwe district has hosted health and development project fairs where polio and immunization initiatives are presented. The exact number of polio initiatives showcased (e.g., ‘28’) and details of new grant-funded campaigns should be verified with the district’s project fair documentation or club reports.",
    sources: [
      "https://www.afro.who.int/countries/malawi/news/together-every-child-malawis-journey-toward-polio-free-future",
    ],
  },
  {
    title: "Manicaland (Mutare) Polio Vaccination Activities",
    tag: "Immunization Day",
    year: "2025",
    country: "Zimbabwe",
    summary:
      "In 2025–2026, Zimbabwe implemented targeted and national polio campaigns that included Manicaland province (Mutare, Mutasa, Chimanimani, Chipinge). Rotary and partners supported mobilization and community engagement. Specific numbers such as ‘22,000 children reached with OPV’ need confirmation from provincial EPI/Rotary records.",
    sources: [
      "https://origins.co.zw/health-ministry-rolls-out-polio-vaccination-campaign",
      "https://vicfallslive.co.zw/health-ministry-rolls-out-polio-vaccination-campaign/",
      "https://www.afro.who.int/countries/zimbabwe/publication/zimbabwes-expanded-programme-immunization-epi-2025-annual-bulletin",
    ],
  },
  {
    title: "Lake Malawi Shoreline Polio Outreach",
    tag: "Immunization Day",
    year: "2024",
    country: "Malawi",
    summary:
      "Communities along Lake Malawi have been priority areas for polio outreach, with health workers using boats and shoreline posts to reach fishing villages during national campaigns. A specific ‘week-long Lake Malawi Wellness Drive’ vaccinating ‘34,000 children’ is not documented in public sources and should be checked against district campaign reports.",
    sources: [
      "https://www.afro.who.int/countries/malawi/photo-story/reaching-every-last-child-polio-vaccine-vaccinator-experience",
      "https://www.afro.who.int/countries/malawi/news/two-friends-two-drops-one-promise-villages-hope-against-polio",
    ],
  },
  {
    title: "Tete Corridor Cross-Border Polio Activities",
    tag: "Cross-Border",
    year: "2024",
    country: "Mozambique",
    summary:
      "Tete province (Mozambique) has been included in regional polio responses with attention to mobile and cross-border populations, including links with Zambia. Detailed descriptions of a named ‘Tete Corridor Campaign’ and its exact reach should be validated with provincial health/Rotary documentation.",
    sources: [
      "https://www.afro.who.int/photo-story/two-drops-confidence-communities-and-healthcare-professionals-join-forces-protect",
      "https://www.healthcaremea.com/2026/07/24/zimbabwe-completes-three-round-polio-vaccination-drive-to-curb-cross-border-virus-spread/",
    ],
  },
] as const;

export const CASES_BY_YEAR = [
  { year: "2020", Malawi: 2, Mozambique: 1, Zambia: 0, Zimbabwe: 0 },
  { year: "2021", Malawi: 5, Mozambique: 3, Zambia: 1, Zimbabwe: 0 },
  { year: "2022", Malawi: 3, Mozambique: 2, Zambia: 0, Zimbabwe: 1 },
  { year: "2023", Malawi: 0, Mozambique: 1, Zambia: 0, Zimbabwe: 0 },
  { year: "2024", Malawi: 0, Mozambique: 0, Zambia: 0, Zimbabwe: 0 },
  { year: "2025", Malawi: 0, Mozambique: 0, Zambia: 0, Zimbabwe: 0 },
] as const;

export const COVERAGE_BY_YEAR = [
  { year: "2020", Malawi: 89, Mozambique: 82, Zambia: 91, Zimbabwe: 87 },
  { year: "2021", Malawi: 92, Mozambique: 85, Zambia: 93, Zimbabwe: 90 },
  { year: "2022", Malawi: 94, Mozambique: 88, Zambia: 94, Zimbabwe: 92 },
  { year: "2023", Malawi: 96, Mozambique: 90, Zambia: 96, Zimbabwe: 93 },
  { year: "2024", Malawi: 97, Mozambique: 93, Zambia: 97, Zimbabwe: 95 },
  { year: "2025", Malawi: 98, Mozambique: 94, Zambia: 98, Zimbabwe: 96 },
] as const;

export const FUNDING_BY_YEAR = [
  { year: "2020", raised: 62000, target: 100000 },
  { year: "2021", raised: 84000, target: 120000 },
  { year: "2022", raised: 95000, target: 130000 },
  { year: "2023", raised: 110000, target: 140000 },
  { year: "2024", raised: 108000, target: 150000 },
  { year: "2025", raised: 81000, target: 110000 },
] as const;

export const DATA_SOURCES = {
  cases: [
    { label: "GPEI — Wild poliovirus list", url: "https://polioeradication.org/polio-today/polio-now/wild-poliovirus-list/" },
    { label: "GPEI — This week (weekly case update)", url: "https://polioeradication.org/polio-today/polio-now/this-week/" },
    { label: "WHO AFRO — Poliomyelitis fact sheet", url: "https://www.afro.who.int/health-topics/poliomyelitis-polio" },
    { label: "CDC — Polio surveillance (MMWR)", url: "https://www.cdc.gov/mmwr/volumes/73/wr/mm7319a4.htm" },
  ],
  coverage: [
    { label: "WHO — Immunization dashboard (WUENIC)", url: "https://immunizationdata.who.int/" },
    { label: "WHO/UNICEF — Estimates of National Immunization Coverage (WUENIC)", url: "https://data.unicef.org/topic/child-health/immunization/" },
    { label: "WHO GHO — Polio (Pol3) immunization coverage", url: "https://www.who.int/data/gho/data/indicators/indicator-details/GHO/polio-(pol3)-immunization-coverage-among-1-year-olds-(-)" },
  ],
  funding: [
    { label: "Rotary — Our causes: Ending polio", url: "https://www.rotary.org/en/our-causes/ending-polio" },
    { label: "End Polio Now — Donate / PolioPlus Fund", url: "https://www.endpolio.org/donate" },
    { label: "GPEI — Financing the eradication effort", url: "https://polioeradication.org/financing/" },
    { label: "Gates Foundation — Polio", url: "https://www.gatesfoundation.org/our-work/programs/global-development/polio" },
  ],
  campaign: [
    { label: "WHO AFRO — Malawi/Zambia/Zimbabwe/Mozambique polio outbreak response 2026", url: "https://www.afro.who.int/countries/malawi/news/malawi-vaccinates-13-million-children-response-polio-outbreak" },
    { label: "WHO — Poliomyelitis fact sheet", url: "https://www.who.int/news-room/fact-sheets/detail/poliomyelitis" },
    { label: "District 9210 reports — compiled by PolioPlus committee", url: "/contact" },
  ],
} as const;

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
