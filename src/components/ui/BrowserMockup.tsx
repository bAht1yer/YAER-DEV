"use client";

interface BrowserMockupProps {
    children: React.ReactNode;
    url?: string;
    className?: string;
}

export default function BrowserMockup({ children, url = "localhost:3000", className = "" }: BrowserMockupProps) {
    return (
        <div className={`w-full rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl ${className}`}>
            {/* Browser Header */}
            <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 relative backdrop-blur-md">
                {/* Traffic Lights */}
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </div>

                {/* URL Bar */}
                <div className="absolute left-1/2 -translate-x-1/2 w-1/2 max-w-sm h-6 bg-black/40 rounded flex items-center justify-center border border-white/5">
                    <span className="text-[10px] text-gray-400 font-mono tracking-wide flex items-center gap-2">
                        <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        {url}
                    </span>
                </div>
            </div>

            {/* Browser Content Area (Scrollable) */}
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden group/browser">
                {/* Scroll Container */}
                <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                    {/* The content will scale to fit width but can scroll vertically */}
                    <div className="w-full min-h-full">
                        {children}
                    </div>
                </div>

                {/* Subtle overlay gradients for depth */}
                <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
