import React from 'react'
import Image from 'next/image'
import styles from '../styles/GridItem.module.css'

const GridItem = () => {
  return (
    <div className={styles.container}>
        <Image className={styles.item} src="/images/1.jpg" key="1gofxzvxb"
        alt=''
        width="500" height="500"
        placeholder="blur"
        blurDataURL='/images/1.jpg'
        />

    </div>
    
  )
}

export default GridItem