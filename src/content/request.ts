import type { IconName } from "@/components/ui/icon";

/** Topics offered by the homepage finder and the request form. */
export type RequestTopic = "appliance" | "plumbing" | "other";

const requestTopics: readonly RequestTopic[] = ["appliance", "plumbing", "other"];

export function isRequestTopic(value: unknown): value is RequestTopic {
  return typeof value === "string" && (requestTopics as readonly string[]).includes(value);
}

/** Homepage "What’s on your mind?" finder. */
type FinderTopic = {
  key: RequestTopic;
  tab: string;
  icon: IconName;
  label: string;
  title: string;
  description: string;
  prompts: readonly string[];
  number: string;
};

export const finderTopics: readonly FinderTopic[] = [
  {
    key: "appliance",
    tab: "An appliance",
    icon: "washer",
    label: "LET’S START WITH YOUR APPLIANCE",
    title: "What isn’t working the way it used to?",
    description:
      "Tell us the appliance type, brand and what you’re noticing. A sound, an error message or a change in performance is a useful place to begin.",
    prompts: ["Appliance type", "Brand & model", "What’s changed"],
    number: "01",
  },
  {
    key: "plumbing",
    tab: "The plumbing",
    icon: "drop",
    label: "LET’S TALK ABOUT THE PLUMBING",
    title: "Where have you noticed a change?",
    description:
      "A fixture, a drip or a hot-water question. Tell us where the concern is, what you notice, and whether it happens all the time or just occasionally.",
    prompts: ["Where it happens", "What you notice", "When it started"],
    number: "02",
  },
  {
    key: "other",
    tab: "Something else",
    icon: "chat",
    label: "YOU DON’T NEED THE PERFECT WORDS",
    title: "Your question is a good beginning.",
    description:
      "You don’t have to name a part or diagnose a problem. Describe what brought you here. Call ASAP to discuss the work and confirm whether it’s a good fit.",
    prompts: ["Your question", "Your location", "The work in mind"],
    number: "03",
  },
];

/** Request form, step 1 choices. */
export const serviceOptions: readonly {
  value: RequestTopic;
  icon: IconName;
  title: string;
  hint: string;
}[] = [
  {
    value: "appliance",
    icon: "washer",
    title: "An appliance",
    hint: "Kitchen or laundry concerns",
  },
  {
    value: "plumbing",
    icon: "drop",
    title: "The plumbing",
    hint: "Fixtures, water or hot-water questions",
  },
  {
    value: "other",
    icon: "chat",
    title: "I’m not sure yet",
    hint: "Start with what you’ve noticed",
  },
];

export const topicLabels: Record<RequestTopic, string> = {
  appliance: "Appliance service",
  plumbing: "Plumbing",
  other: "General enquiry",
};

export const equipmentOptions: Record<RequestTopic, readonly string[]> = {
  appliance: [
    "Refrigerator / freezer",
    "Dishwasher",
    "Washer",
    "Dryer",
    "Oven / range",
    "Another appliance",
    "Not sure",
  ],
  plumbing: [
    "Sink / faucet",
    "Toilet",
    "Visible leak or water concern",
    "Drainage concern",
    "Water heater / hot water",
    "Another plumbing question",
    "Not sure",
  ],
  other: ["A service question", "A future project", "Not sure what the issue is", "Something else"],
};

export const startedOptions: readonly string[] = [
  "Today",
  "Within the past week",
  "More than a week ago",
  "Planning future work",
];

export const STARTED_NOT_SPECIFIED = "Not specified";

export const NOTES_FILENAME = "ASAP-Service-Enquiry.txt";
