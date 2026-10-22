type FaqItem = { question: string; answer: string };

export const faq: readonly FaqItem[] = [
  {
    question: "What can I contact ASAP about?",
    answer:
      "Start with an appliance service or plumbing question. Tell us what you have and what you’ve noticed. Confirm the specific work, appliance brand or model, and availability with ASAP before making plans.",
  },
  {
    question: "Can I book an appointment on this website?",
    answer:
      "This preview helps you prepare your service details. It does not send requests or reserve appointments. Call ASAP to discuss the issue and confirm the next step, pricing and timing.",
  },
  {
    question: "What should I have ready when I call?",
    answer:
      "Your location, a short description of the problem, and when it started are a helpful beginning. For an appliance, have the type, brand and model number ready if you can find them safely.",
  },
  {
    question: "Do you serve my neighborhood?",
    answer:
      "ASAP is based in Scotts Valley. Call with your ZIP code and the work you have in mind to confirm whether service is available at your location.",
  },
  {
    question: "Can you give me a price before the work starts?",
    answer:
      "Ask about any diagnostic or visit charges, the proposed work, parts, and how a price will be confirmed. This website does not provide estimates or make pricing promises.",
  },
];
