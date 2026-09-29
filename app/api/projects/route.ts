import { NextResponse } from "next/server";
import { getAllProjects, getFeaturedProjects } from "@/lib/projects";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get("featured") === "true";

    const projects = featuredOnly ? getFeaturedProjects() : getAllProjects();
    return NextResponse.json({ projects, count: projects.length });
  } catch (error: any) {
    console.error("Projects Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch projects", projects: [] }, { status: 500 });
  }
}
