import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Clock, Lightbulb, Sparkles, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogFooter, BlogHeader } from "@/components/blog/BlogChrome";
import { PostCard } from "@/components/blog/PostCard";
import { Rich, plainText } from "@/components/blog/Rich";
import { delay } from "@/components/motion/Reveal";
import { getPost, readingMinutes, related } from "@/content/posts";
import type { Block, Post } from "@/content/types";
import { OFFERS } from "@/lib/bootcamp";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return {};
    const url = `/blog/${p.slug}`;
    const og = `/blog/og/${p.slug}.png`;
    const keywords = [p.keyword, ...p.keywords].filter(Boolean).join(", ");
    return {
      meta: [
        { title: p.seoTitle },
        { name: "description", content: p.description },
        { name: "keywords", content: keywords },
        { property: "og:type", content: "article" },
        { property: "og:title", content: p.seoTitle },
        { property: "og:description", content: p.description },
        { property: "og:url", content: url },
        { property: "og:image", content: og },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: coverAlt(p) },
        { property: "article:published_time", content: p.date },
        { property: "article:section", content: p.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: p.seoTitle },
        { name: "twitter:description", content: p.description },
        { name: "twitter:image", content: og },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: p.title,
              description: p.description,
              datePublished: p.date,
              dateModified: p.date,
              image: og,
              keywords,
              about: p.keyword,
              articleSection: p.category,
              wordCount: wordCount(p),
              author: { "@type": "Person", name: "Independent HighLevel affiliate" },
              mainEntityOfPage: url,
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "/blog" },
                { "@type": "ListItem", position: 3, name: p.title, item: url },
              ],
            },
          ]),
        },
      ],
    };
  },
  component: PostPage,
});

const fmtDate = (iso: string) => new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(iso));
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const coverAlt = (p: Post) => (p.keyword ? `${cap(p.keyword)}: ${p.cover.alt}` : p.cover.alt);
const wordCount = (p: Post) => plainText(JSON.stringify(p.body)).split(/\s+/).length;

