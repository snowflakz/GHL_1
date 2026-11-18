import type { OfferKey } from "@/lib/bootcamp";

/**
 * Inline markup inside any string:
 *   **bold**
 *   [link text](@offer)        -> the post's own affiliate offer
 *   [link text](@bootcamp)     -> a named offer from OFFERS
 *   [link text](/blog/slug)    -> internal link
 */
export type Block =
  | { t: "p"; x: string }
  | { t: "h2"; x: string; id: string }
  | { t: "h3"; x: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "tip"; title: string; x: string }
  | { t: "offer"; title: string; x: string; label: string }
  | { t: "table"; head: string[]; rows: string[][]; caption?: string }
  | { t: "quote"; x: string };

export type Post = {
  slug: string;
  offer: OfferKey;
  category: "Getting started" | "Pricing & plans" | "Agencies & SaaS" | "AI & automation" | "Training";
  title: string;
  /** <title> tag, ~55-60 chars, leads with the main keyword */
  seoTitle: string;
  /** meta description, ~150-160 chars */
  description: string;
  keywords: string[];
  excerpt: string;
  date: string; // ISO
  cover: { src: string; alt: string };
  body: Block[];
  faq: [string, string][];
  /** closing paragraph, carries the final link */
  close: { title: string; x: string; label: string };
  /** The one search phrase this guide is built to rank for (tied to its offer). */
  keyword?: string;
  /** 3 one-line takeaways shown at the top of the article */
  takeaways?: string[];
  /** 3–4 facts shown in the "at a glance" strip */
  glance?: [string, string][];
};

/** Additions merged into a post (see content/extras.ts). */
export type PostExtras = {
  keyword: string;
  title?: string;
  seoTitle?: string;
  /** further sections, each inserted before an h2 id */
  more?: { insertBefore: string; blocks: Block[] }[];
  excerpt?: string;
  description?: string;
  takeaways: string[];
  glance: [string, string][];
  /** extra blocks, inserted just before the h2 with this id */
  insertBefore: string;
  blocks: Block[];
};
