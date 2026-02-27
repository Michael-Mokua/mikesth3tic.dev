import { z } from "zod";

// Contact form
export const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name too long"),
    email: z.string().email("Please enter a valid email address"),
    subject: z
        .string()
        .min(4, "Subject must be at least 4 characters")
        .max(200, "Subject too long"),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(5000, "Message too long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Newsletter signup
export const newsletterSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Blog post (admin)
export const blogPostSchema = z.object({
    title: z.string().min(3).max(200),
    slug: z
        .string()
        .min(3)
        .max(200)
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    excerpt: z.string().min(10).max(500),
    content: z.string().min(50),
    coverImage: z.string().url().optional().or(z.literal("")),
    tags: z.array(z.string()).max(10),
    published: z.boolean(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

// Comment
export const commentSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    body: z.string().min(5).max(2000),
    postSlug: z.string(),
});

export type CommentFormData = z.infer<typeof commentSchema>;

// Chat message
export const chatSchema = z.object({
    message: z.string().min(1).max(1000),
    history: z
        .array(
            z.object({
                role: z.enum(["user", "assistant"]),
                content: z.string(),
            })
        )
        .max(20)
        .optional(),
});

export type ChatFormData = z.infer<typeof chatSchema>;
