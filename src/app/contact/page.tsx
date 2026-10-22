import { ContactGrid, SourceNote } from "@/components/contact/contact-content";
import { Faq } from "@/components/sections/faq";
import { PageIntro } from "@/components/sections/page-intro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact ASAP",
  path: "/contact/",
  description:
    "Contact ASAP Appliance Service & Plumbing at (831) 438-0110. Business address: 116 Sawyer Circle, Scotts Valley, CA 95066.",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        kicker="LET’S TALK ABOUT YOUR HOME"
        title={["Good help starts", "with a hello."]}
        description="Tell ASAP what needs attention. Call to discuss service availability, your location, and the next step."
        action="Prepare my details"
      />
      <ContactGrid />
      <Faq />
      <SourceNote />
    </>
  );
}
