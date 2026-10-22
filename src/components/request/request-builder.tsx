"use client";

import { Fragment, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";

import { site } from "@/config/site";
import {
  equipmentOptions,
  NOTES_FILENAME,
  serviceOptions,
  STARTED_NOT_SPECIFIED,
  startedOptions,
  type RequestTopic,
} from "@/content/request";
import { buildNotesText, buildReviewRows, type ReviewRow } from "@/lib/request-notes";
import { Icon } from "@/components/ui/icon";
import { TextLink } from "@/components/ui/links";

const STEPS = ["Your topic", "Your details", "Ready to talk"];
const LAST_STEP = STEPS.length - 1;
const EMPTY_TEXT_MESSAGE = "Please add a short description.";

type RequestBuilderProps = {
  /** Topic pre-selected from `?service=`. */
  preset: RequestTopic | null;
};

/**
 * Three-step service-notes builder. Every step stays mounted (toggled with
 * `hidden`) so values survive Back; validation uses the browser's constraint
 * API. Nothing is sent anywhere: notes can only be copied or downloaded.
 */
export function RequestBuilder({ preset }: RequestBuilderProps) {
  const [step, setStep] = useState(0);
  // Topic confirmed by leaving step 1; drives the step 2 fields.
  const [service, setService] = useState<RequestTopic | null>(null);
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [fallbackVisible, setFallbackVisible] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const fallbackRef = useRef<HTMLTextAreaElement>(null);

  // Brand and model only apply to appliances (and are excluded from FormData
  // when disabled). Before a topic is confirmed they are left untouched.
  const applianceFieldsOff = service !== null && service !== "appliance";

  /** The <section> for a step, looked up only from event handlers. */
  const stepElement = (index: number) =>
    formRef.current?.querySelectorAll<HTMLElement>(":scope > .request-step")[index];

  function validateStep(): boolean {
    const fields = stepElement(step)?.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("input,select,textarea");
    for (const field of fields ?? []) {
      if (field.disabled) continue;
      field.setCustomValidity("");
      if (field.required && ["textarea", "text"].includes(field.type) && !field.value.trim()) {
        field.setCustomValidity(EMPTY_TEXT_MESSAGE);
      }
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }
    return true;
  }

  function moveTo(next: number) {
    flushSync(() => setStep(next));
    stepElement(next)?.querySelector("h2")?.focus({ preventScroll: true });
    const reduceMotion = matchMedia("(prefers-reduced-motion:reduce)").matches;
    formRef.current?.scrollIntoView({
      behavior: reduceMotion ? "instant" : "smooth",
      block: "start",
    });
  }

  function onNext() {
    const form = formRef.current;
    if (!form || !validateStep()) return;
    const data = new FormData(form);
    if (step === 0) {
      setService(data.get("service") as RequestTopic);
    }
    if (step === 1) {
      const text = (name: string) => String(data.get(name) ?? "");
      const reviewRows = buildReviewRows({
        service: data.get("service") as RequestTopic,
        equipment: text("equipment"),
        brand: text("brand"),
        model: text("model"),
        concern: text("concern"),
        zip: text("zip"),
        started: text("started"),
      });
      setRows(reviewRows);
      setNotes(buildNotesText(reviewRows, site.phone));
      setStatus("");
      setFallbackVisible(false);
    }
    moveTo(Math.min(step + 1, LAST_STEP));
  }

  function onInput(event: FormEvent<HTMLFormElement>) {
    const target = event.target as Partial<HTMLInputElement>;
    if (typeof target.setCustomValidity === "function") target.setCustomValidity("");
  }

  async function copyNotes() {
    try {
      await navigator.clipboard.writeText(notes);
      setStatus("Notes copied. Keep them handy when you call ASAP.");
    } catch {
      flushSync(() => {
        setFallbackVisible(true);
        setStatus("Select and copy your notes below.");
      });
      fallbackRef.current?.focus();
      fallbackRef.current?.select();
    }
  }

  function downloadNotes() {
    const url = URL.createObjectURL(new Blob([notes], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = NOTES_FILENAME;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Your notes are ready to download. Call ASAP to discuss the next step.");
  }

  const back = () => moveTo(Math.max(step - 1, 0));

  return (
    <div>
      <ol className="request-progress" aria-label="Request progress">
        {STEPS.map((label, index) => (
          <li key={label} aria-current={step === index ? "step" : undefined}>
            <span>{`0${index + 1}`}</span>
            {label}
          </li>
        ))}
      </ol>
      <form
        id="request-form"
        ref={formRef}
        noValidate
        onSubmit={(event) => event.preventDefault()}
        onInput={onInput}
      >
        <section className="request-step" hidden={step !== 0}>
          <p className="eyebrow">STEP 01 / YOUR STARTING POINT</p>
          <h2 tabIndex={-1}>What needs a little help?</h2>
          <p>Choose a topic. It’s okay if you’re not sure yet.</p>
          <fieldset className="service-options">
            <legend className="sr-only">Choose a service topic</legend>
            {serviceOptions.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="service"
                  value={option.value}
                  required
                  defaultChecked={preset === option.value}
                />
                <span>
                  <Icon name={option.icon} />
                  <span>
                    <b>{option.title}</b>
                    <small>{option.hint}</small>
                  </span>
                  <Icon name="arrow" />
                </span>
              </label>
            ))}
          </fieldset>
          <div className="request-actions">
            <small>You can change this later.</small>
            <button className="button" type="button" onClick={onNext}>
              Continue
              <Icon name="arrow" />
            </button>
          </div>
        </section>

        <section className="request-step" hidden={step !== 1}>
          <p className="eyebrow">STEP 02 / THE HELPFUL DETAILS</p>
          <h2 tabIndex={-1}>Tell us a little more.</h2>
          <p>
            Fields marked * are required. Your notes stay here until you choose to copy or download
            them.
          </p>
          <label className="field">
            What is this about? *
            {/* Remounted per topic so the choice resets when the topic changes. */}
            <select key={service ?? "none"} name="equipment" required>
              <option value="">Choose an item or concern</option>
              {(service ? equipmentOptions[service] : []).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <div className="field-grid" hidden={applianceFieldsOff}>
            <label className="field">
              Brand, if known
              <input
                name="brand"
                maxLength={80}
                autoComplete="off"
                placeholder="For example, the brand on your appliance"
                disabled={applianceFieldsOff}
              />
            </label>
            <label className="field">
              Model, if known
              <input
                name="model"
                maxLength={100}
                autoComplete="off"
                placeholder="Optional model number"
                disabled={applianceFieldsOff}
              />
            </label>
          </div>
          <label className="field">
            What have you noticed? *
            <textarea
              name="concern"
              required
              rows={5}
              maxLength={1200}
              placeholder="What’s happening, and when did you first notice it?"
            ></textarea>
          </label>
          <div className="field-grid">
            <label className="field">
              ZIP code *
              <input
                name="zip"
                required
                inputMode="numeric"
                pattern="[0-9]{5}"
                maxLength={5}
                autoComplete="postal-code"
                placeholder="95066"
              />
            </label>
            <label className="field">
              When did it start?
              <select name="started" defaultValue={STARTED_NOT_SPECIFIED}>
                <option value={STARTED_NOT_SPECIFIED}>Select if known</option>
                {startedOptions.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="request-actions">
            <button className="back-button" type="button" onClick={back}>
              ← Back
            </button>
            <button className="button" type="button" onClick={onNext}>
              Review my notes
              <Icon name="arrow" />
            </button>
          </div>
        </section>

        <section className="request-step" hidden={step !== 2}>
          <p className="eyebrow">STEP 03 / READY FOR A CONVERSATION</p>
          <h2 tabIndex={-1}>Your notes. Your next step.</h2>
          <p>Keep these details handy when you call ASAP. No request has been sent.</p>
          <dl id="request-review">
            {rows.map(([label, value]) => (
              <Fragment key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </Fragment>
            ))}
          </dl>
          <div className="review-call">
            <Icon name="phone" />
            <div>
              <small>CALL TO DISCUSS SERVICE &amp; AVAILABILITY</small>
              <a href={site.tel}>
                {site.phone}
                <Icon name="diagonal" />
              </a>
            </div>
          </div>
          <div className="review-tools">
            <button type="button" onClick={copyNotes}>
              <Icon name="copy" />
              Copy notes
            </button>
            <button type="button" onClick={downloadNotes}>
              <Icon name="download" />
              Download notes
            </button>
          </div>
          <p id="copy-status" role="status" aria-live="polite">
            {status}
          </p>
          <textarea
            id="copy-fallback"
            ref={fallbackRef}
            aria-label="Service notes to copy"
            readOnly
            hidden={!fallbackVisible}
            value={fallbackVisible ? notes : ""}
          ></textarea>
          <p className="review-note">
            ASAP will need to confirm your location, service scope, pricing and appointment timing
            directly.
          </p>
          <div className="request-actions">
            <button className="back-button" type="button" onClick={back}>
              ← Edit my details
            </button>
            <TextLink href="/contact/">Contact information</TextLink>
          </div>
        </section>
      </form>
    </div>
  );
}
