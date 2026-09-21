<script lang="ts">
  import { page } from "$app/stores";
  import { SITE } from "$lib/config/site";

  interface Props {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    ogType?: string;
    ogImage?: string;
    ogImageAlt?: string;
    ogImageWidth?: number;
    ogImageHeight?: number;
    noindex?: boolean;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
    breadcrumbs?: { name: string; url: string }[];
    article?: {
      publishedTime?: string;
      modifiedTime?: string;
      author?: string;
      tags?: string[];
    };
  }

  let {
    title = SITE.title,
    description = SITE.description,
    keywords = [...SITE.keywords],
    canonical,
    ogType = "website",
    ogImage = SITE.ogImage,
    ogImageAlt = SITE.ogImageAlt,
    ogImageWidth = SITE.ogImageWidth,
    ogImageHeight = SITE.ogImageHeight,
    noindex = false,
    jsonLd,
    breadcrumbs,
    article,
  }: Props = $props();

  let pathname = $derived($page.url.pathname);
  let siteUrl = $derived(SITE.url.replace(/\/$/, ""));
  let canonicalUrl = $derived(canonical ?? `${siteUrl}${pathname === "/" ? "/" : pathname}`);
  let ogImageUrl = $derived(ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`);
  let fullTitle = $derived(title.includes("—") || title === SITE.title ? title : `${title} — ${SITE.shortName}`);

  // Build JSON-LD graph
  let jsonLdGraph = $derived.by(() => {
    const graph: Record<string, unknown>[] = [];

    // Website
    graph.push({
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: SITE.name,
      description: SITE.description,
      inLanguage: SITE.language,
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/clubs?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });

    // Organization
    graph.push({
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: SITE.author,
      alternateName: ["D9210", "Rotary D9210"],
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
        width: 500,
        height: 500,
      },
      image: ogImageUrl,
      foundingDate: SITE.foundingDate,
      areaServed: [...SITE.areaServed],
      email: SITE.email,
      description: SITE.description,
      sameAs: [
        "https://www.rotary.org",
        "https://www.endpolio.org",
      ],
    });

    // Breadcrumbs
    if (breadcrumbs && breadcrumbs.length > 0) {
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.name,
          item: crumb.url.startsWith("http") ? crumb.url : `${siteUrl}${crumb.url}`,
        })),
      });
    }

    // Extra page-level JSON-LD
    if (jsonLd) {
      const arr = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      graph.push(...arr);
    }

    return {
      "@context": "https://schema.org",
      "@graph": graph,
    };
  });

  let jsonLdString = $derived(JSON.stringify(jsonLdGraph));
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  {#if keywords.length}
    <meta name="keywords" content={keywords.join(", ")} />
  {/if}
  <meta name="author" content={SITE.author} />
  <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
  <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph -->
  <meta property="og:locale" content={SITE.locale} />
  <meta property="og:site_name" content={SITE.name} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content={ogType} />
  <meta property="og:image" content={ogImageUrl} />
  <meta property="og:image:alt" content={ogImageAlt} />
  <meta property="og:image:width" content={String(ogImageWidth)} />
  <meta property="og:image:height" content={String(ogImageHeight)} />
  {#if article?.publishedTime}
    <meta property="article:published_time" content={article.publishedTime} />
  {/if}
  {#if article?.modifiedTime}
    <meta property="article:modified_time" content={article.modifiedTime} />
  {/if}
  {#if article?.author}
    <meta property="article:author" content={article.author} />
  {/if}
  {#if article?.tags}
    {#each article.tags as tag (tag)}
      <meta property="article:tag" content={tag} />
    {/each}
  {/if}

  <!-- Twitter / X -->
  <meta name="twitter:card" content={SITE.twitterCard} />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImageUrl} />
  <meta name="twitter:image:alt" content={ogImageAlt} />
  {#if SITE.twitterHandle}
    <meta name="twitter:site" content={SITE.twitterHandle} />
    <meta name="twitter:creator" content={SITE.twitterHandle} />
  {/if}

  <!-- Additional SEO -->
  <meta name="theme-color" content={SITE.themeColor} />
  <meta name="format-detection" content="telephone=no" />

  <!-- JSON-LD -->
  {@html `<script type="application/ld+json">${jsonLdString}</script>`}
</svelte:head>
