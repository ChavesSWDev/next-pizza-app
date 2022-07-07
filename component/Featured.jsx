import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Featured.module.css'

const Featured = () => {
  const [heroIndex, setHeroIndex] = useState(1)
  const images = [
    "/images/mix-pizza-chicken-tomato-bell-pepper-olives-mushroom-side-view.jpg",
    "/images/ivan-torres-MQUqbmszGGM-unsplash.jpg",
    "/images/vitalii-chernopyskyi-Oxb84ENcFfU-unsplash.jpg"
  ]

  const nextSlide = () => {
    if(heroIndex !== images.length - 1){
        setHeroIndex(heroIndex => heroIndex + 1)
    } else {
        setHeroIndex(0)
    }
  }

  const prevSlide = () => {        
      if(heroIndex !== 0){
          setHeroIndex(heroIndex => heroIndex - 1)
      } else{
          setHeroIndex(images.length - 1)
      }    
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrow_container} style={{left:0}} onClick={prevSlide} >
        <Image className={styles.arrow} src="/icons/arrow-ios-back.svg" layout='fill' alt="back" />
      </div>
      <div className={styles.wrapper}>
        <h2>Think. Feel. Pizza.</h2>
        <p>Beautiful, Italian Sourced & Freshly Made Pizzas</p>
          {           
              (<Image className={styles.hero} src={images[heroIndex]} key={heroIndex}  placeholder="blur" blurDataURL="/images/dumy-pizza.jpeg" layout="fill" alt="hero" />)
          }
        <div className={styles.mobiles}>
          <Image className={styles.mobile} src="/icons/app-store.svg" width="185" height="60" layout='fixed' alt='app store' />
          <Image className={styles.mobile} src="/icons/gplay.svg" layout="fixed" width="205" height="60" style={{marginLeft:10}} alt='google lay'/>
        </div>

      </div>
      <div className={styles.arrow_container} style={{right:0}} onClick={nextSlide} >
        <Image className={styles.arrow} src="/icons/arrow-ios-forward.svg" layout="fill"  alt="forward" />
      </div>
    </div>
  )
}

export default Featured