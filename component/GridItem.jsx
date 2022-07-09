import React from 'react'
import Image from 'next/image'
import styles from '../styles/GridItem.module.css'
import Link from 'next/link'

const GridItem = ({pizza}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{pizza.title}</h3>
      <div className={styles.imgContainer}>
        <Link href={`/product/${pizza._id}`} passHref>
          <Image className={styles.img} src={pizza.img}
            alt=''
            layout='fill'
            placeholder="blur"
            blurDataURL='/images/1.jpg'
          />
        </Link>
      </div>
      <p className={styles.price}>${pizza.prices[0].new} </p>
      <p className={styles.desc}>{pizza.desc}</p>
    </div>    
  )
}

export default GridItem