<script lang="ts">
  import { onMount } from "svelte";
  import SEO from "$lib/components/SEO.svelte";
  import VaccineDrop from "$lib/components/VaccineDrop.svelte";
  import { SITE, ROUTES } from "$lib/config/site";
  import { DISTRICT, FOCUS_AREAS, LEADERSHIP } from "$lib/data/content";

  const meta = ROUTES.find((r) => r.path === "/about")!;

  const aboutImages = [
    // { src: "/images/volunteers.jpg", alt: "Health workers vaccinating children at an outdoor immunization day" },
    // { src: "/VOL.webp", alt: "Rotary volunteers in red vests carrying vaccine carriers at sunset" },
    { src: "/VAC.webp", alt: "Polio vaccination campaign in the field" },
    // { src: "/hero-caro(2).webp", alt: "District 9210 campaign field activity" },
  ];
  const ABOUT_AUTOPLAY_MS = 3000;
  let aboutIndex = $state(0);
  let aboutPaused = $state(false);
  let aboutTimer = $state<ReturnType<typeof setTimeout>>();

  function nextAbout() {
    aboutIndex = (aboutIndex + 1) % aboutImages.length;
  }

  function startAboutAutoplay() {
    clearTimeout(aboutTimer);
    aboutTimer = setTimeout(() => {
      if (!aboutPaused) nextAbout();
      startAboutAutoplay();
    }, ABOUT_AUTOPLAY_MS);
  }

  function pauseAbout() {
    aboutPaused = true;
    clearTimeout(aboutTimer);
  }

  function resumeAbout() {
    aboutPaused = false;
    startAboutAutoplay();
  }

  onMount(() => {
    startAboutAutoplay();
    return () => clearTimeout(aboutTimer);
  });
</script>

<SEO
  title={meta.title}
  description={meta.description}
  breadcrumbs={[
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]}
  jsonLd={{
    "@type": "AboutPage",
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
  }}
/>

<div>
  <section class="bg-rotary-red text-primary-foreground">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <p class="text-sm font-bold uppercase tracking-[0.25em] text-rotary-gold">About</p>
      <h1 class="mt-2 font-display text-6xl tracking-wide sm:text-7xl">District 9210</h1>
      <p class="mt-4 max-w-2xl text-lg font-semibold">
        Four countries, one mission: finish what Rotary started in 1985 and deliver a polio-free world.
      </p>
    </div>
  </section>

  <section class="mx-auto grid max-w-7xl items-start gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
    <div>
      <h2 class="font-display text-4xl tracking-wide text-foreground">Our History</h2>
      <div class="mt-6 space-y-4 text-muted-foreground">
        <p>
          Rotary International District 9210 was formed in {DISTRICT.formed} when the former
          {DISTRICT.formedFrom} &mdash; then covering much of south-eastern Africa &mdash; was divided to better serve its
          growing membership. The new district brought together clubs in
          {DISTRICT.countries.join(", ")}.
        </p>
        <p>
          Polio eradication has been the district's defining cause. When Rotary launched PolioPlus in 1985, polio
          paralysed more than 1,000 children every day across 125 countries. Today, wild poliovirus survives in just two
          endemic countries &mdash; and District 9210 stands on the front line of Africa's final mop-up campaigns,
          supporting surveillance, immunization days and cross-border coordination.
        </p>
        <p>
          Through the PolioPlus Society, National Immunization Days and partnerships with ministries of health, WHO and
          UNICEF, the district's members have helped vaccinate millions of children and kept the dream of a polio-free
          Africa within reach.
        </p>
      </div>
    </div>
    <div class="relative">
      <div
        class="group relative aspect-[3/2] overflow-hidden rounded-sm border-8 border-rotary-gold shadow-xl"
        role="group"
        aria-roledescription="carousel"
        aria-label="About District 9210 images"
        onmouseenter={pauseAbout}
        onmouseleave={resumeAbout}
      >
        {#each aboutImages as img, i (img.src)}
          <img
            src={img.src}
            alt={img.alt}
            width="1200"
            height="800"
            loading={i === 0 ? "eager" : "lazy"}
            class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 {i === aboutIndex
              ? 'opacity-100'
              : 'opacity-0'}"
          />
        {/each}
        <div class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {#each aboutImages as _, i (i)}
            <button
              type="button"
              onclick={() => {
                aboutIndex = i;
                startAboutAutoplay();
              }}
              aria-label="Go to image {(i + 1).toString()}"
              aria-current={i === aboutIndex}
              class="h-2 rounded-full transition-all {i === aboutIndex
                ? 'w-5 bg-rotary-gold'
                : 'w-2 bg-white/70 hover:bg-white'}"
            ></button>
          {/each}
        </div>
      </div>
      <VaccineDrop class="absolute -top-5 -right-5 h-14 rotate-12 text-rotary-gold drop-shadow-lg" />
    </div>
  </section>

  <section class="bg-cream">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h2 class="font-display text-4xl tracking-wide text-foreground">District Leadership</h2>
      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {#each LEADERSHIP as person (person.name)}
          <div class="rounded-sm border-l-4 border-rotary-red bg-card p-5 shadow-sm">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-rotary-red">{person.role}</p>
            <p class="mt-2 font-display text-2xl tracking-wide text-foreground">{person.name}</p>
            <p class="mt-1 text-sm text-muted-foreground">
              {person.club} &middot; {person.country}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <h2 class="font-display text-4xl tracking-wide text-foreground">Rotary's Areas of Focus</h2>
    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each FOCUS_AREAS as area (area.name)}
        <div
          class="rounded-sm p-5 font-display text-2xl tracking-wide shadow-sm"
          class:bg-rotary-red={area.highlighted}
          class:text-primary-foreground={area.highlighted}
          class:border={!area.highlighted}
          class:border-border={!area.highlighted}
          class:bg-card={!area.highlighted}
          class:text-foreground={!area.highlighted}
        >
          {area.name}
          {#if area.highlighted}
            <span class="mt-2 block font-sans text-xs font-bold uppercase tracking-[0.2em] text-rotary-gold">
              Home of the End Polio Now campaign
            </span>
          {/if}
        </div>
      {/each}
    </div>
    <a
      href="/get-involved"
      class="mt-10 inline-block rounded-sm bg-rotary-red px-6 py-3 font-display text-xl tracking-wide text-primary-foreground transition-colors hover:bg-rotary-red-dark"
    >
      Get involved
    </a>
  </section>
</div>
