import { NextRequest, NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = req.cookies.get("spotify_auth_state")?.value;

  // Get the absolute origin for redirects
  const origin = req.nextUrl.origin;

  if (!state || state !== storedState) {
    return NextResponse.redirect(`${origin}/?error=state_mismatch`);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/?error=missing_code`);
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirect_uri);

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${origin}/?error=token_error`);
  }

  const tokenData = await tokenRes.json();

  // Store tokens in cookies (or session, or redirect with token in URL fragment)
  const response = NextResponse.redirect(origin + "/");
  response.cookies.set("spotify_access_token", tokenData.access_token, { path: "/", httpOnly: false, secure: true });
  if (tokenData.refresh_token) {
    response.cookies.set("spotify_refresh_token", tokenData.refresh_token, { path: "/", httpOnly: true, secure: true });
  }
  return response;
}
