"use client";

import { useSearchParams } from "next/navigation";

import { isRequestTopic } from "@/content/request";
import { RequestBuilder } from "@/components/request/request-builder";

/**
 * Reads `?service=` on the client. Render inside <Suspense> with a preset-less
 * <RequestBuilder /> fallback so the exported HTML still contains the form.
 */
export function PresetRequestBuilder() {
  const value = useSearchParams().get("service");
  const preset = isRequestTopic(value) ? value : null;
  return <RequestBuilder key={preset ?? "none"} preset={preset} />;
}
