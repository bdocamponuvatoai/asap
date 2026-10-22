/**
 * Business details and navigation. Safe to import from client components:
 * nothing here depends on the environment.
 */
export const site = {
  name: "ASAP Appliance Service & Plumbing",
  shortName: "ASAP",
  owner: "Andrew Napier",
  phone: "(831) 438-0110",
  tel: "tel:+18314380110",
  /** E.164-style number for structured data. */
  telephone: "+1-831-438-0110",
  address: {
    street: "116 Sawyer Circle",
    locality: "Scotts Valley",
    region: "CA",
    postalCode: "95066",
    country: "US",
  },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=116+Sawyer+Circle%2C+Scotts+Valley%2C+CA+95066",
  themeColor: "#fafbf8",
} as const;

type NavItem = { label: string; href: string };

export const mainNav: readonly NavItem[] = [
  { label: "Appliance service", href: "/appliances/" },
  { label: "Plumbing", href: "/plumbing/" },
  { label: "About ASAP", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const footerNav: readonly { heading: string; links: readonly NavItem[] }[] = [
  {
    heading: "A helping hand",
    links: [
      { label: "Appliance service", href: "/appliances/" },
      { label: "Plumbing", href: "/plumbing/" },
      { label: "Explore services", href: "/services/" },
      { label: "Prepare a request", href: "/request/" },
    ],
  },
  {
    heading: "Get to know us",
    links: [
      { label: "About ASAP", href: "/about/" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Common questions", href: "/#questions" },
      { label: "Contact & location", href: "/contact/" },
    ],
  },
];
