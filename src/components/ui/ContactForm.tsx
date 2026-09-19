"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CircleUserRound,
  Globe2,
  Mail,
  MessageSquareText,
  Send,
  Shapes,
  type LucideIcon,
} from "lucide-react";
import { useId, useState } from "react";

export type ProjectType =
  "" | "one-page-site" | "cms-site" | "web-cloud" | "ai-saas" | "other";

export const PROJECT_TYPE_OPTIONS: {
  value: Exclude<ProjectType, "">;
  label: string;
}[] = [
  { value: "one-page-site", label: "One-Page Website ($399)" },
  { value: "cms-site", label: "CMS Website ($799)" },
  { value: "web-cloud", label: "Web & Cloud Systems ($1,500+)" },
  { value: "ai-saas", label: "AI / SaaS work" },
  { value: "other", label: "Not sure yet / Other" },
];

type ContactValues = {
  projectType: ProjectType;
  businessType: string;
  currentWebsite: string;
  name: string;
  email: string;
  message: string;
};

type FieldKey = keyof ContactValues;

type FormStep = {
  key: FieldKey;
  label: string;
  prompt: string;
  placeholder: string;
  type: "text" | "email" | "url" | "select" | "textarea";
  icon: LucideIcon;
  optional?: boolean;
};

const FORM_STEPS: FormStep[] = [
  {
    key: "projectType",
    label: "Project type",
    prompt: "What are we making better?",
    placeholder: "Choose a starting point",
    type: "select",
    icon: Shapes,
  },
  {
    key: "businessType",
    label: "Business",
    prompt: "What kind of work do you do?",
    placeholder: "Roofing, landscaping, SaaS...",
    type: "text",
    icon: BriefcaseBusiness,
    optional: true,
  },
  {
    key: "currentWebsite",
    label: "Current site",
    prompt: "Is there a site I should see?",
    placeholder: "https://yourbusiness.com",
    type: "url",
    icon: Globe2,
    optional: true,
  },
  {
    key: "name",
    label: "Name",
    prompt: "What should I call you?",
    placeholder: "Jane Smith",
    type: "text",
    icon: CircleUserRound,
  },
  {
    key: "email",
    label: "Email",
    prompt: "Where should I send the next step?",
    placeholder: "jane@example.com",
    type: "email",
    icon: Mail,
  },
  {
    key: "message",
    label: "Project note",
    prompt: "What feels stuck—or what should happen next?",
    placeholder: "The current problem, goal, or workflow in plain English...",
    type: "textarea",
    icon: MessageSquareText,
  },
];

interface ContactFormProps {
  onSuccess?: () => void;
  initialProjectType?: ProjectType;
}

function displayValue(key: FieldKey, value: string) {
  if (!value) return "Skipped";
  if (key === "projectType") {
    return (
      PROJECT_TYPE_OPTIONS.find((option) => option.value === value)?.label ??
      value
    );
  }
  return value;
}

