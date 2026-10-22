import Link from "next/link";

import { serviceCards } from "@/content/services";
import { Icon } from "@/components/ui/icon";
import { Photo } from "@/components/ui/photo";

export function ServiceCards() {
  return (
    <div className="service-cards">
      {serviceCards.map((card) => (
        <Link key={card.slug} className={`service-card ${card.slug}`} href={`/${card.slug}/`}>
          <div className="service-image">
            <Photo src={card.image} alt={card.alt} />
            <span className="service-badge">
              <Icon name={card.icon} />
              {card.title}
            </span>
            <span className="round-arrow">
              <Icon name="diagonal" />
            </span>
          </div>
          <div className="service-copy">
            <h3>{card.heading}</h3>
            <p>{card.description}</p>
            <span className="service-tags">{card.tags}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
