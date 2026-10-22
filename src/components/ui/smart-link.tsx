import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type SmartLinkProps = ComponentPropsWithoutRef<"a"> & { href: string };

/**
 * Internal paths ("/…") use next/link for client-side navigation. Everything
 * else (tel:, mailto:, in-page "#…" and external URLs) renders a plain <a>.
 */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
