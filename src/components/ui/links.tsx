import { Icon, type IconName } from "@/components/ui/icon";
import { SmartLink } from "@/components/ui/smart-link";

type ButtonLinkProps = {
  href: string;
  /** Rendered as a single text node, directly followed by the icon. */
  children: string;
  variant?: "white";
  className?: string;
  icon?: IconName;
};

export function ButtonLink({
  href,
  children,
  variant,
  className,
  icon = "arrow",
}: ButtonLinkProps) {
  const classes = ["button", variant, className].filter(Boolean).join(" ");
  return (
    <SmartLink className={classes} href={href}>
      {children}
      <Icon name={icon} />
    </SmartLink>
  );
}

type TextLinkProps = {
  href: string;
  /** Rendered as a single text node, directly followed by the arrow. */
  children: string;
};

export function TextLink({ href, children }: TextLinkProps) {
  return (
    <SmartLink className="text-link" href={href}>
      {children}
      <Icon name="arrow" />
    </SmartLink>
  );
}
