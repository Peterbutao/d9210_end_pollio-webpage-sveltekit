<script lang="ts">
  import SEO from "$lib/components/SEO.svelte";
  import VaccineDrop from "$lib/components/VaccineDrop.svelte";
  import { SITE, ROUTES } from "$lib/config/site";
  import { CAMPAIGN_STATS, formatUsd } from "$lib/data/content";

  const meta = ROUTES.find((r) => r.path === "/get-involved")!;

  const WAYS = [
    {
      icon: "Heart",
      title: "Give to PolioPlus",
      body: "Join the PolioPlus Society by committing US$100 or more per year until polio is eradicated. Every dollar is matched 2:1 by the Gates Foundation — your $100 becomes $300.",
      cta: "Donate via The Rotary Foundation",
      href: "https://www.endpolio.org/donate",
      external: true,
    },
    {
      icon: "Syringe",
      title: "Join an immunization drive",
      body: "National Immunization Days need volunteers for transport, social mobilisation, tally sheets and cold-chain support. Clubs coordinate directly with district health offices.",
      cta: "Find your club",
      href: "/clubs",
      external: false,
    },
    {
      icon: "Megaphone",
      title: "Start a local campaign",
      body: "Host a Walk to End Polio, light a landmark red and gold on World Polio Day (24 October), or run a 'Two Drops' awareness event at schools and markets.",
      cta: "Get campaign support",
      href: "/contact",
      external: false,
    },
  ] as const;
</script>

<SEO
  title={meta.title}
  description={meta.description}
  breadcrumbs={[
    { name: "Home", url: "/" },
    { name: "Get Involved", url: "/get-involved" },
  ]}
  jsonLd={{
    "@type": "DonateAction",
    name: meta.title,
    description: meta.description,
    target: { "@type": "EntryPoint", urlTemplate: "https://www.endpolio.org/donate" },
    recipient: { "@id": `${SITE.url}/#organization` },
  }}
/>

<div>
  <section class="bg-rotary-red text-primary-foreground">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <p class="text-sm font-bold uppercase tracking-[0.25em] text-rotary-gold">Take Action</p>
      <h1 class="mt-2 font-display text-6xl tracking-wide sm:text-7xl">Get Involved</h1>
      <p class="mt-4 max-w-2xl text-lg font-semibold">
        We are {formatUsd(CAMPAIGN_STATS.fundsTargetUsd - CAMPAIGN_STATS.fundsRaisedUsd)} away from the district target &mdash;
        and one campaign away from history.
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <div class="grid gap-6 md:grid-cols-3">
      {#each WAYS as way (way.title)}
        <article class="flex flex-col rounded-sm border-t-4 border-rotary-gold bg-card p-6 shadow-md sm:p-8">
          {#if way.icon === "Heart"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-10 w-10 text-rotary-red"
              ><path
                d="M19 14c1.49-2.33 3.11-5.84 1.41-9.43a5 5 0 0 0-9.43.69A5 5 0 0 0 6.14 3.2C4.47 5.91 5.34 9.32 7 12"
              /><path d="M12 19l4-3.79c1.4-1.33 3.1-3.32 3.1-5.47a4.15 4.15 0 0 0-8.27-.28" /><path
                d="M2 15c1.09-1.16 3.17-2.71 5.55-3"
              /><path d="M12 19v-7" /><path d="M2 22h20" /><path d="M12 22v-7" /></svg
            >
          {:else if way.icon === "Syringe"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-10 w-10 text-rotary-red"
              ><path d="m18 2 4 4" /><path d="m17 7 3-3" /><path d="M19 9 8 20H4v-4L15 5" /><path d="m4 17-2 2" /></svg
            >
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-10 w-10 text-rotary-red"
              ><path d="M3 10h18M6 7v4M12 7v4M18 7v4M3 14h18" /><path d="M21 17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2" /></svg
            >
          {/if}
          <h2 class="mt-4 font-display text-3xl tracking-wide text-foreground">{way.title}</h2>
          <p class="mt-3 flex-1 text-muted-foreground">{way.body}</p>
          {#if way.external}
            <a
              href={way.href}
              target="_blank"
              rel="noopener noreferrer"
              class="mt-6 inline-block rounded-sm bg-rotary-red px-5 py-3 text-center font-display text-lg tracking-wide text-primary-foreground transition-colors hover:bg-rotary-red-dark"
            >
              {way.cta}
            </a>
          {:else}
            <a
              href={way.href}
              class="mt-6 inline-block rounded-sm bg-rotary-red px-5 py-3 text-center font-display text-lg tracking-wide text-primary-foreground transition-colors hover:bg-rotary-red-dark"
            >
              {way.cta}
            </a>
          {/if}
        </article>
      {/each}
    </div>
  </section>

  <section class="bg-charcoal text-charcoal-foreground">
    <div class="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6">
      <VaccineDrop class="h-14 text-rotary-gold" />
      <h2 class="mt-4 max-w-2xl font-display text-5xl leading-tight tracking-wide sm:text-6xl">
        The PolioPlus Society
      </h2>
      <p class="mt-4 max-w-2xl text-charcoal-foreground/80">
        PolioPlus Society members pledge at least US$100 a year to polio eradication until the world is certified
        polio-free. District 9210 now counts
        <strong class="text-rotary-gold">400+ sustaining members</strong> &mdash; Rotarians and Rotaractors who refuse to
        stop at 99.9%.
      </p>
      <div class="mt-8 grid grid-cols-3 gap-6">
        {#each [{ value: "$100/yr", label: "Sustaining pledge" }, { value: "2:1", label: "Gates match" }, { value: "400+", label: "D9210 members" }] as s (s.label)}
          <div>
            <p class="font-display text-4xl tracking-wide text-rotary-gold">{s.value}</p>
            <p class="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-foreground/60">
              {s.label}
            </p>
          </div>
        {/each}
      </div>
      <a
        href="https://www.endpolio.org/donate"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-10 rounded-sm bg-rotary-gold px-8 py-4 font-display text-2xl tracking-wide text-charcoal transition-colors hover:bg-rotary-gold-dark hover:text-primary-foreground"
      >
        Join the PolioPlus Society
      </a>
    </div>
  </section>
</div>
