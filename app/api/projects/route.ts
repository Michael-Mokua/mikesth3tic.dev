import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";

export async function GET() {
    try {
        const studies = getAllPosts("case-studies");
        return NextResponse.json({ studies });
    } catch (error: any) {
        console.error("Projects Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch projects", studies: [] }, { status: 500 });
    }
}
