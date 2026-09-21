<script lang="ts">
  import { DISTRICT } from "$lib/data/content";
</script>

<svelte:head>
  <title>Contact & Newsletter — District 9210 End Polio Now</title>
</svelte:head>

<div>
  <section class="bg-rotary-red text-primary-foreground">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <p class="text-sm font-bold uppercase tracking-[0.25em] text-rotary-gold">Reach Out</p>
      <h1 class="mt-2 font-display text-6xl tracking-wide sm:text-7xl">Contact Us</h1>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <div class="max-w-2xl">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-rotary-red">Official channels</p>
      <h2 class="mt-2 font-display text-4xl tracking-wide text-foreground sm:text-5xl">Get in touch through Rotary</h2>
      <p class="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        District 9210 routes all PolioPlus inquiries through Rotary International's official platforms. Use My Rotary or EndPolio.org for the fastest response — D9210 contacts below are mirrored there.
      </p>
    </div>

    <div class="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
      <!-- Message via official Rotary -->
      <div class="flex flex-col rounded-sm border-t-4 border-rotary-red bg-card p-6 shadow-md sm:p-8">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-rotary-red">Contact Rotary</p>
        <h3 class="mt-2 font-display text-3xl tracking-wide text-foreground sm:text-4xl">Send a message</h3>
        <p class="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
          For PolioPlus, immunization days or campaign support, contact Rotary via the official My Rotary / End Polio channels — your message is routed to the correct district committee.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a href="https://my.rotary.org/en/contact" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-sm bg-rotary-red px-5 py-3 font-display text-lg tracking-wide text-white transition-colors hover:bg-rotary-red-dark">
            Message via My Rotary
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
          </a>
          <a href="https://www.endpolio.org" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-sm border-2 border-border bg-card px-5 py-3 font-display text-lg tracking-wide text-foreground transition-colors hover:border-rotary-red hover:text-rotary-red">
            EndPolio.org
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
          </a>
        </div>
        <p class="mt-3 text-xs leading-relaxed text-muted-foreground">Opens Rotary's official contact form. For D9210 directly, use <a href="mailto:polioplus@rotary9210.org" class="font-semibold text-rotary-red hover:underline">polioplus@rotary9210.org</a>.</p>

        <div class="mt-6 space-y-2.5 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
          <p class="flex items-center gap-2.5">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-cream text-rotary-red">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </span>
            <a href="mailto:polioplus@rotary9210.org" class="font-medium text-foreground hover:text-rotary-red hover:underline">polioplus@rotary9210.org</a>
          </p>
          <p class="flex items-center gap-2.5">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-cream text-rotary-red">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <span class="font-medium text-foreground">{DISTRICT.countries.join(" · ")}</span>
          </p>
        </div>

        <div class="mt-6 rounded-sm bg-cream p-5">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Official contacts</p>
          <ul class="mt-3 space-y-2 text-[14px] leading-relaxed">
            <li><a href="https://my.rotary.org/en/contact" target="_blank" rel="noopener noreferrer" class="font-semibold text-rotary-red hover:underline">My Rotary — Contact Us →</a></li>
            <li><a href="https://www.endpolio.org" target="_blank" rel="noopener noreferrer" class="font-semibold text-rotary-red hover:underline">EndPolio.org →</a></li>
            <li><a href="https://rotarydistrict9210.org" target="_blank" rel="noopener noreferrer" class="font-semibold text-rotary-red hover:underline">Rotary District 9210 Official Site →</a></li>
          </ul>
        </div>
      </div>

      <!-- Newsletter via official Rotary -->
      <div class="flex flex-col rounded-sm border-t-4 border-rotary-gold bg-card p-6 shadow-md sm:p-8">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-rotary-gold">Stay updated</p>
        <h3 class="mt-2 font-display text-3xl tracking-wide text-foreground sm:text-4xl">District Newsletter</h3>
        <p class="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
          Get <span class="font-semibold text-foreground">End Polio Now</span> updates directly from Rotary International — campaign results, World Polio Day, and PolioPlus Society news via the official subscription center.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a href="https://my.rotary.org/en/news-media" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-sm bg-rotary-gold px-5 py-3 font-display text-lg tracking-wide text-charcoal transition-colors hover:bg-rotary-gold-dark hover:text-white">
            Subscribe via My Rotary
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
          </a>
          <a href="https://www.endpolio.org/en/news-and-stories" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-sm border-2 border-charcoal px-5 py-3 font-display text-lg tracking-wide text-charcoal transition-colors hover:bg-charcoal hover:text-white">
            End Polio News
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
          </a>
        </div>
        <p class="mt-3 text-xs leading-relaxed text-muted-foreground">Manage preferences at <a href="https://my.rotary.org/en/manage/subscriptions" target="_blank" rel="noopener noreferrer" class="font-semibold text-rotary-red hover:underline">my.rotary.org/manage/subscriptions</a>.</p>

        <div class="mt-6 rounded-sm bg-cream p-5">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">More Rotary updates</p>
          <ul class="mt-3 space-y-2 text-[14px] leading-relaxed">
            <li><a href="https://www.rotary.org/en/news-and-stories" target="_blank" rel="noopener noreferrer" class="font-semibold text-rotary-red hover:underline">Rotary.org — News & Stories →</a></li>
            <li><a href="https://polioeradication.org/news/" target="_blank" rel="noopener noreferrer" class="font-semibold text-rotary-red hover:underline">GPEI News (polioeradication.org) →</a></li>
            <li><a href="https://www.afro.who.int/health-topics/poliomyelitis-polio" target="_blank" rel="noopener noreferrer" class="font-semibold text-rotary-red hover:underline">WHO Afro — Polio →</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-charcoal text-charcoal-foreground">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-rotary-gold">Official Rotary</p>
      <h2 class="mt-2 font-display text-3xl tracking-wide text-charcoal-foreground sm:text-4xl">Continue on official Rotary channels</h2>
      <p class="mt-3 max-w-2xl text-[15px] leading-relaxed text-charcoal-foreground/70">
        For donations, PolioPlus Society enrollment, or member tools, use Rotary's official End Polio platforms. District contacts above are for D9210-specific inquiries.
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a href="https://www.endpolio.org/donate" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-sm bg-rotary-red px-6 py-3 font-display text-lg tracking-wide text-white transition-colors hover:bg-rotary-red-dark">
          Donate at EndPolio.org
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
        </a>
        <a href="https://my.rotary.org/en/take-action/end-polio" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-sm border-2 border-rotary-gold px-6 py-3 font-display text-lg tracking-wide text-rotary-gold transition-colors hover:bg-rotary-gold hover:text-charcoal">
          My Rotary — End Polio
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
        </a>
        <a href="https://rotarydistrict9210.org/contact/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-sm border border-charcoal-foreground/20 px-6 py-3 text-xs font-bold uppercase tracking-widest text-charcoal-foreground/70 transition-colors hover:border-charcoal-foreground/40 hover:text-charcoal-foreground">
          District 9210 Contact Page
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
        </a>
      </div>
    </div>
  </section>
</div>
