"use client";

import Link from "next/link";
import ProjectPreview from "../ui/ProjectPreview";
import CapabilitiesStrip from "../ui/CapabilitiesStrip";
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
              <ProjectPreview project={project} index={index} />
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
      <CapabilitiesStrip />
    </section>
  );
}
