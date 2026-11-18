import type { PostExtras } from "./types";

type More = Pick<PostExtras, "seoTitle" | "description" | "more">;

/** Meta fixes so every guide carries its keyword, plus one extra in-depth section each. */
export const moreExtras: Record<string, More> = {
  "free-highlevel-bootcamp": {
    description: "The free HighLevel bootcamp runs live every weekday at 11am CT. What you'll set up, the bonuses, what to bring and how the 30-day free trial works.",
    more: [{ insertBefore: "bonuses", blocks: [
      { t: "h2", id: "bootcamp-checklist", x: "Your free HighLevel bootcamp checklist" },
      { t: "p", x: "A live hour goes fast. Here's how to walk out with the most done:" },
      { t: "ol", items: [
        "**Before:** sign up for the trial, book your weekday seat and add it to your calendar with a reminder.",
        "**Before:** open your logo, business phone number and list of services in one folder.",
        "**During:** keep the HighLevel tab and Zoom side by side, and follow along click for click.",
        "**During:** in breakout rooms, ask the question you're stuck on right away. That's what they're for.",
        "**After:** call your own number, miss the call and watch the text-back arrive. Then send one review request.",
      ] },
      { t: "p", x: "Do those five things and you'll have more live in one hour than most people manage in their first month alone." },
    ] }],
  },

  "what-is-gohighlevel": {
    description: "What is GoHighLevel? What it does, who it's for, what Starter, Unlimited and Founder cost, and how to test it free for 14 days before you pay.",
    more: [{ insertBefore: "downsides", blocks: [
      { t: "h2", id: "is-gohighlevel-worth-it", x: "Is GoHighLevel worth it? Three honest questions" },
      { t: "ol", items: [
        "**Are you paying for three or more tools that do pieces of the same job?** Funnels here, email there, bookings somewhere else.",
        "**Do leads go cold because follow-up depends on you remembering?**",
        "**Will you spend one afternoon setting it up properly?** Automations pay you back only after you build them.",
      ] },
      { t: "p", x: "Two or three yeses and GoHighLevel is probably worth a serious trial. Mostly noes? A simpler tool may be all you need, and that's fine." },
    ] }],
  },

  "gohighlevel-pricing": {
    description: "GoHighLevel pricing for 2026: Starter $97, Unlimited $297, Founder $497 a month. What each plan includes, annual savings, usage fees and the free trial.",
    more: [{ insertBefore: "annual", blocks: [
      { t: "h2", id: "included-every-plan", x: "What's included at every GoHighLevel price point" },
      { t: "p", x: "The jump between tiers is about scale and reselling, not about locking basics away. Every plan lists:" },
      { t: "ul", items: [
        "**Unlimited contacts and unlimited users**, so no per-seat surprises as your team grows.",
        "**The core toolkit**: CRM, funnels and websites, email and SMS, calendars, payments, reviews and workflows.",
        "**A 14-day free trial** to test it before you're billed.",
      ] },
      { t: "p", x: "So the real pricing question isn't “which features do I get?”. It's “how many businesses will I run, and do I want to resell?”" },
    ] }],
  },

  "highlevel-ai-receptionist": {
    description: "The HighLevel AI receptionist answers calls 24/7, books appointments and qualifies leads. What each AI agent does, setup tips and how to try it free.",
    more: [{ insertBefore: "trust", blocks: [
      { t: "h2", id: "ai-receptionist-vs-answering-service", x: "HighLevel AI receptionist vs a traditional answering service" },
      { t: "table", head: ["", "HighLevel AI receptionist", "Typical answering service"], rows: [
        ["Hours", "24/7", "Depends on the plan you buy"],
        ["Booking", "Books straight into your HighLevel calendar", "Often takes a message for you to call back"],
        ["Follow-up", "Automated texts and workflows", "Usually manual, by you"],
        ["Knows your business", "From the rules and answers you give it", "From a script you provide"],
      ], caption: "General comparison. Answering services vary, so check what yours includes." },
      { t: "p", x: "The difference that matters most is the last mile: a message is a to-do for you, a booking is revenue on your calendar." },
    ] }],
  },

  "highlevel-5-day-challenge": {
    more: [{ insertBefore: "what-you-get", blocks: [
      { t: "h2", id: "prepare-for-the-challenge", x: "How to prepare for the HighLevel 5 Day Challenge" },
      { t: "ul", items: [
        "**Pick one offer** to build the week around. One service, one audience.",
        "**Gather your assets**: logo, a few photos and any real customer reviews you already have.",
        "**List 20 people** who could use that offer, so Tuesday's funnel has somewhere to send traffic.",
        "**Block 45 minutes a day**, Monday to Friday, at the same time.",
      ] },
      { t: "p", x: "Preparation turns the week from “watch and nod” into “build and launch”. You'll feel the difference by Wednesday." },
    ] }],
  },

  "voice-ai-workshop-local-business": {
    seoTitle: "Voice AI for Local Businesses: Free HighLevel Workshop",
    description: "Voice AI for local businesses, built live in a free two-part HighLevel workshop: answer calls, book appointments and capture leads while you sleep.",
    more: [{ insertBefore: "who", blocks: [
      { t: "h2", id: "first-voice-ai-script", x: "Writing your first voice AI script for a local business" },
      { t: "ol", items: [
        "**Greet** with your business name and one line of help: “Thanks for calling, I can help you book or answer questions.”",
        "**Qualify** with one or two questions, such as the service needed and how soon.",
        "**Offer two time slots** instead of an open question. People choose faster.",
        "**Confirm by text** so the caller has the booking in writing.",
        "**Hand over** to a human for anything urgent, sensitive or unusual.",
      ] },
      { t: "p", x: "That's the skeleton the workshop helps you build out with your own triggers and follow-ups." },
    ] }],
  },

  "highlevel-annual-plans-starter-vs-unlimited": {
    description: "GoHighLevel annual plans compared: Starter $970/year vs Unlimited $2,970/year. What each includes, savings vs monthly and how to pick the right one.",
    more: [{ insertBefore: "scenarios", blocks: [
      { t: "h2", id: "annual-plan-checklist", x: "Before you buy a GoHighLevel annual plan: a 5-point checklist" },
      { t: "ol", items: [
        "You've used HighLevel for at least a couple of weeks.",
        "You've counted the businesses you'll run in it this year.",
        "You know your expected messaging usage, which is billed separately.",
        "You've asked support how plan changes work mid-year.",
        "Paying upfront fits comfortably in your cash flow.",
      ] },
    ] }],
  },

  "highlevel-starter-annual-plan-970": {
    seoTitle: "HighLevel Starter Annual Plan ($970): Is It Worth It?",
    more: [{ insertBefore: "terms", blocks: [
      { t: "h2", id: "first-30-days", x: "Your first 30 days on the HighLevel Starter annual plan" },
      { t: "ol", items: [
        "**Week 1:** set up your own business sub-account. Switch on missed-call text-back and review requests.",
        "**Week 2:** build one funnel and one follow-up workflow, and send real traffic to it.",
        "**Week 3:** add your first client in sub-account two, using the same setup as a template.",
        "**Week 4:** review what's working and decide who goes in sub-account three.",
      ] },
      { t: "p", x: "Annual plans reward momentum. A strong first month is how the $970 turns into an investment rather than an expense." },
    ] }],
  },

  "highlevel-saas-pro-free-trial": {
    description: "How to use the HighLevel SaaS Pro free trial: 14 days to test selling your own branded software to clients, with a day-by-day plan and a pitch script.",
    more: [{ insertBefore: "existing", blocks: [
      { t: "h2", id: "pricing-your-saas", x: "Pricing your first SaaS package during the HighLevel SaaS Pro free trial" },
      { t: "ul", items: [
        "**Cover usage first.** Texts, emails and calls cost money, so build them into the price or rebill them.",
        "**Add margin for support.** Clients pay for the software and for knowing you'll help.",
        "**Keep it to one tier at launch.** You can add “Plus” once you know what people ask for.",
      ] },
      { t: "quote", x: "Simple pricing sells. Clever pricing gets explained." },
    ] }],
  },

  "upgrade-highlevel-to-pro": {
    description: "How to upgrade HighLevel to Pro: the $497/month Agency Pro cost, prorated billing, what the upgrade form needs and the 1–3 business day processing time.",
    more: [{ insertBefore: "terms", blocks: [
      { t: "h2", id: "common-mistakes", x: "Common mistakes when you upgrade HighLevel to Pro" },
      { t: "ul", items: [
        "**Upgrading before you have an offer.** Decide the package first, then upgrade.",
        "**Underpricing usage.** Messaging costs add up across clients.",
        "**Launching to every client at once.** Start with one pilot, fix the rough edges, then roll out.",
        "**Forgetting the billing reset.** Your billing date moves to the upgrade day, so plan around it.",
      ] },
    ] }],
  },
};
