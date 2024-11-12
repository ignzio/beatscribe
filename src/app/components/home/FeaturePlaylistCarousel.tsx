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
          items: 3,
          slidesToSlide: 3, // optional, default to 1.
        },
      };

  return (
    <div className="relative w-full h-full flex flex-col p-2">
    <h1 className="text-l pl-1 text-left text-gray-800 dark:text-white font-bold">
      Featured Playlists
    </h1>
    <h2 className='text-sm pl-1 text-left text-gray-500 dark:text-gray-300'
    >Explore a wide range of music </h2>
    <Carousel itemClass="px-1 mt-2" responsive={responsive} showDots={true} infinite={true} autoPlay={false} autoPlaySpeed={3000} keyBoardControl={false} customTransition="all .5" transitionDuration={500}
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      <PlaylistCard label="New" labelColor="green" imageUrl="https://via.placeholder.com/150" title="Playlist 1" description="10 songs" />
      <PlaylistCard label="Popular" labelColor="blue" imageUrl="https://via.placeholder.com/150" title="Playlist 2" description="20 songs" />
      <PlaylistCard label="Trending" labelColor="red" imageUrl="https://via.placeholder.com/150" title="Playlist 3" description="30 songs" />
    </Carousel>
  </div>
  )
}

export default FeatureCarousel