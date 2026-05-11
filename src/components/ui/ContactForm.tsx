"use client";

import { Send } from "lucide-react";
import { useState } from "react";

/**
 * ContactForm — industrial restyle + Project Type dropdown.
 *
 * Project Type lets prospects self-categorize into one of the contractor offer
 * tiers or "AI / SaaS" or "Other". Each offer's CTA preselects its option via
 * the `initialProjectType` prop.
 */

export type ProjectType =
    | ""
    | "quick-fix"
    | "one-page-site"
    | "lead-system"
    | "ai-saas"
    | "other";

export const PROJECT_TYPE_OPTIONS: { value: Exclude<ProjectType, "">; label: string }[] = [
    { value: "quick-fix", label: "Quick Fix ($499)" },
    { value: "one-page-site", label: "One-Page Site ($999)" },
    { value: "lead-system", label: "Lead System ($1,500-$2,000)" },
    { value: "ai-saas", label: "AI / SaaS work" },
    { value: "other", label: "Other" },
];

interface ContactFormProps {
    onSuccess?: () => void;
    initialProjectType?: ProjectType;
}

export default function ContactForm({ onSuccess, initialProjectType = "" }: ContactFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [projectType, setProjectType] = useState<ProjectType>(initialProjectType);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
            projectType: formData.get("projectType") || "",
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
                (e.target as HTMLFormElement).reset();
                setProjectType("");
                if (onSuccess) {
                    setTimeout(onSuccess, 2000);
                }
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    const inputClasses =
        "w-full bg-[#0F1013] border border-[#23262B] px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#E6FF3A] transition-colors disabled:opacity-50";
    const labelClasses =
        "block font-mono text-[10px] uppercase tracking-[0.22em] text-gray-400 mb-2";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
                <label htmlFor="projectType" className={labelClasses}>
                    Project type
                </label>
                <select
                    id="projectType"
                    name="projectType"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as ProjectType)}
                    disabled={status === "loading"}
                    className={inputClasses + " appearance-none cursor-pointer pr-10"}
                    style={{
                        backgroundImage:
                            "linear-gradient(45deg, transparent 50%, #9CA3AF 50%), linear-gradient(135deg, #9CA3AF 50%, transparent 50%)",
                        backgroundPosition: "calc(100% - 18px) 50%, calc(100% - 12px) 50%",
                        backgroundSize: "6px 6px, 6px 6px",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <option value="">-- Select --</option>
                    {PROJECT_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className={labelClasses}>
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={status === "loading"}
                        className={inputClasses}
                        placeholder="Jane Smith"
                    />
                </div>
                <div>
                    <label htmlFor="email" className={labelClasses}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={status === "loading"}
                        className={inputClasses}
                        placeholder="jane@example.com"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="message" className={labelClasses}>
                    What are you building?
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    disabled={status === "loading"}
                    className={inputClasses}
                    placeholder="A rough idea, a messy workflow, or a product you want to improve..."
                />
            </div>

            <button
                type="submit"
                disabled={status === "loading"}
                className="btn-industrial-primary w-full md:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Send className="w-4 h-4" />
                {status === "loading" ? "Sending..." : "Send message"}
            </button>

            {status === "success" && (
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E6FF3A] text-center">
                    Message sent. I&apos;ll be in touch.
                </p>
            )}
            {status === "error" && (
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF5A1F] text-center">
                    Something broke. Please try again.
                </p>
            )}
        </form>
    );
}
