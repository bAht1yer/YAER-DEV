export type ProjectId = "nuo" | "bossimating" | "revamp" | "digitao" | "wyisdom";

export type ProjectImageFit = "cover" | "contain";

export type ProjectCatalogItem = {
    id: ProjectId;
    title: string;
    eyebrow: string;
    description: string;
    contractorLine?: string;
    tags: string[];
    links: {
        demo: string;
        github?: string;
    };
    image: string;
    imageFit: ProjectImageFit;
    external?: boolean;
    featured?: boolean;
    metrics?: string[];
};

/**
 * Serializable project content shared by the homepage gallery and interactive
 * hero experiences. UI concerns such as icon components deliberately live in
 * their respective components rather than in this catalog.
 */
export const PROJECT_CATALOG: ProjectCatalogItem[] = [
    {
        id: "nuo",
        title: "Nuo",
        eyebrow: "Personal AI company · always on",
        description:
            "A personal AI company presented like chat. Hire an AI employee with one sentence, give it a one-off or recurring job, then watch it execute, verify, and report back — with budgets and approvals built in.",
        contractorLine:
            "Nuo turns prompts into accountable operators: scheduled, costed, traceable, and ready to ask before a decision becomes an action.",
        tags: ["AI Employees", "Scheduled Loops", "Human Approvals", "Cost Controls"],
        links: { demo: "https://nuo-web-eight.vercel.app" },
        image: "/projects/nuo-live.png",
        imageFit: "cover",
        external: true,
        featured: true,
        metrics: ["Hire in one sentence", "Runs once or on a loop", "Verified work, not prompt spam"],
    },
    {
        id: "bossimating",
        title: "Bossimating",
        eyebrow: "Contractor estimating SaaS",
        description:
            "My contractor platform for the messy middle of getting work priced, approved, paid, and tracked without losing the thread.",
        contractorLine:
            "Built to understand how contractors quote, approve, and get paid -- the same thinking goes into every Lead System engagement.",
        tags: ["SaaS", "AI Helpers", "Payments", "Approvals"],
        links: { demo: "https://bossimating.com/" },
        image: "/projects/bossimating-landing-2026.png",
        imageFit: "cover",
        external: true,
        metrics: ["Estimates in minutes", "Built for small crews", "Real product, live now"],
    },
    {
        id: "revamp",
        title: "Revamp Solutions",
        eyebrow: "Local contractor website example",
        description:
            "A contractor-style site that puts trust, service clarity, contact paths, and a live AI support flow where visitors can actually use them.",
        tags: ["Next.js", "Dify AI", "Customer Support", "Live Site"],
        image: "/projects/revamp-live.png",
        imageFit: "cover",
        links: { demo: "https://www.revampsolutions.ca/" },
        external: true,
    },
    {
        id: "digitao",
        title: "DigiTao",
        eyebrow: "Mobile learning companion · 道",
        description:
            "A calm mobile learning app for reading the Tao Te Ching with character notes, AI interpretation, bilingual recitation, and guided practice.",
        tags: ["Expo", "React Native", "AI Guidance", "Mobile UX"],
        image: "/projects/digitao/home-live.png",
        imageFit: "contain",
        links: { demo: "/projects/digitao", github: "https://github.com/Neilblaze/digitao" },
    },
  {
    id: "wyisdom",
    title: "GuanXiang 觀象",
    eyebrow: "I Ching study platform · 易經",
    description:
      "觀象 / GuanXiang — a bilingual study surface for the I Ching. All 64 hexagrams with classical (王弼 · 程頤 · 朱熹) and modern commentary, a daily-hexagram engine, an interactive year-cycle wheel, and a reflective coin / yarrow cast flow.",
        tags: ["Next.js", "易經 · I Ching", "Bilingual", "Live Web App"],
        image: "/projects/wyisdom/home-live.png",
        imageFit: "contain",
        links: { demo: "/projects/wyisdom" },
    },
];
