import Link from "next/link";

/** Typographic "asap." wordmark linking home. */
export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="ASAP home">
      <span className="brand-name">
        asap<span className="brand-dot">.</span>
      </span>
      <span className="brand-detail">
        APPLIANCE SERVICE
        <br />
        <span>&amp; PLUMBING</span>
      </span>
    </Link>
  );
}
