import React from "react";
import SpotifyLoginButton from "./SpotifyLoginButton";

const Header = () => (
  <header
    className="w-full flex items-center justify-between shadow-xl bg-[#1ED760] border-b-4 border-[#222] min-h-[64px] max-h-[64px] px-2 sm:px-4"
  >
    <span
      className="truncate max-w-[60vw] whitespace-nowrap overflow-hidden text-ellipsis font-extrabold text-[#18181b] text-[clamp(1.2rem,4vw,2.1rem)] leading-tight tracking-[-0.04em] border-2 border-[#222] bg-[#fff] px-3 py-1 rounded-lg flex items-center shadow-[3px_3px_0_#222]"
    >
      {/* Animated Beatscribe Logo inside text */}
      <svg
        className="h-7 w-10 mr-2 bg-white border-[2px] border-[#222] rounded-lg shadow-[2px_2px_0_#222] min-w-[36px] min-h-[24px]"
        viewBox="0 0 80 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect x="8" y="20" width="6" height="12" rx="2" fill="#1ED760">
            <animate attributeName="y" values="20;10;20" dur="1s" repeatCount="indefinite" begin="0s" />
            <animate attributeName="height" values="12;32;12" dur="1s" repeatCount="indefinite" begin="0s" />
          </rect>
          <rect x="20" y="14" width="6" height="18" rx="2" fill="#1ED760">
            <animate attributeName="y" values="14;4;14" dur="1s" repeatCount="indefinite" begin="0.2s" />
            <animate attributeName="height" values="18;32;18" dur="1s" repeatCount="indefinite" begin="0.2s" />
          </rect>
          <rect x="32" y="8" width="6" height="24" rx="2" fill="#1ED760">
            <animate attributeName="y" values="8;0;8" dur="1s" repeatCount="indefinite" begin="0.4s" />
            <animate attributeName="height" values="24;40;24" dur="1s" repeatCount="indefinite" begin="0.4s" />
          </rect>
          <rect x="44" y="14" width="6" height="18" rx="2" fill="#1ED760">
            <animate attributeName="y" values="14;4;14" dur="1s" repeatCount="indefinite" begin="0.6s" />
            <animate attributeName="height" values="18;32;18" dur="1s" repeatCount="indefinite" begin="0.6s" />
          </rect>
          <rect x="56" y="20" width="6" height="12" rx="2" fill="#1ED760">
            <animate attributeName="y" values="20;10;20" dur="1s" repeatCount="indefinite" begin="0.8s" />
            <animate attributeName="height" values="12;32;12" dur="1s" repeatCount="indefinite" begin="0.8s" />
          </rect>
        </g>
      </svg>
      Beatscribe
    </span>
    <div className="flex items-center justify-center min-w-[120px]">
      <SpotifyLoginButton />
    </div>
  </header>
);

export default Header;
