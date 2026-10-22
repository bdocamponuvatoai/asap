import { site } from "@/config/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/links";

export function LocalSection() {
  return (
    <section className="local-section">
      <div className="wrap local-grid">
        <div>
          <Eyebrow>LOCAL ROOTS. EVERYDAY CONNECTIONS.</Eyebrow>
          <h2>
            Right here
            <br />
            <em>in Scotts Valley.</em>
          </h2>
          <p>
            Home is where our story starts.
            <br />
            Let’s talk about what’s happening at yours.
          </p>
          <ButtonLink href="/contact/" variant="white">
            Contact ASAP
          </ButtonLink>
          <p className="local-note">Call with your ZIP code to confirm service availability.</p>
        </div>
        <div className="location-card">
          <div className="location-card-top">
            <Icon name="pin" />
            <span>OUR HOME BASE</span>
            <span>CA</span>
          </div>
          <div className="zip-art" aria-hidden="true">
            95066<span>SCOTTS VALLEY</span>
          </div>
          <div className="location-card-bottom">
            <address>
              116 Sawyer Circle
              <br />
              Scotts Valley, CA 95066
            </address>
            <a
              href={site.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View business location on Google Maps"
            >
              <Icon name="diagonal" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
