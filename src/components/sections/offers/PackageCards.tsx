"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import ContactModal from "../../ui/ContactModal";
import type { ProjectType } from "../../ui/ContactForm";

const packages: {
  name: string;
  tier: string;
  price: string;
  timeline: string;
  description: string;
  features: string[];
  cta: string;
  type: ProjectType;
  id: string;
}[] = [
  {
    name: "One-Page Website",
    tier: "01 / Launch",
    price: "$399",
    timeline: "3–5 days",
    description:
      "A conversion-focused single page that presents your business professionally and turns visitors into inquiries.",
    features: [
      "Custom design, built to convert",
      "Services, gallery & testimonials",
      "Inquiry form straight to your inbox",
      "Mobile-optimized & SEO-ready",
    ],
    cta: "Start with one page",
    type: "one-page-site",
    id: "offer-one-page",
  },
  {
    name: "CMS Website",
    tier: "02 / Grow",
    price: "$799",
    timeline: "1–2 weeks",
    description:
      "A multi-page website with a content management system. Update pages, photos, and pricing yourself, no developer required.",
    features: [
      "Multi-page site + CMS dashboard",
      "Edit content & photos yourself",
      "Blog and project showcase ready",
      "SEO & analytics foundations",
    ],
    cta: "Build a CMS website",
    type: "cms-site",
    id: "offer-cms",
  },
  {
    name: "Web & Cloud Systems",
    tier: "03 / Scale",
    price: "$1,500+",
    timeline: "2–4 weeks",
    description:
      "Custom platforms with AI automation: intake, quoting, dashboards, and integrations that run your operations end to end.",
    features: [
      "Custom web app or client portal",
      "AI-assisted intake & quoting",
      "Automated workflows & notifications",
      "Cloud dashboards & integrations",
    ],
    cta: "Scope a custom system",
    type: "web-cloud",
    id: "offer-lead-system",
  },
];

export default function PackageCards() {
  const [openType, setOpenType] = useState<ProjectType | null>(null);
  return (
    <section
      id="packages"
      className="pricing-section site-shell"
      aria-label="Service packages"
    >
      <div className="pricing-grid">
        {packages.map((item, index) => (
          <article
            id={item.id}
            key={item.type}
            className={`price-card ${index === 2 ? "is-featured" : ""}`}
          >
            <p className="eyebrow acid-text">{item.tier}</p>
            <h2>{item.name}</h2>
            <div className="price-value">{item.price}</div>
            <span className="eyebrow">Typical timeline / {item.timeline}</span>
            <p>{item.description}</p>
            <ul>
              {item.features.map((feature) => (
                <li key={feature}>
                  <Check size={14} />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpenType(item.type)}
              className={
                index === 2 ? "button-acid" : "btn-industrial-secondary"
              }
            >
              {item.cta}
              <ArrowUpRight size={17} />
            </button>
          </article>
        ))}
      </div>
      <div className="pricing-help">
        <p>
          Not sure which package fits? Send your site or idea. I&apos;ll help
          you find the right scope, with a clear plan before we start.
        </p>
        <a href="#contact" className="text-link">
          Let&apos;s figure it out <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="pricing-proof">
        <a
          href="https://www.revampsolutions.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            Revamp Solutions
            <small>A live website with AI customer support</small>
          </span>
          <ArrowUpRight />
        </a>
        <a
          href="https://bossimating.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            Bossimating
            <small>Contractor quoting, payments, and approvals</small>
          </span>
          <ArrowUpRight />
        </a>
      </div>
      <ContactModal
        isOpen={openType !== null}
        onClose={() => setOpenType(null)}
        projectType={openType ?? ""}
      />
    </section>
  );
}
