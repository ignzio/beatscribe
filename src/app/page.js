'use client';
import React from 'react';
import styles from '@/styles/Home.module.css';
import dynamic from 'next/dynamic'




export default function Home() {
    const Home = dynamic(() => import('@/Components/Home/Home'), { ssr: false })
  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
            <Home />
        </div>
      </ div>
    </>
  )
}
