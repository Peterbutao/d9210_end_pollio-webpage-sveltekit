<script lang="ts">
  import { page } from "$app/stores";
  import VaccineDrop from "$lib/components/VaccineDrop.svelte";
  import { DISTRICT } from "$lib/data/content";

  let year = $derived(new Date().getFullYear());

  const FOOTER_LINKS = [
    { to: "/about", label: "About District 9210" },
    { to: "/statistics", label: "Polio Statistics" },
    { to: "/clubs", label: "Clubs Directory" },
    { to: "/projects", label: "Projects & Campaigns" },
    { to: "/news", label: "News & Updates" },
    { to: "/get-involved", label: "Get Involved" },
  ] as const;
</script>

<footer class="bg-charcoal text-charcoal-foreground">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
    <div>
      <div class="flex items-center gap-3">
        <picture>
          <source srcset="/logo.webp" type="image/webp" />
          <img src="/logo.png" alt="Rotary District 9210 logo" class="h-10 w-10 object-contain" width="40" height="40" decoding="async" loading="lazy" />
        </picture>
        <div class="leading-tight">
          <p class="font-display text-2xl tracking-wide">END POLIO NOW</p>
          <p class="text-xs uppercase tracking-[0.2em] text-rotary-gold">{DISTRICT.name}</p>
        </div>
      </div>
      <p class="mt-4 max-w-sm text-sm text-charcoal-foreground/70">
        Serving Rotary and Rotaract clubs across Malawi, Zambia, Zimbabwe and northern Mozambique in the final push to
        eradicate polio.
      </p>
      <VaccineDrop class="mt-6 h-8 text-rotary-gold" />
    </div>

    <nav aria-label="Footer navigation">
      <h3 class="font-display text-lg tracking-wide text-rotary-gold">Explore</h3>
      <ul class="mt-3 space-y-2 text-sm">
        {#each FOOTER_LINKS as l (l.to)}
          <li>
            <a href={l.to} class="text-charcoal-foreground/70 transition-colors hover:text-rotary-gold">
              {l.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <div>
      <h3 class="font-display text-lg tracking-wide text-rotary-gold">Every Drop Counts</h3>
      <p class="mt-3 text-sm text-charcoal-foreground/70">
        Two drops of oral polio vaccine can protect a child for life. Join the district's PolioPlus effort today.
      </p>
      <a
        href="/get-involved"
        class="mt-5 inline-block rounded-sm bg-rotary-red px-5 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-rotary-red-dark"
      >
        Donate to PolioPlus
      </a>
    </div>
  </div>
  <div class="border-t border-charcoal-foreground/15 py-4 text-center text-xs text-charcoal-foreground/50">
    &copy; {year} Rotary International District 9210 &mdash; End Polio Now campaign. Built for members, by members.
  </div>
</footer>