/** Highlights the contents entry for the section currently being read. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids.join()]);
  return active;
}

function BlockView({ b, post }: { b: Block; post: Post }) {
  const R = ({ x }: { x: string }) => <Rich x={x} offer={post.offer} />;
  switch (b.t) {
    case "p":
      return <p><R x={b.x} /></p>;
    case "h2":
      return <h2 id={b.id} data-reveal><R x={b.x} /></h2>;
    case "h3":
      return <h3><R x={b.x} /></h3>;
    case "ul":
      return <ul>{b.items.map((it) => <li key={it}><R x={it} /></li>)}</ul>;
    case "ol":
      return <ol>{b.items.map((it) => <li key={it}><R x={it} /></li>)}</ol>;
    case "quote":
      return <blockquote data-reveal><R x={b.x} /></blockquote>;
    case "tip":
      return (
        <aside data-reveal className="my-10 flex gap-4 rounded-3xl border border-accent/25 bg-accent/[0.06] p-6 sm:p-7">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-accent/15"><Lightbulb className="h-5 w-5 text-accent" aria-hidden /></span>
          <div>
            <p className="font-display text-lg font-semibold text-foreground">{b.title}</p>
            <p className="mt-1.5 text-[1.0625rem] leading-relaxed text-muted-foreground"><R x={b.x} /></p>
          </div>
        </aside>
      );
    case "offer":
      return (
        <aside data-reveal="scale" aria-label="Related offer" className="relative my-12 overflow-hidden rounded-3xl border border-primary/35 bg-card p-6 sm:p-9">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
          <p className="relative inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-glow"><Sparkles className="h-3.5 w-3.5" aria-hidden /> Worth a look</p>
          <p className="relative mt-4 font-display text-[clamp(1.4rem,1vw+1.1rem,1.85rem)] font-semibold leading-tight text-foreground">{b.title}</p>
          <p className="relative mt-3 max-w-[60ch] text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg"><R x={b.x} /></p>
          <a href={OFFERS[post.offer].url} target="_blank" rel="sponsored noopener" data-offer={post.offer} data-placement="mid" className="group relative mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-6 font-semibold text-foreground transition-[background-color,transform] duration-200 hover:bg-primary/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {b.label} <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </aside>
      );
    case "table":
      return (
        <figure data-reveal className="my-10">
          <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:rounded-3xl sm:border sm:border-border sm:bg-card/40 sm:px-0">
            <table className="w-full min-w-[540px] border-collapse text-left text-[0.95rem] sm:text-base">
              <thead><tr>{b.head.map((h, i) => <th key={i} scope="col" className="border-b border-border px-4 py-3.5 font-display font-semibold text-foreground first:pl-0 sm:first:pl-6">{h}</th>)}</tr></thead>
              <tbody>{b.rows.map((r) => (
                <tr key={r.join()} className="border-b border-border/60 last:border-0">{r.map((c, i) => <td key={i} className={`px-4 py-3.5 align-top first:pl-0 sm:first:pl-6 ${i === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}><R x={c} /></td>)}</tr>
              ))}</tbody>
            </table>
          </div>
          {b.caption && <figcaption className="mt-3 text-sm text-muted-foreground sm:pl-6">{b.caption}</figcaption>}
        </figure>
      );
  }
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const toc = post.body.filter((b): b is Extract<Block, { t: "h2" }> => b.t === "h2");
  const ids = [...toc.map((h) => h.id), "faq"];
  const active = useActiveHeading(ids);
  const mins = readingMinutes(post);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <div className="read-progress" aria-hidden />
      <BlogHeader />
      <main id="main">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div aria-hidden className="orb -left-32 -top-24 h-80 w-80 bg-primary/40" />
          <div aria-hidden className="orb right-0 top-10 h-72 w-72 bg-violet/35 [animation-delay:-9s]" />
          <header className="relative mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8 sm:pt-14">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><Link to="/" className="hover:text-foreground">Home</Link></li><li aria-hidden>/</li>
                <li><Link to="/blog" className="hover:text-foreground">Guides</Link></li><li aria-hidden>/</li>
                <li className="text-foreground/80">{post.category}</li>
              </ol>
            </nav>
            <div className="animate-fade-up">
              <p className="mt-6 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-glow">{post.category}</p>
              <h1 className="mt-4 max-w-4xl text-[clamp(2.1rem,3.8vw+1rem,3.9rem)] font-bold leading-[1.05] tracking-tight">{post.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-[1.35rem]">{post.excerpt}</p>
              <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <time dateTime={post.date}>Updated {fmtDate(post.date)}</time>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden />{mins} min read</span>
                <span>Contains affiliate links</span>
              </p>
            </div>
          </header>
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <figure data-reveal="scale" className="overflow-hidden rounded-3xl border border-border shadow-glow">
            <img src={post.cover.src} alt={coverAlt(post)} width={1200} height={630} fetchPriority="high" decoding="async" className="aspect-[1200/630] w-full object-cover" />
          </figure>

          {post.glance && (
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {post.glance.map(([k, v], i) => (
                <div key={k} data-reveal style={delay(i * 70)} className="rounded-2xl border border-border bg-card/60 px-4 py-4 sm:px-5">
                  <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{k}</dt>
                  <dd className="mt-1.5 font-display text-base font-semibold leading-snug text-foreground sm:text-lg">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-12 pb-20 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14 xl:gap-20">
            <article className="min-w-0">
              {post.takeaways && (
                <section data-reveal aria-labelledby="takeaways" className="mb-10 rounded-3xl border border-success/25 bg-success/[0.05] p-6 sm:p-8">
                  <h2 id="takeaways" className="font-display text-lg font-semibold">Key takeaways</h2>
                  <ul className="mt-4 space-y-3">
                    {post.takeaways.map((t) => (
                      <li key={t} className="flex gap-3 text-[1.0625rem] leading-relaxed sm:text-lg"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-success" aria-hidden />{t}</li>
                    ))}
                  </ul>
                </section>
              )}

              <details className="mb-10 rounded-2xl border border-border bg-card/50 p-4 lg:hidden">
                <summary className="cursor-pointer font-semibold">On this page</summary>
                <ol className="mt-3 space-y-2.5 text-[0.95rem] text-muted-foreground">
                  {toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="hover:text-foreground">{plainText(h.x)}</a></li>)}
                  <li><a href="#faq" className="hover:text-foreground">Quick answers</a></li>
                </ol>
              </details>

              <div className="prose-post">
                {post.body.map((b, i) => <BlockView key={i} b={b} post={post} />)}

                <h2 id="faq" data-reveal>Quick answers</h2>
                <div className="mt-4 max-w-[72ch] divide-y divide-border border-y border-border">
                  {post.faq.map(([q, a]) => (
                    <details key={q} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                        {q}<span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform duration-200 group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-muted-foreground">{a}</p>
                    </details>
                  ))}
                </div>
              </div>

              <section data-reveal="scale" aria-label="Next step" className="relative mt-16 overflow-hidden rounded-3xl border border-primary/30 bg-card p-7 sm:p-12">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-hero-glow" />
                <div className="relative">
                  <h2 className="text-[clamp(1.7rem,1.6vw+1.2rem,2.5rem)] font-bold leading-tight">{post.close.title}</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"><Rich x={post.close.x} offer={post.offer} /></p>
                  <a href={OFFERS[post.offer].url} target="_blank" rel="sponsored noopener" data-offer={post.offer} data-placement="end" className="group mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-glow transition-transform duration-150 hover:scale-[1.02] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto">
                    {post.close.label} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                  </a>
                  <p className="mt-3 text-xs text-muted-foreground">Affiliate link. I may earn a commission at no extra cost to you.</p>
                </div>
              </section>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-8 space-y-8">
                <nav aria-label="On this page">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">On this page</p>
                  <ol className="mt-4 space-y-1 border-l border-border text-sm">
                    {[...toc.map((h) => [h.id, plainText(h.x)] as const), ["faq", "Quick answers"] as const].map(([id, label]) => (
                      <li key={id}>
                        <a href={`#${id}`} aria-current={active === id ? "true" : undefined} className={`-ml-px block border-l-2 py-1.5 pl-4 leading-snug transition-colors duration-200 ${active === id ? "border-primary-glow text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{label}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
                <a href={OFFERS[post.offer].url} target="_blank" rel="sponsored noopener" data-offer={post.offer} data-placement="sidebar" className="lift block rounded-2xl border border-border bg-card/60 p-4 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary-glow">Featured in this guide</span>
                  <span className="mt-1.5 block font-display font-semibold leading-snug text-foreground">{OFFERS[post.offer].name}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-muted-foreground">Take a look <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></span>
                </a>
              </div>
            </aside>
          </div>
        </div>

        <section aria-labelledby="more" className="border-t border-border bg-card/30">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
            <h2 id="more" data-reveal className="text-[clamp(1.6rem,1.5vw+1.1rem,2.25rem)] font-bold">Keep reading</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related(post).map((r, i) => <div key={r.slug} data-reveal style={delay(i * 90)}><PostCard post={r} /></div>)}
            </div>
          </div>
        </section>
      </main>
      <BlogFooter />
    </div>
  );
}
