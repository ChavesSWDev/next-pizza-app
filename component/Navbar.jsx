import React, { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const [clientWindowHeight, setClientWindowHeight] = useState("");
  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  const [boxShadow, setBoxShadow] = useState(0);
  const [textShadow, setTextShadow] = useState("0 1px 1px #0f1111");
  const [fontColor, setfontColor] = useState("#fff");
  const [clientWindowWidth, setClientWindowWidth] = useState();
  const [menuStatus, setMenuStatus] = useState(false);
  const [displayStatus, setDisplayStatus] = useState("none");

  const cartQuantity = useSelector(state => state.cart.quantity)

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (global?.location?.href !== "https://next-pizza-app.vercel.app/")
        return (
          setBackgroundTransparacy(1),
          setTextShadow("none"),
          setfontColor("#9a031e"),
          setBoxShadow(30)
        );
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (clientWindowHeight > 130)
      return (
        setBackgroundTransparacy(1),
        setTextShadow("none"),
        setfontColor("#9a031e"),
        setBoxShadow(30)
      );

    setTextShadow("0 1px 1px #0f1111");
    setfontColor("#fff");
    setBackgroundTransparacy(clientWindowHeight / 1000);
    setBoxShadow(clientWindowHeight / 3);
  }, [clientWindowHeight]);

  const handleClientWidth = () => {
    const width = window.innerWidth;
    setClientWindowWidth(width);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleClientWidth);
    }
    return () => window.removeEventListener("resize", handleClientWidth);
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      handleClientWidth()
    }
  },[]);

  useEffect(() => {
    if (clientWindowWidth <= 1024) {
      setDisplayStatus("flex");
    } else {
      setDisplayStatus("none");
    }
  }, [clientWindowWidth]);

  return (
    <div
      className={styles.container}
      style={{
        height: `${menuStatus ? "100vh" : "100px"}`,
        boxShadow: `0 0 5px 1px rgb(0 0 0 / ${boxShadow}%)` ,
      }}
    >
      <section
        className={styles.menu}
        style={{ display: `${menuStatus ? "none" : "flex"}`,
        background: `rgba(212, 163, 115, ${backgroundTransparacy})`,
        textShadow: `${textShadow}`,
        color: `${fontColor}`,
       }}
      >
        <div className={styles.item}>
          <div className={styles.callButton}>
            <Image
              src="/icons/call.svg"
              width="32px"
              height="32px"
              alt="call"
            />
          </div>
          <div className={styles.texts}>
            <div className={styles.text}>ORDER NOW</div>
            <div className={styles.text}>020 3535 8888</div>
          </div>
          <Link href="/" passHref>
            <div 
              className={styles.narrowLogo}
              style={{display: `${displayStatus}` }}
            >
              <p className="logo" style={{ display: `${displayStatus}` }}>
                Alfonso
                <br />
                <span>'s pizza</span>
              </p>
            </div>
          </Link>
        </div>
        <div className={styles.item}>
          <ul className={styles.list}>
            <Link href="/" passHref>
              <li className={styles.listItem}>Homepage</li>
            </Link>
            <Link href="/products" passHref>
              <li className={styles.listItem}>Products </li>
            </Link>
            <li className={styles.listItem}>Menu</li>
            <Link href="/" passHref>
              <p className="logo">
                Alfonso
                <br />
                <span>'s pizza</span>
              </p>
            </Link>
            <li className={styles.listItem}>Events</li>
            <li className={styles.listItem}>Blog</li>
            <a target="_blank" href="https://github.com/cory-sydn" rel="noopener noreferrer">
              <li className={styles.listItem}>Contact</li>
            </a>
          </ul>
        </div>
        <div className={styles.item}>
          <Link href="/cart" passHref>
            <div className={styles.cart}>
              <Image
                src="/images/cart1.svg"
                width="42px"
                height="42px"
                alt="cart"
              />
              <div className={styles.counter}>{cartQuantity}</div>
            </div>
          </Link>
          <div style={{ display: `${displayStatus}` }}>
            <Image
              className={styles.burger}
              src="/icons/burger-menu.svg"
              onClick={() => setMenuStatus(true)}
              width={50}
              height={50}
              alt=""
            />
          </div>
        </div>
      </section>
      {menuStatus && 
        <div className={styles.mobileMenu}>
          <MobileMenu setMenuStatus={setMenuStatus}/>
        </div>
      }
    </div>
  );
};

export default Navbar;
