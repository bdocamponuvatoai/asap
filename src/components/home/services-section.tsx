import { ServiceCards } from "@/components/sections/service-cards";
import { Eyebrow } from "@/components/ui/eyebrow";

export function ServicesSection() {
  return (
    <section className="wrap services-section" id="services">
      <div className="section-head">
        <div>
          <Eyebrow>A HELPING HAND, RIGHT WHERE YOU NEED IT</Eyebrow>
          <h2>
            The little things
            <br />
            <em>that make a home work.</em>
          </h2>
        </div>
        <p>
          A running laundry day. A working kitchen.
          <br />A tap that does what it should.
          <br />
          Let’s start with what needs attention.
        </p>
      </div>
      <ServiceCards />
      <p className="scope-note">
        Have a specific appliance or project in mind? Call to confirm service for your equipment and
        location.
      </p>
    </section>
  );
}
