import { Closing } from "@/components/sections/closing";
import { PageIntro } from "@/components/sections/page-intro";
import { Process } from "@/components/sections/process";
import { ServiceCards } from "@/components/sections/service-cards";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "A helping hand for your home",
  path: "/services/",
  description: "Explore appliance service and plumbing enquiry topics with ASAP in Scotts Valley.",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        kicker="FOR THE PLACE YOU CALL HOME"
        title={["Everyday essentials.", "A little attention."]}
        description="Appliance service and plumbing conversations, with a local starting point in Scotts Valley."
      />
      <section className="wrap services-directory">
        <ServiceCards />
        <p className="scope-note">
          Specific equipment, service scope, pricing and availability must be confirmed with ASAP.
        </p>
      </section>
      <Process />
      <Closing />
    </>
  );
}
