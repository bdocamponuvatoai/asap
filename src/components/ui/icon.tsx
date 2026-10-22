import type { ReactElement } from "react";

const PATHS = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  diagonal: <path d="M6 18 18 6M6 6h12v12" />,
  phone: <path d="m7 3 3 5-2.5 2a15 15 0 0 0 6.5 6.5l2-2.5 5 3-1 4C10 22 2 14 3 4Z" />,
  washer: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="3" />
      <path d="M4 7h16M7 4.5h1m2 0h1" />
      <circle cx="12" cy="14" r="4.5" />
      <path d="M8 15c2-3 5 3 8-1" />
    </>
  ),
  drop: (
    <>
      <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />
      <path d="M8 15a4 4 0 0 0 4 4" />
    </>
  ),
  pin: (
    <>
      <path d="M19 10c0 6-7 12-7 12S5 16 5 10a7 7 0 0 1 14 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chat: (
    <>
      <path d="M21 11a9 9 0 0 1-9 9H4l-2 2v-11a9 9 0 0 1 19 0Z" />
      <path d="M7 10h10M7 14h6" />
    </>
  ),
  home: <path d="m2 10 10-8 10 8M5 8v13h14V8M9 21v-8h6v8" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="13" rx="2" />
      <path d="M16 8V3H3v13h5" />
    </>
  ),
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />,
  spark: <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" />,
} satisfies Record<string, ReactElement>;

export type IconName = keyof typeof PATHS;

/** Decorative 24×24 line icon. Sized and coloured by CSS. */
export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
