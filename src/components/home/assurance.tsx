import { Icon } from "@/components/ui/icon";

export function Assurance() {
  return (
    <div className="wrap assurance">
      <div>
        <Icon name="pin" />
        <span>
          Based in <strong>Scotts Valley</strong>
        </span>
      </div>
      <div>
        <Icon name="chat" />
        <span>
          A direct conversation. <strong>A clearer next step.</strong>
        </span>
      </div>
      <div>
        <Icon name="washer" />
        <span>
          Appliance service <strong>&amp; plumbing</strong>
        </span>
      </div>
    </div>
  );
}
