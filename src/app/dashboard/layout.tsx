import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-black text-gray-300 flex font-mono selection:bg-primary/30 relative">
            <div className="fixed inset-0 bg-[linear-gradient(rgba(0,150,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,150,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] z-0 pointer-events-none" />

            <Sidebar user={session.user} />
            <main className="flex-1 p-8 h-screen overflow-y-auto relative z-10 custom-scrollbar">
                {children}
            </main>
        </div>
    );
}
