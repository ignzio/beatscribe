import React from "react";
import Link from "next/link";

const Sidebar = () => {

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
            <Link
              href="/"
              className="block px-4 py-2 rounded-lg font-bold text-black border-2 border-black shadow-brutal hover:bg-green-200 transition"
              style={{
                boxShadow: "4px 4px 0 #222",
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/playlists"
              className="block px-4 py-2 rounded-lg font-bold text-black border-2 border-black shadow-brutal hover:bg-green-200 transition"
              style={{
                boxShadow: "4px 4px 0 #222",
              }}
            >
              My Playlists
            </Link>
          </li>
          <li>
            <Link
              href="/saved"
              className="block px-4 py-2 rounded-lg font-bold text-black border-2 border-black shadow-brutal hover:bg-green-200 transition"
              style={{
                boxShadow: "4px 4px 0 #222",
              }}
            >
              Saved Playlists
            </Link>
          </li>
        </ul>
      </nav>
     
    </aside>
  );
};

export default Sidebar;
