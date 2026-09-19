import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "../ui/Brand";

const steps = [
  {
    name: "Scope",
    description:
      "The right questions first. Goals, audience, and a clear path from idea to outcome.",
  },
  {
    name: "Design",
    description:
      "Structure, identity, and the small interactions that make a product feel considered.",
  },
  {
    name: "Build",
    description:
      "Frontend, backend, and integrations. Built together, tested as one working product.",
  },
  {
    name: "Launch",
    description:
      "Deploy, hand over, and keep improving with feedback from the people using it.",
  },
];

export default function Skills() {
  return (
    <section
      id="about"
      className="about-section site-shell"
      aria-labelledby="about-heading"
    >
      <div className="about-intro">
        <div className="about-label">
          <p className="eyebrow">02 / The person behind the pixels</p>
          <BrandMark className="about-mark" />
        </div>
        <div>
          <h2 id="about-heading">
            Curious by nature.
            <br />
            <span className="muted-text">A builder by choice.</span>
          </h2>
          <p className="about-description">
            I&apos;m YAER, an independent developer in Toronto. I work across
            design, code, and AI to turn complicated ideas into things that feel
            simple to use.
          </p>
          <p className="about-description">
            From tools that help small businesses run better to thoughtful
            learning experiences, my work starts with a real problem and ends
            with a working product.
          </p>
          <Link href="/quote-service" className="text-link">
            How we can work together <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
      <div id="skills" className="process-section">
        <div className="process-heading">
          <p className="eyebrow">A clear process. Room to explore.</p>
          <span className="eyebrow">From first conversation to launch</span>
        </div>
        <div className="process-grid">
          {steps.map((step, index) => (
            <article key={step.name}>
              <span className="process-number">0{index + 1}</span>
              <h3>
                {step.name}
                <ArrowUpRight size={19} />
              </h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
