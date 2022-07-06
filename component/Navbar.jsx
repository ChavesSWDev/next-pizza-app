import React, { useState, useEffect } from 'react'
import styles from '../styles/Navbar.module.css'
import Image from "next/image"
import Bmenu from './Bmenu';


const Navbar = () => {
  const [clientWindowHeight, setClientWindowHeight] = useState("");
  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  const [boxShadow, setBoxShadow] = useState(30);
  const [textShadow, setTextShadow] = useState("0 1px 1px #0f1111");
  const [fontColor, setfontColor] = useState("#fff");

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (global?.location?.href !== "http://localhost:3000/") 
        return setBackgroundTransparacy(1), setTextShadow("none"), setfontColor("#9a031e"), setBoxShadow(30)
    }
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (clientWindowHeight > 130)  return setBackgroundTransparacy(1) , setTextShadow("none") , setfontColor("#9a031e")
    
    setTextShadow("0 1px 1px #0f1111")
    setfontColor("#fff")
    setBackgroundTransparacy(clientWindowHeight);
    setBoxShadow(clientWindowHeight /4);    
  }, [clientWindowHeight]);



  return (
    <div className={styles.container}  
        style={{
          background: `rgba(212, 163, 115, ${backgroundTransparacy})`,
          boxShadow: `0 0 1px 2px rgb(0 0 0 / ${boxShadow}%)`,
          textShadow: `${textShadow}`,
          color: `${fontColor}`
          }}>
      <div className={styles.item} >
        <div className={styles.callButton} >
          <Image src="/images/call.svg" width="32px" height="32px" alt="call"/>
        </div>
        <div className={styles.texts} >
          <div className={styles.text} >ORDER NOW</div>
          <div className={styles.text} >020 3535 8888</div>
        </div> 
      </div>
      <div className={styles.item} >
        <Image className={styles.hamburger} src="/images/hamburger-menu.svg" width={50} height={50} color="white" alt='' />
        <ul className={styles.list}>
          <li className={styles.listItem} >Homepage</li>
          <li className={styles.listItem} >Products </li>
          <li className={styles.listItem} >Menu</li>
          <p className="logo">Alfonso<br/><span>'s pizza</span> </p>
          <li className={styles.listItem} >Events</li>
          <li className={styles.listItem} >Blog</li>
          <li className={styles.listItem} >Contact</li>
        </ul>
      </div>
      <div className={styles.item} >
        <div className={styles.cart} >
          <Image src="/images/cart.png" width="42px" height="42px" alt="call"/>
          <div className={styles.counter} >0</div>
        </div>        
      </div>

    </div>
  )
}

export default Navbar