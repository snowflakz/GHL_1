import type { Block } from "./types";

/**
 * One relatable photo per guide, inserted before the given h2. All from Pixabay (Pixabay Content
 * License: free for commercial use, no attribution required; credited anyway). Downloaded 2026-11-20.
 */
const px = (src: string, alt: string, caption: string, page: string): Block => ({ t: "photo", src: `/blog/photos/${src}.jpg`, alt, caption, credit: "Pixabay", creditUrl: page });

export const photos: Record<string, { insertBefore: string; block: Block }> = {
  "free-highlevel-bootcamp": { insertBefore: "quick-wins", block: px("free-highlevel-bootcamp", "A smiling coach wearing a headset on a laptop video call", "Live on Zoom, with a real coach on the other side of the screen.", "https://pixabay.com/photos/webinar-online-virtual-meeting-5059837/") },
  "what-does-gohighlevel-replace": { insertBefore: "what-gohighlevel-replaces", block: px("what-does-gohighlevel-replace", "A hand adding up receipts beside a calculator and notebook", "Subscription creep shows up one small receipt at a time.", "https://pixabay.com/photos/money-bills-calculator-to-save-256312/") },
  "what-is-gohighlevel": { insertBefore: "who-its-for", block: px("what-is-gohighlevel", "A smiling small business owner in an apron working on a laptop in her shop", "Built for owners who'd rather run the business than juggle software.", "https://pixabay.com/photos/women-shop-service-services-10186863/") },
  "gohighlevel-pricing": { insertBefore: "founder", block: px("gohighlevel-pricing", "Coins, a calculator and a measuring caliper on a spreadsheet", "Read the whole price list once, before the first invoice does it for you.", "https://pixabay.com/photos/savings-budget-investment-money-2789112/") },
  "highlevel-ai-receptionist": { insertBefore: "who", block: px("highlevel-ai-receptionist", "A smiling receptionist wearing a headset in a bright office", "The job the AI receptionist covers when nobody's at the desk.", "https://pixabay.com/photos/office-headset-smiling-woman-10300126/") },
  "highlevel-5-day-challenge": { insertBefore: "prepare-for-the-challenge", block: px("highlevel-5-day-challenge", "A tablet showing a calendar on a desk beside a keyboard and notebook", "Block the week in your calendar before Monday comes.", "https://pixabay.com/photos/apple-calendar-desk-ipad-tablet-1867752/") },
  "voice-ai-workshop-local-business": { insertBefore: "who", block: px("voice-ai-workshop-local-business", "A hairdresser's hands styling a client's wet hair in a salon", "Busy hands, ringing phone: exactly where Voice AI helps.", "https://pixabay.com/photos/hairdresser-maintenance-hair-woman-4769975/") },
  "highlevel-annual-plans-starter-vs-unlimited": { insertBefore: "three-rule", block: px("highlevel-annual-plans-starter-vs-unlimited", "A business team shaking hands around a meeting table", "Count the businesses you'll run before you pick a plan.", "https://pixabay.com/photos/people-business-meeting-1979261/") },
  "highlevel-starter-annual-plan-970": { insertBefore: "whats-included", block: px("highlevel-starter-annual-plan-970", "A freelancer working on a laptop beside a cup of coffee", "Starter suits solo marketers and freelancers running up to three businesses.", "https://pixabay.com/photos/woman-laptop-desk-workspace-1851464/") },
  "highlevel-saas-pro-free-trial": { insertBefore: "plan", block: px("highlevel-saas-pro-free-trial", "A smiling woman presenting in front of a whiteboard", "One trial, one pilot client, one clear offer.", "https://pixabay.com/photos/woman-work-office-whiteboard-4702060/") },
  "upgrade-highlevel-to-pro": { insertBefore: "checklist", block: px("upgrade-highlevel-to-pro", "A team reviewing growth charts on laptops in a meeting room", "Pro is for agencies ready to sell software, not just hours.", "https://pixabay.com/photos/job-office-team-business-internet-5382501/") },
};
