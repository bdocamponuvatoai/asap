import type { Metadata } from "next";

import { ServiceDetail } from "@/components/detail/service-detail";
import { serviceDetailDescription, serviceDetails, serviceSlugs } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

/** Only /appliances/ and /plumbing/ exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((service) => ({ service }));
}

export async function generateMetadata({ params }: PageProps<"/[service]">): Promise<Metadata> {
  const { service } = await params;
  const detail = serviceDetails[service as keyof typeof serviceDetails];
  return pageMetadata({
    title: detail.metaTitle,
    path: `/${detail.slug}/`,
    description: serviceDetailDescription,
  });
}

export default async function ServicePage({ params }: PageProps<"/[service]">) {
  const { service } = await params;
  return <ServiceDetail detail={serviceDetails[service as keyof typeof serviceDetails]} />;
}
