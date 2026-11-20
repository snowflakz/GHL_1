import { useState } from "react";
import { Play } from "lucide-react";
import { track } from "@/lib/tracking";

/**
 * Lightweight YouTube embed: shows a local poster image and only loads YouTube (privacy-enhanced
 * youtube-nocookie domain) when the visitor presses play. Keeps the landing page fast and sends
 * a Meta `ViewContent` on play, so warm viewers can be retargeted.
 */
export function VideoEmbed({ id, title, poster }: { id: string; title: string; poster: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-card shadow-glow">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            track("ViewContent", { content_name: "bootcamp video", content_type: "video" });
          }}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-inset"
        >
          <img src={poster} alt="" width={1280} height={720} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
          <span aria-hidden className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-primary shadow-glow transition-transform duration-200 ease-out group-hover:scale-110 group-active:scale-95 sm:h-24 sm:w-24">
            <span className="absolute inset-0 rounded-full animate-pulse-ring" />
            <Play className="ml-1 h-8 w-8 fill-primary-foreground text-primary-foreground sm:h-10 sm:w-10" />
          </span>
          <span className="absolute bottom-4 left-4 rounded-full bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur sm:bottom-5 sm:left-5 sm:text-sm">▶ Watch how the bootcamp works</span>
        </button>
      )}
    </div>
  );
}
