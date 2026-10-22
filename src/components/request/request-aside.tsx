import heroImage from "@/assets/images/hero.webp";
import { site } from "@/config/site";
import { Icon } from "@/components/ui/icon";
import { Photo } from "@/components/ui/photo";

export function RequestAside() {
  return (
    <aside className="request-aside">
      <div>
        <Icon name="sun" />
        <h3>
          Let’s make room
          <br />
          <em>for a better day.</em>
        </h3>
        <p>Not sure what to choose? A phone call is a good place to start.</p>
        <a href={site.tel}>
          {site.phone}
          <Icon name="diagonal" />
        </a>
        <span>
          ASAP Appliance Service &amp; Plumbing
          <br />
          Scotts Valley, California
        </span>
      </div>
      <Photo src={heroImage} alt="Illustrative appliance service visit in a welcoming kitchen" />
    </aside>
  );
}
