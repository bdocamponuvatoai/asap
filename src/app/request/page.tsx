import { Suspense } from "react";

import { site } from "@/config/site";
import { PresetRequestBuilder } from "@/components/request/preset-request-builder";
import { RequestAside } from "@/components/request/request-aside";
import { RequestBuilder } from "@/components/request/request-builder";
import { PageIntro } from "@/components/sections/page-intro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Prepare your service enquiry",
  path: "/request/",
  description:
    "Prepare appliance or plumbing service notes before you call ASAP. No online booking or automatic submission.",
});

export default function RequestPage() {
  return (
    <>
      <PageIntro
        kicker="A FEW DETAILS. A CLEARER NEXT STEP."
        title={["Let’s start", "with your home."]}
        description="Put your service notes together, then call ASAP to discuss them. Nothing is sent automatically and no appointment is booked."
        action={`Prefer to talk? ${site.phone}`}
        href={site.tel}
      />
      <section className="wrap request-layout">
        {/* The static HTML carries the form without a preset; the client applies ?service=. */}
        <Suspense fallback={<RequestBuilder preset={null} />}>
          <PresetRequestBuilder />
        </Suspense>
        <RequestAside />
      </section>
    </>
  );
}
