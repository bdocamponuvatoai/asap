import { site } from "@/config/site";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/links";

/** Fixed call / help bar shown on phones (≤700 px). */
export function MobileActions() {
  return (
    <div className="mobile-actions">
      <a href={site.tel}>
        <Icon name="phone" />
        Call ASAP
      </a>
      <ButtonLink href="/request/">Get help</ButtonLink>
    </div>
  );
}
