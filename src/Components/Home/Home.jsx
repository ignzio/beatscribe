'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import Skeleton from '@mui/material/Skeleton';
import dynamic from 'next/dynamic';
import React, { Suspense, use, useRef, useState } from 'react';
import { useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import styled from '@mui/material/styles/styled';

import 'swiper/css';
import 'swiper/css/effect-cards';
import '@/styles/swiperCustom.css'



const StyledPaper = styled(Skeleton)(({ theme }) => ({
    position: 'relative',
    width: 250,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  }));
  
  const Image = styled(Skeleton)({
      width: '100%',
      height: 150,
      marginBottom: '1rem',
  });
  
  function CardSkeleton() {
    return (
      <StyledPaper variant="rectangular" style={{ backgroundColor: "white" }}>
        <Image variant="rectangular" style={{ backgroundColor: "black" }} />
        <Skeleton variant="text" width={150} style={{ backgroundColor: "black" }} />
        <Skeleton variant="text" width={100} style={{ backgroundColor: "black" }} />
      </StyledPaper>
    );
  }

const Card = dynamic(() => import('@/Components/MusicCards/CardMusic'), {
    loading: () => 
        <CardSkeleton />
    
    ,
});



function Home() {
    const [data, setData] = useState(null);

    const fetchNewReleases = async () => {
        try {
            const res = await fetch('http://140.238.122.84/new-releases');
            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchNewReleases();
            setData(res);
        }
        fetchData();
    }, [])
    
    return (
        <><h1 className={styles.HomeText}>
            New Releases
        </h1><div className={styles.swiperContainer}>
                <Swiper
                    effect={'cards'}
                    height={600}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className={styles.swiper}
                    cardsEffect={{
                        slideShadows: false,
                        perSlideOffset: 50,
                    }}
                >

                    {data && data.albums.items.map((item, index) => (
                        <SwiperSlide className={styles.swiperSlide} key={index}>
                            <Card
                                author={item.artists[0].name}
                                title={item.name}
                                imagen={item.images[0].url} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div></>
    )
}

export default Home