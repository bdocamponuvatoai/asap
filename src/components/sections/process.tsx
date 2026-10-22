import { Eyebrow } from "@/components/ui/eyebrow";

const STEPS = [
  {
    title: "Tell us what’s happening.",
    text: "An appliance acting up? A plumbing question? Share a few details about your home.",
  },
  {
    title: "Talk through the next step.",
    text: "Call to confirm the service, discuss your situation and find out what information is needed.",
  },
  {
    title: "Make a plan together.",
    text: "Confirm the scope, pricing and appointment timing directly before work is arranged.",
  },
];

/** "Let’s keep it simple." three-step explainer (anchor: #how-it-works). */
export function Process() {
  return (
    <section className="wrap process" id="how-it-works">
      <div className="section-head">
        <div>
          <Eyebrow>FROM “WHAT NOW?” TO “WHAT’S NEXT.”</Eyebrow>
          <h2>Let’s keep it simple.</h2>
        </div>
        <p>
          You don’t need to know the technical terms.
          <br />
          Start with what you’ve noticed.
        </p>
      </div>
      <div className="process-grid">
        {STEPS.map((step, index) => (
          <article key={step.title}>
            <span className="step-number">{`0${index + 1}`}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
