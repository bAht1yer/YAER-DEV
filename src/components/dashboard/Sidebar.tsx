"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FileText, Settings, LogOut, Hexagon, Globe } from "lucide-react";
import type { User } from "next-auth";

export default function Sidebar({ user }: { user?: User }) {
    const pathname = usePathname();

    const navItems = [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Data Cubes", href: "/dashboard/posts", icon: FileText },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
        { label: "View Blog", href: "/blog", icon: Globe },
    ];

    return (
        <aside className="w-64 bg-black/90 border-r border-primary/20 p-6 flex flex-col h-screen glass-panel relative z-20">
            <div className="flex items-center gap-3 mb-12">
                <Hexagon className="w-8 h-8 text-primary" />
                <span className="font-bold tracking-widest text-xl text-primary text-glow-cyan uppercase">
                    SYS.ADMIN
                </span>
            </div>

            <div className="text-xs text-primary/50 mb-6 tracking-widest uppercase pb-2 border-b border-white/10">
                Navigation
            </div>

            <nav className="flex-1 flex flex-col gap-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all text-sm tracking-widest uppercase ${pathname === item.href
                            ? "bg-primary/20 text-white border-l-2 border-primary"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
                <div className="mb-4">
                    <p className="text-xs text-primary/50 uppercase tracking-widest">Active User</p>
                    <p className="text-sm text-gray-300 font-bold">{user?.name || "Unknown"}</p>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors w-full text-sm uppercase tracking-widest"
                >
                    <LogOut className="w-4 h-4" />
                    Terminate_Session
                </button>
            </div>
        </aside>
    );
}
