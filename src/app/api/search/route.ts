import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q");
  const type = searchParams.get("type") || "track";
  const limit = searchParams.get("limit") || "12";
  const offset = searchParams.get("offset") || "0";
  const market = searchParams.get("market"); // Optional: support market param
  const include_external = searchParams.get("include_external"); // Optional

  if (!q) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 });
  }

  let accessToken = await getSpotifyToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Failed to get Spotify access token" }, { status: 500 });
  }

  // Build query string according to Spotify API docs
  const params = new URLSearchParams();
  params.set("q", q);
  params.set("type", type);
  params.set("limit", limit);
  params.set("offset", offset);
  if (market) params.set("market", market);
  if (include_external) params.set("include_external", include_external);

  let res = await fetch(
    `https://api.spotify.com/v1/search?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // If unauthorized, try to get a new token and retry once
  if (res.status === 401) {
    accessToken = await getSpotifyToken();
    if (!accessToken) {
      return NextResponse.json({ error: "Failed to refresh Spotify access token" }, { status: 500 });
    }
    res = await fetch(
      `https://api.spotify.com/v1/search?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  if (!res.ok) {
    return NextResponse.json({ error: "Spotify API error" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
