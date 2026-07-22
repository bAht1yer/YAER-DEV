"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
    Bot,
    Code2,
    Compass,
    Database,
    FileText,
    Mail,
    MonitorSmartphone,
    MousePointerClick,
    PenTool,
    ShieldCheck,
    Sparkles,
    Target,
    Workflow,
    type LucideIcon,
} from "lucide-react";
import Section from "../ui/Section";
import RevealText from "../ui/RevealText";

type ProcessStep = {
    title: string;
    summary: string;
    icon: LucideIcon;
    signals: { icon: LucideIcon; label: string }[];
};

const processSteps: ProcessStep[] = [
    {
        title: "Scope",
        summary: "Goals · audience · conversion path",
        icon: Compass,
        signals: [
            { icon: Target, label: "Goal" },
            { icon: FileText, label: "Content" },
            { icon: MousePointerClick, label: "User path" },
        ],
    },
    {
        title: "Design",
        summary: "Page structure · responsive states · prototype",
        icon: PenTool,
        signals: [
            { icon: MonitorSmartphone, label: "Responsive UI" },
            { icon: MousePointerClick, label: "Interactions" },
            { icon: Sparkles, label: "Motion" },
        ],
    },
    {
        title: "Build",
        summary: "Frontend · integrations · quality checks",
        icon: Code2,
        signals: [
            { icon: Code2, label: "Frontend" },
            { icon: Database, label: "Data" },
            { icon: ShieldCheck, label: "Guardrails" },
        ],
    },
    {
        title: "Launch",
        summary: "Deployment · handoff · measured iteration",
        icon: Workflow,
        signals: [
            { icon: Bot, label: "AI helpers" },
            { icon: Mail, label: "Notifications" },
            { icon: Workflow, label: "Automation" },
        ],
    },
];

function HoverLabel({ children }: { children: string }) {
    return (
        <span className="pointer-events-none absolute left-1/2 top-[calc(100%+0.55rem)] z-30 -translate-x-1/2 whitespace-nowrap border border-[#34E5FF]/28 bg-[#071218]/95 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#D9FBFF] opacity-0 shadow-[0_8px_22px_rgba(0,0,0,0.42)] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            {children}
        </span>
    );
}

