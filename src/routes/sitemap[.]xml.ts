import { createFileRoute } from "@tanstack/react-router";
import { posts } from "@/content/posts";

/** /sitemap.xml, built from the post list and the request's own origin, so it works on any domain. */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const urls = [
          { loc: "/", lastmod: posts[0]?.date, priority: "1.0" },
          { loc: "/blog", lastmod: posts[0]?.date, priority: "0.8" },
          ...posts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.date, priority: "0.7" })),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${origin}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}<priority>${u.priority}</priority></url>`).join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
      },
    },
  },
});
