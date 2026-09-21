<script lang="ts">
  import "../app.css";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  let { children } = $props();
</script>

<svelte:head>
  <!-- Fonts & performance hints -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&family=Dancing+Script:wght@500;600;700&display=swap"
    rel="stylesheet"
  />
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="/logo.webp" />
  <link rel="manifest" href="/manifest.json" />
  <!-- Preload critical LCP images (hero + OG) — WebP with JPEG fallback -->
  <link rel="preload" as="image" href="/og-image.webp" type="image/webp" fetchpriority="high" />
  <link rel="preload" as="image" href="/hero-caro(1).webp" type="image/webp" fetchpriority="high" />
  <link rel="preload" as="image" href="/hero-caro(2).webp" type="image/webp" fetchpriority="high" />
  <link rel="preconnect" href="https://www.afro.who.int" crossorigin="anonymous" />
  <!-- AI / LLM discovery -->
  <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly site map" />
  <link rel="alternate" type="application/xml" href="/sitemap.xml" title="Sitemap" />
</svelte:head>

<SiteHeader />
<main>
  {@render children()}
</main>
<SiteFooter />
