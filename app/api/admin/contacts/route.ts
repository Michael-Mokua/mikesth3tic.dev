import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

// GET all contact submissions
export async function GET() {
    try {
        const db = getAdminDb();
        const snap = await db
            .collection("contact_submissions")
            .orderBy("createdAt", "desc")
            .limit(50)
            .get();

        const submissions = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            createdAt: d.data().createdAt?.toDate().toISOString() ?? null,
        }));

        return NextResponse.json({ submissions });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE a contact submission
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const db = getAdminDb();
        await db.collection("contact_submissions").doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
