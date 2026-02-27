import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET() {
    try {
        const db = getAdminDb();

        // Blog posts from MDX file system (all, including unpublished)
        const blogPosts = getAllPosts("blog");
        const csPosts = getAllPosts("case-studies");

        // Merge with view counts from Firestore
        const viewsSnap = await db.collection("views").get();
        const viewMap: Record<string, number> = {};
        viewsSnap.docs.forEach((d) => { viewMap[d.id] = d.data().count ?? 0; });

        const posts = [...blogPosts, ...csPosts].map((p) => ({
            ...p,
            type: blogPosts.find((b) => b.slug === p.slug) ? "blog" : "case-study",
            views: viewMap[p.slug] ?? 0,
        })).sort((a, b) => b.views - a.views);

        return NextResponse.json({ posts });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
