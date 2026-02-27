import { getNowPlaying, getRecentlyPlayed } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const response = await getNowPlaying();

        if (response.status === 204 || response.status > 400) {
            // No content or error — fallback to recently played
            try {
                const recentResponse = await getRecentlyPlayed();

                if (recentResponse.status === 204 || recentResponse.status > 400) {
                    return NextResponse.json({ isPlaying: false });
                }

                const recent = await recentResponse.json();
                if (!recent.items || recent.items.length === 0) {
                    return NextResponse.json({ isPlaying: false });
                }

                const track = recent.items[0].track;

                return NextResponse.json({
                    isPlaying: false,
                    title: track.name,
                    artist: track.artists.map((_artist: any) => _artist.name).join(", "),
                    album: track.album.name,
                    albumImageUrl: track.album.images[0]?.url,
                    songUrl: track.external_urls.spotify,
                });
            } catch {
                return NextResponse.json({ isPlaying: false });
            }
        }

        const song = await response.json();

        if (!song.item) {
            return NextResponse.json({ isPlaying: false });
        }

        return NextResponse.json({
            album: song.item.album.name,
            albumImageUrl: song.item.album.images[0]?.url,
            artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
            isPlaying: song.is_playing,
            songUrl: song.item.external_urls.spotify,
            title: song.item.name,
        });

    } catch (error) {
        console.error("Spotify API error", error);
        return NextResponse.json({
            isPlaying: false,
            message: "Unable to retrieve Spotify data"
        });
    }
}
