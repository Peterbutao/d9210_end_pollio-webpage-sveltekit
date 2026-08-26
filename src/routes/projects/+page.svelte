<script lang="ts">
  import VaccineDrop from "$lib/components/VaccineDrop.svelte";
  import { PROJECTS } from "$lib/data/content";

  const TAG_STYLES: Record<string, string> = {
    "Immunization Day": "bg-rotary-red text-primary-foreground",
    "Cross-Border": "bg-rotary-gold text-charcoal",
    Fundraiser: "bg-charcoal text-charcoal-foreground",
    "Project Fair": "bg-rotary-gold text-charcoal",
    Awareness: "bg-rotary-red text-primary-foreground",
  };
</script>

<svelte:head>
  <title>Projects & Campaigns — District 9210</title>
</svelte:head>

<div>
  <section class="bg-rotary-red text-primary-foreground">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <p class="text-sm font-bold uppercase tracking-[0.25em] text-rotary-gold">In the Field</p>
      <h1 class="mt-2 font-display text-6xl tracking-wide sm:text-7xl">Projects & Campaigns</h1>
      <p class="mt-4 max-w-2xl text-lg font-semibold">
        Boots on the ground: immunization days, border drives, walkathons and project fairs.
      </p>
    </div>
  </section>

  <section class="bg-cream">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div class="grid gap-6 md:grid-cols-2">
        {#each PROJECTS as project (project.title)}
          <article class="flex flex-col rounded-sm bg-card p-6 shadow-md transition-shadow hover:shadow-xl sm:p-8">
            <div class="flex items-center justify-between gap-3">
              <span
                class="rounded-sm px-2 py-1 text-[11px] font-bold uppercase tracking-wider {TAG_STYLES[project.tag] ??
                  'bg-muted text-muted-foreground'}"
              >
                {project.tag}
              </span>
              <span class="font-display text-xl tracking-wide text-muted-foreground">{project.year}</span>
            </div>
            <h2 class="mt-4 font-display text-3xl leading-tight tracking-wide text-foreground">
              {project.title}
            </h2>
            <p class="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-rotary-red">
              {project.country}
            </p>
            <p class="mt-4 flex-1 text-muted-foreground">{project.summary}</p>
          </article>
        {/each}
      </div>

      <div class="mt-16 flex flex-col items-center rounded-sm border-4 border-rotary-red bg-card p-10 text-center">
        <VaccineDrop class="h-12 text-rotary-gold" />
        <h2 class="mt-4 font-display text-4xl tracking-wide text-foreground">Running a polio project in your club?</h2>
        <p class="mt-3 max-w-xl text-muted-foreground">
          Share your immunization day reports, photos and results with the district PolioPlus committee so they can be
          featured here.
        </p>
        <a
          href="/contact"
          class="mt-6 rounded-sm bg-rotary-red px-6 py-3 font-display text-xl tracking-wide text-primary-foreground transition-colors hover:bg-rotary-red-dark"
        >
          Submit a project story
        </a>
      </div>
    </div>
  </section>
</div>
