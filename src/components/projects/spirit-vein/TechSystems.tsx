"use client";

import { motion } from "framer-motion";
import { Code, Eye, Grid } from "lucide-react";

const systems = [
    {
        title: "Hex/Grid Manager",
        icon: Grid,
        desc: "Advanced A* pathfinding algorithm optimized for isometric projection. Handles multi-level terrain and unit occlusion.",
        code: "public class GridManager : Singleton<GridManager> {\n  public Dictionary<Vector3Int, Node> grid;\n  public List<Node> GetPath(Vector3Int start, Vector3Int end) { ... }\n}"
    },
    {
        title: "Dynamic Fog of War",
        icon: Eye,
        desc: "Real-time visibility calculation based on unit sight radius and obstacle transparency. Uses efficient texture masking.",
        code: "void UpdateVisibility() {\n  foreach (var unit in units) {\n    if (unit.IsAlive) ClearFog(unit.Position, unit.SightRange);\n  }\n}"
    },
    {
        title: "Shadow Caster",
        icon: Code,
        desc: "Custom shader graph implementation for 2D dynamic shadows. Creates immersive atmosphere and tactical blind spots.",
        code: "// HLSL Shader Snippet\nfloat2 lightDir = normalize(u_LightPos - i.worldPos);\nfloat shadow = CalculateShadow(i.worldPos, lightDir);"
    }
];

export default function TechSystems() {
    return (
        <section className="py-20 px-6 bg-black/50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase block mb-2">Under the Hood</span>
                    <h2 className="text-4xl font-bold text-white">Engineering The Core</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {systems.map((sys, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden group hover:border-cyan-500/30 transition-colors"
                        >
                            <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-3 mb-4">
                                    <sys.icon className="w-6 h-6 text-purple-400" />
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{sys.title}</h3>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">{sys.desc}</p>
                            </div>
                            <div className="p-4 bg-black">
                                <code className="text-xs font-mono text-gray-500 block whitespace-pre-wrap">
                                    {sys.code}
                                </code>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
