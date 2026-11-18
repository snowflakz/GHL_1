import type { Block, Post } from "./types";
import { planPosts } from "./posts-plans";
import { agencyPosts } from "./posts-agency";
import { trainingPosts } from "./posts-training";
import { aiPosts } from "./posts-ai";
import { extras } from "./extras";
import { moreExtras } from "./extras-more";

/** Display order on /blog: highest-intent, most beginner-friendly first. */
const ORDER = [
  "free-highlevel-bootcamp",
  "what-is-gohighlevel",
  "gohighlevel-pricing",
  "highlevel-ai-receptionist",
  "highlevel-5-day-challenge",
  "voice-ai-workshop-local-business",
  "highlevel-annual-plans-starter-vs-unlimited",
  "highlevel-starter-annual-plan-970",
  "highlevel-saas-pro-free-trial",
  "upgrade-highlevel-to-pro",
];

/** Merge the SEO/engagement layer (extras.ts) into each base post. */
function enrich(p: Post): Post {
  const base = extras[p.slug];
  if (!base) return p;
  const e = { ...base, ...moreExtras[p.slug] };
  const insert = (body: Block[], before: string, blocks: Block[]) => {
    const at = body.findIndex((b) => b.t === "h2" && b.id === before);
    return at === -1 ? [...body, ...blocks] : [...body.slice(0, at), ...blocks, ...body.slice(at)];
  };
  let body = insert(p.body, e.insertBefore, e.blocks);
  for (const m of e.more ?? []) body = insert(body, m.insertBefore, m.blocks);
  return {
    ...p,
    title: e.title ?? p.title,
    seoTitle: e.seoTitle ?? p.seoTitle,
    excerpt: e.excerpt ?? p.excerpt,
    description: e.description ?? p.description,
    keyword: e.keyword,
    takeaways: e.takeaways,
    glance: e.glance,
    body,
  };
}

const all = [...planPosts, ...agencyPosts, ...trainingPosts, ...aiPosts].map(enrich);
export const posts: Post[] = ORDER.map((s) => all.find((p) => p.slug === s)).filter((p): p is Post => Boolean(p));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function readingMinutes(p: Post): number {
  const words = JSON.stringify(p.body).split(/\s+/).length + JSON.stringify(p.faq).split(/\s+/).length;
  return Math.max(3, Math.round(words / 220));
}

export function related(p: Post, n = 3): Post[] {
  const same = posts.filter((o) => o.slug !== p.slug && o.category === p.category);
  const rest = posts.filter((o) => o.slug !== p.slug && o.category !== p.category);
  return [...same, ...rest].slice(0, n);
}
