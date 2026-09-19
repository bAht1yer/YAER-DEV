import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="dashboard-layout min-h-screen bg-background text-gray-300 flex font-sans selection:bg-primary/30 relative">
      <Sidebar user={session.user} />
      <main className="flex-1 p-8 h-screen overflow-y-auto relative z-10 custom-scrollbar">
        {children}
      </main>
    </div>
  );
}
