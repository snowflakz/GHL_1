import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Check, Home, Link2, Mail, Share2 } from "lucide-react";

/* ───────── Social sharing ───────── */

const enc = encodeURIComponent;
type Net = { id: string; label: string; color: string; href: (u: string, t: string) => string; icon: React.ReactNode };

/** Brand glyphs as tiny inline SVGs (no icon font, no third-party script). */
const Svg = ({ d }: { d: string }) => <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden><path d={d} /></svg>;
const NETS: Net[] = [
  { id: "whatsapp", label: "WhatsApp", color: "hover:bg-[#25D366]/15 hover:text-[#25D366]", href: (u, t) => `https://wa.me/?text=${enc(`${t} ${u}`)}`, icon: <Svg d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z" /> },
  { id: "facebook", label: "Facebook", color: "hover:bg-[#1877F2]/15 hover:text-[#4c94ff]", href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${enc(u)}`, icon: <Svg d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8Z" /> },
  { id: "x", label: "X", color: "hover:bg-white/10 hover:text-white", href: (u, t) => `https://twitter.com/intent/tweet?url=${enc(u)}&text=${enc(t)}`, icon: <Svg d="M17.7 3H21l-7.2 8.2L22 21h-6.6l-5.2-6.4L4.3 21H1l7.7-8.8L1 3h6.8l4.7 5.8L17.7 3Zm-1.2 16h1.8L7.6 4.9H5.7L16.5 19Z" /> },
  { id: "linkedin", label: "LinkedIn", color: "hover:bg-[#0A66C2]/15 hover:text-[#4f9ae6]", href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(u)}`, icon: <Svg d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z" /> },
];

export function ShareBar({ title, compact = false }: { title: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [canNative, setCanNative] = useState(false);
  useEffect(() => setCanNative(typeof navigator !== "undefined" && "share" in navigator), []);

  const url = () => window.location.href.split("#")[0] ?? window.location.href;
  const open = (n: Net) => window.open(n.href(url(), title), "_blank", "noopener,noreferrer,width=640,height=560");
  const copy = async () => {
    try { await navigator.clipboard.writeText(url()); } catch { /* clipboard blocked */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const btn = "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-[background-color,color,transform] duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${compact ? "" : "rounded-2xl border border-border bg-card/40 p-4 sm:p-5"}`}>
      {!compact && <p className="mr-2 w-full text-sm font-semibold text-foreground sm:w-auto">Found this useful? Share it:</p>}
      {canNative && (
        <button type="button" onClick={() => navigator.share({ title, url: url() }).catch(() => {})} className={`${btn} hover:bg-primary/15 hover:text-foreground sm:hidden`} aria-label="Share using your phone's share menu"><Share2 className="h-4 w-4" aria-hidden /></button>
      )}
      {NETS.map((n) => (
        <button key={n.id} type="button" onClick={() => open(n)} className={`${btn} ${n.color}`} aria-label={`Share on ${n.label}`} title={`Share on ${n.label}`}>{n.icon}</button>
      ))}
      <a href={`mailto:?subject=${enc(title)}&body=${enc("Thought you'd find this useful: ")}`} onClick={(e) => { e.currentTarget.href = `mailto:?subject=${enc(title)}&body=${enc(`Thought you'd find this useful: ${url()}`)}`; }} className={`${btn} hover:bg-accent/15 hover:text-accent`} aria-label="Share by email" title="Share by email"><Mail className="h-4 w-4" aria-hidden /></a>
      <button type="button" onClick={copy} className={`${btn} hover:bg-success/15 hover:text-success`} aria-label={copied ? "Link copied" : "Copy link"} title="Copy link">
        {copied ? <Check className="h-4 w-4 text-success" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
      </button>
      <span role="status" className="sr-only">{copied ? "Link copied to clipboard" : ""}</span>
    </div>
  );
}

/* ───────── Back / home / up / down ───────── */

/** "← Back" goes to the previous page if it was on this site, otherwise to the guides list. */
export function BackLinks() {
  const router = useRouter();
  const back = (e: React.MouseEvent) => {
    const fromSite = typeof document !== "undefined" && document.referrer.startsWith(window.location.origin);
    if (fromSite && window.history.length > 1) {
      e.preventDefault();
      router.history.back();
    }
  };
  const pill = "inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-card/50 px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link to="/blog" onClick={back} className={pill}><ArrowLeft className="h-4 w-4" aria-hidden /> Back</Link>
      <Link to="/" className={pill}><Home className="h-4 w-4" aria-hidden /> Home</Link>
    </div>
  );
}

/** Floating controls: back to guides, home, previous / next section, top. Appear after scrolling. */
export function FloatingNav({ sectionIds }: { sectionIds: string[] }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (dir: 1 | -1) => {
    const tops = sectionIds.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => Boolean(e)).map((e) => ({ e, top: e.getBoundingClientRect().top }));
    const target = dir === 1 ? tops.find((t) => t.top > 90) : [...tops].reverse().find((t) => t.top < -10);
    if (target) target.e.scrollIntoView({ block: "start" });
    else if (dir === 1) window.scrollTo({ top: document.documentElement.scrollHeight });
    else window.scrollTo({ top: 0 });
  };

  const b = "grid h-11 w-11 place-items-center rounded-full text-foreground transition-[background-color,transform] duration-200 hover:bg-secondary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <nav
      aria-label="Page navigation"
      aria-hidden={!show}
      className={`floating-nav fixed bottom-4 right-4 z-40 flex items-center gap-0.5 rounded-full border border-border bg-card/85 p-1 shadow-glow backdrop-blur-md sm:bottom-6 sm:right-6 ${show ? "is-visible" : "pointer-events-none"}`}
    >
      <Link to="/blog" tabIndex={show ? 0 : -1} className={b} aria-label="Back to all guides" title="All guides"><ArrowLeft className="h-5 w-5" aria-hidden /></Link>
      <Link to="/" tabIndex={show ? 0 : -1} className={b} aria-label="Home page" title="Home"><Home className="h-5 w-5" aria-hidden /></Link>
      <span aria-hidden className="mx-1 h-6 w-px bg-border" />
      <button type="button" tabIndex={show ? 0 : -1} onClick={() => jump(-1)} className={b} aria-label="Previous section" title="Previous section"><ArrowUp className="h-5 w-5" aria-hidden /></button>
      <button type="button" tabIndex={show ? 0 : -1} onClick={() => jump(1)} className={b} aria-label="Next section" title="Next section"><ArrowDown className="h-5 w-5" aria-hidden /></button>
      <button type="button" tabIndex={show ? 0 : -1} onClick={() => window.scrollTo({ top: 0 })} className={`${b} bg-gradient-primary text-primary-foreground hover:bg-none hover:opacity-90`} aria-label="Back to top" title="Back to top"><ArrowUp className="h-5 w-5" strokeWidth={2.75} aria-hidden /></button>
    </nav>
  );
}
