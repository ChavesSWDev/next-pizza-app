import React, { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import Link from "next/link";


const Navbar = () => {
  const [clientWindowHeight, setClientWindowHeight] = useState("");
  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  const [boxShadow, setBoxShadow] = useState(30);
  const [textShadow, setTextShadow] = useState("0 1px 1px #0f1111");
  const [fontColor, setfontColor] = useState("#fff");
  const [clientWindowWidth, setClientWindowWidth] = useState();
  const [menuStatus, setMenuStatus] = useState(0);
  const [displayStatus, setDisplayStatus] = useState("none");

  const cartQuantity = useSelector(state => state.cart.quantity)

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (global?.location?.href !== "http://localhost:3000/")
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
        setfontColor("#9a031e")
      );

    setTextShadow("0 1px 1px #0f1111");
    setfontColor("#fff");
    setBackgroundTransparacy(clientWindowHeight);
    setBoxShadow(clientWindowHeight / 4);
  }, [clientWindowHeight]);

  const handleMenuStatus = () => {
    if (menuStatus) return setMenuStatus(0);
    setMenuStatus(1);
  };

  const handleClientWidth = () => {
    const width = window.innerWidth;
    setClientWindowWidth(width);
  };

  useState(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleClientWidth);
    }
    return () => window.removeEventListener("resize", handleClientWidth);
  });
  useState(() => {
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
      }}
    >
      <section
        className={styles.menu}
        style={{ display: `${menuStatus ? "none" : "flex"}`,
        background: `rgba(212, 163, 115, ${backgroundTransparacy})`,
        boxShadow: `0 0 1px 2px rgb(0 0 0 / ${boxShadow}%)`,
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
          <div
            style={{
              display: `${displayStatus}`,
              marginLeft: 40,
              marginBottom: 32,
            }}
          >
            <p className="logo" style={{ display: `${displayStatus}` }}>
              Alfonso
              <br />
              <span>'s pizza</span>
            </p>
          </div>
        </div>
        <div className={styles.item}>
          <ul className={styles.list}>
            <li className={styles.listItem}>Homepage</li>
            <li className={styles.listItem}>Products </li>
            <li className={styles.listItem}>Menu</li>
            <p className="logo">
              Alfonso
              <br />
              <span>'s pizza</span>{" "}
            </p>
            <li className={styles.listItem}>Events</li>
            <li className={styles.listItem}>Blog</li>
            <li className={styles.listItem}>Contact</li>
          </ul>
        </div>
        <div className={styles.item}>
          <Link href="/cart" passHref>
            <div className={styles.cart}>
              <Image
                src="/images/cart.png"
                width="42px"
                height="42px"
                alt="call"
              />
              <div className={styles.counter}>{cartQuantity}</div>
            </div>
          </Link>
          <div style={{ display: `${displayStatus}` }}>
            <Image
              className={styles.hamburger}
              src="/icons/hamburger-menu.svg"
              onClick={handleMenuStatus}
              width={50}
              height={50}
              alt=""
            />
          </div>
        </div>
      </section>
      <div
        className={styles.mobileMenu}
        style={{ display: `${menuStatus ? "flex" : "none"}` }}
      >
        <MobileMenu prop={handleMenuStatus}/>
      </div>
    </div>
  );
};

export default Navbar;
