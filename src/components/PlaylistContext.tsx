'use client'
import React, { createContext, useState } from "react";

export const PlaylistContext = createContext({
  playlists: [],
  savePlaylist: () => {},
});

export const PlaylistProvider = ({ children }: { children: React.ReactNode }) => {
  const [playlists, setPlaylists] = useState<any[]>([]);

  const savePlaylist = () => {
    // Placeholder: Add logic to save a playlist
    alert("Save Playlist clicked!");
  };

  return (
    <PlaylistContext.Provider value={{ playlists, savePlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};
