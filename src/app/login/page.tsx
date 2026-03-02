"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import ElectricGrid from "@/components/ui/ElectricGrid";
import Link from "next/link";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("INVALID ACCESS KEY");
        } else {
            // Redirect manually or useRouter
            window.location.href = "/dashboard";
        }
    };

    return (
        <main className="min-h-screen bg-black text-white relative flex justify-center items-center font-mono">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <ElectricGrid />
            </div>

            <div className="relative z-10">
                <Link href="/" className="absolute -top-16 left-0 text-gray-400 hover:text-primary transition-colors text-sm">
                    &lt; RETURN_TO_SYSTEM()
                </Link>

                <div className="p-8 glass-panel border border-primary/50 max-w-sm w-full relative group">
                    {/* Cyberpunk Decor */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary" />

                    <h1 className="text-2xl text-primary text-glow-cyan mb-8 text-center uppercase tracking-widest font-bold">
                        SYS.LOGIN()
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <input
                            type="text"
                            placeholder="USERNAME"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-black/50 border border-white/10 px-4 py-3 focus:outline-none focus:border-primary transition-colors uppercase text-sm"
                            required
                        />
                        <input
                            type="password"
                            placeholder="ACCESS KEY"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-black/50 border border-white/10 px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                            required
                        />

                        {error ? (
                            <p className="text-red-500 text-xs tracking-widest text-center animate-pulse">{error}</p>
                        ) : (
                            <p className="text-primary/50 text-xs tracking-widest text-center opacity-0 selection:opacity-100">AWAITING CREDENTIALS</p>
                        )}

                        <button
                            type="submit"
                            className="mt-2 py-3 bg-primary/10 border border-primary text-primary hover:bg-primary/20 hover:shadow-glow font-bold uppercase tracking-widest transition-all text-sm"
                        >
                            AUTHENTICATE
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
