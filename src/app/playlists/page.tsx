"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Playlist = {
  id: string;
  name: string;
  images?: { url: string }[];
  description?: string;
  external_urls?: { spotify: string };
  tracks?: { total: number };
  owner?: { id: string };
};

export default function MySavedPlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Test case: fetch and display user playlists
  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      setError(null);
      const accessToken = localStorage.getItem("spotify_access_token");
      if (!accessToken) {
        setError("Please log in with Spotify.");
        setLoading(false);
        return;
      }
      try {
        // Get current user id
        const userRes = await fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!userRes.ok) {
          const errorText = await userRes.text();
          console.error("Spotify /me error:", userRes.status, errorText);
          throw new Error("Failed to get user info: " + errorText);
        }
        const user = await userRes.json();
        const userId = user.id;

        let all: Playlist[] = [];
        let url = "https://api.spotify.com/v1/me/playlists?limit=50";
        while (url) {
          const res = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (!res.ok) throw new Error("Failed to fetch playlists");
          const data = await res.json();
          all = all.concat(data.items);
          url = data.next;
        }
        // Only playlists owned by the current user
        const userPlaylists = all.filter(
          pl => pl.owner && pl.owner.id === userId
        );
        // Print playlists to console for debugging
        console.log("All playlists:", all);
        console.log("User playlists:", userPlaylists);

        // Test: check if playlists array is not empty and contains expected fields
        if (userPlaylists.length === 0) {
          console.warn("Test: No user playlists found.");
        } else {
          const first = userPlaylists[0];
          if (!first.id || !first.name) {
            console.error("Test: Playlist missing id or name field.", first);
          } else {
            console.log("Test: Playlist fields OK.", first);
          }
        }

        setPlaylists(userPlaylists);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to load playlists");
          console.error("Test: Error fetching playlists", err);
        } else {
          setError("Failed to load playlists");
          console.error("Test: Error fetching playlists", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#f6f6f6] py-10 px-2">
      <h1 className="text-2xl font-bold mb-6 text-black">Your Spotify Playlists</h1>
      {loading && <div className="text-black">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl">
        {playlists.map(pl => (
          <a
            key={pl.id}
            href={pl.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-black rounded-xl shadow-xl flex flex-col items-center hover:scale-105 transition-transform group p-6"
            style={{
              minWidth: 220,
              maxWidth: 340,
              boxShadow: "3px 3px 0 #222",
              borderRadius: "14px",
              borderWidth: "2.5px",
              borderColor: "#222",
            }}
          >
            {pl.images?.[0]?.url && (
              <Image
                src={pl.images[0].url}
                alt={pl.name}
                width={144}
                height={144}
                className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-xl border-2 border-black mb-4"
                unoptimized
              />
            )}
            <h2 className="text-lg sm:text-xl font-semibold text-black mb-2 text-center" style={{ textShadow: "1px 1px 0 #222" }}>
              {pl.name}
            </h2>
            <div className="text-xs text-gray-700 text-center mb-1 font-normal">
              {pl.tracks?.total ?? 0} tracks
            </div>
            {pl.description && (
              <div className="text-xs text-gray-500 text-center mt-2 font-normal line-clamp-2">
                {pl.description}
              </div>
            )}
            <span className="mt-3 text-xs text-green-700 font-mono opacity-70 group-hover:opacity-100 transition-opacity font-normal">
              Open in Spotify
            </span>
          </a>
        ))}
      </div>
      {!loading && playlists.length === 0 && !error && (
        <div className="text-gray-400 text-center text-lg mt-12 font-semibold">
          No playlists found.
        </div>
      )}
    </div>
  );
}
