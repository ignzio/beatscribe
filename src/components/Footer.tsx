import React from "react";

const Footer = () => (
  <footer
    className="w-full text-center py-4 text-sm border-t-4"
    style={{
      color: "#222",
      background: "#fff",
      borderTop: "4px solid #222",
      boxShadow: "0 -4px 0 #222",
      fontWeight: "bold",
      letterSpacing: "-0.5px",
      height: "56px",
      minHeight: "56px",
      maxHeight: "56px",
      lineHeight: "32px",
    }}
  >
    &copy; {new Date().getFullYear()} Beatscribe. Not affiliated with Spotify.
  </footer>
);

export default Footer;
