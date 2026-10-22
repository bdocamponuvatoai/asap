import { site } from "@/config/site";
import { faq } from "@/content/faq";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { TextLink } from "@/components/ui/links";

export function Faq() {
  return (
    <section className="wrap faq" id="questions">
      <div>
        <Eyebrow>A LITTLE CLARITY GOES A LONG WAY</Eyebrow>
        <h2>
          Good questions.
          <br />
          <em>Clear next steps.</em>
        </h2>
        <TextLink href={site.tel}>Talk to ASAP</TextLink>
      </div>
      <div className="faq-list">
        {faq.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <Icon name="plus" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
