import { NextResponse } from "next/server";

export async function GET() {
    const username = process.env.GITHUB_USERNAME || "Michael-Mokua";
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        console.warn("GITHUB_TOKEN is not configured. Falling back to unauthenticated requests (rate limited).");
    }

    try {
        // Fetch all public repos
        const headers: HeadersInit = {
            Accept: "application/vnd.github.v3+json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
            {
                headers,
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
        );

        if (!response.ok) {
            throw new Error(`GitHub API responded with ${response.status}`);
        }

        const data = await response.json();

        // Map to a cleaner format
        const repos = data
            .filter((repo: any) => !repo.fork) // Filter out forks
            .map((repo: any) => ({
                id: repo.id,
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                homepage: repo.homepage,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language,
                updatedAt: repo.pushed_at,
                topics: repo.topics || [],
            }))
            .sort((a: any, b: any) => b.stars - a.stars); // Default sort by stars

        return NextResponse.json({ repos });
    } catch (error: any) {
        console.error("GitHub Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch repositories", repos: [] }, { status: 500 });
    }
}
