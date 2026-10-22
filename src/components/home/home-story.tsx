import homeImage from "@/assets/images/home.webp";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/links";
import { OwnerLine } from "@/components/ui/owner-line";
import { Photo } from "@/components/ui/photo";

export function HomeStory() {
  return (
    <section className="wrap home-story">
      <div className="story-image">
        <Photo
          src={homeImage}
          alt="Illustrative sunlit kitchen with soft sage cabinetry and everyday home details"
        />
        <span>MORE ROOM FOR THE EVERYDAY.</span>
      </div>
      <div className="story-copy">
        <Eyebrow>IT’S ABOUT MORE THAN THE APPLIANCE</Eyebrow>
        <h2>
          Back to the things
          <br />
          <em>you’d rather be doing.</em>
        </h2>
        <p>
          The first coffee. Dinner with everyone around the table. Getting the school clothes ready
          for tomorrow.
        </p>
        <p>
          When something at home needs attention, the rest of life keeps moving. ASAP Appliance
          Service &amp; Plumbing gives you a local place to start the conversation.
        </p>
        <OwnerLine role="Owner · ASAP Appliance Service & Plumbing" />
        <TextLink href="/about/">Get to know ASAP</TextLink>
      </div>
    </section>
  );
}
