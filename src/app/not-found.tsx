import type { Metadata } from "next";

import { site } from "@/config/site";
import { Closing } from "@/components/sections/closing";
import { PageIntro } from "@/components/sections/page-intro";

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${site.name}` },
};

export default function NotFound() {
  return (
    <>
      <PageIntro
        kicker="PAGE NOT FOUND"
        title={["This page", "isn’t here."]}
        description="The link may be out of date or mistyped. Start again from the homepage, or call ASAP to talk it through."
        action="Back to the homepage"
        href="/"
      />
      <Closing />
    </>
  );
}
