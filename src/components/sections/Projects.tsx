"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  BookOpenText,
  Building2,
  ReceiptText,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import {
  PROJECT_CATALOG,
  type ProjectCatalogItem,
  type ProjectId,
} from "@/data/projectCatalog";

const PROJECT_ICONS: Record<ProjectId, LucideIcon> = {
  nuo: Building2,
  bossimating: ReceiptText,
  revamp: Bot,
  digitao: Smartphone,
  wyisdom: BookOpenText,
};
export type Project = ProjectCatalogItem & { icon: LucideIcon };
export const projects: Project[] = PROJECT_CATALOG.map((project) => ({
  ...project,
  icon: PROJECT_ICONS[project.id],
}));

export default function Projects() {
  return (
    <section
      id="projects"
      className="work-section site-shell"
      aria-labelledby="work-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Selected projects</p>
          <h2 id="work-heading">
            Ideas, made real<span className="acid-text">.</span>
          </h2>
        </div>
        <span className="eyebrow section-note">
          A selection of things I&apos;ve built{" "}
          <span className="acid-text">↙</span>
        </span>
      </div>
      <div className="work-grid">
        {PROJECT_CATALOG.map((project, index) => (
          <article
            key={project.id}
            className={`work-card work-card-${project.id} ${index === 0 ? "work-featured" : ""}`}
          >
            <Link
              href={project.links.demo}
              target={project.external ? "_blank" : undefined}
              rel={project.external ? "noopener noreferrer" : undefined}
              className="work-link"
              aria-label={`${project.title} — ${project.external ? "open live project in a new tab" : "view project"}`}
            >
              <div
                className={`work-image ${project.imageFit === "contain" ? "work-image-contained" : ""}`}
              >
                <span className="work-index eyebrow">
                  0{index + 1} {project.featured ? "/ Featured" : ""}
                </span>
                <div className="work-image-frame">
                  <Image
                    src={project.image}
                    alt={`${project.title} interface`}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 700px) 100vw, 64vw"
                        : "(max-width: 700px) 100vw, 48vw"
                    }
                    className={
                      project.imageFit === "contain"
                        ? "object-contain"
                        : "object-cover object-top"
                    }
                  />
                </div>
                <span className="work-open">
                  <ArrowUpRight size={23} />
                </span>
              </div>
              <div className="work-caption">
                <div>
                  <p className="eyebrow">
                    {project.tags.slice(0, 2).join(" / ")}
                  </p>
                  <h3>{project.title}</h3>
                </div>
                <ArrowUpRight
                  className="work-caption-arrow"
                  size={25}
                  strokeWidth={1.3}
                />
              </div>
            </Link>
            <p className="work-description">{project.description}</p>
          </article>
        ))}
      </div>
      <div className="expertise-strip" aria-label="Expertise">
        <span>
          Web development <ArrowUpRight />
        </span>
        <span>
          AI &amp; automation <ArrowUpRight />
        </span>
        <span>
          Digital products <ArrowUpRight />
        </span>
      </div>
    </section>
  );
}
