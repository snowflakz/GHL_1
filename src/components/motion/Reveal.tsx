/**
 * Scroll reveals are pure CSS (see `[data-reveal]` in styles.css): add `data-reveal` (or
 * `data-reveal="scale"`) to an element. For a stagger, pass `style={delay(ms)}`. The value
 * shifts where in the element's entry the animation starts, so siblings ease in one after another.
 */
export const delay = (ms: number) => ({ "--s": `${Math.round(ms / 12)}%` }) as React.CSSProperties;
