import homeImage from "@/assets/images/home.webp";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon, type IconName } from "@/components/ui/icon";
import { OwnerLine } from "@/components/ui/owner-line";
import { Photo } from "@/components/ui/photo";

const VALUES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "home",
    title: "Your home, in your words.",
    text: "Describe the concern without worrying about technical language. The first step is understanding what brought you here.",
  },
  {
    icon: "chat",
    title: "A conversation before a plan.",
    text: "Discuss the service, equipment and location. Confirm the work, pricing and timing directly with ASAP.",
  },
  {
    icon: "pin",
    title: "A Scotts Valley connection.",
    text: "ASAP is based at 116 Sawyer Circle, Scotts Valley, CA 95066. Call to confirm service at your home.",
  },
];

export function AboutFeature() {
  return (
    <section className="wrap about-feature">
      <div>
        <Photo
          src={homeImage}
          alt="Illustrative light-filled California kitchen with oak and sage details"
          eager
        />
      </div>
      <div>
        <Eyebrow>THE PLACE YOU COME BACK TO</Eyebrow>
        <h2>
          Home has a way
          <br />
          <em>of keeping us busy.</em>
        </h2>
        <p>
          Appliances and plumbing sit quietly behind so much of everyday life. Until something
          changes.
        </p>
        <p>
          ASAP is a local starting point for those conversations. Whether you have a clear question
          or just know something feels different, begin with what you know about your home.
        </p>
        <OwnerLine role="Owner" />
      </div>
    </section>
  );
}

export function AboutValues() {
  return (
    <section className="wrap about-values">
      {VALUES.map((value) => (
        <article key={value.title}>
          <Icon name={value.icon} />
          <h3>{value.title}</h3>
          <p>{value.text}</p>
        </article>
      ))}
    </section>
  );
}
