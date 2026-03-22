"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LayoutDashboard, TerminalSquare, Database, Settings, ShieldAlert } from "lucide-react";
import GlitchText from "../ui/GlitchText";
import HeroOverview from "./hero-tabs/HeroOverview";
import HeroConsole from "./hero-tabs/HeroConsole";
import HeroDataLake from "./hero-tabs/HeroDataLake";
import HeroSettings from "./hero-tabs/HeroSettings";

export default function Hero() {
    const [activeTab, setActiveTab] = useState("overview");
    const { scrollY } = useScroll();
    
    // Fade out CMS UI as user scrolls down
    const cmsOpacity = useTransform(scrollY, [0, 200], [1, 0]);
    const cmsY = useTransform(scrollY, [0, 200], [0, -50]);
    // The main hero content can scale up slightly as the CMS fades out
    const contentScale = useTransform(scrollY, [0, 200], [0.95, 1.05]);

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden bg-transparent">
            
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
                             <div className="text-[10px] text-[#39FF14]/40 font-mono tracking-widest uppercase mb-2">Modules</div>
                             
                             <button onClick={() => setActiveTab('overview')} className={`w-full h-10 rounded-full flex items-center px-4 cursor-pointer transition-colors border ${activeTab === 'overview' ? 'bg-[#39FF14]/10 border-[#39FF14]/30 shadow-[0_0_10px_rgba(57,255,20,0.1)]' : 'border-transparent hover:border-[#39FF14]/20 hover:bg-white/5'}`}>
                                 <LayoutDashboard className={`w-4 h-4 mr-3 ${activeTab === 'overview' ? 'text-[#39FF14]' : 'text-gray-500'}`} />
                                 <span className={`font-mono text-xs ${activeTab === 'overview' ? 'text-[#39FF14]' : 'text-gray-400'}`}>Overview</span>
                             </button>

                             <button onClick={() => setActiveTab('console')} className={`w-full h-10 rounded-full flex items-center px-4 cursor-pointer transition-colors border ${activeTab === 'console' ? 'bg-[#00FBFB]/10 border-[#00FBFB]/30 shadow-[0_0_10px_rgba(0,251,251,0.1)]' : 'border-transparent hover:border-[#39FF14]/20 hover:bg-white/5'}`}>
                                 <TerminalSquare className={`w-4 h-4 mr-3 ${activeTab === 'console' ? 'text-[#00FBFB]' : 'text-gray-500'}`} />
                                 <span className={`font-mono text-xs ${activeTab === 'console' ? 'text-[#00FBFB]' : 'text-gray-400'}`}>Console</span>
                             </button>

                             <button onClick={() => setActiveTab('data')} className={`w-full h-10 rounded-full flex items-center px-4 cursor-pointer transition-colors border ${activeTab === 'data' ? 'bg-[#FFCFF5]/10 border-[#FFCFF5]/30 shadow-[0_0_10px_rgba(255,207,245,0.1)]' : 'border-transparent hover:border-[#39FF14]/20 hover:bg-white/5'}`}>
                                 <Database className={`w-4 h-4 mr-3 ${activeTab === 'data' ? 'text-[#FFCFF5]' : 'text-gray-500'}`} />
                                 <span className={`font-mono text-xs ${activeTab === 'data' ? 'text-[#FFCFF5]' : 'text-gray-400'}`}>Data Lake</span>
                             </button>

                             <button onClick={() => setActiveTab('settings')} className={`w-full h-10 rounded-full flex items-center px-4 cursor-pointer transition-colors border ${activeTab === 'settings' ? 'bg-white/10 border-white/30' : 'border-transparent hover:border-[#39FF14]/20 hover:bg-white/5'}`}>
                                 <Settings className={`w-4 h-4 mr-3 ${activeTab === 'settings' ? 'text-white' : 'text-gray-500'}`} />
                                 <span className={`font-mono text-xs ${activeTab === 'settings' ? 'text-white' : 'text-gray-400'}`}>Settings</span>
                             </button>
                         </div>
                         
                         {/* Mobile icons */}
                         <div className="md:hidden flex flex-col items-center gap-6 mt-4">
                             <button onClick={() => setActiveTab('overview')}><LayoutDashboard className={`w-5 h-5 ${activeTab === 'overview' ? 'text-[#39FF14]' : 'text-gray-500'}`} /></button>
                             <button onClick={() => setActiveTab('console')}><TerminalSquare className={`w-5 h-5 ${activeTab === 'console' ? 'text-[#00FBFB]' : 'text-gray-500'}`} /></button>
                             <button onClick={() => setActiveTab('data')}><Database className={`w-5 h-5 ${activeTab === 'data' ? 'text-[#FFCFF5]' : 'text-gray-500'}`} /></button>
                             <button onClick={() => setActiveTab('settings')}><Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-white' : 'text-gray-500'}`} /></button>
                         </div>
                     </div>
                     <div className="p-4 border-t border-[#39FF14]/20">
                         <div className="flex items-center gap-3">
                             <ShieldAlert className="w-5 h-5 text-[#00FBFB] md:mr-2" />
                             <div className="hidden md:block">
                                 <div className="text-[10px] text-[#00FBFB] font-mono">SECURE CONTEXT</div>
                                 <div className="text-[8px] text-gray-500 font-mono tracking-widest">v2.4.9_stable</div>
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
                             <span className="text-[#00FBFB]/80 mx-2">system</span>
                             <span className="text-gray-500 mx-2">/</span>
                             <span className="text-white">{activeTab}</span>
                         </div>
                         <div className="flex items-center gap-4">
                              <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[#39FF14]/60 border border-[#39FF14]/20 px-3 py-1 bg-[#39FF14]/5 rounded-full">
                                  <span>MEM:</span><span className="text-[#39FF14]">{activeTab === 'data' ? '4.8GB' : '1.2GB'}</span>
                              </div>
                              <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[#00FBFB]/60 border border-[#00FBFB]/20 px-3 py-1 bg-[#00FBFB]/5 rounded-full">
                                  <span>LATENCY:</span><span className="text-[#00FBFB]">24MS</span>
                              </div>
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
                    {activeTab === 'console' && (
                        <motion.div key="console" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full">
                            <HeroConsole />
                        </motion.div>
                    )}
                    {activeTab === 'data' && (
                        <motion.div key="data" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full">
                            <HeroDataLake />
                        </motion.div>
                    )}
                    {activeTab === 'settings' && (
                        <motion.div key="settings" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full">
                            <HeroSettings />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </section>
    );
}
