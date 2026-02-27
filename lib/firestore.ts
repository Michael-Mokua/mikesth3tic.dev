import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    increment,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    Timestamp,
    setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// ── Types ──────────────────────────────────────────────────
export interface BlogPost {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    tags: string[];
    published: boolean;
    publishedAt?: Timestamp | Date;
    updatedAt?: Timestamp | Date;
    readingTime?: number;
    viewCount?: number;
    author?: string;
}

export interface Comment {
    id?: string;
    postSlug: string;
    name: string;
    email: string;
    body: string;
    approved: boolean;
    createdAt?: Timestamp | Date;
}

export interface Subscriber {
    id?: string;
    email: string;
    subscribedAt?: Timestamp | Date;
}

// ── Blog Posts ─────────────────────────────────────────────
export async function getPublishedPosts(limitCount = 10) {
    const q = query(
        collection(db, "posts"),
        where("published", "==", true),
        orderBy("publishedAt", "desc"),
        limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
}

export async function getPostBySlug(slug: string) {
    const q = query(collection(db, "posts"), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() } as BlogPost;
}

export async function createPost(data: Omit<BlogPost, "id">) {
    return addDoc(collection(db, "posts"), {
        ...data,
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        viewCount: 0,
    });
}

export async function updatePost(id: string, data: Partial<BlogPost>) {
    return updateDoc(doc(db, "posts", id), {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

export async function deletePost(id: string) {
    return deleteDoc(doc(db, "posts", id));
}

// ── View Counters ──────────────────────────────────────────
export async function incrementView(slug: string) {
    const ref = doc(db, "views", slug);
    const snap = await getDoc(ref);
    if (snap.exists()) {
        await updateDoc(ref, { count: increment(1) });
    } else {
        await setDoc(ref, { count: 1, slug });
    }
}

export async function getViewCount(slug: string): Promise<number> {
    const ref = doc(db, "views", slug);
    const snap = await getDoc(ref);
    if (!snap.exists()) return 0;
    return snap.data().count as number;
}

export async function getAllViewCounts(): Promise<Record<string, number>> {
    const snap = await getDocs(collection(db, "views"));
    const result: Record<string, number> = {};
    snap.docs.forEach((d) => {
        result[d.id] = d.data().count;
    });
    return result;
}

// ── Comments ───────────────────────────────────────────────
export async function getApprovedComments(postSlug: string) {
    const q = query(
        collection(db, "comments"),
        where("postSlug", "==", postSlug),
        where("approved", "==", true),
        orderBy("createdAt", "asc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Comment));
}

export async function addComment(data: Omit<Comment, "id" | "approved">) {
    return addDoc(collection(db, "comments"), {
        ...data,
        approved: false,
        createdAt: serverTimestamp(),
    });
}

// ── Newsletter Subscribers ─────────────────────────────────
export async function addSubscriber(email: string) {
    const q = query(
        collection(db, "subscribers"),
        where("email", "==", email)
    );
    const snap = await getDocs(q);
    if (!snap.empty) return { alreadySubscribed: true };

    await addDoc(collection(db, "subscribers"), {
        email,
        subscribedAt: serverTimestamp(),
    });
    return { alreadySubscribed: false };
}

export async function getSubscriberCount(): Promise<number> {
    const snap = await getDocs(collection(db, "subscribers"));
    return snap.size;
}
