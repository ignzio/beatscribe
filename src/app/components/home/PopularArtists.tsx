import React from 'react'

function PopularArtists() {
    return (
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
    )
}

export default PopularArtists