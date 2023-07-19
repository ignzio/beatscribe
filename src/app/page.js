'use client';
import styles from '@/styles/Home.module.css';
import React, { use, useRef, useState } from 'react';
import { useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import '@/styles/swiperCustom.css'
import Skeleton from '@mui/material/Skeleton';
import dynamic from 'next/dynamic';
// import required modules
import { EffectCards } from 'swiper/modules';
const Card = dynamic(() => import('@/Components/MusicCards/CardMusic'), {
  loading: () => <Skeleton variant="rectangular" width={210} height={118} />,
});

export default function Home() {
  const [data, setData] = useState(null);

  const handleClick = async () => {
    const res = await fetch('/api/spotify');
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    handleClick().then(res => setData(res)).then(() => console.log(data));

  }, [])
  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.title} />
          <div className={styles.swiperContainer}>
            <Swiper
              effect={'cards'}
              height={600}
              grabCursor={true}
              modules={[EffectCards]}
              className={styles.swiper}
              cardsEffect={{
                slideShadows: false,
                perSlideOffset: 50,
              }
              }
            >
              {data && data.albums.items.map((item, index) => (
                <SwiperSlide className={styles.swiperSlide} key={index}>
                  <Card
                    author={item.artists[0].name}
                    title={item.name}
                    imagen={item.images[0].url}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </ div>
    </>
  )
}
