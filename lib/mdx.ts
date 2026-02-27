import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
type ContentType = "blog" | "case-studies";

const getContentDir = (type: ContentType) => path.join(process.cwd(), "content", type);

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    excerpt?: string;
    description?: string;
    tags?: string[];
    technologies?: string[];
    coverImage?: string;
    image?: string;
    readingTime: string;
    published?: boolean;
    featured?: boolean;
    github?: string;
}

export interface Post extends PostMeta {
    content: string;
}

export function getAllPostSlugs(type: ContentType = "blog"): string[] {
    const dir = getContentDir(type);
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(type: ContentType = "blog"): PostMeta[] {
    const slugs = getAllPostSlugs(type);
    return slugs
        .map((slug) => getPostMeta(slug, type))
        .filter((post): post is PostMeta => post !== null && post.published !== false)
        .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
}

export function getPostMeta(slug: string, type: ContentType = "blog"): PostMeta | null {
    const filePath = path.join(getContentDir(type), `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        description: data.description || "",
        tags: data.tags || [],
        technologies: data.technologies || [],
        coverImage: data.coverImage || null,
        image: data.image || null,
        readingTime: stats.text,
        published: data.published !== false,
        featured: data.featured || false,
        github: data.github || "",
    };
}

export function getPost(slug: string, type: ContentType = "blog"): Post | null {
    const filePath = path.join(getContentDir(type), `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        coverImage: data.coverImage || null,
        readingTime: stats.text,
        published: data.published !== false,
        content,
    };
}

export function getPostsByTag(tag: string): PostMeta[] {
    return getAllPosts().filter((p) =>
        (p.tags || []).map((t) => t.toLowerCase()).includes(tag.toLowerCase())
    );
}

export function getAllTags(): string[] {
    const posts = getAllPosts();
    const tagSet = new Set<string>();
    posts.forEach((p) => (p.tags || []).forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
}
