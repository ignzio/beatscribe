import React from 'react'

function RecentPlayedSongs() {
  return (
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
  )
}

export default RecentPlayedSongs