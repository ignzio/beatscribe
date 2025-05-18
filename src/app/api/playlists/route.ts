import {  NextResponse } from "next/server";

// Helper to get a fresh Spotify token using client credentials
async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token as string;
}

export async function GET() {
  // Always get a fresh token for each request
  let accessToken = await getSpotifyToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Failed to get Spotify access token" }, { status: 500 });
  }

  let res = await fetch("https://api.spotify.com/v1/browse/categories", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If unauthorized, try to get a new token and retry once
  if (res.status === 401) {
    accessToken = await getSpotifyToken();
    if (!accessToken) {
      return NextResponse.json({ error: "Failed to refresh Spotify access token" }, { status: 500 });
    }
    res = await fetch("https://api.spotify.com/v1/browse/categories", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  console.log("Spotify API response status:", res.status);

  if (!res.ok) {
    return NextResponse.json({ error: "Spotify API error" }, { status: res.status });
  }

  const data = await res.json();
  console.log("Spotify API response data:", data);

  // Each category has: id, name, icons, href, and can be referenced by Spotify URI: spotify:category:{id}
  // Example: spotify:category:party
  // Return id, name, icons, href, and spotify_uri for each category
  type SpotifyCategory = {
    id: string;
    name: string;
    icons: Array<{ url: string; height?: number; width?: number }>;
    href: string;
  };

  return NextResponse.json({
    categories: (data.categories.items || []).map((cat: SpotifyCategory) => ({
      id: cat.id,
      name: cat.name,
      icons: cat.icons,
      href: cat.href,
      spotify_uri: `spotify:category:${cat.id}`,
    })),
  });
}
