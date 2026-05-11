import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Human-readable labels for project_type values (keep in sync with ContactForm).
const PROJECT_TYPE_LABELS: Record<string, string> = {
    "quick-fix": "Quick Fix ($499)",
    "one-page-site": "One-Page Site ($999)",
    "lead-system": "Lead System ($1,500-$2,000)",
    "ai-saas": "AI / SaaS work",
    "other": "Other",
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, projectType } = body;

        const typeLabel = projectType ? (PROJECT_TYPE_LABELS[projectType] ?? projectType) : null;
        const subjectTag = typeLabel ? ` - ${typeLabel}` : "";

        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "bahtiyer@outlook.com",
            subject: `New Contact Form Submission from ${name}${subjectTag}`,
            html: `
        <h2>New Message via Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${typeLabel ? `<p><strong>Project Type:</strong> ${typeLabel}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
