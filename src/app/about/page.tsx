import { AboutFeature, AboutValues } from "@/components/about/about-content";
import { Closing } from "@/components/sections/closing";
import { PageIntro } from "@/components/sections/page-intro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About ASAP",
  path: "/about/",
  description:
    "Meet ASAP Appliance Service & Plumbing, owned by Andrew Napier and based in Scotts Valley.",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro
        kicker="A LOCAL NAME. A HUMAN CONNECTION."
        title={["A helping hand.", "Close to home."]}
        description="Meet ASAP Appliance Service & Plumbing, owned by Andrew Napier and based right here in Scotts Valley."
      />
      <AboutFeature />
      <AboutValues />
      <Closing />
    </>
  );
}
