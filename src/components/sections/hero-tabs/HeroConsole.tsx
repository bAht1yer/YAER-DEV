"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroConsole() {
    const [lines, setLines] = useState<string[]>([]);
    
    useEffect(() => {
        const sequence = [
            "Initializing kernel... [OK]",
            "Loading system modules... [OK]",
            "Mounting virtual filesystem... [OK]",
            "Checking security protocols... [SECURE]",
            "Establishing neural link... [CONNECTED]",
            "Fetching user permissions...",
            "Access Granted.",
            "Welcome to YAER_OS v2.4.9"
        ];
        
        const interval = setInterval(() => {
            setLines(prev => {
                if (prev.length < sequence.length) {
                    return [...prev, sequence[prev.length]];
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 300);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col pt-10 px-4 md:px-10 pb-20 max-w-5xl mx-auto pointer-events-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-[600px] bg-[#0e0e0e]/90 backdrop-blur-xl border border-[#39FF14]/30 rounded-lg overflow-hidden flex flex-col shadow-[0_0_30px_rgba(57,255,20,0.05)]"
            >
                {/* Window Header */}
                <div className="bg-[#131313] px-4 py-2 flex items-center justify-between border-b border-[#39FF14]/20">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                        <div className="w-3 h-3 rounded-full bg-[#39FF14]/80 shadow-[0_0_5px_rgba(57,255,20,0.5)]" />
                    </div>
                    <div className="text-[10px] text-[#39FF14]/50 font-mono uppercase tracking-widest">
                        TTY1 - System Console
                    </div>
                </div>
                
                {/* Terminal Body */}
                <div className="flex-1 p-4 md:p-6 font-mono text-sm overflow-y-auto w-full text-left flex flex-col">
                    {lines.map((line, index) => {
                        if (!line) return null;
                        return (
                            <div key={index} className="mb-2">
                                <span className="text-[#39FF14] mr-2">[{new Date().toISOString().split('T')[1].slice(0, 8)}]</span>
                                <span className={line.includes('[OK]') || line.includes('Granted') || line.includes('[SECURE]') || line.includes('[CONNECTED]') ? 'text-[#00FBFB]' : 'text-gray-300'}>
                                    {line}
                                </span>
                            </div>
                        );
                    })}
                    {lines.length === 8 && (
                        <div className="mt-4 flex flex-col gap-2">
                            <div>
                                <span className="text-[#39FF14] mr-2">yaer@sys:~$</span>
                                <span className="text-white">ls -la /skills</span>
                            </div>
                            <div className="text-gray-400 ml-4">
                                drwxr-xr-x 2 yaer admin 4096 Mar 20 06:40 frontend<br/>
                                drwxr-xr-x 2 yaer admin 4096 Mar 20 06:40 backend<br/>
                                drwxr-xr-x 2 yaer admin 4096 Mar 20 06:40 ai_models
                            </div>
                            <div className="mt-4">
                                <span className="text-[#39FF14] mr-2">yaer@sys:~$</span>
                                <span className="animate-pulse shadow-[0_0_5px_#39FF14] bg-[#39FF14] inline-block w-2 h-4 align-middle"></span>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
