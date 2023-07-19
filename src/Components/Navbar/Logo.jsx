'use client'
import Lottie from "lottie-react";
import logo from './Lottie/wawes.json'
import React from 'react';
import styles from './Logo.module.css'
function Logo() {
    const [isHovering, setIsHovering] = React.useState(false);
    const hadleMouseEnter = () => {
        setIsHovering(true);
    }

  return (
    <div className={styles.logoContainer} onMouseEnter={hadleMouseEnter}>
       <Lottie animationData={logo} className={styles.logo__lottie} loop={false} draggable={true} autoplay={true} />
       <a className={styles.logo} onMouseEnter={hadleMouseEnter} > <span className='logo__react'><span className='logo__simbol'>𝄞</span>BeatScribe</span></a>
    </div>
  )
}

export default Logo