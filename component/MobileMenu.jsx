import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/MobileMenu.module.css"


const MobileMenu = ({prop}) => {
  return (
    <div className={styles.container}>
      <Image className={styles.img} src="/images/smoking-pablo-pacheco.webp" layout="fill" alt="" />
      <ul className={styles.list}>
        <p className="logo">Alfonso<br/><span>'s pizza</span> </p>
        <span className={styles.cross}>
          <Image src="/icons/cross.svg" layout="fill" alt="" onClick={prop}/>
        </span>
        <li className={styles.listItem} >Homepage</li>
        <li className={styles.listItem} >Products </li>
        <li className={styles.listItem} >Menu</li>
        <li className={styles.listItem} >Events</li>
        <li className={styles.listItem} >Blog</li>
        <li className={styles.listItem} >Contact</li>
      </ul>
    </div>
    
  )
}

export default MobileMenu