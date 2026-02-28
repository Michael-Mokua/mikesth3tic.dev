import { NextResponse } from "next/server";
import { getCombinedPosts } from "@/lib/mdx";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET() {
    try {
        const db = getAdminDb();

        // Combined posts from MDX and Firestore
        const blogPosts = await getCombinedPosts("blog");
        const csPosts = await getCombinedPosts("case-studies");

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

export async function POST(req: Request) {
    try {
        const db = getAdminDb();
        const data = await req.json();

        if (!data.slug || !data.title || !data.content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Save to blog_posts collection
        await db.collection("blog_posts").doc(data.slug).set({
            title: data.title,
            content: data.content,
            excerpt: data.excerpt || "",
            tags: data.tags || [],
            date: new Date().toISOString(),
            published: true,
            createdAt: new Date().toISOString(),
            readingTime: `${Math.ceil(data.content.split(' ').length / 200)} min read`
        });

        return NextResponse.json({ success: true, slug: data.slug });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const db = getAdminDb();
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug");

        if (!slug) {
            return NextResponse.json({ error: "Slug is required" }, { status: 400 });
        }

        // Only allow deleting from Firestore (can't delete MDX files via API easily)
        await db.collection("blog_posts").doc(slug).delete();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
