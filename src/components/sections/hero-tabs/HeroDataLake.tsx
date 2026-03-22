"use client";

import { motion } from "framer-motion";
import { Server, Database } from "lucide-react";

export default function HeroDataLake() {
    const nodes = [
        { id: 1, name: "USER_DB_PRIMARY", status: "HEALTHY", traffic: "450 OPS" },
        { id: 2, name: "REDIS_CACHE_L1", status: "WARNING", traffic: "99% CAP" },
        { id: 3, name: "ELASTIC_SEARCH", status: "HEALTHY", traffic: "1.2K QPS" },
        { id: 4, name: "AI_INFERENCE_NODE", status: "SYNCING", traffic: "24 OPS" },
    ];

    return (
        <div className="w-full h-full flex flex-col pt-10 px-4 md:px-10 pb-20 max-w-5xl mx-auto pointer-events-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#00FBFB]/30 rounded-lg overflow-hidden flex flex-col shadow-[0_0_30px_rgba(0,251,251,0.05)]"
            >
                <div className="bg-[#131313] px-6 py-4 flex items-center justify-between border-b border-[#00FBFB]/20">
                    <div className="text-[#00FBFB] font-mono flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        DATA_LAKE_TOPOLOGY
                    </div>
                </div>
                
                <div className="flex-1 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,251,251,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,251,251,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                        {nodes.map((node, i) => (
                            <motion.div 
                                key={node.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="bg-[#131313]/80 border border-white/10 hover:border-[#00FBFB]/50 p-6 rounded-md flex flex-col gap-4 backdrop-blur-md transition-all group"
                            >
                                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <div className="text-gray-300 font-mono text-sm tracking-wider flex items-center gap-2">
                                        <Server className="w-4 h-4 text-[#00FBFB]" />
                                        {node.name}
                                    </div>
                                    <div className={`px-2 py-0.5 text-[10px] uppercase font-mono rounded-full 
                                        ${node.status === 'HEALTHY' ? 'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30' : 
                                          node.status === 'WARNING' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30' : 
                                          'bg-blue-500/10 text-blue-400 border border-blue-500/30'}`}>
                                        {node.status}
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-gray-500 text-xs font-mono uppercase">Current Load</div>
                                    <div className="text-[#00FBFB] font-mono text-xl group-hover:text-white transition-colors">{node.traffic}</div>
                                </div>
                                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                     <motion.div 
                                        className={`h-full ${node.status === 'WARNING' ? 'bg-yellow-500' : 'bg-[#00FBFB]'}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: node.status === 'WARNING' ? '99%' : `${(node.id * 17) % 40 + 20}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                     />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
