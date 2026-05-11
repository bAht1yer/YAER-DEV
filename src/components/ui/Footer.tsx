import Image from "next/image";

/**
 * Footer -- minimal industrial. Uses the Y mark next to the domain caption.
 */
export default function Footer() {
    return (
        <footer className="relative border-t border-[#23262B] bg-transparent py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
                <div className="mb-4 flex items-center gap-3">
                    <Image
                        src="/brand/yaer-mark.png"
                        alt="YAER"
                        width={28}
                        height={28}
                        className="h-6 w-6"
                    />
                    <span className="font-mono text-sm uppercase tracking-[0.25em] text-white">
                        yaer<span className="text-gray-500">.dev</span>
                    </span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500">
                    © {new Date().getFullYear()} · All systems operational
                </p>
            </div>
        </footer>
    );
}
