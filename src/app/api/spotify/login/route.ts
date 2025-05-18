import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!; // e.g. http://localhost:3000/api/spotify/callback

function generateRandomString(length: number) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function GET() {
  const state = generateRandomString(16);
  const scope = [
    "playlist-modify-public",
    "playlist-modify-private",
    "user-read-private",
    "user-read-email"
  ].join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id,
    scope,
    redirect_uri,
    state,
    show_dialog: "true"
  });

  // Optionally, set state in cookie for CSRF protection
  const res = NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  );
  res.cookies.set("spotify_auth_state", state, { path: "/", httpOnly: true, secure: true });
  return res;
}
