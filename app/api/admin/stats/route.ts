import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { getAllPosts, getAllPostSlugs, getPostMeta } from "@/lib/mdx";

export async function GET() {
    try {
        const db = getAdminDb();

        // 1. Blog posts from MDX file system
        const mdxPosts = getAllPosts("blog");
        const csPosts = getAllPosts("case-studies");
        const totalPosts = mdxPosts.length + csPosts.length;

        // 2. View counts from Firestore
        const viewsSnap = await db.collection("views").get();
        const totalViews = viewsSnap.docs.reduce((sum, d) => sum + (d.data().count ?? 0), 0);

        // 3. Subscriber count
        const subsSnap = await db.collection("subscribers").get();
        const subscriberCount = subsSnap.size;

        // 4. Contact submissions log
        const contactSnap = await db
            .collection("contact_submissions")
            .orderBy("createdAt", "desc")
            .limit(5)
            .get();
        const recentContacts = contactSnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            createdAt: d.data().createdAt?.toDate().toISOString() ?? null,
        }));

        // 5. Recent activity feed from Firestore
        const activitySnap = await db
            .collection("activity_log")
            .orderBy("timestamp", "desc")
            .limit(8)
            .get();
        const recentActivity = activitySnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            timestamp: d.data().timestamp?.toDate().toISOString() ?? null,
        }));

        // 6. Per-page view data for top pages
        const pageViews = viewsSnap.docs.map((d) => ({
            path: d.id,
            views: d.data().count ?? 0,
        })).sort((a, b) => b.views - a.views).slice(0, 8);

        return NextResponse.json({
            stats: {
                totalViews,
                subscriberCount,
                totalPosts,
                contactCount: contactSnap.size,
            },
            recentContacts,
            recentActivity,
            pageViews,
        });
    } catch (error: any) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
