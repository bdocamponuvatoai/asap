import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/links";

type PageIntroProps = {
  kicker: string;
  /** Two lines; the second is emphasised. */
  title: readonly [string, string];
  description: string;
  action?: string;
  href?: string;
};

export function PageIntro({
  kicker,
  title,
  description,
  action = "Get help with your home",
  href = "/request/",
}: PageIntroProps) {
  return (
    <section className="wrap page-intro">
      <Eyebrow>{kicker}</Eyebrow>
      <div className="page-intro-grid">
        <div>
          <h1>
            {title[0]}
            <br />
            <em>{title[1]}</em>
          </h1>
          <p>{description}</p>
        </div>
        <ButtonLink href={href}>{action}</ButtonLink>
      </div>
    </section>
  );
}
