"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Wordmark } from "./Brand";

const links = [
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Notes", href: "/blog" },
  { label: "Services", href: "/quote-service" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    window.addEventListener("keydown", dismiss);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open]);
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="site-shell nav-inner">
        <Link
          href="/"
          className="nav-brand"
          aria-label="YAER home"
          onClick={() => setOpen(false)}
        >
          <Wordmark decorative />
        </Link>
        <span className="nav-location">
          Independent developer <span>/</span> Toronto
        </span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="button-acid nav-cta"
          onClick={() => setOpen(false)}
        >
          Let&apos;s talk <ArrowUpRight size={16} />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav site-shell"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map((link, index) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span className="eyebrow">0{index + 1}</span>
            {link.label}
            <ArrowUpRight size={22} />
          </Link>
        ))}
        <p className="eyebrow">Based in Toronto. Building everywhere.</p>
      </nav>
    </header>
  );
}
