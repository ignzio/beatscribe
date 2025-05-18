# Beatscribe

Beatscribe is a modern, neo-brutalist web app for searching, curating, and saving your favorite Spotify tracks, albums, artists, and playlists. Create custom playlists and save them directly to your Spotify account.

## Features

- 🔍 **Search Spotify**: Find tracks, albums, artists, and playlists using advanced or simple queries.
- 🎚️ **Custom Playlists**: Build your own playlists by adding and removing tracks from search results.
- ✏️ **Rename Playlists**: Easily rename your custom playlist before saving.
- 💾 **Save to Spotify**: Save your custom playlist directly to your Spotify account (requires login).
- 🗑️ **Remove Tracks**: Remove unwanted tracks from your custom playlist before saving.
- 🖼️ **Multiple Views**: Switch between grid, compact, and minimal list views for search results.
- 🟢 **Spotify Login**: Secure OAuth login with Spotify to enable playlist saving.
- 📋 **View Your Playlists**: Browse all your Spotify playlists and those created with Beatscribe.
- 🟩 **Neo-brutalist UI**: Bold, readable, and responsive design for desktop and mobile.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ignzio/beatscribe.git
   cd beatscribe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Spotify API:**
   - Create a Spotify Developer App at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
   - Add your Redirect URI (e.g. `http://localhost:3000/api/spotify/callback`) in the Spotify app settings.
   - Copy `.env.example` to `.env` and fill in your `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REDIRECT_URI`.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Usage

- **Search**: Use the search bar to find tracks, albums, artists, or playlists.
- **Add to Playlist**: Click "Add" on any track to add it to your custom playlist.
- **Open Playlist**: Click "Open My Playlist" to view, rename, or remove tracks.
- **Save to Spotify**: Click "Save To Spotify" (after logging in) to save your playlist to your Spotify account.
- **View Playlists**: Visit `/playlists` to see all your Spotify playlists, or `/saved` to see playlists created with Beatscribe.

## Tech Stack

- [Next.js 13+](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Framer Motion](https://www.framer.com/motion/) (for animations)

## Environment Variables

Copy `.env.example` to `.env` and set:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback
```

## License

MIT

---

Made with ❤️ for music lovers.
