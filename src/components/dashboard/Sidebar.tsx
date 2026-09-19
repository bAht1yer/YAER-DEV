"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Globe,
} from "lucide-react";
import { Wordmark } from "@/components/ui/Brand";
import type { User } from "next-auth";

export default function Sidebar({ user }: { user?: User }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Notes", href: "/dashboard/posts", icon: FileText },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
    { label: "View notes", href: "/blog", icon: Globe },
  ];

  return (
    <aside className="dashboard-sidebar w-64 bg-[#18191B] border-r border-primary/20 p-6 flex flex-col h-screen glass-panel relative z-20">
      <div className="flex items-center gap-3 mb-12">
        <Link href="/" aria-label="YAER home">
          <Wordmark className="w-28 text-primary" decorative />
        </Link>
      </div>

      <div className="text-xs text-gray-400 mb-6 tracking-widest uppercase pb-2 border-b border-white/10">
        Navigation
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all text-sm tracking-widest uppercase ${
              pathname === item.href
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
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Active User
          </p>
          <p className="text-sm text-gray-300 font-bold">
            {user?.name || "Unknown"}
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors w-full text-sm uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
