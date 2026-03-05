import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tighter">
                    <span className="text-primary">&lt;</span> YAER <span className="text-primary">/&gt;</span>
                </h3>
                <div className="flex gap-8 mb-8">
                </div>
                <p className="text-gray-600 text-xs font-mono">
                    © {new Date().getFullYear()} YAER. All systems operational.
                </p>
            </div>
        </footer>
    );
}
