"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogPagination({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="mt-16 flex justify-center items-center gap-4">
            {currentPage > 1 ? (
                <Link
                    href={createPageURL(currentPage - 1)}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary/70 hover:text-primary transition-colors border border-primary/30 px-4 py-2 hover:bg-primary/10"
                >
                    <ChevronLeft className="w-4 h-4" /> PREV
                </Link>
            ) : (
                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-700 border border-gray-800 px-4 py-2 cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" /> PREV
                </span>
            )}

            <div className="text-xs text-primary/70 tracking-widest uppercase">
                PAGE {currentPage} / {totalPages}
            </div>

            {currentPage < totalPages ? (
                <Link
                    href={createPageURL(currentPage + 1)}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary/70 hover:text-primary transition-colors border border-primary/30 px-4 py-2 hover:bg-primary/10"
                >
                    NEXT <ChevronRight className="w-4 h-4" />
                </Link>
            ) : (
                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-700 border border-gray-800 px-4 py-2 cursor-not-allowed">
                    NEXT <ChevronRight className="w-4 h-4" />
                </span>
            )}
        </div>
    );
}
