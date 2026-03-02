"use client";

import { useState } from "react";
import { ShieldAlert, Save, Loader2, KeyRound } from "lucide-react";

export default function SettingsPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (newPassword !== confirmPassword) {
            setMessage({ type: "error", text: "New passwords do not match." });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ type: "error", text: "New password must be at least 6 characters." });
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/user/password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to update password");
            }

            setMessage({ type: "success", text: "Password successfully updated." });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: unknown) {
            const err = error as Error;
            setMessage({ type: "error", text: err.message || "An unexpected error occurred" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
                    <KeyRound className="w-8 h-8 text-primary" />
                    Security Settings
                </h1>
                <p className="text-gray-400 mt-2 uppercase tracking-wide text-sm">
                    Manage access credentials and security configurations.
                </p>
            </header>

            <div className="glass-panel p-8 border border-white/5 bg-black/50 relative overflow-hidden group">
                {/* Cyberpunk accent lines */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                    <ShieldAlert className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">
                        Update Access Key
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full max-w-md">
                    <div className="space-y-2">
                        <label className="text-xs text-primary uppercase tracking-widest block">
                            Current Access Key
                        </label>
                        <input
                            type="password"
                            required
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono placeholder:text-gray-600"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-primary uppercase tracking-widest block">
                            New Access Key
                        </label>
                        <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono placeholder:text-gray-600"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-primary uppercase tracking-widest block">
                            Verify New Access Key
                        </label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono placeholder:text-gray-600"
                            placeholder="••••••••"
                        />
                    </div>

                    {message.text && (
                        <div
                            className={`p-4 border text-sm font-mono tracking-wide ${message.type === "success"
                                ? "bg-green-500/10 border-green-500/20 text-green-400"
                                : "bg-red-500/10 border-red-500/20 text-red-400"
                                }`}
                        >
                            {message.type === "error" ? "ERROR: " : "SUCCESS: "}
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 py-4 px-6 uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 w-full h-full border-2 border-primary/20 scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all" />
                        {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        {isSubmitting ? "PROCESSING" : "UPDATE CREDENTIALS"}
                    </button>
                </form>
            </div>
        </div>
    );
}
