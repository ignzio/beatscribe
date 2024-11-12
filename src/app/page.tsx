'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import 'react-multi-carousel/lib/styles.css'
import FeaturePlaylistCarousel from './components/home/FeaturePlaylistCarousel'
import RecentPlayedSongs from './components/home/RecentPlayedSongs'
import PopularArtists from './components/home/PopularArtists'

export default function Home() {
  //redux selector
  const logindata = useSelector((state: RootState) => state.auth);
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-900 h-full min-h-[calc(100vh-65px)] flex flex-col items-center">
      {/* Display login data from redux store */}
      {logindata.user ? (
        <div className="text-center w-full px-4">
          <h1 className="text-2xl text-gray-800 dark:text-white">Welcome {logindata.user?.username}</h1>
          <FeaturePlaylistCarousel />
          <RecentPlayedSongs />
          <PopularArtists />
        </div>
      ) : (
       
          <FeaturePlaylistCarousel />
      )}
    </div>
  );
}