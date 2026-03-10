"use client";

import { useEffect } from "react";

export default function ArticleClientScripts() {
    useEffect(() => {
        const figures = document.querySelectorAll("figure[data-rehype-pretty-code-figure]");

        figures.forEach((fig) => {
            // Check if we already enhanced this figure
            if (fig.hasAttribute("data-enhanced")) return;
            fig.setAttribute("data-enhanced", "true");

            const pre = fig.querySelector("pre");
            if (!pre) return;

            const language = pre.getAttribute("data-language") || "CODE";
            const codeEl = pre.querySelector("code");
            const codeText = codeEl?.textContent || "";

            // Create header container
            const header = document.createElement("div");
            header.className = "flex items-center justify-between text-[10px] text-primary bg-black/80 px-4 py-2 border-b border-primary/20 z-10 sticky left-0";

            // Language label
            const langLabel = document.createElement("span");
            langLabel.className = "uppercase tracking-widest font-bold";
            langLabel.textContent = `SYS.LANG // ${language}`;

            // Copy button
            const copyBtn = document.createElement("button");
            copyBtn.className = "hover:text-white transition-colors focus:outline-none flex items-center gap-2 uppercase tracking-widest cursor-pointer";
            copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> COPY_CODE()`;

            copyBtn.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(codeText);
                    copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> COPIED_SUCCESS()`;
                    copyBtn.classList.add("text-green-400");
                    setTimeout(() => {
                        copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> COPY_CODE()`;
                        copyBtn.classList.remove("text-green-400");
                    }, 2000);
                } catch (err) {
                    console.error("Failed to copy text", err);
                }
            });

            header.appendChild(langLabel);
            header.appendChild(copyBtn);

            // style the figure to look like a terminal window
            fig.classList.add("rounded-lg", "border", "border-primary/20", "overflow-hidden", "my-8", "relative", "bg-[#050505]");

            // Adjust PRE so it scrolls, but the figure container is hidden overflow
            pre.classList.add("!m-0", "!p-4");

            fig.insertBefore(header, fig.firstChild);
        });

    }, []);

    return null;
}
