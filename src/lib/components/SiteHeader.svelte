<script lang="ts">
  import { page } from "$app/stores";

  const NAV = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About D9210" },
    { to: "/statistics", label: "Statistics" },
    { to: "/clubs", label: "Clubs" },
    { to: "/projects", label: "Projects" },
    { to: "/news", label: "News" },
    { to: "/get-involved", label: "Get Involved" },
    { to: "/contact", label: "Contact" },
  ] as const;

  let open = $state(false);
  let pathname = $derived($page.url.pathname);
</script>

<header class="sticky top-0 z-50  bg-rotary-red text-primary-foreground">
  <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
    <a href="/" class="flex items-center gap-3" onclick={() => (open = false)}>
      <picture>
        <source srcset="/endpoliologo.webp" type="image/webp" />
        <img src="/endpoliologo.jpg" alt="Rotary District 9210 logo" class="h-12 w-12 shrink-0 object-contain border border-white sm:h-9 sm:w-9" width="48" height="48" decoding="async" />
      </picture>
      <span class="leading-tight">
        <span class="block font-display text-xl tracking-wide">END POLIO NOW</span>
        <span class="block text-[11px] font-semibold uppercase tracking-[0.18em] text-rotary-gold">
          Rotary District 9210
        </span>
      </span>
    </a>

    <nav class="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
      {#each NAV as item (item.to)}
        <a
          href={item.to}
          class="rounded-sm px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-rotary-red-dark"
          class:bg-rotary-red-dark={pathname === item.to}
          class:text-rotary-gold={pathname === item.to}
        >
          {item.label}
        </a>
      {/each}
    </nav>

    <button
      class="inline-flex min-h-11 min-w-11 items-center justify-center lg:hidden"
      onclick={() => (open = !open)}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      {#if open}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
        >
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6"
          ><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
          /></svg
        >
      {/if}
    </button>
  </div>

  {#if open}
    <nav class="border-t border-primary-foreground/20 bg-rotary-red px-4 pb-4 lg:hidden" aria-label="Mobile navigation">
      {#each NAV as item (item.to)}
        <a
          href={item.to}
          onclick={() => (open = false)}
          class="block rounded-sm px-3 py-3 text-sm font-semibold uppercase tracking-wide"
          class:text-rotary-gold={pathname === item.to}
        >
          {item.label}
        </a>
      {/each}
    </nav>
  {/if}
</header>
