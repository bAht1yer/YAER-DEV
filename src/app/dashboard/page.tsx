import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
    const session = await auth();

    // Fetch some quick stats
    const postCount = await prisma.post.count();
    const publishedCount = await prisma.post.count({ where: { published: true } });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="border-b border-primary/30 pb-4">
                <h1 className="text-3xl font-bold text-white text-glow-cyan tracking-widest uppercase mb-2">
                    System Overview
                </h1>
                <p className="text-primary/70">Welcome back, {session?.user?.name || "Admin"}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 glass-panel border border-primary/20 hover:border-primary/50 transition-colors">
                    <h3 className="text-sm text-gray-500 mb-2 uppercase tracking-widest">Total Datacubes</h3>
                    <div className="text-4xl text-white font-bold">{postCount}</div>
                </div>
                <div className="p-6 glass-panel border border-primary/20 hover:border-primary/50 transition-colors">
                    <h3 className="text-sm text-gray-500 mb-2 uppercase tracking-widest">Published</h3>
                    <div className="text-4xl text-primary font-bold">{publishedCount}</div>
                </div>
                <div className="p-6 glass-panel border border-primary/20 hover:border-primary/50 transition-colors">
                    <h3 className="text-sm text-gray-500 mb-2 uppercase tracking-widest">System Status</h3>
                    <div className="text-4xl text-green-500 font-bold animate-pulse">ONLINE</div>
                </div>
            </div>

            {/* Terminal log mock */}
            <div className="mt-12 p-4 bg-black/80 border border-white/5 font-mono text-sm h-64 overflow-y-auto shadow-[inset_0_0_20px_rgba(0,0,0,1)] text-primary/50">
                <div className="text-white/50 mb-4">&gt; System logs loaded...</div>
                <div>[{new Date().toISOString()}] Admin session authenticated.</div>
                <div>[{new Date().toISOString()}] Prisma ORM connection established.</div>
                <div>[{new Date().toISOString()}] Awaiting commands...</div>
            </div>
        </div>
    );
}
