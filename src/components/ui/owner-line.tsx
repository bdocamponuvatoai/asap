import { site } from "@/config/site";

/** Owner initials badge with name and role. */
export function OwnerLine({ role }: { role: string }) {
  return (
    <div className="owner-line">
      <span className="owner-initials">AN</span>
      <div>
        <strong>{site.owner}</strong>
        <span>{role}</span>
      </div>
    </div>
  );
}
