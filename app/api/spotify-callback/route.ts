import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return new NextResponse("Error: No code provided in URL.", { status: 400 });
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = 'http://127.0.0.1:3000/api/spotify-callback';

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return new NextResponse(`Error from Spotify: ${data.error_description || data.error}`, { status: 400 });
        }

        const refreshToken = data.refresh_token;

        // Return the token to the user visually so they know it succeeded
        return new NextResponse(`
            <html>
                <body style="font-family: monospace; padding: 2rem; background: #000; color: #1ed760;">
                    <h2>Spotify Authentication Successful! 🎵</h2>
                    <p>Your Refresh Token has been generated.</p>
                    <div style="background: #111; padding: 1rem; border-radius: 8px; font-size: 1.2rem; word-break: break-all;">
                        <strong>${refreshToken}</strong>
                    </div>
                    <p style="color: #fff; margin-top: 2rem;">Please copy the giant token above and paste it back into the AI chat so I can add it to your environment variables.</p>
                </body>
            </html>
        `, {
            status: 200,
            headers: { 'Content-Type': 'text/html' }
        });

    } catch (error: any) {
        return new NextResponse(`Server error: ${error.message}`, { status: 500 });
    }
}
