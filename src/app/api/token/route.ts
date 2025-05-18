import { NextRequest, NextResponse } from "next/server";

// Module-level cache (resets on server restart/redeploy)
let cachedToken: string | null = null;
let tokenExpiresAt: number | null = null;

async function fetchSpotifyToken() {
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
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000; // buffer 60s
  return cachedToken;
}

export async function GET() {
  if (cachedToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
    return NextResponse.json({ access_token: cachedToken });
  }
  const token = await fetchSpotifyToken();
  if (!token) {
    return NextResponse.json({ error: "Failed to fetch token from Spotify" }, { status: 500 });
  }
  return NextResponse.json({ access_token: token });
}
