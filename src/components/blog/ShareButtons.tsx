"use client";

import { Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`, "_blank");
    };

    const shareLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank");
    };

    return (
        <div className="flex gap-4 items-center mt-8">
            <span className="text-xs uppercase tracking-widest text-gray-500 hidden sm:inline-block">SHARE_TRANSMISSION:</span>
            <button onClick={shareTwitter} className="p-2 border border-gray-800 text-gray-400 hover:text-primary hover:border-primary/50 transition-colors" title="Share on Twitter/X">
                <Twitter className="w-4 h-4" />
            </button>
            <button onClick={shareLinkedIn} className="p-2 border border-gray-800 text-gray-400 hover:text-primary hover:border-primary/50 transition-colors" title="Share on LinkedIn">
                <Linkedin className="w-4 h-4" />
            </button>
            <button onClick={handleCopy} className="p-2 border border-gray-800 text-gray-400 hover:text-primary hover:border-primary/50 transition-colors relative" title="Copy Link">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
            </button>
        </div>
    );
}
