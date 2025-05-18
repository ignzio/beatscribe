"use client";
import React, { useContext } from "react";
import { PlaylistContext } from "./PlaylistContext";


const Sidebar = () => {
  const { savePlaylist } = useContext(PlaylistContext);

  return (
    <aside
      className="flex flex-col py-8 px-4"
      style={{
        width: "256px",
        minWidth: "256px",
        maxWidth: "256px",
        background: "#fff",
        borderRight: "4px solid #222",
        boxShadow: "6px 0 0 #222",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <nav className="flex-1">
        <ul className="space-y-6">
          <li>
            <a
              href="/"
              className="block px-4 py-2 rounded-lg font-bold text-black border-2 border-black shadow-brutal hover:bg-green-200 transition"
              style={{
                boxShadow: "4px 4px 0 #222",
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/playlists"
              className="block px-4 py-2 rounded-lg font-bold text-black border-2 border-black shadow-brutal hover:bg-green-200 transition"
              style={{
                boxShadow: "4px 4px 0 #222",
              }}
            >
              My Playlists
            </a>
          </li>
          <li>
            <a
              href="/saved"
              className="block px-4 py-2 rounded-lg font-bold text-black border-2 border-black shadow-brutal hover:bg-green-200 transition"
              style={{
                boxShadow: "4px 4px 0 #222",
              }}
            >
              Saved Playlists
            </a>
          </li>
        </ul>
      </nav>
      <button
        className="mt-10 w-full bg-yellow-300 text-black font-extrabold py-3 px-4 rounded-lg border-2 border-black"
        style={{
          boxShadow: "4px 4px 0 #222",
          fontSize: "1.1rem",
          letterSpacing: "-0.5px",
        }}
        onClick={savePlaylist}
      >
        + Save Playlist
      </button>
    </aside>
  );
};

export default Sidebar;
