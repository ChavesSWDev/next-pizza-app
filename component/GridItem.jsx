import React from 'react'
import Image from 'next/image'
import styles from '../styles/GridItem.module.css'
import Link from 'next/link'

const GridItem = ({pizza}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{pizza.title}</h3>
      <Link href={`/product/${pizza._id}`} passHref>
        <div className={styles.wrapper}>
          <div className={styles.imgContainer}>
              <Image className={styles.img} src={pizza.img}
                alt=''
                layout='fill'
                placeholder="blur"
                blurDataURL='/images/1.jpg'
                />
          </div>
          <p className={styles.price}>${pizza.prices[0].new} </p>
          <p className={styles.desc}>{pizza.desc}</p>
        </div>
      </Link>
    </div>    
  )
}

export default GridItem