function ProcessVisual({ step, index }: { step: ProcessStep; index: number }) {
    const reducedMotion = !!useReducedMotion();
    const MainIcon = step.icon;

    return (
        <div className="relative z-10 flex h-56 flex-col items-center overflow-visible lg:h-64">
            <div className="relative flex h-44 w-full shrink-0 items-center justify-center lg:h-48">
                <motion.div
                    aria-hidden="true"
                    className="absolute h-36 w-36 rounded-full border border-dashed border-[#34E5FF]/30"
                    animate={reducedMotion ? undefined : { rotate: index % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 16 + index * 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    aria-hidden="true"
                    className="absolute h-44 w-44 rounded-full border border-dotted border-[#7AF0FF]/15"
                    animate={reducedMotion ? undefined : { rotate: index % 2 === 0 ? -360 : 360, scale: [0.97, 1.025, 0.97] }}
                    transition={{ duration: 22 + index * 2, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                    role="img"
                    tabIndex={0}
                    aria-label={`${step.title}: ${step.summary}`}
                    className="group relative z-20 flex h-20 w-20 cursor-default items-center justify-center border border-[#7AF0FF]/60 bg-[#0C2028] text-[#A4F7FF] shadow-[0_0_40px_rgba(52,229,255,0.14)] outline-none focus-visible:ring-2 focus-visible:ring-[#7AF0FF]"
                    animate={reducedMotion ? undefined : { y: [0, -5, 0], rotate: [-1.6, 1.6, -1.6] }}
                    whileHover={reducedMotion ? undefined : { scale: 1.08, rotate: 3, boxShadow: "0 0 52px rgba(52,229,255,0.25)" }}
                    whileFocus={reducedMotion ? undefined : { scale: 1.06, rotate: 2 }}
                    transition={{ duration: 3.1 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
                >
                    <MainIcon className="h-9 w-9" strokeWidth={1.4} />
                    <HoverLabel>{step.title}</HoverLabel>
                </motion.div>

                {step.signals.map((signal, signalIndex) => {
                    const SignalIcon = signal.icon;
                    const positions = ["left-[12%] top-[8%]", "right-[12%] top-[12%]", "bottom-[4%] right-[20%]"];
                    return (
                        <motion.div
                            key={signal.label}
                            role="img"
                            tabIndex={0}
                            aria-label={signal.label}
                            className={`group absolute z-20 flex h-10 w-10 cursor-default items-center justify-center rounded-full border border-[#34E5FF]/30 bg-[#0B171D] text-[#7DABB6] outline-none transition-colors hover:border-[#7AF0FF]/75 hover:bg-[#102832] hover:text-[#D9FBFF] focus-visible:ring-2 focus-visible:ring-[#7AF0FF] ${positions[signalIndex]}`}
                            animate={reducedMotion ? undefined : { y: [0, signalIndex % 2 === 0 ? -6 : 6, 0], opacity: [0.62, 1, 0.62] }}
                            whileHover={reducedMotion ? undefined : { scale: 1.18, opacity: 1 }}
                            whileFocus={reducedMotion ? undefined : { scale: 1.14, opacity: 1 }}
                            transition={{ duration: 2.4 + signalIndex * 0.45, delay: index * 0.18, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <SignalIcon className="h-4 w-4" strokeWidth={1.55} />
                            <HoverLabel>{signal.label}</HoverLabel>
                        </motion.div>
                    );
                })}
            </div>

            <div className="relative z-20 mt-2 bg-[#0A1014] px-4 py-1.5 text-center">
                <div className="flex items-center justify-center gap-2.5">
                    <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-[#34E5FF]">
                        0{index + 1}
                    </span>
                    <span className="h-px w-5 bg-[#34E5FF]/45" />
                    <h3 className="text-base font-bold uppercase tracking-[0.08em] text-white">
                        {step.title}
                    </h3>
                </div>
                <p className="mt-1.5 text-[11px] leading-5 text-[#A8BAC3]">{step.summary}</p>
            </div>
        </div>
    );
}

export default function Skills() {
    const processRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: processRef,
        offset: ["start 88%", "end 40%"],
    });
    const connectionProgress = useSpring(scrollYProgress, {
        stiffness: 260,
        damping: 34,
        mass: 0.45,
    });
    const pulseX = useTransform(connectionProgress, [0, 1], ["0%", "100%"]);
    const pulseY = useTransform(connectionProgress, [0, 1], ["0%", "100%"]);

    return (
        <Section id="skills" className="bg-transparent !min-h-0 py-24">
            <div className="mx-auto w-full max-w-7xl">
                <div className="mb-8 lg:mb-5">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-2 flex items-center gap-3"
                    >
                        <motion.span
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="h-px w-10 origin-left bg-[#34E5FF]"
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#34E5FF]">
                            Process
                        </span>
                    </motion.div>
                    <RevealText
                        as="h2"
                        text="Scope. Design. Build. Launch."
                        stagger={0.04}
                        className="text-4xl font-black tracking-tight text-white md:text-5xl"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.18 }}
                        className="mt-3 text-sm text-[#8AA3AD]"
                    >
                        A focused path from brief to production.
                    </motion.p>
                </div>

                <div
                    ref={processRef}
                    id="capabilities"
                    className="relative grid scroll-mt-28 grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-0"
                >
                    <div className="pointer-events-none absolute bottom-24 left-1/2 top-24 z-0 w-px -translate-x-1/2 bg-[#1C3942] lg:hidden">
                        <motion.div
                            className="absolute inset-0 origin-top bg-gradient-to-b from-[#34E5FF] via-[#7AF0FF] to-[#9B7BFF] shadow-[0_0_12px_rgba(52,229,255,0.45)]"
                            style={{ scaleY: connectionProgress }}
                        />
                        <motion.span
                            className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-white shadow-[0_0_16px_rgba(122,240,255,1)]"
                            style={{ top: pulseY }}
                        />
                    </div>

                    <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-24 z-0 hidden h-px -translate-y-1/2 bg-[#1C3942] lg:block">
                        <motion.div
                            className="absolute inset-0 origin-left bg-gradient-to-r from-[#34E5FF] via-[#7AF0FF] to-[#9B7BFF] shadow-[0_0_12px_rgba(52,229,255,0.45)]"
                            style={{ scaleX: connectionProgress }}
                        />
                        <motion.span
                            className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-white shadow-[0_0_16px_rgba(122,240,255,1)]"
                            style={{ left: pulseX }}
                        />
                    </div>

                    {processSteps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-70px" }}
                            transition={{ duration: 0.42, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            <ProcessVisual step={step} index={index} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
