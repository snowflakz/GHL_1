import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Rocket, Wallet } from "lucide-react";
import { useState } from "react";
import { BlogFooter, BlogHeader } from "@/components/blog/BlogChrome";
import { PostCard } from "@/components/blog/PostCard";
import { delay } from "@/components/motion/Reveal";
import { posts } from "@/content/posts";
import type { Post } from "@/content/types";

const TITLE = "GoHighLevel Guides: Pricing, Free Training, AI & SaaS Pro";
const DESC = "Plain-English GoHighLevel guides: pricing and annual plans, the free bootcamp and 5 Day Challenge, the AI receptionist, Voice AI and the SaaS Pro plan for agencies.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: posts.map((p) => p.keyword).filter(Boolean).join(", ") },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/blog/og/free-highlevel-bootcamp.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Blog", name: "GoHighLevel Guides", description: DESC,
        blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `/blog/${p.slug}`, datePublished: p.date, keywords: p.keyword })),
      }),
    }],
  }),
  component: BlogIndex,
});

const CATS = ["All", ...Array.from(new Set(posts.map((p) => p.category)))] as const;

const paths = [
  { icon: Compass, title: "New to HighLevel", text: "What it is, and the fastest free way to learn it.", slugs: ["what-is-gohighlevel", "free-highlevel-bootcamp"] },
  { icon: Wallet, title: "Choosing a plan", text: "Prices, annual savings and which tier fits.", slugs: ["gohighlevel-pricing", "highlevel-annual-plans-starter-vs-unlimited"] },
  { icon: Rocket, title: "Growing an agency", text: "AI that answers calls, and selling your own software.", slugs: ["highlevel-ai-receptionist", "highlevel-saas-pro-free-trial"] },
];

function BlogIndex() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [featured, ...rest] = posts;
  const list: Post[] = cat === "All" ? rest : posts.filter((p) => p.category === cat);
  const bySlug = (s: string) => posts.find((p) => p.slug === s);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <BlogHeader />
      <main id="main">
        <div className="relative overflow-hidden">
          <div aria-hidden className="orb -left-40 -top-32 h-[26rem] w-[26rem] bg-primary/40" />
          <div aria-hidden className="orb -right-24 top-24 h-80 w-80 bg-violet/35 [animation-delay:-9s]" />
          <header className="relative mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-8 sm:pt-20 lg:pb-16">
            <div className="animate-fade-up max-w-4xl">
              <p className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-glow">GoHighLevel guides</p>
              <h1 className="mt-5 text-[clamp(2.5rem,4.6vw+1rem,4.75rem)] font-bold leading-[1.02] tracking-tight">Figure out HighLevel <span className="text-gradient">without the jargon</span></h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-[1.4rem]">What it costs, which plan fits, how to learn it fast and where AI actually helps. Written for busy owners and checked against HighLevel's own pages.</p>
            </div>
          </header>
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          {/* Start here */}
          <section aria-labelledby="paths" className="grid gap-4 md:grid-cols-3">
            <h2 id="paths" className="sr-only">Pick your path</h2>
            {paths.map((p, i) => (
              <div key={p.title} data-reveal style={delay(i * 90)} className="rounded-3xl border border-border bg-card/50 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary"><p.icon className="h-5 w-5 text-primary-foreground" aria-hidden /></span>
                <p className="mt-4 font-display text-xl font-semibold">{p.title}</p>
                <p className="mt-1.5 text-muted-foreground">{p.text}</p>
                <ul className="mt-4 space-y-2">
                  {p.slugs.map((s) => { const post = bySlug(s); return post ? (
                    <li key={s}><Link to="/blog/$slug" params={{ slug: s }} className="group inline-flex items-start gap-1.5 font-medium text-foreground hover:text-primary-glow"><ArrowRight className="mt-1 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />{post.title}</Link></li>
                  ) : null; })}
                </ul>
              </div>
            ))}
          </section>

          {cat === "All" && featured && <div data-reveal="scale" className="mt-14 sm:mt-16"><PostCard post={featured} featured /></div>}

          <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-[clamp(1.75rem,1.8vw+1.1rem,2.5rem)] font-bold">All guides</h2>
            <div role="group" aria-label="Filter guides by topic" className="snap-rail -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-end sm:px-0">
              {CATS.map((c) => (
                <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${cat === c ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div key={cat} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => <div key={p.slug} data-reveal style={delay((i % 3) * 80)}><PostCard post={p} /></div>)}
          </div>

          <section data-reveal="scale" className="relative mt-20 overflow-hidden rounded-3xl border border-border bg-card p-8 text-center sm:p-14">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-hero-glow" />
            <div className="relative">
              <h2 className="text-[clamp(1.8rem,2.4vw+1rem,3rem)] font-bold">Rather learn it live?</h2>
              <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">A free 60-minute bootcamp runs every weekday at 11am CT, with a coach and breakout rooms.</p>
              <Link to="/" className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-background/40 px-6 font-semibold transition-[background-color,transform] duration-200 hover:bg-secondary active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                See how the bootcamp works <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}
