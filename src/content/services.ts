import type { StaticImageData } from "next/image";

import applianceImage from "@/assets/images/appliance.webp";
import plumbingImage from "@/assets/images/plumbing.webp";
import type { IconName } from "@/components/ui/icon";

type ServiceSlug = "appliances" | "plumbing";
type ServiceTopic = "appliance" | "plumbing";

type ServiceCard = {
  slug: ServiceSlug;
  icon: IconName;
  title: string;
  heading: string;
  description: string;
  tags: string;
  image: StaticImageData;
  alt: string;
};

export const serviceCards: readonly ServiceCard[] = [
  {
    slug: "appliances",
    icon: "washer",
    title: "Appliance service",
    heading: "For the everyday essentials.",
    description:
      "From the kitchen to the laundry room, start with the appliance and tell us what’s changed.",
    tags: "Kitchen appliances · Laundry appliances",
    image: applianceImage,
    alt: "Illustrative technician checking a washing machine in a bright laundry room",
  },
  {
    slug: "plumbing",
    icon: "drop",
    title: "Plumbing",
    heading: "A little less drip. A little more calm.",
    description:
      "A fixture, a leak, a hot-water question. Make a little room for a clearer next step.",
    tags: "Fixtures · Water concerns · Hot water",
    image: plumbingImage,
    alt: "Illustrative plumber inspecting under-sink connections in a light kitchen",
  },
];

/** Copy for the /appliances/ and /plumbing/ detail pages. */
export type ServiceDetail = {
  slug: ServiceSlug;
  /** Value for the request form's `?service=` preset. */
  topic: ServiceTopic;
  metaTitle: string;
  kicker: string;
  /** Two lines; the second is emphasised. */
  title: [string, string];
  intro: string;
  image: StaticImageData;
  alt: string;
  heading: [string, string];
  copy: string;
  topics: readonly { title: string; text: string }[];
  prepare: readonly string[];
};

export const serviceDetails: Record<ServiceSlug, ServiceDetail> = {
  appliances: {
    slug: "appliances",
    topic: "appliance",
    metaTitle: "Appliance service",
    kicker: "APPLIANCE SERVICE / THE EVERYDAY ESSENTIALS",
    title: ["For the appliances", "life happens around."],
    intro:
      "The kitchen. The laundry. The little routines that make your day. Tell us which appliance needs attention and what you’ve noticed.",
    image: applianceImage,
    alt: "Illustrative technician checking a front-loading washing machine",
    heading: ["A few details.", "A better starting point."],
    copy: "An appliance problem doesn’t always come with a clear explanation. Start with the type of appliance, its brand and model, and what has changed. Confirm service for your specific equipment with ASAP.",
    topics: [
      {
        title: "Kitchen appliances",
        text: "Refrigerator, dishwasher, oven or range? Share the appliance type and ask about service for your model.",
      },
      {
        title: "Laundry appliances",
        text: "Washer or dryer concerns? Describe the cycle, sound or performance change you’ve noticed.",
      },
      {
        title: "Something you can’t quite describe",
        text: "An error code, an unfamiliar noise or a question about an installation. Your own words are enough to start.",
      },
    ],
    prepare: [
      "Appliance type, brand and model number, if available",
      "What you notice and when it started",
      "Any error message displayed",
      "Your ZIP code and the work you have in mind",
    ],
  },
  plumbing: {
    slug: "plumbing",
    topic: "plumbing",
    metaTitle: "Plumbing",
    kicker: "PLUMBING / KEEP THE EVERYDAY FLOWING",
    title: ["A little less worry.", "A little more flow."],
    intro:
      "A fixture that needs attention. A water concern. A question about what comes next. Start a conversation about the plumbing in your home.",
    image: plumbingImage,
    alt: "Illustrative plumber inspecting a sink supply connection",
    heading: ["Tell us where.", "Tell us what’s changed."],
    copy: "You don’t need the name of every pipe or part. A description of the location, what you see and when it happens helps set up a useful conversation. Confirm the scope and availability directly with ASAP.",
    topics: [
      {
        title: "Fixtures & connections",
        text: "Have a question about a sink, faucet, toilet or visible connection? Tell us the location and what needs attention.",
      },
      {
        title: "Water & drainage concerns",
        text: "Explain where you’ve noticed a drip, a change in flow or a drainage problem. Call to discuss the right next step.",
      },
      {
        title: "Hot-water questions",
        text: "Share what you know about the equipment and the change you’ve noticed. Ask about service for your water heater.",
      },
    ],
    prepare: [
      "The fixture or area of the home involved",
      "What you see, hear or notice",
      "When the concern started and whether it is ongoing",
      "Your ZIP code and any relevant equipment details",
    ],
  },
};

export const serviceSlugs = Object.keys(serviceDetails) as ServiceSlug[];

export const serviceDetailDescription =
  "Prepare your appliance service or plumbing enquiry and contact ASAP in Scotts Valley.";
