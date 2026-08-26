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
    slug: "nid-march-2026",
    title: "National Immunization Day reaches 120 000 children in Malawi",
    excerpt:
      "Rotarians joined Ministry of Health teams across 14 districts for the March NID, delivering oral polio vaccine to children under five.",
    date: "2026-03-20",
    country: "Malawi",
    topic: "Immunization" as const,
  },
  {
    slug: "cross-border-august",
    title: "Cross-border campaign vaccinates children along Zambia-Zimbabwe corridor",
    excerpt:
      "A joint Zambia-Zimbabwe drive targeted mobile populations in the Chirundu border area, reaching 18 000 children in three days.",
    date: "2026-02-10",
    country: "Zambia",
    topic: "Immunization" as const,
  },
  {
    slug: "polio-plus-milestone",
    title: "District PolioPlus Society surpasses 400 sustaining members",
    excerpt: "With 412 members now committed until eradication, D9210 leads the region in Rotarian polio pledges.",
    date: "2026-01-28",
    country: "Zimbabwe",
    topic: "Fundraising" as const,
  },
  {
    slug: "walk-to-end-polio-2025",
    title: "Walk to End Polio draws 3 000 participants in Lusaka",
    excerpt:
      "Clubs from all four countries coordinated simultaneous walks on World Polio Day, raising US$47 000 for PolioPlus.",
    date: "2025-10-24",
    country: "Zambia",
    topic: "Fundraising" as const,
  },
  {
    slug: "rotaract-awareness",
    title: "Rotaractors lead school awareness campaign in Nampula",
    excerpt:
      "Rotaract clubs from Nampula and neighbouring districts reached 15 000 students with polio facts and vaccine confidence messages.",
    date: "2025-09-12",
    country: "Mozambique",
    topic: "Awareness" as const,
  },
  {
    slug: "who-partnership",
    title: "WHO praises D9210 for cross-border surveillance coordination",
    excerpt:
      "The World Health Organization recognised the district's data-sharing protocol as a model for other border regions in Africa.",
    date: "2025-08-05",
    country: "Zimbabwe",
    topic: "Partnerships" as const,
  },
  {
    slug: "project-fair-2025",
    title: "Annual District Project Fair showcases 28 polio initiatives",
    excerpt:
      "Clubs presented immunization day reports, grant-funded projects and awareness campaigns at the Lilongwe fair.",
    date: "2025-07-18",
    country: "Malawi",
    topic: "Awareness" as const,
  },
] as const;

export const PROJECTS = [
  {
    title: "March NID Malawi 2026",
    tag: "Immunization Day",
    year: "2026",
    country: "Malawi",
    summary:
      "Rotarians supported 14 districts with transport, tally sheets and cold-chain monitoring during the March National Immunization Day.",
  },
  {
    title: "Chirundu Cross-Border Drive",
    tag: "Cross-Border",
    year: "2026",
    country: "Zambia",
    summary: "A joint Zambia-Zimbabwe campaign vaccinated 18 000 children in the Chirundu border area over three days.",
  },
  {
    title: "Walk to End Polio 2025",
    tag: "Fundraiser",
    year: "2025",
    country: "Zambia",
    summary: "Coordinated walks across all four countries on World Polio Day raised US$47 000 for PolioPlus.",
  },
  {
    title: "Nampula School Campaign",
    tag: "Awareness",
    year: "2025",
    country: "Mozambique",
    summary: "Rotaractors reached 15 000 students with polio awareness and vaccine confidence sessions.",
  },
  {
    title: "Lilongwe Project Fair 2025",
    tag: "Project Fair",
    year: "2025",
    country: "Malawi",
    summary:
      "28 polio initiatives showcased at the district's annual project fair, including new grant-funded campaigns.",
  },
  {
    title: "Mutare Immunization Day",
    tag: "Immunization Day",
    year: "2025",
    country: "Zimbabwe",
    summary:
      "Clubs in Manicaland province reached 22 000 children with OPV in partnership with provincial health teams.",
  },
  {
    title: "Lake Malawi Wellness Drive",
    tag: "Immunization Day",
    year: "2024",
    country: "Malawi",
    summary:
      "A week-long drive along Lake Malawi's shoreline vaccinated 34 000 children in hard-to-reach fishing communities.",
  },
  {
    title: "Tete Corridor Campaign",
    tag: "Cross-Border",
    year: "2024",
    country: "Mozambique",
    summary: "Cross-border coordination with Zambia reached mobile populations along the Tete-Zambia corridor.",
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
