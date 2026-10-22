"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import { mainNav, site } from "@/config/site";
import { Brand } from "@/components/ui/brand";
import { ButtonLink, TextLink } from "@/components/ui/links";

const DESKTOP_QUERY = "(min-width:701px)";

const normalise = (path: string) => path.replace(/\/+$/, "") || "/";

export function SiteHeader() {
  const pathname = usePathname();
  // The menu counts as open only on the path where it was opened, so any
  // navigation closes it without an effect.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenOnPath(null);
      toggleRef.current?.focus();
    };
    const desktop = matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenOnPath(null);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  // Any link in the mobile menu closes it, including one to the current page.
  const onMenuClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as Element).closest("a")) setOpenOnPath(null);
  };

  const navLinks = mainNav.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={normalise(item.href) === normalise(pathname) ? "page" : undefined}
    >
      {item.label}
    </Link>
  ));

  return (
    <header className="header">
      <div className="wrap nav-row">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks}
        </nav>
        <ButtonLink href="/request/" className="nav-cta">
          Get help
        </ButtonLink>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpenOnPath(open ? null : pathname)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
      <nav id="mobile-nav" aria-label="Mobile navigation" hidden={!open} onClick={onMenuClick}>
        {navLinks}
        <ButtonLink href="/request/">Get help with your home</ButtonLink>
        <TextLink href={site.tel}>{site.phone}</TextLink>
      </nav>
    </header>
  );
}
