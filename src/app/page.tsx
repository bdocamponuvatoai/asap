import { Assurance } from "@/components/home/assurance";
import { Hero } from "@/components/home/hero";
import { HomeStory } from "@/components/home/home-story";
import { LocalSection } from "@/components/home/local-section";
import { ServicesSection } from "@/components/home/services-section";
import { TopicFinder } from "@/components/home/topic-finder";
import { Closing } from "@/components/sections/closing";
import { Faq } from "@/components/sections/faq";
import { Process } from "@/components/sections/process";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "A little help. A lot more home.",
  path: "/",
  description:
    "Appliance service and plumbing in Scotts Valley. Start a conversation with ASAP about the everyday essentials in your home.",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Assurance />
      <ServicesSection />
      <TopicFinder />
      <HomeStory />
      <Process />
      <LocalSection />
      <Faq />
      <Closing />
    </>
  );
}
