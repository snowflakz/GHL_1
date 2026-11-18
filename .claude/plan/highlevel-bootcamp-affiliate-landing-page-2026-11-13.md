# HighLevel Bootcamp Affiliate Landing Page

A single, focused page that warms visitors up and sends them to your affiliate link:
https://www.gohighlevel.com/highlevel-bootcamp?fp_ref=tayo17

## What the original page does well (kept)
- Strong free offer: 30-day free trial + free live bootcamp
- Clear promise: launch HighLevel in under an hour, no tech skills
- Proof numbers: 70,000+ users, $500M+ generated, 84+ countries, 4.9/5 from 2,000+ reviews
- 3 free bonuses and a simple 3-step process

## What we improve for conversions
- Headline built around a result ("Launch your HighLevel business live in under 60 minutes, free"), not just features
- One goal only: every button opens your affiliate link, with no menu links that pull people away
- The same button repeats after each section, plus a sticky button on mobile
- "Next bootcamp" countdown to the next weekday at 11am CT, for real urgency
- Objection handling: "I'm not technical", "Will I be charged?", "Is it really live?"
- Clear note on the free trial: cancel anytime within 30 days, small messaging fees may apply

## Built for paid and free traffic
- Paid ads: fast-loading page, one message matching the ad ("Free 30-day trial + live bootcamp"), no distractions, and a clean URL you can drop into Google, Facebook or TikTok ads
- Free search traffic: search-friendly title and description around "HighLevel free trial" and "HighLevel bootcamp", plus an FAQ that answers common questions people search for
- Share previews look good when posted on social media or WhatsApp

## Page sections (top to bottom)
1. Top bar: "Free live bootcamp every weekday at 11am CT" + countdown
2. Hero: headline, subheadline, 3 checkmarks, big button, "100% free, cancel anytime"
3. Proof numbers strip
4. "This isn't another webinar": pain vs. solution comparison
5. What you'll learn in the bootcamp (60 minutes max)
6. 3 free bonuses as value cards (Reviews Challenge, SaaSPreneur Playbook, Snapshots & Funnels)
7. 3 simple steps
8. Reviews section (4.9/5 rating, short sample quotes)
9. FAQ accordion
10. Final call to action + affiliate disclosure in the footer

## Design
- Modern dark style: near-black background, electric blue-to-cyan glow accents, soft glass cards, subtle motion as you scroll
- Fonts: Space Grotesk for headings, DM Sans for body text
- Built mobile-first, since most affiliate traffic comes from phones

## Notes
- Review quotes will be sample text unless you send real ones. I'll flag that when it's done.
- Uses your uploaded HighLevel logo in the header and footer.
- Clear disclaimer near the top and in the footer: "I am an independent HighLevel affiliate, not a HighLevel employee or staff member. I may earn a commission if you sign up through my link."

## Technical details
- Rewrite `src/routes/index.tsx` with the page sections as components in `src/components/landing/`
- Affiliate URL in one constant; all CTAs are `<a target="_blank" rel="noopener sponsored">`
- Countdown is computed client-side in `useEffect` (America/Chicago, next Mon–Fri 11:00)
- Design tokens in `src/styles.css` (oklch), fonts via `<link>` in `__root.tsx`
- Unique head() title/description/og tags; update root placeholders
