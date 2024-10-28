'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export default function Home() {
  //redux selector
  const logindata = useSelector((state: RootState) => state.auth);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-900 h-full min-h-[calc(100vh-65px)] flex flex-col items-center justify-center">
      {/* Display login data from redux store */}
      {logindata.isAuthenticated ? (
        <div className="text-center w-full px-4">
          <h1 className="text-2xl text-gray-800 dark:text-white">Welcome {logindata.user?.username}</h1>
          
          {/* Featured Playlists Carousel */}
          <div className="mt-8 w-full max-w-4xl mx-auto">
            <h2 className="text-xl text-gray-800 dark:text-white mb-4">Featured Playlists</h2>
            <Carousel responsive={responsive} showDots={true} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
              <div className="relative p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">Featured</span>
                <img src="https://via.placeholder.com/150" alt="Playlist 1" className="w-full h-32 object-cover rounded-md" />
                <h3 className="mt-4 text-lg text-gray-800 dark:text-white">Playlist 1</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">10 songs</p>
                <div className="mt-2 flex justify-between items-center">
                  <button className="text-blue-500 hover:text-blue-600">❤️</button>
                  <button className="text-blue-500 hover:text-blue-600">▶️</button>
                </div>
              </div>
              <div className="relative p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">New</span>
                <img src="https://via.placeholder.com/150" alt="Playlist 2" className="w-full h-32 object-cover rounded-md" />
                <h3 className="mt-4 text-lg text-gray-800 dark:text-white">Playlist 2</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">15 songs</p>
                <div className="mt-2 flex justify-between items-center">
                  <button className="text-blue-500 hover:text-blue-600">❤️</button>
                  <button className="text-blue-500 hover:text-blue-600">▶️</button>
                </div>
              </div>
              <div className="relative p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">Popular</span>
                <img src="https://via.placeholder.com/150" alt="Playlist 3" className="w-full h-32 object-cover rounded-md" />
                <h3 className="mt-4 text-lg text-gray-800 dark:text-white">Playlist 3</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">20 songs</p>
                <div className="mt-2 flex justify-between items-center">
                  <button className="text-blue-500 hover:text-blue-600">❤️</button>
                  <button className="text-blue-500 hover:text-blue-600">▶️</button>
                </div>
              </div>
            </Carousel>
          </div>

          {/* Recently Played Songs */}
          <div className="mt-8 w-full max-w-4xl mx-auto">
            <h2 className="text-xl text-gray-800 dark:text-white mb-4">Recently Played Songs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-lg text-gray-800 dark:text-white">Song 1</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Artist 1</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-lg text-gray-800 dark:text-white">Song 2</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Artist 2</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-lg text-gray-800 dark:text-white">Song 3</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Artist 3</p>
              </div>
            </div>
          </div>

          {/* Popular Artists */}
          <div className="mt-8 w-full max-w-4xl mx-auto">
            <h2 className="text-xl text-gray-800 dark:text-white mb-4">Popular Artists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-lg text-gray-800 dark:text-white">Artist 1</h3>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-lg text-gray-800 dark:text-white">Artist 2</h3>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-lg text-gray-800 dark:text-white">Artist 3</h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl text-gray-800 dark:text-white">Welcome Guest</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Please log in to view and manage your playlists.</p>
        </div>
      )}
    </div>
  );
}