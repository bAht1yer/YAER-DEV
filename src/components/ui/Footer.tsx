import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "./Brand";

export default function Footer() {
  return (
    <footer className="site-footer site-shell">
      <Link href="/" className="footer-brand" aria-label="YAER home">
        <Wordmark decorative />
      </Link>
      <p className="eyebrow">
        Independent by design. <span>© {new Date().getFullYear()} YAER</span>
      </p>
      <div>
        <Link href="/blog">
          Notes <ArrowUpRight size={14} />
        </Link>
        <Link href="/quote-service">
          Services <ArrowUpRight size={14} />
        </Link>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  );
}
