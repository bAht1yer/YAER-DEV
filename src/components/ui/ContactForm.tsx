"use client";

import { Send } from "lucide-react";
import { useState } from "react";

interface ContactFormProps {
    onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
                if (onSuccess) {
                    setTimeout(onSuccess, 2000);
                }
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    disabled={status === 'loading'}
                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                    placeholder="Hello, I'd like to talk about..."
                />
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full md:w-auto px-8 py-3 bg-transparent border border-primary text-primary hover:bg-primary hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all duration-300 rounded-lg font-medium flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Send className="w-4 h-4" />
                {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && (
                <p className="text-green-500 text-center text-sm font-medium mt-4">
                    Message sent successfully! I&apos;ll get back to you soon.
                </p>
            )}
            {status === 'error' && (
                <p className="text-red-500 text-center text-sm font-medium mt-4">
                    Something went wrong. Please try again.
                </p>
            )}
        </form>
    );
}
