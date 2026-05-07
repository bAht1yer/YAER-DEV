"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { BriefcaseBusiness, LayoutDashboard, LogIn, MessageSquareText, Network, ShieldCheck, UserRound } from "lucide-react";
import GlitchText from "../ui/GlitchText";
import HeroOverview from "./hero-tabs/HeroOverview";
import HeroCaseFiles from "./hero-tabs/HeroCaseFiles";
import HeroBlueprint from "./hero-tabs/HeroBlueprint";
import HeroStart from "./hero-tabs/HeroStart";

const heroTabs = [
    {
        id: "overview",
        label: "Home",
        detail: "Start here",
        icon: LayoutDashboard,
        active: "bg-[#39FF14]/10 border-[#39FF14]/35 shadow-[0_0_12px_rgba(57,255,20,0.12)]",
        iconActive: "text-[#39FF14]",
        textActive: "text-[#39FF14]",
    },
    {
        id: "casefiles",
        label: "Case Files",
        detail: "Real proof",
        icon: BriefcaseBusiness,
        active: "bg-[#00FBFB]/10 border-[#00FBFB]/35 shadow-[0_0_12px_rgba(0,251,251,0.12)]",
        iconActive: "text-[#00FBFB]",
        textActive: "text-[#00FBFB]",
    },
    {
        id: "blueprint",
        label: "Blueprint",
        detail: "Build logic",
        icon: Network,
        active: "bg-[#ff6b16]/10 border-[#ff6b16]/40 shadow-[0_0_12px_rgba(255,107,22,0.14)]",
        iconActive: "text-[#ff6b16]",
        textActive: "text-[#ff8b3d]",
    },
    {
        id: "start",
        label: "Start",
        detail: "Ways in",
        icon: MessageSquareText,
        active: "bg-white/10 border-white/30",
        iconActive: "text-white",
        textActive: "text-white",
    },
];

