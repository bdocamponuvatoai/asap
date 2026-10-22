import { site } from "@/config/site";
import type { ServiceDetail as ServiceDetailContent } from "@/content/services";
import { Closing } from "@/components/sections/closing";
import { PageIntro } from "@/components/sections/page-intro";
import { Process } from "@/components/sections/process";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { Photo } from "@/components/ui/photo";

/** Body of the /appliances/ and /plumbing/ pages. */
export function ServiceDetail({ detail }: { detail: ServiceDetailContent }) {
  const requestHref = `/request/?service=${detail.topic}`;
  return (
    <>
      <PageIntro
        kicker={detail.kicker}
        title={detail.title}
        description={detail.intro}
        action="Prepare a service enquiry"
        href={requestHref}
      />
      <section className="wrap detail-feature">
        <div className="detail-image">
          <Photo src={detail.image} alt={detail.alt} eager />
        </div>
        <div>
          <Eyebrow>LET’S MAKE THE CONVERSATION USEFUL</Eyebrow>
          <h2>
            {detail.heading[0]}
            <br />
            <em>{detail.heading[1]}</em>
          </h2>
          <p>{detail.copy}</p>
          <TextLink href={site.tel}>{`Call ASAP: ${site.phone}`}</TextLink>
        </div>
      </section>
      <section className="wrap detail-topics">
        <div>
          <Eyebrow>WHAT WOULD YOU LIKE TO DISCUSS?</Eyebrow>
          <h2>
            Find your
            <br />
            <em>starting point.</em>
          </h2>
          <p>
            These are enquiry topics. Specific work and equipment coverage must be confirmed with
            ASAP.
          </p>
        </div>
        <div>
          {detail.topics.map((topic, index) => (
            <article key={topic.title}>
              <span>{`0${index + 1}`}</span>
              <div>
                <h3>{topic.title}</h3>
                <p>{topic.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="prepare-section">
        <div className="wrap prepare-grid">
          <div>
            <Icon name="chat" />
            <h2>
              A little preparation
              <br />
              <em>goes a long way.</em>
            </h2>
            <p>Have these details ready when you call.</p>
          </div>
          <div>
            <ul className="check-list">
              {detail.prepare.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href={requestHref}>Prepare my details</ButtonLink>
          </div>
        </div>
      </section>
      <Process />
      <Closing />
    </>
  );
}
