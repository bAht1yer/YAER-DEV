import { ArrowDownRight } from "lucide-react";
import ContactForm from "../ui/ContactForm";

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section site-shell"
      aria-labelledby="contact-heading"
    >
      <p className="eyebrow">03 / Your next idea starts here</p>
      <h2 id="contact-heading" className="contact-headline">
        Let&apos;s make
        <br />
        it real<span className="acid-text">.</span>
        <ArrowDownRight aria-hidden="true" />
      </h2>
      <div className="contact-grid">
        <div className="contact-intro">
          <p>
            A website. A better workflow.
            <br />
            Something that doesn&apos;t exist yet.
          </p>
          <p className="muted-text">
            Tell me what you have in mind. A rough idea is a perfectly good
            place to start.
          </p>
          <span className="eyebrow">Toronto, Canada / Working everywhere</span>
        </div>
        <div className="contact-form-panel">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
