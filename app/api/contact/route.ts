import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const { fullName, email, message } = await req.json();

        if (!fullName || !email || !message) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }
        const gmailUser = process.env.GMAIL_USER;
        const gmailPassword = process.env.GMAIL_APP_PASSWORD;

        if (!gmailUser || !gmailPassword) {
            return NextResponse.json(
                { error: "Email service is not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD." },
                { status: 503 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: gmailUser,
                pass: gmailPassword,
            },
        });

        await transporter.verify();

        // Email to you (the portfolio owner)
        await transporter.sendMail({
            from: `"Portfolio Contact" <${gmailUser}>`,
            to: gmailUser,
            replyTo: email,
            subject: `[Portfolio] New message from ${fullName}`,
            html: `
                <div style="font-family: monospace; background: #000; color: #fff; padding: 32px; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-size: 1.2rem; letter-spacing: 0.1em; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 12px; margin-bottom: 20px;">
                        New Portfolio Contact
                    </h2>
                    <p style="color: #888; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px;">Name</p>
                    <p style="color: #fff; margin-bottom: 16px;">${fullName}</p>
                    <p style="color: #888; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px;">Email</p>
                    <p style="color: #fff; margin-bottom: 16px;"><a href="mailto:${email}" style="color: #fff;">${email}</a></p>
                    <p style="color: #888; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px;">Message</p>
                    <p style="color: #fff; white-space: pre-wrap; border-left: 2px solid #444; padding-left: 12px;">${message}</p>
                    <p style="color: #444; font-size: 0.7rem; margin-top: 32px; border-top: 1px solid #222; padding-top: 12px;">
                        Sent from swadhinraha.dev portfolio contact form
                    </p>
                </div>
            `,
        });

        // Auto-reply to the sender
        await transporter.sendMail({
            from: `"Swadhin" <${gmailUser}>`,
            to: email,
            subject: "Thanks for reaching out!",
            html: `
                <div style="font-family: monospace; background: #000; color: #fff; padding: 32px; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-size: 1.1rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;">
                        Hey ${fullName},
                    </h2>
                    <p style="color: #aaa; line-height: 1.7;">
                        Thanks for reaching out! I've received your message and will get back to you as soon as possible.
                    </p>
                    <p style="color: #aaa; line-height: 1.7; margin-top: 12px;">
                        — Swadhin
                    </p>
                    <p style="color: #444; font-size: 0.7rem; margin-top: 32px; border-top: 1px solid #222; padding-top: 12px;">
                        This is an automated reply. Please do not reply to this email.
                    </p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Contact form error:", err);
        return NextResponse.json(
            { error: "Failed to send message right now. Please try again shortly." },
            { status: 502 }
        );
    }
}
