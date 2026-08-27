<script lang="ts">
  import "../app.css";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  let { children } = $props();
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>End Polio Now — Rotary District 9210</title>
  <meta
    name="description"
    content="Rotary District 9210's End Polio Now campaign: polio eradication statistics, projects and news across Malawi, Zambia, Zimbabwe and northern Mozambique."
  />
  <meta property="og:title" content="End Polio Now — Rotary District 9210" />
  <meta
    property="og:description"
    content="Track the district's polio eradication statistics, projects and campaign news across four countries."
  />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;1,400&family=Dancing+Script:wght@500;600;700&display=swap"
    rel="stylesheet"
  />
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
</svelte:head>

<SiteHeader />
<main>
  {@render children()}
</main>
<SiteFooter />
