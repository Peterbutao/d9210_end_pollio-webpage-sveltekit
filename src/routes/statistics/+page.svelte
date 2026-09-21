<script lang="ts">
  import SEO from "$lib/components/SEO.svelte";
  import { SITE, ROUTES } from "$lib/config/site";
  import {
    CAMPAIGN_STATS,
    CASES_BY_YEAR,
    COVERAGE_BY_YEAR,
    DISTRICT,
    FUNDING_BY_YEAR,
    formatNumber,
    formatUsd,
  } from "$lib/data/content";

  const meta = ROUTES.find((r) => r.path === "/statistics")!;

  const COUNTRIES = DISTRICT.countries;
  const COUNTRY_COLORS = [
    "var(--color-rotary-red)",
    "var(--color-rotary-gold)",
    "var(--color-charcoal)",
    "oklch(0.6 0.1 160)",
  ] as const;

  let maxCases = $derived(Math.max(...CASES_BY_YEAR.flatMap((r) => COUNTRIES.map((c) => (r as any)[c] as number)), 1));

  let fundingPct = $derived(Math.round((CAMPAIGN_STATS.fundsRaisedUsd / CAMPAIGN_STATS.fundsTargetUsd) * 100));

  function toCsv(headers: string[], rows: (string | number)[][]): string {
    return [headers, ...rows].map((r) => r.join(",")).join("\n");
  }

  function downloadCsv(filename: string, csv: string) {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function formatStatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
</script>

<SEO
  title={meta.title}
  description={meta.description}
  breadcrumbs={[
    { name: "Home", url: "/" },
    { name: "Statistics", url: "/statistics" },
  ]}
  jsonLd={[
    {
      "@type": "Dataset",
      name: "D9210 Polio Cases by Country & Year",
      description: "Wild and cVDPV polio cases by country/year — district-reported, downloadable CSV",
      url: `${SITE.url}/statistics`,
      keywords: ["polio", "cases", ...DISTRICT.countries],
      temporalCoverage: "2020/2025",
      distribution: [
        {
          "@type": "DataDownload",
          encodingFormat: "text/csv",
          contentUrl: `${SITE.url}/statistics`,
          name: "d9210-polio-cases.csv",
        },
      ],
      dateModified: CAMPAIGN_STATS.lastUpdated,
    },
    {
      "@type": "Dataset",
      name: "D9210 Immunization Coverage by Country & Year",
      description: "Campaign coverage % of target by country/year",
      url: `${SITE.url}/statistics`,
      temporalCoverage: "2020/2025",
    },
  ]}
/>

<div>
  <section class="bg-rotary-red text-primary-foreground">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <p class="text-sm font-bold uppercase tracking-[0.25em] text-rotary-gold">The Numbers</p>
      <h1 class="mt-2 font-display text-6xl tracking-wide sm:text-7xl">Polio Statistics</h1>
      <p class="mt-4 max-w-2xl text-lg font-semibold">
        District-reported figures, last updated
        {formatStatDate(CAMPAIGN_STATS.lastUpdated)}.
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {#each [{ label: "Children vaccinated", value: formatNumber(CAMPAIGN_STATS.childrenVaccinated) }, { label: "Cases prevented", value: formatNumber(CAMPAIGN_STATS.casesPrevented) }, { label: "Immunization days held", value: String(CAMPAIGN_STATS.immunizationDaysHeld) }, { label: "Volunteers mobilised", value: formatNumber(CAMPAIGN_STATS.volunteersMobilised) }] as s (s.label)}
        <div class="rounded-sm border-t-4 border-rotary-gold bg-card p-6 text-center shadow-md">
          <p class="font-display text-4xl tracking-wide text-rotary-red sm:text-5xl">{s.value}</p>
          <p class="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{s.label}</p>
        </div>
      {/each}
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <div class="rounded-sm bg-card p-6 shadow-md sm:p-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h2 class="font-display text-3xl tracking-wide text-foreground">Reported poliovirus cases by country & year</h2>
        <button
          onclick={() =>
            downloadCsv(
              "d9210-polio-cases.csv",
              toCsv(
                ["Year", ...COUNTRIES],
                CASES_BY_YEAR.map((r) => [r.year, ...COUNTRIES.map((c) => (r as any)[c] as number)]),
              ),
            )}
          class="inline-flex items-center gap-2 rounded-sm border-2 border-rotary-red px-4 py-2 text-xs font-bold uppercase tracking-wide text-rotary-red transition-colors hover:bg-rotary-red hover:text-primary-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
            ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line
              x1="12"
              y1="15"
              x2="12"
              y2="3"
            /></svg
          >
          Download CSV
        </button>
      </div>
      <div class="mt-4 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wide">
        {#each COUNTRIES as c, i (c)}
          <span class="flex items-center gap-2">
            <span class="inline-block h-3 w-3 rounded-full" style="background-color: {COUNTRY_COLORS[i]}"></span>
            {c}
          </span>
        {/each}
      </div>
      <div class="mt-6 space-y-4">
        {#each CASES_BY_YEAR as row (row.year)}
          {@const total = COUNTRIES.reduce((sum, c) => sum + ((row as any)[c] as number), 0)}
          <div class="grid grid-cols-[3rem_1fr_3rem] items-center gap-3">
            <span class="font-display text-lg tracking-wide text-foreground">{row.year}</span>
            <div class="flex h-6 w-full overflow-hidden rounded-sm bg-muted">
              {#each COUNTRIES as c, i (c)}
                {@const v = (row as any)[c] as number}
                {#if v}
                  <div
                    title={`${c}: ${v}`}
                    style="width: {(v / maxCases) * 100}%; background-color: {COUNTRY_COLORS[i]}"
                  ></div>
                {/if}
              {/each}
            </div>
            <span class="text-right text-sm font-bold text-foreground">{total}</span>
          </div>
        {/each}
      </div>
      <p class="mt-4 text-sm text-muted-foreground">
        Wild and circulating vaccine-derived poliovirus cases confirmed in district countries. Zero cases reported
        district-wide since January 2025.
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <div class="rounded-sm bg-card p-6 shadow-md sm:p-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h2 class="font-display text-3xl tracking-wide text-foreground">
          Immunization campaign coverage (% of target)
        </h2>
        <button
          onclick={() =>
            downloadCsv(
              "d9210-coverage.csv",
              toCsv(
                ["Year", ...COUNTRIES],
                COVERAGE_BY_YEAR.map((r) => [r.year, ...COUNTRIES.map((c) => (r as any)[c] as number)]),
              ),
            )}
          class="inline-flex items-center gap-2 rounded-sm border-2 border-rotary-red px-4 py-2 text-xs font-bold uppercase tracking-wide text-rotary-red transition-colors hover:bg-rotary-red hover:text-primary-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
            ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line
              x1="12"
              y1="15"
              x2="12"
              y2="3"
            /></svg
          >
          Download CSV
        </button>
      </div>
      <div class="mt-8 space-y-6">
        {#each COUNTRIES as country, i (country)}
          <div>
            <p class="mb-2 text-sm font-bold uppercase tracking-wider text-foreground">{country}</p>
            <div class="flex items-end gap-2">
              {#each COVERAGE_BY_YEAR as row (row.year)}
                {@const v = (row as any)[country] as number}
                <div class="flex flex-1 flex-col items-center gap-1">
                  <span class="text-xs font-bold text-muted-foreground">{v}%</span>
                  <div
                    class="w-full rounded-t-sm"
                    style="height: {v * 1.4}px; background-color: {COUNTRY_COLORS[i]}"
                    title={`${country} ${row.year}: ${v}%`}
                  ></div>
                  <span class="text-[10px] uppercase text-muted-foreground">{row.year}</span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-8 pb-20 sm:px-6">
    <div class="rounded-sm bg-charcoal p-6 text-charcoal-foreground shadow-md sm:p-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h2 class="font-display text-3xl tracking-wide text-rotary-gold">Funding raised vs. target</h2>
        <button
          onclick={() =>
            downloadCsv(
              "d9210-funding.csv",
              toCsv(
                ["Year", "Raised (USD)", "Target (USD)"],
                FUNDING_BY_YEAR.map((r) => [r.year, r.raised, r.target]),
              ),
            )}
          class="inline-flex items-center gap-2 rounded-sm border-2 border-rotary-red px-4 py-2 text-xs font-bold uppercase tracking-wide text-rotary-red transition-colors hover:bg-rotary-red hover:text-primary-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
            ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line
              x1="12"
              y1="15"
              x2="12"
              y2="3"
            /></svg
          >
          Download CSV
        </button>
      </div>
      <div class="mt-6">
        <div class="flex items-baseline justify-between">
          <p class="font-display text-5xl tracking-wide text-rotary-gold">{formatUsd(CAMPAIGN_STATS.fundsRaisedUsd)}</p>
          <p class="text-sm font-bold uppercase tracking-wider text-charcoal-foreground/70">
            of {formatUsd(CAMPAIGN_STATS.fundsTargetUsd)} target &mdash; {fundingPct}%
          </p>
        </div>
        <div class="mt-3 h-6 w-full overflow-hidden rounded-sm bg-charcoal-foreground/10">
          <div class="h-full rounded-sm bg-rotary-gold" style="width: {fundingPct}%"></div>
        </div>
      </div>
      <div class="mt-8 space-y-3">
        {#each FUNDING_BY_YEAR as row (row.year)}
          {@const pct = Math.round((row.raised / row.target) * 100)}
          <div class="grid grid-cols-[3rem_1fr_6rem] items-center gap-3">
            <span class="font-display text-lg tracking-wide">{row.year}</span>
            <div class="h-4 w-full overflow-hidden rounded-sm bg-charcoal-foreground/10">
              <div class="h-full bg-rotary-red" style="width: {pct}%"></div>
            </div>
            <span class="text-right text-sm font-bold text-rotary-gold">{formatUsd(row.raised)}</span>
          </div>
        {/each}
      </div>
      <p class="mt-6 text-sm text-charcoal-foreground/70">
        Every dollar is matched 2:1 by the Gates Foundation &mdash; your $100 becomes $300 for polio eradication.
      </p>
    </div>
  </section>
</div>
