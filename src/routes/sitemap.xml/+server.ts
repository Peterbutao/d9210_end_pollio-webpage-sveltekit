import { SITE, ROUTES } from "$lib/config/site";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = async () => {
  const siteUrl = SITE.url.replace(/\/$/, "");
  // Use content.ts lastUpdated as lastmod for all pages (or today if missing)
  const lastMod = new Date().toISOString().split("T")[0];

  const urls = ROUTES.map((r) => {
    const loc = `${siteUrl}${r.path}`;
    // Encode to handle special chars safely
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${r.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
};
