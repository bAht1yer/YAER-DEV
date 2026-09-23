"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const capabilities = [
  {
    category: "Engineering",
    skills: ["Web development", "Full-stack systems", "API integrations", "Cloud deployment"],
  },
  {
    category: "Intelligence",
    skills: ["AI & automation", "AI agents", "Workflow automation", "AI integrations"],
  },
  {
    category: "Experience",
    skills: ["Digital products", "Interface design", "Mobile apps", "SaaS platforms"],
  },
];

export default function CapabilitiesStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!visible || reducedMotion) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      clearInterval(timer);
      if (!document.hidden) {
        timer = setInterval(() => setStep((current) => (current + 1) % 4), 4200);
      }
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [visible, reducedMotion]);

  return (
    <div ref={ref} className="expertise-strip" role="list" aria-label="Core capabilities">
      {capabilities.map(({ category, skills }, index) => (
        <div className="capability-item" role="listitem" key={category}>
          <p className="capability-label eyebrow">
            <span aria-hidden="true">0{index + 1}</span> {category}
          </p>
          <span className="sr-only">{skills.join(", ")}</span>
          <div className="capability-flip" aria-hidden="true">
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={reducedMotion ? skills[0] : skills[step]}
                className="capability-word"
                initial={reducedMotion ? false : { rotateX: -65, y: "35%", opacity: 0 }}
                animate={{ rotateX: 0, y: "0%", opacity: 1 }}
                exit={reducedMotion ? undefined : { rotateX: 65, y: "-35%", opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {reducedMotion ? skills[0] : skills[step]}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="capability-still-detail" aria-hidden="true">
            {skills.slice(1).join(" · ")}
          </p>
        </div>
      ))}
    </div>
  );
}
