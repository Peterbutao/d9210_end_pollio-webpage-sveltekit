<script lang="ts">
  import "../app.css";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { SITE } from "$lib/config/site";
  let { children } = $props();
</script>

<!-- Global SEO defaults — page-level SEO.svelte calls will override via deduped <title>/<meta> -->
<SEO
  title={SITE.title}
  description={SITE.description}
  keywords={[...SITE.keywords]}
  ogType="website"
/>

<svelte:head>
  <!-- Fonts & performance hints -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&family=Dancing+Script:wght@500;600;700&display=swap"
    rel="stylesheet"
  />
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="/logo.png" />
  <link rel="manifest" href="/manifest.json" />
  <!-- Preload critical LCP images (hero + OG) -->
  <link rel="preload" as="image" href="/og-image.jpg" fetchpriority="high" />
  <link rel="preload" as="image" href="/VAC.jpg" fetchpriority="high" />
  <!-- AI / LLM discovery -->
  <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly site map" />
  <link rel="alternate" type="application/xml" href="/sitemap.xml" title="Sitemap" />
</svelte:head>

<SiteHeader />
<main>
  {@render children()}
</main>
<SiteFooter />
