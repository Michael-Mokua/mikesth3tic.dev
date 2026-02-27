import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mikesth3tic.dev';
    const lastModified = new Date();

    const routes = [
        '',
        '/about',
        '/projects',
        '/blog',
        '/now',
        '/resume',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // In production, you would fetch all blog slugs and add them here

    return [...routes];
}
