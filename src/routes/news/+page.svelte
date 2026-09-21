<script lang="ts">
  import SEO from "$lib/components/SEO.svelte";
  import { SITE, ROUTES } from "$lib/config/site";
  import { NEWS } from "$lib/data/content";

  const meta = ROUTES.find((r) => r.path === "/news")!;

  const TOPIC_FILTERS = ["All", "Immunization", "Fundraising", "Awareness", "Partnerships"] as const;

  let topic = $state<(typeof TOPIC_FILTERS)[number]>("All");

  let items = $derived(
    [...NEWS].sort((a, b) => b.date.localeCompare(a.date)).filter((n) => topic === "All" || n.topic === topic),
  );

  function formatDate(dateStr: string): string {
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
  ogType="website"
  breadcrumbs={[
    { name: "Home", url: "/" },
    { name: "News", url: "/news" },
  ]}
  jsonLd={{
    "@type": "CollectionPage",
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: NEWS.length,
      itemListElement: NEWS.map((n, i) => ({
        "@type": "NewsArticle",
        position: i + 1,
        headline: n.title,
        description: n.excerpt,
        datePublished: n.date,
        author: { "@type": "Organization", name: SITE.author },
        url: (n as any).link,
        image: (n as any).image?.startsWith("http") ? (n as any).image : `${SITE.url}${(n as any).image}`,
        keywords: [n.country, n.topic].join(", "),
      })),
    },
  }}
/>

<div>
  <section class="bg-rotary-red text-primary-foreground">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <p class="text-sm font-bold uppercase tracking-[0.25em] text-rotary-gold">Updates</p>
      <h1 class="mt-2 font-display text-6xl tracking-wide sm:text-7xl">News from the District</h1>
    </div>
  </section>

  <section class="mx-auto max-w-5xl px-4 py-12 sm:px-6">
    <div class="flex flex-wrap gap-2">
      {#each TOPIC_FILTERS as t (t)}
        <button
          onclick={() => (topic = t)}
          class="rounded-sm px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors"
          class:bg-rotary-red={topic === t}
          class:text-primary-foreground={topic === t}
          class:border={topic !== t}
          class:border-border={topic !== t}
          class:bg-card={topic !== t}
          class:text-foreground={topic !== t}
          class:hover:border-rotary-red={topic !== t}
        >
          {t}
        </button>
      {/each}
    </div>

    <ol class="mt-10 space-y-8 border-l-4 border-rotary-gold pl-6">
      {#each items as item (item.slug)}
        <li class="relative">
          <span
            class="absolute -left-[2.35rem] top-1 h-4 w-4 rounded-full border-4 border-rotary-gold bg-rotary-red"
            aria-hidden="true"
          ></span>
          <article class="overflow-hidden rounded-sm bg-card shadow-md">
            {#if (item as any).image}
              <a href={(item as any).link} target="_blank" rel="noopener noreferrer" class="block overflow-hidden">
                <img
                  src={(item as any).image}
                  alt={item.title}
                  width="800"
                  height="450"
                  loading="lazy"
                  class="h-56 w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  onerror={(e) => ((e.currentTarget as HTMLImageElement).src = '/VAC.jpg')}
                />
              </a>
            {/if}
            <div class="p-6">
              <div class="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span class="rounded-sm bg-rotary-red px-2 py-1 text-primary-foreground">{item.country}</span>
                <span class="rounded-sm bg-rotary-gold px-2 py-1 text-charcoal">{item.topic}</span>
                <time class="text-muted-foreground" datetime={item.date}>
                  {formatDate(item.date)}
                </time>
              </div>
              <h2 class="mt-3 font-display text-3xl leading-tight tracking-wide text-foreground">
                <a
                  href={(item as any).link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-rotary-red hover:underline"
                >
                  {item.title}
                </a>
              </h2>
              <p class="mt-3 text-muted-foreground">{item.excerpt}</p>
              <a
                href={(item as any).link}
                target="_blank"
                rel="noopener noreferrer"
                class="mt-4 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-rotary-red hover:underline"
              >
                Read full story
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
                >
              </a>
            </div>
          </article>
        </li>
      {/each}
    </ol>
  </section>
</div>
