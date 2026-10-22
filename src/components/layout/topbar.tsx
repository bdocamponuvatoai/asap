import { site } from "@/config/site";
import { Icon } from "@/components/ui/icon";

export function Topbar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <span>
          <Icon name="pin" />A little closer to home. <b>Scotts Valley, CA.</b>
        </span>
        <a href={site.tel}>
          {`Let’s talk: ${site.phone}`}
          <Icon name="diagonal" />
        </a>
      </div>
    </div>
  );
}
