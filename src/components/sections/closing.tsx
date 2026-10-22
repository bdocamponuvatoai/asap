import { site } from "@/config/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { ButtonLink, TextLink } from "@/components/ui/links";

export function Closing() {
  return (
    <section className="closing">
      <div className="wrap closing-inner">
        <div className="closing-spark">
          <Icon name="sun" />
        </div>
        <Eyebrow>LET’S MAKE HOME FEEL LIKE HOME AGAIN</Eyebrow>
        <h2>
          A little help.
          <br />
          <em>A lot more home.</em>
        </h2>
        <p>The first step is a conversation. Tell us what’s happening.</p>
        <div className="actions">
          <ButtonLink href="/request/">Get help with your home</ButtonLink>
          <TextLink href={site.tel}>{`Or call ${site.phone}`}</TextLink>
        </div>
        <div className="closing-orbit" aria-hidden="true"></div>
      </div>
    </section>
  );
}
