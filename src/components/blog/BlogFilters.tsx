"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function BlogFilters({ categories }: { categories: { id: string, name: string, slug: string }[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // internal states for immediate input update before debounce
    const currentQ = searchParams.get("q") || "";
    const currentCategory = searchParams.get("category") || "all";
    const [searchTerm, setSearchTerm] = useState(currentQ);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [results, setResults] = useState<{ title: string, slug: string, category: { name: string } }[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    // Sync searchTerm with URL changes (e.g. back button or direct link)
    useEffect(() => {
        setSearchTerm(currentQ);
    }, [currentQ]);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            // reset to page 1 on new filter
            params.set("page", "1");
            return params.toString();
        },
        [searchParams]
    );

    // Real-time search effect
    useEffect(() => {
        if (!searchTerm.trim()) {
            setResults([]);
            setIsDropdownOpen(false);
            return;
        }

        const fetchResults = async () => {
            setIsSearching(true);
            try {
                const res = await fetch(`/api/blog/search?q=${encodeURIComponent(searchTerm)}`);
                const data = await res.json();
                setResults(data.posts || []);
                setIsDropdownOpen(true);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setIsSearching(false);
            }
        };

        const id = setTimeout(fetchResults, 300);
        return () => clearTimeout(id);
    }, [searchTerm]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest(".search-container")) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounce URL update (optional if we only want dropdown, but keeping the "full search" on Enter/Debounce)
    useEffect(() => {
        if (searchTerm === currentQ) return;

        const id = setTimeout(() => {
            if (searchTerm) {
                router.replace(`${pathname}?${createQueryString("q", searchTerm)}`, { scroll: false });
            } else {
                const params = new URLSearchParams(searchParams.toString());
                params.delete("q");
                params.set("page", "1");
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            }
        }, 800); // Slower debounce for full page sync to not conflict too much with dropdown

        setTimerId(id);
        return () => clearTimeout(id);
    }, [searchTerm, currentQ, pathname, router, createQueryString, searchParams]);

    const handleCategoryClick = (slug: string) => {
        if (slug === "all") {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("category");
            params.set("page", "1");
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        } else {
            router.replace(`${pathname}?${createQueryString("category", slug)}`, { scroll: false });
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Clear pending debounce to avoid double navigate
        if (timerId) clearTimeout(timerId);

        if (searchTerm) {
            router.replace(`${pathname}?${createQueryString("q", searchTerm)}`);
        } else {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("q");
            params.set("page", "1");
            router.replace(`${pathname}?${params.toString()}`);
        }
        setIsDropdownOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => handleCategoryClick("all")}
                    className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all ${currentCategory === 'all'
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-gray-800 text-gray-500 hover:border-primary/50 hover:text-primary/80"
                        }`}
                >
                    ALL.SYS
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all ${currentCategory === cat.slug
                            ? "border-primary bg-primary/20 text-primary"
                            : "border-gray-800 text-gray-500 hover:border-primary/50 hover:text-primary/80"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="relative w-full md:w-64 search-container">
                <form onSubmit={handleSearchSubmit} className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className={`h-4 w-4 ${isSearching ? "text-primary animate-pulse" : "text-primary/50"}`} />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onFocus={() => searchTerm.trim() && setResults.length > 0 && setIsDropdownOpen(true)}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="QUERY DATABANK..."
                        className="w-full bg-black border border-gray-800 text-primary text-xs tracking-widest uppercase pl-10 pr-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-700"
                    />
                </form>

                {/* Dropdown Results */}
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-primary/30 z-50 shadow-[0_0_20px_rgba(0,255,255,0.1)] rounded overflow-hidden">
                        {results.length > 0 ? (
                            <div className="py-2">
                                <div className="px-4 py-1 text-[10px] text-gray-600 border-b border-white/5 mb-1 tracking-tighter uppercase font-bold">MATCHES_FOUND()</div>
                                {results.map((post) => (
                                    <button
                                        key={post.slug}
                                        onClick={() => {
                                            router.push(`/blog/${post.slug}`);
                                            setIsDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-primary/10 group transition-colors flex flex-col gap-1"
                                    >
                                        <span className="text-xs font-bold text-white group-hover:text-primary transition-colors uppercase truncate">
                                            {post.title}
                                        </span>
                                        <span className="text-[10px] text-primary/50 uppercase tracking-widest">
                                            CAT: {post.category.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ) : searchTerm.trim() && !isSearching ? (
                            <div className="px-4 py-4 text-[10px] text-gray-500 text-center uppercase tracking-widest">
                                NO_RECORDS_MATCHING_CRITERIA
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}
