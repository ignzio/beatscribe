'use client'
import React, { createContext } from "react";

// Define a Playlist type
export interface Playlist {
  id: string;
  name: string;
  // Add other properties as needed
}

export const PlaylistContext = createContext({
  playlists: [] as Playlist[],
  savePlaylist: () => {},
});

export const PlaylistProvider = ({ children }: { children: React.ReactNode }) => {



  return (
    <PlaylistContext.Provider value={{ playlists: [], savePlaylist: () => {} }}>
      {children}
    </PlaylistContext.Provider>
  );
};
