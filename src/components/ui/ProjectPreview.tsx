"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";
import type { ProjectCatalogItem } from "@/data/projectCatalog";

export default function ProjectPreview({
  project,
  index,
}: {
  project: ProjectCatalogItem;
  index: number;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const reset = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    const element = stage.current;
    if (!element) return;
    element.removeAttribute("data-tilting");
    ["--tilt-x", "--tilt-y", "--light-x", "--light-y"].forEach((name) =>
      element.style.removeProperty(name),
    );
  };

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", reset);
    window.addEventListener("blur", reset);
    // A stationary pointer must not leave a tilted card behind while scrolling.
    window.addEventListener("scroll", reset, { passive: true });
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      preference.removeEventListener("change", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", reset);
    };
  }, []);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(1, (event.clientX - bounds.left) / bounds.width),
    );
    const y = Math.max(
      0,
      Math.min(1, (event.clientY - bounds.top) / bounds.height),
    );
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const element = stage.current;
      if (!element) return;
      element.dataset.tilting = "true";
      element.style.setProperty("--tilt-x", `${(0.5 - y) * 10}deg`);
      element.style.setProperty("--tilt-y", `${(x - 0.5) * 12}deg`);
      element.style.setProperty("--light-x", `${x * 100}%`);
      element.style.setProperty("--light-y", `${y * 100}%`);
      frame.current = null;
    });
  };
  const mobileApp = project.id === "digitao";
  return (
    <div className="work-preview">
      <div className="work-preview-label">
        <span className="work-index eyebrow">
          0{index + 1}
          {project.featured ? " / Featured" : ""}
        </span>
        <span className="work-preview-kind eyebrow">
          {mobileApp ? "Mobile experience" : "Web experience"}
        </span>
      </div>
      <div
        ref={stage}
        className={`work-image${mobileApp ? " work-image-mobile-app" : ""}`}
        onPointerMove={move}
        onPointerLeave={reset}
        onPointerCancel={reset}
      >
        <div className="work-image-frame">
          <div className="work-image-surface">
            <Image
              src={mobileApp ? "/projects/digitao/chapters.png" : project.image}
              alt={`${project.title} ${mobileApp ? "chapter library" : "interface"}`}
              fill
              sizes="(max-width: 600px) 100vw, 60vw"
              className="object-cover object-top"
            />
            <span className="work-image-shine" aria-hidden="true" />
          </div>
          {mobileApp && (
            <div className="work-phone">
              <Image
                src={project.image}
                alt="DigiTao mobile home screen"
                fill
                sizes="(max-width: 600px) 35vw, 20vw"
                className="object-cover"
              />
              <span className="work-image-shine" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
