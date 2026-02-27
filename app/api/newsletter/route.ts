import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { addSubscriber } from "@/lib/firestore";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
    // Rate limiting: 5 requests per minute per IP
    const ip = getClientIp(req);
    const { success } = rateLimit(`newsletter_${ip}`, { windowMs: 60000, max: 5 });

    if (!success) {
        return NextResponse.json({ error: "Too many attempts. Slow down!" }, { status: 429 });
    }

    try {
        const body = await req.json();

        // Validate with Zod
        const { email } = newsletterSchema.parse(body);

        // Save to Firestore
        const result = await addSubscriber(email);

        if (result.alreadySubscribed) {
            return NextResponse.json({ message: "You are already subscribed!" }, { status: 200 });
        }

        return NextResponse.json({ message: "Subscribed successfully!" });
    } catch (error: any) {
        console.error("Newsletter API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to subscribe" },
            { status: 500 }
        );
    }
}
