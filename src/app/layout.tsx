import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beatscribe",
  description: "Save and manage your favorite Spotify playlists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-screen h-screen overflow-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white w-screen h-screen min-h-screen min-w-screen max-h-screen max-w-screen overflow-hidden`}
        style={{ background: "#18181b" }}
      >
          <Header />
          <div className="flex flex-1 w-full max-w-full h-[calc(100vh-80px-56px)] overflow-hidden">
            {/* Sidebar: hidden on mobile, visible on md+ */}
            <div className="hidden md:block h-full">
              <Sidebar />
            </div>
            {/* Remove commented MobileSidebar and unnecessary flex/tabs */}
            <main className="flex-1 h-full w-full overflow-auto">
              {children}
            </main>
          </div>
          <Footer />
      </body>
    </html>
  );
}