export default function ContactForm({
  onSuccess,
  initialProjectType = "",
}: ContactFormProps) {
  const formId = useId();
  const reducedMotion = !!useReducedMotion();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [currentStep, setCurrentStep] = useState(initialProjectType ? 1 : 0);
  const [values, setValues] = useState<ContactValues>({
    projectType: initialProjectType,
    businessType: "",
    currentWebsite: "",
    name: "",
    email: "",
    message: "",
  });

  const step = FORM_STEPS[currentStep];
  const StepIcon = step.icon;
  const isLastStep = currentStep === FORM_STEPS.length - 1;
  const completedSteps = FORM_STEPS.slice(
    Math.max(0, currentStep - 3),
    currentStep,
  );
  const currentValue = values[step.key];

  const setCurrentValue = (value: string) => {
    setValues((current) => ({ ...current, [step.key]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;
    const activeField = event.currentTarget.elements.namedItem(step.key) as
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;

    if (activeField && !activeField.checkValidity()) {
      activeField.reportValidity();
      return;
    }

    if (!isLastStep) {
      setCurrentStep((current) => current + 1);
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      if (onSuccess) window.setTimeout(onSuccess, 1800);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-72 flex-col items-center justify-center text-center"
        role="status"
      >
        <motion.span
          className="flex h-20 w-20 items-center justify-center rounded-full border border-[#DFFF00]/55 bg-[#DFFF00]/10 text-[#DFFF00]"
          initial={reducedMotion ? undefined : { scale: 0.6, rotate: -18 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
        >
          <Check className="h-9 w-9" />
        </motion.span>
        <h3 className="mt-6 text-2xl font-black text-white">
          Your note is on its way.
        </h3>
        <p className="mt-2 text-sm text-[#A1A39E]">
          I&apos;ll reply with the clearest next step.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="text-left">
      <div
        className="mb-7 flex items-center gap-2"
        aria-label={`Step ${currentStep + 1} of ${FORM_STEPS.length}`}
      >
        {FORM_STEPS.map((formStep, index) => (
          <span
            key={formStep.key}
            className={`h-1 flex-1 transition-colors duration-300 ${
              index <= currentStep ? "bg-[#DFFF00]" : "bg-[#353638]"
            }`}
          />
        ))}
        <span className="ml-2 shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#A1A39E]">
          {currentStep + 1} / {FORM_STEPS.length}
        </span>
      </div>

      <AnimatePresence initial={false} mode="popLayout">
        {completedSteps.length > 0 && (
          <motion.div
            key={`summary-${currentStep}`}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-7 space-y-2"
            aria-label="Completed answers"
          >
            {completedSteps.map((completedStep) => (
              <div
                key={completedStep.key}
                className="flex items-center gap-3 border border-[#353638] bg-[#18191B] px-3 py-2.5"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DFFF00]/10 text-[#DFFF00]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#A1A39E]">
                  {completedStep.label}
                </span>
                <span className="min-w-0 truncate text-xs text-[#C9CBC7]">
                  {displayValue(completedStep.key, values[completedStep.key])}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-52 overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={step.key}
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: 28, filter: "blur(4px)" }
            }
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: -28, filter: "blur(4px)" }
            }
            transition={{
              duration: reducedMotion ? 0.12 : 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pt-1"
          >
            <div className="mb-5 flex items-center gap-4">
              <motion.span
                className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#DFFF00]/45 bg-[#DFFF00]/8 text-[#DFFF00]"
                animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <StepIcon className="h-5 w-5" strokeWidth={1.6} />
              </motion.span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#DFFF00]">
                  {step.label}
                  {step.optional ? " · optional" : ""}
                </p>
                <label
                  htmlFor={`${formId}-${step.key}`}
                  className="mt-1 block text-xl font-bold text-white md:text-2xl"
                >
                  {step.prompt}
                </label>
              </div>
            </div>

            {step.type === "select" ? (
              <select
                id={`${formId}-${step.key}`}
                name={step.key}
                value={currentValue}
                onChange={(event) => setCurrentValue(event.target.value)}
                required
                disabled={status === "loading"}
                className="w-full appearance-none border-0 border-b border-[#66695F] bg-transparent px-0 py-4 text-lg text-white outline-none transition-colors focus:border-[#DFFF00] disabled:opacity-50"
              >
                <option value="" className="bg-[#18191B]">
                  {step.placeholder}
                </option>
                {PROJECT_TYPE_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-[#18191B]"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            ) : step.type === "textarea" ? (
              <textarea
                id={`${formId}-${step.key}`}
                name={step.key}
                value={currentValue}
                onChange={(event) => setCurrentValue(event.target.value)}
                required={!step.optional}
                rows={3}
                disabled={status === "loading"}
                placeholder={step.placeholder}
                className="w-full resize-none border-0 border-b border-[#66695F] bg-transparent px-0 py-4 text-lg leading-7 text-white outline-none transition-colors placeholder:text-[#85877F] focus:border-[#DFFF00] disabled:opacity-50"
              />
            ) : (
              <input
                id={`${formId}-${step.key}`}
                name={step.key}
                type={step.type}
                value={currentValue}
                onChange={(event) => setCurrentValue(event.target.value)}
                required={!step.optional}
                disabled={status === "loading"}
                placeholder={step.placeholder}
                className="w-full border-0 border-b border-[#66695F] bg-transparent px-0 py-4 text-lg text-white outline-none transition-colors placeholder:text-[#85877F] focus:border-[#DFFF00] disabled:opacity-50"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 pt-5">
        <button
          type="button"
          onClick={() => setCurrentStep((current) => Math.max(0, current - 1))}
          disabled={currentStep === 0 || status === "loading"}
          className="inline-flex min-h-11 items-center gap-2 px-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#A1A39E] transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-0"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-industrial-primary min-w-32 justify-center disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLastStep ? (
            <Send className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
          {status === "loading"
            ? "Sending..."
            : isLastStep
              ? "Send note"
              : step.optional && !currentValue
                ? "Skip"
                : "Continue"}
        </button>
      </div>

      {status === "error" && (
        <p
          className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#FF7A8A]"
          role="alert"
        >
          Something broke. Your answers are still here—please try again.
        </p>
      )}
    </form>
  );
}
