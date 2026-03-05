import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// NOTE: Replace 're_xxxxxxxxx' with your real Resend API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'bahtiyer@outlook.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `
        <h2>New Message via Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
