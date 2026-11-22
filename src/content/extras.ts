import type { PostExtras } from "./types";

/**
 * SEO + engagement layer for each guide. Each guide targets ONE primary keyword tied to its offer;
 * the keyword appears in the <title>, H1, intro, at least one H2 and the cover alt text.
 * All facts come from the offer pages as reviewed on 18 November 2026.
 */
export const extras: Record<string, PostExtras> = {
  "what-is-gohighlevel": {
    keyword: "what is GoHighLevel",
    excerpt: "What is GoHighLevel? One login that replaces eleven browser tabs. Here's what it does, what it costs and who should skip it.",
    takeaways: [
      "GoHighLevel bundles CRM, funnels, email and SMS, calendars, payments, reviews and automation in one platform.",
      "Plans start at $97 a month, and you can try it free for 30 days through the live bootcamp.",
      "It's built for freelancers, agencies and local service businesses that run on leads and appointments.",
    ],
    glance: [["Price from", "$97 / month"], ["Free trial", "30 days via the bootcamp"], ["Best for", "Agencies & local businesses"], ["Learning curve", "Moderate"]],
    insertBefore: "pricing",
    blocks: [
      { t: "h2", id: "gohighlevel-vs-separate-tools", x: "GoHighLevel vs a stack of separate tools" },
      { t: "p", x: "The easiest way to understand what GoHighLevel is: list the jobs your current tools do, then see which part of HighLevel does each one. For most service businesses the list looks like this:" },
      { t: "table", head: ["The job", "Usually done with…", "In HighLevel"], rows: [
        ["Capture leads", "A funnel builder plus a form tool", "Funnels, websites and forms"],
        ["Follow up", "An email tool plus a texting app", "Email, SMS and automated workflows"],
        ["Book appointments", "A scheduling app", "Calendars with reminders"],
        ["Get paid", "An invoicing app", "Invoices, payments and paid bookings"],
        ["Collect reviews", "A review widget", "Reputation management and review requests"],
      ] },
      { t: "quote", x: "The magic isn't any single tool. It's that they finally talk to each other." },
      { t: "p", x: "Fewer logins is nice. Fewer gaps between tools is the real win, because that's where leads quietly fall through." },
    ],
  },

  "highlevel-starter-annual-plan-970": {
    keyword: "HighLevel Starter annual plan",
    excerpt: "The HighLevel Starter annual plan: pay for ten months, use it for twelve. The maths, what you get and when to skip it.",
    takeaways: [
      "$970 a year versus $1,164 paying monthly: a $194 saving.",
      "Includes 3 sub-accounts, unlimited contacts and users, and 24/7 support.",
      "Best once you've tested HighLevel and know you'll run three businesses or fewer.",
    ],
    glance: [["Price", "$970 / year"], ["You save", "$194 vs monthly"], ["Sub-accounts", "3"], ["Contract", "None · cancel via support"]],
    insertBefore: "terms",
    blocks: [
      { t: "h2", id: "is-the-starter-annual-plan-worth-it", x: "Is the HighLevel Starter annual plan worth it? A 30-second test" },
      { t: "ol", items: [
        "You've used HighLevel already, on a trial or in the bootcamp, and plan to keep it.",
        "You'll manage **three businesses or fewer** over the next twelve months.",
        "Paying $970 upfront won't squeeze your cash flow.",
      ] },
      { t: "p", x: "Three yeses? The annual plan wins, easily. Any no? Stay monthly for now and revisit in a couple of months. The saving will still be there." },
      { t: "quote", x: "The best discount is the one on software you'll actually open every day." },
    ],
  },

  "highlevel-annual-plans-starter-vs-unlimited": {
    keyword: "GoHighLevel annual plans",
    excerpt: "GoHighLevel annual plans come down to one question: how many businesses will live in your account by next year?",
    takeaways: [
      "Starter annual is $970 a year with 3 sub-accounts.",
      "Unlimited annual is $2,970 a year with unlimited sub-accounts, rebilling at cost and basic API access.",
      "Rule of thumb: one to three businesses, Starter. Four or more, Unlimited.",
    ],
    glance: [["Starter", "$970 / year"], ["Unlimited", "$2,970 / year"], ["Savings", "$194 / $594"], ["The decider", "Number of sub-accounts"]],
    insertBefore: "scenarios",
    blocks: [
      { t: "h2", id: "annual-vs-monthly", x: "GoHighLevel annual plans vs monthly: when yearly wins" },
      { t: "p", x: "Yearly billing is a trade: you give up flexibility, you get a lower price. It's a great trade when your setup is stable and a bad one when you're still experimenting." },
      { t: "ul", items: [
        "**Go annual** when you've run HighLevel for a while and your client count is predictable.",
        "**Stay monthly** while you're still testing offers, niches or whether HighLevel fits at all.",
        "**Upgrade before renewing**: if you're close to three businesses on Starter, compare Unlimited before the year starts, not halfway through.",
      ] },
      { t: "quote", x: "Pay for headroom you'll use, not headroom you hope for." },
    ],
  },

  "gohighlevel-pricing": {
    keyword: "GoHighLevel pricing",
    excerpt: "GoHighLevel pricing on one page: three plans, two billing options and the usage fees nobody mentions.",
    takeaways: [
      "Starter is $97, Unlimited $297 and Founder $497 a month.",
      "Annual billing brings Starter to $970 and Unlimited to $2,970 a year.",
      "SMS, email and calls are billed on top at small per-use rates.",
    ],
    glance: [["From", "$97 / month"], ["Top tier", "Founder · $497 / month"], ["Free trial", "30 days via the bootcamp"], ["Annual from", "$970 / year"]],
    insertBefore: "which",
    blocks: [
      { t: "h2", id: "cost-per-client", x: "GoHighLevel pricing per client: the maths agencies care about" },
      { t: "p", x: "Agencies rarely ask “what does it cost?”. They ask “what does it cost **per client**?”. Divide the plan price by the businesses you run in it:" },
      { t: "table", head: ["Plan", "Businesses in the account", "Platform cost per business / month"], rows: [
        ["Starter · $97", "3", "about $32.33"],
        ["Unlimited · $297", "10", "$29.70"],
        ["Unlimited · $297", "20", "$14.85"],
      ], caption: "Simple division, before messaging usage. Your numbers will differ." },
      { t: "p", x: "That's why Unlimited gets cheaper the more you grow, and why rebilling usage to clients matters so much for agencies managing costs." },
      { t: "quote", x: "The cheapest plan isn't the one with the lowest price. It's the one with the lowest cost per customer." },
    ],
  },

  "upgrade-highlevel-to-pro": {
    keyword: "upgrade HighLevel to Pro",
    title: "How to upgrade HighLevel to Pro (without the guesswork)",
    excerpt: "Want to upgrade HighLevel to Pro? Three things to have ready, one billing quirk to know about and a 1–3 day wait.",
    takeaways: [
      "Agency Pro is $497 a month. Billing resets to your upgrade date, with a prorated charge that day.",
      "Have your agency login email, Agency Relationship Number and referral link ready.",
      "Upgrades are processed in 1–3 business days.",
    ],
    glance: [["Price", "$497 / month"], ["Processing", "1–3 business days"], ["For", "Existing agency accounts"], ["Billing", "Prorated, resets on upgrade"]],
    insertBefore: "after",
    blocks: [
      { t: "h2", id: "ready-to-upgrade", x: "Should you upgrade HighLevel to Pro? Signs you're ready" },
      { t: "ul", items: [
        "**Clients keep asking for their own login** to see leads, bookings and reviews.",
        "**Your setup is repeatable**: you build roughly the same system for every client.",
        "**You want to offer clients software as well as services**, such as a monthly software plan alongside your work.",
      ] },
      { t: "p", x: "If two of those sound familiar, you've outgrown selling only services. If none do, keep building on your current plan for now." },
      { t: "quote", x: "Upgrade when clients are already asking for the product, not when you hope they will." },
    ],
  },

  "highlevel-saas-pro-free-trial": {
    keyword: "HighLevel SaaS Pro free trial",
    excerpt: "The HighLevel SaaS Pro free trial gives agencies a risk-free window to test selling software with their own name on it.",
    takeaways: [
      "Free to start. Your card is charged when the trial ends unless you cancel.",
      "Built for agencies that want to offer clients a branded software subscription, not just services.",
      "Get the most from it with one pilot client and one simple package.",
    ],
    glance: [["Trial", "Free"], ["Billing", "When the trial ends, unless cancelled"], ["For", "Agencies"], ["Existing users", "Use the Pro upgrade"]],
    insertBefore: "existing",
    blocks: [
      { t: "h2", id: "pitch", x: "How to pitch your first client during your HighLevel SaaS Pro free trial" },
      { t: "ol", items: [
        "**Lead with their problem**: “You're missing calls after hours, and each one is a lost booking.”",
        "**Show the fix live** on your own trial account: call, miss, get the text back.",
        "**Offer a small monthly package** that keeps it running, with you as support.",
        "**Start this week**, so you have real results before the trial ends.",
      ] },
      { t: "quote", x: "Don't sell software. Sell the missed call that never happens again." },
    ],
  },

  "free-highlevel-bootcamp": {
    keyword: "free HighLevel bootcamp",
    excerpt: "The free HighLevel bootcamp: six quick wins, real people in breakout rooms, and a business that's live by the time the call ends.",
    takeaways: [
      "Live on Zoom every weekday at 11am CT, 60 minutes max.",
      "It comes with a 30-day free trial of HighLevel.",
      "You set up six quick wins, from missed-call text-back to review management.",
    ],
    glance: [["Cost", "Free"], ["When", "Weekdays · 11am CT"], ["Length", "60 minutes"], ["Trial", "30 days"]],
    insertBefore: "small-print",
    blocks: [
      { t: "h2", id: "who-should-join", x: "Who the free HighLevel bootcamp is for" },
      { t: "p", x: "It's built for people who want to start or grow a business and don't know where to begin with the tech. You don't need experience, a product or a technical background, just a laptop and an hour." },
      { t: "ul", items: [
        "**New business owners** who want their marketing basics working this week.",
        "**Freelancers starting an agency** who want to learn HighLevel the fast way.",
        "**Existing owners** tired of watching tutorials and building nothing.",
      ] },
      { t: "quote", x: "Recorded training is easy to skip. A live seat with your name on it isn't." },
    ],
  },

  "highlevel-5-day-challenge": {
    keyword: "HighLevel 5 Day Challenge",
    excerpt: "The HighLevel 5 Day Challenge: Monday you set up, and by Friday leads flow into a system that follows up and books itself.",
    takeaways: [
      "Free, Monday to Friday, one focus per day.",
      "You need a free HighLevel trial (the bootcamp's 30-day trial works) or an existing account.",
      "You keep the funnel, pipeline, follow-ups and booking you build.",
    ],
    glance: [["Cost", "Free"], ["Length", "5 days"], ["Needs", "Free trial or account"], ["You keep", "Everything you build"]],
    insertBefore: "catch",
    blocks: [
      { t: "h2", id: "challenge-vs-bootcamp", x: "HighLevel 5 Day Challenge vs the free bootcamp" },
      { t: "table", head: ["", "Free bootcamp", "5 Day Challenge"], rows: [
        ["Length", "60 minutes", "5 days, Monday to Friday"],
        ["Format", "Live on Zoom, weekdays at 11am CT", "One focus a day, with a kickoff call"],
        ["Trial", "30 days", "A free trial or your existing account"],
        ["Best for", "A fast first setup", "Building the full capture–nurture–close system"],
      ] },
      { t: "p", x: "You don't have to choose: HighLevel's bootcamp includes access to the challenge as a bonus (included by HighLevel). Many people do the hour first, then the week." },
      { t: "quote", x: "One hour gets you started. Five days gets you a system." },
    ],
  },

  "highlevel-ai-receptionist": {
    keyword: "HighLevel AI receptionist",
    excerpt: "It's 9:14pm and a customer is ready to book. The HighLevel AI receptionist picks up when you can't.",
    takeaways: [
      "HighLevel's AI answers calls and messages 24/7, books appointments and follows up.",
      "Specialised agents cover reception, scheduling, sales, marketing and reviews.",
      "There's a free trial, and new users get a one-hour onboarding session.",
    ],
    glance: [["Availability", "24/7"], ["Free trial", "Yes"], ["Onboarding", "1-hour session"], ["Compliance", "GDPR · SOC 2 · HIPAA packages"]],
    insertBefore: "trust",
    blocks: [
      { t: "h2", id: "setup", x: "Setting up the HighLevel AI receptionist: your first-hour checklist" },
      { t: "ol", items: [
        "**Add your hours, services and prices** so answers are accurate.",
        "**Set booking rules**: buffer times, appointment lengths, days off.",
        "**Feed it your ten most common questions** with one-sentence answers.",
        "**Write escalation rules** for complaints, refunds and emergencies.",
        "**Call your own number** after hours and listen like a customer.",
      ] },
      { t: "quote", x: "Your AI receptionist is only as good as the rules you give it. Spend the first hour on rules." },
    ],
  },

  "voice-ai-workshop-local-business": {
    keyword: "voice AI for local businesses",
    excerpt: "Voice AI for local businesses, built live: day one lays the foundation, day two it goes live and answers while you sleep.",
    takeaways: [
      "A free two-part workshop for new and existing HighLevel users.",
      "You build a real Voice AI workflow: answering, missed-call texts, routing and follow-up.",
      "New users join with a free HighLevel trial. Dates are on the registration page.",
    ],
    glance: [["Cost", "Free"], ["Format", "Two parts, built live"], ["Ideal for", "Med spas, trades, dentists"], ["Needs", "HighLevel account or trial"]],
    insertBefore: "requirements",
    blocks: [
      { t: "h2", id: "use-cases", x: "Voice AI for local businesses: three calls it handles for you" },
      { t: "ul", items: [
        "**The after-hours booking.** Picture a med spa at 10pm: the caller asks about a treatment, hears the options and books a consultation.",
        "**The storm-season surge.** Picture a roofer on a ladder while ten calls come in: each caller is answered, qualified and routed.",
        "**The new-patient enquiry.** Picture a dental front desk at lunch: the AI captures the details and sends a booking link by text.",
      ] },
      { t: "quote", x: "Local businesses don't lose customers to better competitors. They lose them to the ones who picked up." },
    ],
  },
};