export default function Hero() {
    const [activeTab, setActiveTab] = useState("overview");
    const currentTab = heroTabs.find((tab) => tab.id === activeTab) ?? heroTabs[0];
    const { data: session } = useSession();
    const { scrollY } = useScroll();
    
    // Fade out CMS UI as user scrolls down
    const cmsOpacity = useTransform(scrollY, [0, 200], [1, 0]);
    const cmsY = useTransform(scrollY, [0, 200], [0, -50]);
    // The main hero content can scale up slightly as the CMS fades out
    const contentScale = useTransform(scrollY, [0, 200], [0.95, 1.05]);

    return (
        <section id="about" className="relative h-screen w-full overflow-hidden bg-transparent">
            
            {/* CMS Dashboard UI Elements - Fades out on scroll */}
            <motion.div style={{ opacity: cmsOpacity, y: cmsY }} className="fixed inset-0 z-30 pointer-events-none flex">
                
                {/* CMS Sidebar */}
                <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
                    className="w-16 md:w-64 h-full bg-[#0a0a0a]/80 backdrop-blur-xl border-r border-[#39FF14]/20 flex flex-col pointer-events-auto shadow-[5px_0_30px_rgba(57,255,20,0.05)] z-40"
                >
                     <div className="h-16 flex items-center justify-center border-b border-[#39FF14]/20 relative overflow-hidden group">
                         <div className="absolute inset-0 bg-[#39FF14]/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                         <div className="font-space font-bold text-2xl tracking-tighter mix-blend-screen" style={{ textShadow: "0 0 10px rgba(57, 255, 20, 0.4)" }}>
                             <GlitchText text1="YAER" text2="Y43R" className="text-white" />
                         </div>
                     </div>
                     <div className="flex-1 flex flex-col gap-4 p-4 mt-6">
                         <div className="hidden md:flex flex-col gap-2">
                             <div className="text-[10px] text-[#39FF14]/40 font-mono tracking-widest uppercase mb-2">Explore</div>

                             {heroTabs.map((tab) => {
                                 const Icon = tab.icon;
                                 const isActive = activeTab === tab.id;

                                 return (
                                     <button
                                         key={tab.id}
                                         onClick={() => setActiveTab(tab.id)}
                                         className={`w-full min-h-12 rounded-md flex items-center px-4 cursor-pointer transition-colors border text-left ${isActive ? tab.active : 'border-transparent hover:border-[#39FF14]/20 hover:bg-white/5'}`}
                                     >
                                         <Icon className={`w-4 h-4 mr-3 shrink-0 ${isActive ? tab.iconActive : 'text-gray-500'}`} />
                                         <span className="flex min-w-0 flex-col">
                                             <span className={`font-mono text-xs ${isActive ? tab.textActive : 'text-gray-400'}`}>{tab.label}</span>
                                             <span className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-widest text-gray-600">{tab.detail}</span>
                                         </span>
                                     </button>
                                 );
                             })}
                         </div>
                         
                         {/* Mobile icons */}
                         <div className="md:hidden flex flex-col items-center gap-6 mt-4">
                             {heroTabs.map((tab) => {
                                 const Icon = tab.icon;
                                 const isActive = activeTab === tab.id;

                                 return (
                                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} aria-label={tab.label}>
                                         <Icon className={`w-5 h-5 ${isActive ? tab.iconActive : 'text-gray-500'}`} />
                                     </button>
                                 );
                             })}
                         </div>
                     </div>
                     <div className="p-4 border-t border-[#39FF14]/20">
                         <div className="flex items-center gap-3">
                             <ShieldCheck className="w-5 h-5 text-[#00FBFB] md:mr-2" />
                             <div className="hidden md:block">
                                 <div className="text-[10px] text-[#00FBFB] font-mono">REAL WORK</div>
                             </div>
                         </div>
                     </div>
                </motion.div>

                {/* CMS Topbar & Main Body Layout */}
                <div className="flex-1 flex flex-col relative z-30">
                    {/* CMS Topbar */}
                    <motion.div 
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "circOut", delay: 0.4 }}
                        className="h-16 w-full bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#39FF14]/20 flex items-center justify-between px-6 pointer-events-auto shadow-[0_5px_30px_rgba(57,255,20,0.05)]"
                    >
                         <div className="text-[#39FF14]/60 font-mono text-xs sm:text-sm flex items-center">
                             <span className="text-gray-500 mr-2">~ /</span> 
                             <span className="text-[#39FF14]/80 mx-2">root</span> 
                             <span className="text-gray-500 mx-2">/</span>
                             <span className="text-[#00FBFB]/80 mx-2">portfolio</span>
                             <span className="text-gray-500 mx-2">/</span>
                             <span className="text-white">{currentTab.label.toLowerCase().replaceAll(" ", "-")}</span>
                         </div>
                         <div className="flex items-center gap-3">
                              {session ? (
                                  <button
                                      onClick={() => signOut()}
                                      className="inline-flex items-center gap-2 border border-[#39FF14]/25 bg-[#39FF14]/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#39FF14] transition-colors hover:border-[#ff6b16]/50 hover:text-[#ff8b3d]"
                                  >
                                      <UserRound className="h-3.5 w-3.5" />
                                      <span className="hidden md:inline">{session.user?.name ?? "Signed in"}</span>
                                      <span className="text-gray-500">Sign out</span>
                                  </button>
                              ) : (
                                  <Link
                                      href="/login"
                                      className="inline-flex items-center gap-2 border border-[#39FF14]/25 bg-[#39FF14]/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#39FF14] transition-colors hover:border-[#39FF14]/60 hover:bg-[#39FF14]/10"
                                  >
                                      <LogIn className="h-3.5 w-3.5" />
                                      <span className="hidden md:inline">Visitor mode</span>
                                      <span className="text-gray-500">Log in</span>
                                  </Link>
                              )}
                              <div className="w-8 h-8 rounded-full border border-[#39FF14]/40 flex items-center justify-center bg-[#39FF14]/10 shadow-[0_0_10px_rgba(57,255,20,0.2)]">
                                  <span className="w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_8px_#39FF14] animate-pulse"></span>
                              </div>
                         </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Content Overlay - Placed Inside the "Content Area" of the CMS theoretically */}
            {/* md:pl-64 accommodates the sidebar, pt-16 accommodates the topbar */}
            <motion.div style={{ scale: contentScale }} className="relative z-10 w-full h-full overflow-y-auto mix-blend-difference px-4 md:pl-64 pt-16 scrollbar-hide">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div key="overview" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                            <HeroOverview />
                        </motion.div>
                    )}
                    {activeTab === 'casefiles' && (
                        <motion.div key="casefiles" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full">
                            <HeroCaseFiles />
                        </motion.div>
                    )}
                    {activeTab === 'blueprint' && (
                        <motion.div key="blueprint" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full">
                            <HeroBlueprint />
                        </motion.div>
                    )}
                    {activeTab === 'start' && (
                        <motion.div key="start" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full">
                            <HeroStart />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </section>
    );
}
