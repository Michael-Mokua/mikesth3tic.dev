import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

// GET all subscribers
export async function GET() {
    try {
        const db = getAdminDb();
        const snap = await db.collection("subscribers").orderBy("subscribedAt", "desc").get();
        const subscribers = snap.docs.map((d) => ({
            id: d.id,
            email: d.data().email,
            subscribedAt: d.data().subscribedAt?.toDate().toISOString() ?? null,
        }));
        return NextResponse.json({ subscribers, total: snap.size });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE a subscriber
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const db = getAdminDb();
        await db.collection("subscribers").doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
