<script lang="ts">
  import SEO from "$lib/components/SEO.svelte";
  import { SITE, ROUTES } from "$lib/config/site";
  import { CLUBS } from "$lib/data/content";

  const meta = ROUTES.find((r) => r.path === "/clubs")!;

  const COUNTRY_FILTERS = ["All", "Malawi", "Mozambique", "Zambia", "Zimbabwe"] as const;
  const TYPE_FILTERS = ["All", "Rotary", "Rotaract"] as const;

  let country = $state<(typeof COUNTRY_FILTERS)[number]>("All");
  let type = $state<(typeof TYPE_FILTERS)[number]>("All");

  let filtered = $derived(
    CLUBS.filter((c) => (country === "All" || c.country === country) && (type === "All" || c.type === type)),
  );
</script>

<SEO
  title={meta.title}
  description={meta.description}
  breadcrumbs={[
    { name: "Home", url: "/" },
    { name: "Clubs", url: "/clubs" },
  ]}
  jsonLd={{
    "@type": "CollectionPage",
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: CLUBS.length,
      itemListElement: CLUBS.map((c, i) => ({
        "@type": "Organization",
        position: i + 1,
        name: c.name,
        description: `${c.type} in ${c.city}, ${c.country} — meets ${c.meetingDay}s`,
        url: `${SITE.url}/clubs`,
        areaServed: c.country,
      })),
    },
  }}
/>

<div>
  <section class="bg-rotary-red text-primary-foreground">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <p class="text-sm font-bold uppercase tracking-[0.25em] text-rotary-gold">Directory</p>
      <h1 class="mt-2 font-display text-6xl tracking-wide sm:text-7xl">Our Clubs</h1>
      <p class="mt-4 max-w-2xl text-lg font-semibold">
        {CLUBS.length} Rotary and Rotaract clubs across four countries &mdash; find yours.
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <div class="flex flex-wrap items-center gap-6">
      <div>
        <p class="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Country</p>
        <div class="flex flex-wrap gap-2">
          {#each COUNTRY_FILTERS as c (c)}
            <button
              onclick={() => (country = c)}
              class="rounded-sm px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors"
              class:bg-rotary-red={country === c}
              class:text-primary-foreground={country === c}
              class:border={country !== c}
              class:border-border={country !== c}
              class:bg-card={country !== c}
              class:text-foreground={country !== c}
              class:hover:border-rotary-red={country !== c}
            >
              {c}
            </button>
          {/each}
        </div>
      </div>
      <div>
        <p class="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Type</p>
        <div class="flex flex-wrap gap-2">
          {#each TYPE_FILTERS as t (t)}
            <button
              onclick={() => (type = t)}
              class="rounded-sm px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors"
              class:bg-rotary-gold={type === t}
              class:text-charcoal={type === t}
              class:border={type !== t}
              class:border-border={type !== t}
              class:bg-card={type !== t}
              class:text-foreground={type !== t}
              class:hover:border-rotary-gold={type !== t}
            >
              {t}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <p class="mt-8 text-sm font-semibold text-muted-foreground">
      Showing {filtered.length} of {CLUBS.length} clubs
    </p>

    <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each filtered as club (club.name)}
        <article
          class="flex items-start gap-4 rounded-sm border-l-4 border-rotary-gold bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <img src="/logo.png" alt="" aria-hidden="true" class="mt-1 h-8 w-8 shrink-0 object-contain" width="32" height="32" />
          <div>
            <h2 class="font-display text-xl tracking-wide text-foreground">{club.name}</h2>
            <p class="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg
              >
              {club.city}, {club.country}
            </p>
            <div class="mt-3 flex gap-2 text-[11px] font-bold uppercase tracking-wider">
              <span
                class="rounded-sm px-2 py-1"
                class:bg-rotary-red={club.type === "Rotary"}
                class:text-primary-foreground={club.type === "Rotary"}
                class:bg-rotary-gold={club.type === "Rotaract"}
                class:text-charcoal={club.type === "Rotaract"}
              >
                {club.type}
              </span>
              <span class="rounded-sm bg-muted px-2 py-1 text-muted-foreground">
                Meets {club.meetingDay}s
              </span>
            </div>
          </div>
        </article>
      {/each}
    </div>

    {#if filtered.length === 0}
      <p class="mt-12 text-center text-lg text-muted-foreground">
        No clubs match those filters &mdash; try a different combination.
      </p>
    {/if}
  </section>
</div>
