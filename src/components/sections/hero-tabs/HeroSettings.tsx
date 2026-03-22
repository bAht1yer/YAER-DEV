"use client";

import { motion } from "framer-motion";
import { Settings, Shield, Zap, Terminal } from "lucide-react";
import { useState } from "react";

export default function HeroSettings() {
    const [toggles, setToggles] = useState({
        strict: true,
        debug: false,
        ai: true,
        animations: true
    });

    const toggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="w-full h-full flex flex-col pt-10 px-4 md:px-10 pb-20 max-w-5xl mx-auto pointer-events-auto">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-gray-800 rounded-lg overflow-hidden flex flex-col shadow-2xl"
            >
                <div className="bg-[#131313] px-6 py-4 flex items-center justify-between border-b border-gray-800">
                    <div className="text-gray-300 font-mono flex items-center gap-2 tracking-widest uppercase">
                        <Settings className="w-4 h-4" />
                        SYSTEM_CONFIG
                    </div>
                </div>
                
                <div className="flex-1 p-6 md:p-10 flex flex-col gap-8 text-left overflow-y-auto">
                    
                    <div className="space-y-6 max-w-2xl">
                        <div className="flex items-center justify-between p-4 border border-white/5 rounded-md bg-white/[0.02] hover:bg-white/5 transition-colors">
                            <div className="flex items-start gap-4">
                                <Shield className="w-5 h-5 text-[#39FF14] mt-1" />
                                <div>
                                    <h3 className="text-gray-200 font-mono text-sm uppercase mb-1">Strict Mode Execution</h3>
                                    <p className="text-gray-500 text-xs font-mono">Enforce strict typing and rigorous security checks across all modules.</p>
                                </div>
                            </div>
                            <button onClick={() => toggle("strict")} className={`w-12 h-6 rounded-full transition-colors relative ${toggles.strict ? 'bg-[#39FF14]/20 border border-[#39FF14]' : 'bg-gray-800 border border-gray-700'}`}>
                                <motion.div 
                                    className={`w-4 h-4 rounded-full absolute top-0.5 ${toggles.strict ? 'bg-[#39FF14]' : 'bg-gray-500'}`}
                                    animate={{ left: toggles.strict ? "26px" : "4px" }}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-white/5 rounded-md bg-white/[0.02] hover:bg-white/5 transition-colors">
                            <div className="flex items-start gap-4">
                                <Terminal className="w-5 h-5 text-[#00FBFB] mt-1" />
                                <div>
                                    <h3 className="text-gray-200 font-mono text-sm uppercase mb-1">Verbose Debug Logs</h3>
                                    <p className="text-gray-500 text-xs font-mono">Stream detailed telemetry and kernel outputs to TTY1 console.</p>
                                </div>
                            </div>
                            <button onClick={() => toggle("debug")} className={`w-12 h-6 rounded-full transition-colors relative ${toggles.debug ? 'bg-[#00FBFB]/20 border border-[#00FBFB]' : 'bg-gray-800 border border-gray-700'}`}>
                                <motion.div 
                                    className={`w-4 h-4 rounded-full absolute top-0.5 ${toggles.debug ? 'bg-[#00FBFB]' : 'bg-gray-500'}`}
                                    animate={{ left: toggles.debug ? "26px" : "4px" }}
                                />
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border border-white/5 rounded-md bg-white/[0.02] hover:bg-white/5 transition-colors">
                            <div className="flex items-start gap-4">
                                <Zap className="w-5 h-5 text-[#FFCFF5] mt-1" />
                                <div>
                                    <h3 className="text-gray-200 font-mono text-sm uppercase mb-1">AI Co-Processor</h3>
                                    <p className="text-gray-500 text-xs font-mono">Enable LLM-assisted code generation and autonomous agents routing.</p>
                                </div>
                            </div>
                            <button onClick={() => toggle("ai")} className={`w-12 h-6 rounded-full transition-colors relative ${toggles.ai ? 'bg-[#FFCFF5]/20 border border-[#FFCFF5]' : 'bg-gray-800 border border-gray-700'}`}>
                                <motion.div 
                                    className={`w-4 h-4 rounded-full absolute top-0.5 ${toggles.ai ? 'bg-[#FFCFF5]' : 'bg-gray-500'}`}
                                    animate={{ left: toggles.ai ? "26px" : "4px" }}
                                />
                            </button>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
