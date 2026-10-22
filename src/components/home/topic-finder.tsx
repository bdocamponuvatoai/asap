"use client";

import { useRef, useState, type KeyboardEvent } from "react";

import { finderTopics, type RequestTopic } from "@/content/request";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/links";

const NEXT_KEYS = ["ArrowRight", "ArrowDown"];
const PREVIOUS_KEYS = ["ArrowLeft", "ArrowUp"];

/** Homepage "What’s on your mind?" tabs (WAI-ARIA tabs pattern). */
export function TopicFinder() {
  const [selected, setSelected] = useState<RequestTopic>("appliance");
  // The first title is authored with a line break; once a topic has been
  // chosen, titles render as a single string (as in the original site).
  const [hasInteracted, setHasInteracted] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const topic = finderTopics.find((t) => t.key === selected) ?? finderTopics[0];

  const select = (index: number, focus = false) => {
    setSelected(finderTopics[index].key);
    setHasInteracted(true);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = finderTopics.length;
    let next: number;
    if (NEXT_KEYS.includes(event.key)) next = (index + 1) % count;
    else if (PREVIOUS_KEYS.includes(event.key)) next = (index + count - 1) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    select(next, true);
  };

  return (
    <section className="finder-section">
      <div className="wrap finder">
        <div className="finder-intro">
          <Eyebrow>NOT SURE WHERE TO START?</Eyebrow>
          <h2>
            What’s on
            <br /> <em>your mind?</em>
          </h2>
          <p>
            You bring the question.
            <br />
            We’ll help you prepare the conversation.
          </p>
          <div className="finder-tabs" role="tablist" aria-label="Choose a service topic">
            {finderTopics.map((t, index) => {
              const isSelected = t.key === selected;
              return (
                <button
                  key={t.key}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${t.key}`}
                  aria-selected={isSelected}
                  aria-controls="topic-panel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <Icon name={t.icon} />
                  {t.tab}
                </button>
              );
            })}
          </div>
        </div>
        <div
          className="finder-panel"
          id="topic-panel"
          role="tabpanel"
          aria-labelledby={`tab-${topic.key}`}
        >
          <span className="panel-number" aria-hidden="true">
            {topic.number}
          </span>
          <p className="eyebrow">{topic.label}</p>
          <h3>
            {hasInteracted ? (
              topic.title
            ) : (
              <>
                What isn’t working
                <br />
                the way it used to?
              </>
            )}
          </h3>
          <p>{topic.description}</p>
          <div className="topic-prompts">
            {topic.prompts.map((prompt) => (
              <span key={prompt}>{prompt}</span>
            ))}
          </div>
          <ButtonLink href={`/request/?service=${topic.key}`} variant="white">
            Prepare my details
          </ButtonLink>
          <small>This prepares your enquiry. It isn’t an online diagnosis.</small>
        </div>
      </div>
    </section>
  );
}
