import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECT_CATALOG, type ProjectId } from "@/data/projectCatalog";

export default function ProjectIntro({
  id,
  liveUrl,
  note,
}: {
  id: ProjectId;
  liveUrl: string;
  note?: string;
}) {
  const project = PROJECT_CATALOG.find((item) => item.id === id)!;
  return (
    <section
      id="main-content"
      className={`project-intro site-shell project-intro-${id}`}
      tabIndex={-1}
    >
      <Link href="/#projects" className="text-link">
        <ArrowLeft size={17} />
        All projects
      </Link>
      <div className="project-intro-grid">
        <div>
          <p className="eyebrow acid-text">{project.eyebrow}</p>
          <h1>{project.title}</h1>
          <p className="project-intro-description">{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button-acid"
          >
            Explore the live app <ArrowUpRight size={18} />
          </a>
          {note && <p className="eyebrow project-platform-note">{note}</p>}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link project-source"
            >
              View source <ArrowUpRight size={16} />
            </a>
          )}
        </div>
        <div className="project-intro-image">
          <Image
            src={project.image}
            alt={`${project.title} application interface`}
            fill
            priority
            sizes="(max-width: 800px) 90vw, 50vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
