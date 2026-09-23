"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { type PointerEvent } from "react";
import { Wordmark } from "../ui/Brand";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(x, { stiffness: 65, damping: 22 });
  const rotateX = useSpring(y, { stiffness: 65, damping: 22 });
  const move = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
    y.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
  };
  return (
    <section
      id="main-content"
      className="hero site-shell"
      aria-label="YAER, independent developer"
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      tabIndex={-1}
    >
      <div className="hero-wordmark hero-reveal">
        <Wordmark decorative />
      </div>
      <div className="hero-art" aria-hidden="true">
        <motion.div
          className="hero-art-tilt"
          style={reducedMotion ? undefined : { rotateX, rotateY }}
        >
          <div className="hero-art-float">
            <Image
              src="/brand/afterimage-sculpture.webp"
              alt=""
              width={1120}
              height={1400}
              priority
              sizes="(max-width: 600px) 86vw, (max-width: 900px) 64vw, 56vw"
              draggable={false}
            />
          </div>
        </motion.div>
        <div className="hero-art-shadow" />
      </div>
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">
          <span className="accent-line" />
          Code. Craft. Curiosity.
        </p>
        <h1>
          Independent mind.
          <br />
          Useful digital things.
        </h1>
        <p className="hero-description">
          I build websites, digital products,
          <br className="desktop-break" /> and practical AI. Thoughtfully, from
          the ground up.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="button-acid">
            Explore my work <ArrowUpRight size={19} />
          </a>
          <a href="#about" className="text-link">
            Meet YAER <ArrowRight size={17} />
          </a>
        </div>
      </div>
      <div className="hero-baseline">
        <p className="eyebrow">
          Based in Toronto <span className="baseline-slash">/</span> Building
          everywhere
        </p>
        <a href="#projects" className="eyebrow scroll-link">
          Scroll to explore <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}
