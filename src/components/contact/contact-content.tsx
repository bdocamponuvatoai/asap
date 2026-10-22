import { site } from "@/config/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { ButtonLink, TextLink } from "@/components/ui/links";

export function ContactGrid() {
  return (
    <section className="wrap contact-grid">
      <div className="contact-main">
        <Eyebrow>THE DIRECT LINE</Eyebrow>
        <a className="big-phone" href={site.tel}>
          {site.phone}
          <Icon name="diagonal" />
        </a>
        <p>
          For appliance service and plumbing enquiries.
          <br />
          Call to confirm current hours and availability.
        </p>
        <div className="contact-rule"></div>
        <div className="contact-facts">
          <div>
            <h2>Owner</h2>
            <p>{site.owner}</p>
          </div>
          <div>
            <h2>Business address</h2>
            <address>
              116 Sawyer Circle
              <br />
              Scotts Valley, CA 95066
            </address>
            <small>Please call before visiting.</small>
          </div>
        </div>
        <TextLink href={site.mapUrl}>View location on Google Maps</TextLink>
      </div>
      <div className="contact-note">
        <Icon name="chat" />
        <h2>
          A few details.
          <br />
          <em>A useful conversation.</em>
        </h2>
        <p>
          Which appliance or plumbing fixture is involved? What have you noticed? When did it start?
        </p>
        <p>Use the request builder to put your notes together before you call.</p>
        <ButtonLink href="/request/" variant="white">
          Prepare my service notes
        </ButtonLink>
      </div>
    </section>
  );
}

export function SourceNote() {
  return (
    <div className="wrap source-note">
      {
        "Preview contact details: the phone number matches public business listings for Andrew Napier / Appliance Service & Plumbing. "
      }
      <a
        href="https://www.yellowpages.com/scotts-valley-ca/mip/appliance-service-plumbing-21965276"
        target="_blank"
        rel="noopener noreferrer"
      >
        View business listing
      </a>
      . Confirm contact details with the owner before public launch.
    </div>
  );
}
