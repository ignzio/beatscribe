'use client'
import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import PlaylistCard from '../PlaylistCard'


function FeatureCarousel() {
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
    <div className="mt-8 w-full max-w-4xl mx-auto">
    <h2 className="text-xl text-gray-800 dark:text-white mb-4">Featured Playlists</h2>
    <Carousel responsive={responsive} showDots={true} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
      <PlaylistCard label="New" labelColor="green" imageUrl="https://via.placeholder.com/150" title="Playlist 1" description="10 songs" />
      <PlaylistCard label="Popular" labelColor="blue" imageUrl="https://via.placeholder.com/150" title="Playlist 2" description="20 songs" />
      <PlaylistCard label="Trending" labelColor="red" imageUrl="https://via.placeholder.com/150" title="Playlist 3" description="30 songs" />
    </Carousel>
  </div>
  )
}

export default FeatureCarousel