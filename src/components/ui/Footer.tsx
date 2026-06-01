import Image from "next/image";
import Link from "next/link";

/**
 * Footer -- minimal industrial.
 * Brand block is a Link to home with the .dev suffix tinting lime on hover,
 * matching the Navbar logo treatment.
 */
export default function Footer() {
    return (
        <footer className="relative border-t border-[#1C2A30] bg-transparent py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
                <Link
                    href="/"
                    className="group mb-4 inline-flex items-center gap-3"
                    aria-label="yaer.dev home"
                >
                    <Image
                        src="/brand/yaer-mark.png"
                        alt=""
                        width={28}
                        height={28}
                        className="h-6 w-6"
                    />
                    <span className="flex items-baseline gap-0.5 font-mono text-sm uppercase tracking-[0.25em]">
                        <span className="text-white">yaer</span>
                        <span className="text-gray-500 group-hover:text-[#34E5FF] transition-colors">.dev</span>
                    </span>
                </Link>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500">
                    © {new Date().getFullYear()} · All systems operational
                </p>
            </div>
        </footer>
    );
}
