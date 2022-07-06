import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Bmenu.module.css"


const Bmenu = () => {
  const [clientWindowWidth, setClientWindowWidth] = useState()
  const [hamburgerStatus, sethamburgerStatus] = useState("none")

  const handleClientWidth = () => {
    const width = window.innerWidth
    setClientWindowWidth(width)
    console.log(clientWindowWidth);     
  }

  useState(() => {
    if(typeof window !== "undefined") {
      window.addEventListener("resize", handleClientWidth);
    }

    return () => window.removeEventListener("resize", handleClientWidth)
  })

  useEffect(() => {
    if(clientWindowWidth < 1024) {
      sethamburgerStatus("flex")
    } else {
      sethamburgerStatus("none")
    }
  },[clientWindowWidth])

  return (
    <div className={styles.container} style={{display:`${hamburgerStatus}`}}>
      <Image className={styles.img} src="/images/smoking-pablo-pacheco.webp" layout="fill" alt="" />
      <ul className={styles.list}>
        <p className="logo">Alfonso<br/><span>'s pizza</span> </p>
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

export default Bmenu