import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { getAdminDb } from "@/lib/firebase-admin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const ip = getClientIp(req);
    const { success } = rateLimit(`contact_${ip}`, { windowMs: 60000, max: 3 });

    if (!success) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    try {
        const body = await req.json();
        const validatedData = contactSchema.parse(body);

        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is missing");
            return NextResponse.json({ message: "Success (Dev Mock)" });
        }

        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
            to: process.env.CONTACT_EMAIL_TO || "mikestheticdev@gmail.com",
            subject: `New Contact Form: ${validatedData.subject}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #00d4ff;">New Message from MIKESTH3TIC.DEV</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${validatedData.message}</p>
        </div>
      `,
            replyTo: validatedData.email,
        });

        if (error) throw new Error(error.message);

        // Persist to Firestore for admin dashboard
        try {
            const db = getAdminDb();
            const now = new Date();
            await db.collection("contact_submissions").add({
                name: validatedData.name,
                email: validatedData.email,
                subject: validatedData.subject,
                message: validatedData.message,
                createdAt: now,
                read: false,
            });
            // Log to activity feed
            await db.collection("activity_log").add({
                type: "contact",
                action: "New contact form submission",
                detail: `From ${validatedData.name} — ${validatedData.subject}`,
                timestamp: now,
                color: "text-neon-400",
            });
        } catch (dbErr) {
            // Don't fail the request if Firestore write fails
            console.error("Firestore log error:", dbErr);
        }

        return NextResponse.json({ message: "Email sent successfully", id: data?.id });
    } catch (error: any) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to send message" },
            { status: 500 }
        );
    }
}
