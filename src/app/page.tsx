"use client";
import { useState, FormEvent, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

type SearchResult = {
  id: string;
  name: string;
  images?: { url: string }[];
  external_urls?: { spotify: string };
  type: string;
  artists?: { name: string }[];
  album?: { name: string; images?: { url: string }[] };
};

// --- Components ---

function TypeSelector({
  typeOptions,
  selectedTypes,
  handleTypeToggle,
}: {
  typeOptions: { value: string; label: string }[];
  selectedTypes: string[];
  handleTypeToggle: (type: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 w-full justify-center mt-2">
      {typeOptions.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => handleTypeToggle(opt.value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-semibold transition-all select-none
            ${selectedTypes.includes(opt.value)
              ? "bg-yellow-300 border-yellow-500 text-black scale-105"
              : "bg-[#f6f6f6] border-black text-gray-700 hover:bg-yellow-100"}
          `}
          style={{
            borderWidth: "2.5px",
            borderColor: selectedTypes.includes(opt.value) ? "#fde047" : "#222",
            boxShadow: selectedTypes.includes(opt.value) ? "3px 3px 0 #fde047" : "3px 3px 0 #222",
            outline: "none",
            cursor: "pointer",
          }}
          tabIndex={0}
        >
          <span
            className={`inline-block w-4 h-4 rounded border-2 mr-1
              ${selectedTypes.includes(opt.value)
                ? "bg-yellow-400 border-yellow-700"
                : "bg-white border-black"}
            `}
          />
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function AdvancedQueryFields({
  selectedTypes,
  track,
  setTrack,
  artist,
  setArtist,
  album,
  setAlbum,
  year,
  setYear,
}: {
  selectedTypes: string[];
  track: string;
  setTrack: (v: string) => void;
  artist: string;
  setArtist: (v: string) => void;
  album: string;
  setAlbum: (v: string) => void;
  year: string;
  setYear: (v: string) => void;
}) {
  return (
    <motion.div
      className="flex flex-col gap-2 w-full mt-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      {selectedTypes.includes("track") && (
        <input
          type="text"
          className="w-full px-4 py-2 rounded border-2 border-black text-black font-semibold bg-[#f6f6f6]"
          placeholder="Track"
          value={track}
          onChange={e => setTrack(e.target.value)}
        />
      )}
      {selectedTypes.includes("artist") && (
        <input
          type="text"
          className="w-full px-4 py-2 rounded border-2 border-black text-black font-semibold bg-[#f6f6f6]"
          placeholder="Artist"
          value={artist}
          onChange={e => setArtist(e.target.value)}
        />
      )}
      {selectedTypes.includes("album") && (
        <input
          type="text"
          className="w-full px-4 py-2 rounded border-2 border-black text-black font-semibold bg-[#f6f6f6]"
          placeholder="Album"
          value={album}
          onChange={e => setAlbum(e.target.value)}
        />
      )}
      {(selectedTypes.includes("track") ||
        selectedTypes.includes("artist") ||
        selectedTypes.includes("album")) && (
        <input
          type="text"
          className="w-full px-4 py-2 rounded border-2 border-black text-black font-semibold bg-[#f6f6f6]"
          placeholder="Year (e.g. 1960 or 1955-1960)"
          value={year}
          onChange={e => setYear(e.target.value)}
        />
      )}
      <div className="text-xs text-gray-500 mt-1">
        Example: <span className="font-mono">track:&quot;Kind of Blue&quot; artist:&quot;Miles Davis&quot;</span>
      </div>
    </motion.div>
  );
}

function TrackCard({
  track,
  onAdd,
  isInPlaylist,
  compact,
  minimal,
}: {
  track: SearchResult;
  onAdd?: (track: SearchResult) => void;
  isInPlaylist?: boolean;
  compact?: boolean;
  minimal?: boolean;
}) {
  const imageUrl =
    track.images?.[0]?.url ||
    (track.type === "track" && isTrackWithAlbum(track) ? track.album?.images?.[0]?.url : undefined);

  function isTrackWithAlbum(track: SearchResult): track is SearchResult & { album: { images?: { url: string }[] } } {
    return track.type === "track" && !!track.album && Array.isArray(track.album.images);
  }

  if (minimal) {
    return (
      <div className="border-b border-gray-300 py-2 px-2 flex justify-between items-center w-full bg-white">
        <span className="font-semibold text-sm truncate">{track.name}</span>
        {onAdd && (
          <button
            className="ml-2 px-2 py-1 bg-green-200 border border-black rounded text-xs font-semibold"
            onClick={() => onAdd(track)}
            disabled={isInPlaylist}
          >
            {isInPlaylist ? "Added" : "Add"}
          </button>
        )}
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3 border-2 border-black rounded-lg bg-white px-4 py-3 mb-4 w-full max-w-2xl">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={track.name}
            className="w-12 h-12 object-cover rounded border-2 border-black"
          />
        )}
        <div className="flex-1">
          <div className="font-semibold text-base">{track.name}</div>
          {track.artists && (
            <div className="text-xs text-gray-700">{track.artists.map(a => a.name).join(", ")}</div>
          )}
        </div>
        {onAdd && (
          <button
            className="ml-2 px-3 py-1 bg-green-200 border border-black rounded text-xs font-semibold"
            onClick={() => onAdd(track)}
            disabled={isInPlaylist}
          >
            {isInPlaylist ? "Added" : "Add"}
          </button>
        )}
      </div>
    );
  }

  // Default (full) card
  return (
    <div
      className="bg-white border-2 border-black rounded-xl shadow-xl flex flex-col items-center group mb-8 w-full"
      style={{
        maxWidth: 340,
        minWidth: 0,
        width: "100%",
        height: 370,
        boxShadow: "3px 3px 0 #222",
        borderRadius: "14px",
        borderWidth: "2.5px",
        borderColor: "#222",
        padding: "1.5rem",
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={track.name}
          className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-xl border-2 border-black mb-4 group-hover:shadow-lg"
          style={{
            borderRadius: "10px",
            borderWidth: "2px",
            borderColor: "#222",
            boxShadow: "2px 2px 0 #222",
          }}
        />
      )}
      <h2 className="text-lg sm:text-xl font-semibold text-black mb-2 text-center" style={{ textShadow: "1px 1px 0 #222" }}>
        {track.name}
      </h2>
      {track.artists && (
        <div className="text-xs text-gray-700 text-center mb-1 font-normal">
          {track.artists.map(a => a.name).join(", ")}
        </div>
      )}
      {track.album && (
        <div className="text-xs text-gray-700 text-center mb-1 font-normal">
          Album: {track.album.name}
        </div>
      )}
      <div className="text-xs text-gray-500 text-center mt-2 capitalize font-normal">
        Type: {track.type}
      </div>
      {onAdd && (
        <button
          className="mt-3 px-4 py-2 bg-green-200 border border-black rounded text-xs font-semibold"
          onClick={() => onAdd(track)}
          disabled={isInPlaylist}
        >
          {isInPlaylist ? "Added" : "Add"}
        </button>
      )}
      {track.external_urls?.spotify && (
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-xs text-green-700 font-mono opacity-70 group-hover:opacity-100 transition-opacity font-normal"
        >
          Open in Spotify
        </a>
      )}
    </div>
  );
}

function SearchResultsList({
  tracks,
  onAdd,
  playlistTracks,
  displayMode,
}: {
  tracks: SearchResult[];
  onAdd: (track: SearchResult) => void;
  playlistTracks: SearchResult[];
  displayMode: "full" | "compact" | "minimal";
}) {
  const playlistIds = new Set(playlistTracks.map(t => t.id));
  if (displayMode === "minimal") {
    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg">
        {tracks.length === 0 && (
          <div className="text-gray-400 text-center text-sm py-4">No results</div>
        )}
        {tracks.map(track => (
          <TrackCard
            key={track.id}
            track={track}
            onAdd={onAdd}
            isInPlaylist={playlistIds.has(track.id)}
            minimal
          />
        ))}
      </div>
    );
  }
  if (displayMode === "compact") {
    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto">
        {tracks.length === 0 && (
          <div className="text-gray-400 text-center text-sm py-4">No results</div>
        )}
        {tracks.map(track => (
          <TrackCard
            key={track.id}
            track={track}
            onAdd={onAdd}
            isInPlaylist={playlistIds.has(track.id)}
            compact
          />
        ))}
      </div>
    );
  }
  // Responsive grid for all screens
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-2">
      {tracks.length === 0 && (
        <div className="text-gray-400 text-center text-sm col-span-full">No results</div>
      )}
      {tracks.map(track => (
        <TrackCard
          key={track.id}
          track={track}
          onAdd={onAdd}
          isInPlaylist={playlistIds.has(track.id)}
        />
      ))}
    </div>
  );
}

function PlaylistDrawer({
  open,
  onClose,
  name,
  tracks,
  onNameChange,
  onRemove,
  onSave,
  saving,
}: {
  open: boolean;
  onClose: () => void;
  name: string;
  tracks: SearchResult[];
  onNameChange: (v: string) => void;
  onRemove: (trackId: string) => void;
  onSave: () => void;
  saving?: boolean;
}) {
  return (
    <div
      className={`fixed top-0 right-0 h-full z-50 bg-white border-l-2 border-black shadow-2xl transition-transform duration-300 ease-in-out flex flex-col items-center pt-8 px-6
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
      style={{ width: "350px", maxWidth: "100vw" }}
    >
      <button
        className="absolute top-3 left-3 text-lg font-bold px-2 py-1 border border-black rounded hover:bg-gray-100"
        onClick={onClose}
        aria-label="Close playlist"
      >
        ×
      </button>
      <label className="mb-2 w-full text-center font-semibold text-gray-700" htmlFor="playlist-name-input">
        Playlist Title
      </label>
      <input
        id="playlist-name-input"
        type="text"
        value={name}
        onChange={e => onNameChange(e.target.value)}
        className="mb-4 px-4 py-2 border-2 border-black rounded-lg font-bold text-lg w-full text-center"
        placeholder="Enter playlist name"
        aria-label="Playlist title"
      />
      <div className="flex flex-col gap-2 w-full overflow-y-auto flex-1">
        {tracks.length === 0 && (
          <div className="text-gray-400 text-center text-sm mt-8">No tracks in playlist</div>
        )}
        {tracks.map(track => (
          <div
            key={track.id}
            className="flex flex-col border border-black rounded p-2 bg-[#f6f6f6] mb-2 relative"
          >
            <span className="font-semibold">{track.name}</span>
            {track.artists && (
              <span className="text-xs text-gray-700">
                {track.artists.map(a => a.name).join(", ")}
              </span>
            )}
            {track.album && (
              <span className="text-xs text-gray-700">Album: {track.album.name}</span>
            )}
            <button
              className="absolute top-2 right-2 px-2 py-1 bg-red-200 border border-black rounded text-xs font-semibold"
              onClick={() => onRemove(track.id)}
              aria-label="Remove from playlist"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-7 py-3 bg-green-400 text-black font-bold rounded-lg border-2 border-black w-full"
        disabled={tracks.length === 0 || saving}
        onClick={onSave}
      >
        {saving ? "Saving..." : "Save To Spotify"}
      </button>
    </div>
  );
}

type SearchFormProps = {
  search: string;
  setSearch: (v: string) => void;
  handleSearch: (e: FormEvent) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  showAnyQueryBuilder: boolean;
  selectedTypes: string[];
  typeOptions: { value: string; label: string }[];
  handleTypeToggle: (type: string) => void;
  track: string;
  setTrack: (v: string) => void;
  artist: string;
  setArtist: (v: string) => void;
  album: string;
  setAlbum: (v: string) => void;
  year: string;
  setYear: (v: string) => void;
  showAdvanced: boolean;
  setShowAdvanced: (v: boolean | ((prev: boolean) => boolean)) => void;
  limit: string;
  setLimit: (v: string) => void;
  offset: string;
  setOffset: (v: string) => void;
};

function SearchForm({
  search,
  setSearch,
  handleSearch,
  searchInputRef,
  showAnyQueryBuilder,
  selectedTypes,
  typeOptions,
  handleTypeToggle,
  track, setTrack,
  artist, setArtist,
  album, setAlbum,
  year, setYear,
  showAdvanced, setShowAdvanced,
  limit, setLimit,
  offset, setOffset,
}: SearchFormProps) {
  return (
    <motion.form
      className="flex flex-col gap-3 w-full max-w-2xl items-center justify-center"
      onSubmit={handleSearch}
      initial={false}
      animate={{ scale: 1 }}
    >
      <div className="flex flex-col gap-3 w-full">
        <AnimatePresence>
          {showAnyQueryBuilder ? (
            <AdvancedQueryFields
              selectedTypes={selectedTypes}
              track={track}
              setTrack={setTrack}
              artist={artist}
              setArtist={setArtist}
              album={album}
              setAlbum={setAlbum}
              year={year}
              setYear={setYear}
            />
          ) : (
            <motion.input
              ref={searchInputRef}
              type="text"
              className="w-full px-5 py-4 rounded-lg border-2 border-black text-black font-semibold shadow-none focus:outline-none focus:ring-2 focus:ring-green-400 bg-[#f6f6f6]"
              placeholder="Search Spotify (track, album, artist, playlist)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              required
              style={{
                borderRadius: "12px",
                borderWidth: "2.5px",
                borderColor: "#222",
                boxShadow: "3px 3px 0 #222",
                fontSize: "1.15rem",
              }}
              whileFocus={{ scale: 1.03, boxShadow: "6px 6px 0 #222" }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            />
          )}
        </AnimatePresence>
        <TypeSelector
          typeOptions={typeOptions}
          selectedTypes={selectedTypes}
          handleTypeToggle={handleTypeToggle}
        />
        <motion.button
          type="submit"
          className="w-full px-7 py-4 bg-yellow-300 text-black font-extrabold rounded-lg border-2 border-black hover:bg-yellow-400 transition-all"
          style={{
            borderRadius: "12px",
            borderWidth: "2.5px",
            borderColor: "#222",
            boxShadow: "3px 3px 0 #222",
            letterSpacing: "-0.5px",
            fontSize: "1.1rem",
          }}
          whileHover={{ scale: 1.07, backgroundColor: "#fde047" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          Search
        </motion.button>
      </div>
      <div className="flex gap-4 mt-2">
        <button
          type="button"
          className="text-xs underline text-gray-700"
          onClick={() => setShowAdvanced((v: boolean) => !v)}
          tabIndex={-1}
        >
          {showAdvanced ? "Hide advanced" : "Show advanced"}
        </button>
      </div>
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            className="flex flex-col sm:flex-row gap-2 w-full mt-2 items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <label className="flex flex-col text-xs font-semibold text-gray-700">
              Limit
              <input
                type="number"
                min={1}
                max={50}
                value={limit}
                onChange={e => setLimit(e.target.value)}
                className="px-2 py-1 border-2 border-black rounded bg-[#f6f6f6] w-20 text-center font-semibold"
                style={{ boxShadow: "2px 2px 0 #222" }}
              />
            </label>
            <label className="flex flex-col text-xs font-semibold text-gray-700">
              Offset
              <input
                type="number"
                min={0}
                max={1000}
                value={offset}
                onChange={e => setOffset(e.target.value)}
                className="px-2 py-1 border-2 border-black rounded bg-[#f6f6f6] w-20 text-center font-semibold"
                style={{ boxShadow: "2px 2px 0 #222" }}
              />
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

// --- End Components ---

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get("q") || "");
  const [searchType, setSearchType] = useState(() => searchParams.get("type") || "track");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [limit, setLimit] = useState(() => searchParams.get("limit") || "20");
  const [offset, setOffset] = useState(() => searchParams.get("offset") || "0");

  // Helper for multi-type selection
  const typeOptions = [
    { value: "track", label: "Track" },
    { value: "album", label: "Album" },
    { value: "artist", label: "Artist" },
    { value: "playlist", label: "Playlist" },
  ];

  // Helper for toggleable type selection (buttons)
  const selectedTypes = searchType
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t) => typeOptions.some(opt => opt.value === t));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showQueryBuilder, setShowQueryBuilder] = useState(selectedTypes.length > 1);
  const [artist, setArtist] = useState(() => searchParams.get("artist") || "");
  const [album, setAlbum] = useState(() => searchParams.get("album") || "");
  const [track, setTrack] = useState(() => searchParams.get("track") || "");
  const [year, setYear] = useState(() => searchParams.get("year") || "");

  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState<SearchResult[]>([]);
  const [displayMode, setDisplayMode] = useState<"full" | "compact" | "minimal">("full");
  const [playlistDrawerOpen, setPlaylistDrawerOpen] = useState(false);
  const [savingPlaylist, setSavingPlaylist] = useState(false);

  // Compose advanced query string
  const buildAdvancedQuery = () => {
    // Only use the latest values, do not prepend previous search
    const parts: string[] = [];
    if (selectedTypes.includes("track") && track.trim()) parts.push(`track:"${track.trim()}"`);
    if (selectedTypes.includes("artist") && artist.trim()) parts.push(`artist:"${artist.trim()}"`);
    if (selectedTypes.includes("album") && album.trim()) parts.push(`album:"${album.trim()}"`);
    if (year.trim()) parts.push(`year:${year.trim()}`);
    // If no advanced fields, fallback to main search
    if (parts.length === 0) return search.trim();
    // Do NOT prepend search, only use advanced fields
    return parts.join(" ");
  };

  // Show advanced fields if any type is selected (except playlist)
  const showAnyQueryBuilder =
    selectedTypes.some(t => ["track", "artist", "album"].includes(t));

  // Sync state with URL params and fetch results
  useEffect(() => {
    const q = searchParams.get("q");
    let type = searchParams.get("type") || "track";
    const validTypes = type
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .filter((t) => typeOptions.some(opt => opt.value === t));
    if (validTypes.length === 0) type = "track";
    else type = validTypes.join(",");
    const limitParam = searchParams.get("limit") || "20";
    const offsetParam = searchParams.get("offset") || "0";
    setLimit(limitParam);
    setOffset(offsetParam);
    setSearchType(type);

    // Restore advanced fields from query string if present
    setArtist(searchParams.get("artist") || "");
    setAlbum(searchParams.get("album") || "");
    setTrack(searchParams.get("track") || "");
    setYear(searchParams.get("year") || "");

    if (q) {
      setSearch(q);
      setSearchLoading(true);
      setResults([]);
      setError(null);
      axios
        .get("/api/search", { params: { q, type, limit: limitParam, offset: offsetParam } })
        .then((res) => {
          let items: SearchResult[] = [];
          const types = type.split(",");
          if (types.includes("track") && res.data.tracks) items = items.concat(res.data.tracks.items);
          if (types.includes("album") && res.data.albums) items = items.concat(res.data.albums.items);
          if (types.includes("artist") && res.data.artists) items = items.concat(res.data.artists.items);
          if (types.includes("playlist") && res.data.playlists) items = items.concat(res.data.playlists.items);
          setResults(items);
        })
        .catch(() => setError("Failed to search Spotify."))
        .finally(() => setSearchLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Always update showQueryBuilder when selectedTypes changes
  useEffect(() => {
    setShowQueryBuilder(selectedTypes.length > 1);
  }, [selectedTypes.join(",")]);

  const handleTypeToggle = (type: string) => {
    let updated: string[];
    if (selectedTypes.includes(type)) {
      updated = selectedTypes.filter((t) => t !== type);
    } else {
      updated = [...selectedTypes, type];
    }
    setSearchType(updated.length > 0 ? updated.join(",") : "track");
    setShowQueryBuilder(updated.length > 1);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // Always build query from current state
    const query = showAnyQueryBuilder ? buildAdvancedQuery() : search;
    const params = new URLSearchParams();
    params.set("q", query);
    params.set("type", searchType);
    params.set("limit", limit);
    params.set("offset", offset);
    // Save advanced fields in URL for correct state restoration
    if (showAnyQueryBuilder) {
      params.set("artist", artist);
      params.set("album", album);
      params.set("track", track);
      params.set("year", year);
    }
    router.replace(`?${params.toString()}`);
  };

  // Add track to playlist if not already present
  const handleAddToPlaylist = (track: SearchResult) => {
    setPlaylistTracks(prev =>
      prev.some(t => t.id === track.id) ? prev : [...prev, track]
    );
  };

  // Remove track from playlist
  const handleRemoveFromPlaylist = (trackId: string) => {
    setPlaylistTracks(prev => prev.filter(t => t.id !== trackId));
  };

  // Save playlist to Spotify
  const handleSavePlaylist = async () => {
    if (playlistTracks.length === 0) return;
    setSavingPlaylist(true);
    try {
      const accessToken = localStorage.getItem("spotify_access_token");
      if (!accessToken) {
        alert("Please log in with Spotify first.");
        setSavingPlaylist(false);
        return;
      }

      // 2. Get user id
      const userRes = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!userRes.ok) throw new Error("Failed to get user info");
      const user = await userRes.json();

      // 3. Create a new playlist (always create new, even if name matches)
      const playlistBody = {
        name: playlistName,
        description: "Created with Beatscribe",
        public: true,
      };
      console.log("Creating playlist with body:", playlistBody);

      const createRes = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playlistBody),
      });
      const createResText = await createRes.clone().text();
      console.log("Create playlist response status:", createRes.status, "body:", createResText);

      if (!createRes.ok) throw new Error("Failed to create playlist");
      const playlist = await createRes.json();

      // 4. Add tracks to the new playlist
      const uris = playlistTracks.map(t => `spotify:track:${t.id}`);
      console.log("Adding tracks to playlist:", playlist.id, uris);

      const addRes = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris }),
      });
      const addResText = await addRes.clone().text();
      console.log("Add tracks response status:", addRes.status, "body:", addResText);

      if (!addRes.ok) throw new Error("Failed to add tracks");

      alert("Playlist saved to your Spotify account!");
    } catch (err: unknown) {
      const errorMessage =
        typeof err === "object" && err !== null && "message" in err
          ? (err as { message?: string }).message
          : "Unknown error";
      alert("Error saving playlist: " + errorMessage);
      console.error("Error saving playlist:", err);
    } finally {
      setSavingPlaylist(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#f6f6f6] overflow-x-hidden overflow-y-auto pb-24">
      <motion.div
        className="w-full flex flex-col items-center py-10"
        style={{
          background: "#fff",
          borderBottom: "3px solid #222",
          boxShadow: "0 8px 0 #222",
          maxWidth: "100vw",
        }}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        <SearchForm
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          searchInputRef={searchInputRef}
          showAnyQueryBuilder={showAnyQueryBuilder}
          selectedTypes={selectedTypes}
          typeOptions={typeOptions}
          handleTypeToggle={handleTypeToggle}
          track={track}
          setTrack={setTrack}
          artist={artist}
          setArtist={setArtist}
          album={album}
          setAlbum={setAlbum}
          year={year}
          setYear={setYear}
          showAdvanced={showAdvanced}
          setShowAdvanced={setShowAdvanced}
          limit={limit}
          setLimit={setLimit}
          offset={offset}
          setOffset={setOffset}
        />
      </motion.div>
      <main className="flex flex-col gap-8 w-full max-w-7xl flex-1 mt-8 pb-24 px-2">
        <div className="flex justify-center gap-3 mb-4 flex-wrap">
          <button
            className={`px-4 py-2 rounded border-2 font-semibold ${displayMode === "full" ? "bg-yellow-300 border-yellow-500" : "bg-white border-black"}`}
            onClick={() => setDisplayMode("full")}
          >
            Grid
          </button>
          <button
            className={`px-4 py-2 rounded border-2 font-semibold ${displayMode === "compact" ? "bg-yellow-300 border-yellow-500" : "bg-white border-black"}`}
            onClick={() => setDisplayMode("compact")}
          >
            List with Images
          </button>
          <button
            className={`px-4 py-2 rounded border-2 font-semibold ${displayMode === "minimal" ? "bg-yellow-300 border-yellow-500" : "bg-white border-black"}`}
            onClick={() => setDisplayMode("minimal")}
          >
            Minimal List
          </button>
          <button
            className="px-4 py-2 rounded border-2 font-semibold bg-green-200 border-green-600"
            onClick={() => setPlaylistDrawerOpen(true)}
          >
            Open My Playlist ({playlistTracks.length})
          </button>
        </div>
        <AnimatePresence>
          {searchLoading && (
            <motion.div
              key="loading"
              className="text-black text-lg font-semibold bg-white border-2 border-black rounded-xl px-6 py-4"
              style={{ boxShadow: "3px 3px 0 #222" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              Searching...
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              className="text-red-500 font-semibold bg-white border-2 border-black rounded-xl px-6 py-4"
              style={{ boxShadow: "3px 3px 0 #222" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SearchResultsList
                tracks={results}
                onAdd={handleAddToPlaylist}
                playlistTracks={playlistTracks}
                displayMode={displayMode}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {!searchLoading && results.length === 0 && (
          <div className="text-gray-400 text-center text-lg mt-12 font-semibold">
            Try searching for your favorite track, album, artist, or playlist!
          </div>
        )}
      </main>
      <PlaylistDrawer
        open={playlistDrawerOpen}
        onClose={() => setPlaylistDrawerOpen(false)}
        name={playlistName}
        tracks={playlistTracks}
        onNameChange={setPlaylistName}
        onRemove={handleRemoveFromPlaylist}
        onSave={handleSavePlaylist}
        saving={savingPlaylist}
      />
    </div>
  );
}
