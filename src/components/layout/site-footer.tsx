import Link from "next/link";

import { footerNav, site } from "@/config/site";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <div>
            <Brand />
            <p>
              A little help.
              <br />A lot more home.
            </p>
          </div>
          {footerNav.map((column) => (
            <div key={column.heading}>
              <h3>{column.heading}</h3>
              {column.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div>
            <h3>Let’s talk about your home</h3>
            <a className="footer-phone" href={site.tel}>
              {site.phone}
            </a>
            <p>
              {site.address.street}
              <br />
              {`${site.address.locality}, ${site.address.region} ${site.address.postalCode}`}
            </p>
            <a className="footer-map" href={site.mapUrl} target="_blank" rel="noopener noreferrer">
              {"View location "}
              <Icon name="diagonal" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ASAP Appliance Service &amp; Plumbing</span>
          <span>SCOTTS VALLEY, CALIFORNIA</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
