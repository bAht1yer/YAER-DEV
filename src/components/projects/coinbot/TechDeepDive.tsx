"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../ui/Section";

const FILES = [
    {
        name: "RiskManager.ts",
        icon: <ShieldCheckIcon />,
        color: "text-rose-400",
        code: `export class RiskManager {
  // Sophisticated Volatility-Adjusted Risk
  private getDynamicLimit(volatility: number): number {
    return Math.max(0.01, 0.05 / (volatility * 1.5));
  }

  public async validateTrade(setup: TradeSetup): Promise<boolean> {
    const { currentDrawdown, marketVol } = await this.telemetry.getMetrics();
    const dynamicLimit = this.getDynamicLimit(marketVol);
    
    // Hard circuit breaker with exponential backoff on violations
    if (currentDrawdown > dynamicLimit) {
        await this.killSwitch.engage("VOLATILITY_OVERSHOOT_PROTECTION");
        return false;
    }

    // Position sizing based on Kelly Criterion
    setup.size = this.calculateKellySize(setup.winProbability);
    return true;
  }
}`
    },
    {
        name: "ExecutionEngine.ts",
        icon: <TerminalIcon />,
        color: "text-primary",
        code: `export class ExecutionEngine {
  public async executeOrder(order: OrderParams) {
    const context = await this.preFlightCheck(order);
    
    // Atomic execution with slippage protection
    const maxSlippage = context.isHighVolatility ? 0.001 : 0.0005;
    
    try {
      const tx = await this.provider.signAndSend(order, {
        maxSlippage,
        forcePostOnly: true, // Prevent taking liqudity
        retryStrategy: new ExponentialBackoff({ maxRetries: 3 })
      });
      
      await eventBus.publish('ORDER_FILLED', tx.receipt);
    } catch (e) {
      if (e instanceof SlippageError) return this.reRoute(order);
      throw e;
    }
  }
}`
    },
    {
        name: "ScaleWorker.ts",
        icon: <CpuIcon />,
        color: "text-emerald-400",
        code: `// Scalable Event-Driven Orchestrator
export const startOrchestrator = () => {
  const stream = marketData.pipe(
    filter(tick => tick.liquidity > THRESHOLD),
    bufferTime(50), // Batch to prevent event loop starvation
  ).subscribe(async (signals) => {
    for (const signal of signals) {
        // Distributed lock to prevent double-execution
        if (await redis.setnx(\`lock:\${signal.id}\`, '1')) {
            await executionQueue.add(signal, { 
                priority: signal.urgency,
                removeOnComplete: true 
            });
        }
    }
  });
};`
    }
];

export default function TechDeepDive() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Section id="code-deep-dive" className="min-h-0 h-auto py-12">
            <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="w-full"
                >
                    <h2 className="text-3xl font-bold mb-4 text-center"><span className="text-primary">{">_"}</span> Under the Hood</h2>
                    <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
                        A look at the core logic driving the autonomous decision making.
                    </p>

                    {/* Code Window */}
                    <div className="w-full bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl relative">
                        {/* Window Header / Tabs */}
                        <div className="flex items-center bg-[#050505] border-b border-white/5 overflow-x-auto">
                            <div className="flex px-2 space-x-1 py-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <div className="w-[1px] h-6 bg-white/10 mx-2" />

                            {FILES.map((file, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    className={`
                                    flex items-center gap-2 px-4 py-3 text-sm font-mono border-r border-white/5 transition-colors
                                    ${activeTab === i ? 'bg-[#0f0f0f] text-white' : 'text-gray-600 hover:text-gray-400 hover:bg-[#0f0f0f]/50'}
                                `}
                                >
                                    <span className={file.color}>{file.icon}</span>
                                    {file.name}
                                </button>
                            ))}
                        </div>

                        {/* Code Content */}
                        <div className="p-6 md:p-8 font-mono text-sm overflow-x-auto bg-[#050505] min-h-[300px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <pre className="text-gray-300">
                                        <code>{FILES[activeTab].code}</code>
                                    </pre>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Glow behind */}
                        <div className="absolute -inset-10 bg-primary/10 blur-[100px] -z-10" />
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}

// Icons
function ShieldCheckIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg> }
function TerminalIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></svg> }
function CpuIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1V4" /><path d="M15 1V4" /><path d="M9 20V23" /><path d="M15 20V23" /><path d="M20 9H23" /><path d="M20 14H23" /><path d="M1 9H4" /><path d="M1 14H4" /></svg> }
