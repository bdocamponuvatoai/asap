import { topicLabels, type RequestTopic } from "@/content/request";

type RequestValues = {
  service: RequestTopic;
  equipment: string;
  brand: string;
  model: string;
  concern: string;
  zip: string;
  started: string;
};

export type ReviewRow = readonly [label: string, value: string];

/** Rows shown in the review step and written into the notes text. */
export function buildReviewRows(values: RequestValues): ReviewRow[] {
  const rows: ReviewRow[] = [
    ["Topic", topicLabels[values.service]],
    ["Item / concern", values.equipment],
  ];
  if (values.service === "appliance") {
    rows.push(
      ["Brand", values.brand.trim() || "Not provided"],
      ["Model", values.model.trim() || "Not provided"],
    );
  }
  rows.push(
    ["Your notes", values.concern.trim()],
    ["ZIP code", values.zip],
    ["Started", values.started],
  );
  return rows;
}

/** Plain-text notes for the clipboard and the downloaded file. */
export function buildNotesText(rows: readonly ReviewRow[], phone: string): string {
  return (
    "Service enquiry notes — ASAP Appliance Service & Plumbing\n\n" +
    rows.map(([label, value]) => `${label}: ${value}`).join("\n\n") +
    `\n\nCall ${phone} to discuss service availability, pricing and appointment timing. These notes have not been sent. No appointment is booked.`
  );
}
