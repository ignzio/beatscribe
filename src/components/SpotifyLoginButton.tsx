"use client";
import { useEffect, useState } from "react";

export default function SpotifyLoginButton() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check for access token in localStorage or cookie
    const token = localStorage.getItem("spotify_access_token");
    if (token) {
      setLoggedIn(true);
      return;
    }
    // Try to read from cookie and sync to localStorage if needed
    const match = document.cookie.match(/(?:^|; )spotify_access_token=([^;]+)/);
    if (match) {
      localStorage.setItem("spotify_access_token", match[1]);
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/spotify/login";
  };

  const handleLogout = () => {
    localStorage.removeItem("spotify_access_token");
    // Remove cookie as well (set to expired)
    document.cookie = "spotify_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedIn(false);
    window.location.reload();
  };

  return (
    <div className="relative self-center just z-50">
      {loggedIn ? (
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold border-2 border-black shadow"
          onClick={handleLogout}
        >
          Logout Spotify
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-green-400 text-black rounded-lg font-semibold border-2 border-black shadow"
          onClick={handleLogin}
        >
          Login with Spotify
        </button>
      )}
    </div>
  );
}
