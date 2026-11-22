/**
 * Bootcamp attendee testimonials.
 *
 * ADD ONLY REAL, PERMISSIONED QUOTES: get written permission from each person to publish their words,
 * first name and business type (and photo, if used). Leave the list empty and the whole section is hidden.
 *
 * Photo: put the file in /public/testimonials/ (e.g. "/testimonials/sarah.webp", about 96x96) and set `photo`.
 */
export type Testimonial = {
  quote: string;
  firstName: string;
  businessType: string; // e.g. "Med spa owner", "Roofing contractor"
  photo?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  // { quote: "…their exact words…", firstName: "Sarah", businessType: "Med spa owner", photo: "/testimonials/sarah.webp" },
];

export function Testimonials({ heading }: { heading: React.ReactNode }) {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <div className="bg-card/40">
      <section id="reviews" className="cv-auto mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
        {heading}
        <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={`${t.firstName}-${t.businessType}`} className="rounded-3xl border border-border bg-background p-6 sm:p-8">
              <blockquote className="text-base sm:text-lg">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm">
                {t.photo && <img src={t.photo} alt="" width={44} height={44} loading="lazy" decoding="async" className="h-11 w-11 rounded-full object-cover" />}
                <span><span className="font-semibold text-foreground">{t.firstName}</span><span className="text-muted-foreground"> · {t.businessType}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">Shared with permission by people who attended HighLevel's live bootcamp. Individual experiences vary.</p>
      </section>
    </div>
  );
}
