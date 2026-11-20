import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/content/types";

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className={`lift group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/50 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${featured ? "lg:grid lg:grid-cols-[1.1fr_0.9fr]" : ""}`}
    >
      <div className={`overflow-hidden ${featured ? "bg-[#0b1020] lg:flex lg:items-center" : ""}`}>
        <img src={post.cover.src} alt="" width={1200} height={630} loading={featured ? "eager" : "lazy"} decoding="async" className="aspect-[1200/630] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${featured ? "lg:justify-center lg:p-12" : ""}`}>
        <p className={`text-xs font-semibold uppercase tracking-widest ${post.category === "AI & automation" ? "text-violet" : "text-primary-glow"}`}>{post.category}</p>
        <h3 className={`mt-2.5 font-display font-semibold leading-snug ${featured ? "text-[clamp(1.6rem,1.6vw+1.1rem,2.4rem)] leading-tight" : "text-xl"}`}>{post.title}</h3>
        <p className={`mt-3 text-muted-foreground ${featured ? "text-lg" : "line-clamp-3 text-[0.975rem]"}`}>{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.95rem] font-semibold text-foreground">
          Read the guide <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
