import heroImage from "@/assets/images/hero.webp";
import { site } from "@/config/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { Photo } from "@/components/ui/photo";

export function Hero() {
  return (
    <section className="hero wrap">
      <div className="hero-copy">
        <Eyebrow>APPLIANCE SERVICE &amp; PLUMBING</Eyebrow>
        <div className="location-tag">Scotts Valley, California</div>
        <h1>
          Home feels
          <br />
          better when
          <br />
          <em>it all works.</em>
        </h1>
        <p>
          For the appliances you count on.
          <br />
          For the water that keeps life flowing.
          <br />A helping hand for the place you call home.
        </p>
        <div className="actions">
          <ButtonLink href="/request/">Tell us what’s happening</ButtonLink>
          <TextLink href="#services">Explore services</TextLink>
        </div>
        <a className="hero-call" href={site.tel}>
          <Icon name="phone" />
          Prefer a conversation? <strong>{site.phone}</strong>
        </a>
      </div>
      <div className="hero-visual">
        <Photo
          src={heroImage}
          alt="Illustrative appliance technician inspecting a dishwasher in a bright California kitchen"
          eager
        />
        <div className="hero-caption">
          <span className="caption-icon">
            <Icon name="home" />
          </span>
          <div>
            Good days start at home.<small>LET’S KEEP THE EVERYDAY GOING.</small>
          </div>
          <Icon name="spark" />
        </div>
      </div>
    </section>
  );
}
