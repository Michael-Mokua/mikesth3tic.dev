// Simple in-memory rate limiter for API routes
// For production use upstash/ratelimit or similar

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
    windowMs: number; // Time window in ms
    max: number; // Max requests per window
}

export function rateLimit(
    identifier: string,
    options: RateLimitOptions = { windowMs: 60_000, max: 10 }
): { success: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const entry = store.get(identifier);

    if (!entry || now > entry.resetAt) {
        // New window
        const newEntry: RateLimitEntry = {
            count: 1,
            resetAt: now + options.windowMs,
        };
        store.set(identifier, newEntry);
        return { success: true, remaining: options.max - 1, resetAt: newEntry.resetAt };
    }

    if (entry.count >= options.max) {
        return { success: false, remaining: 0, resetAt: entry.resetAt };
    }

    entry.count++;
    store.set(identifier, entry);
    return {
        success: true,
        remaining: options.max - entry.count,
        resetAt: entry.resetAt,
    };
}

export function getClientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return "unknown";
}
