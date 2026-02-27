import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define protected routes
    const isDashboardRoute = path.startsWith('/dashboard');
    const isLoginRoute = path === '/dashboard/login';

    // Get auth token from cookie (Firebase Client SDK sets this if configured, or we set it on login)
    const token = request.cookies.get('admin-token')?.value;

    // If trying to access dashboard without token, redirect to login
    if (isDashboardRoute && !isLoginRoute && !token) {
        return NextResponse.redirect(new URL('/dashboard/login', request.url));
    }

    // If already logged in and trying to access login page, redirect to dashboard
    if (isLoginRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/dashboard/:path*'],
};
