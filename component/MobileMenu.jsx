import Image from "next/image";
import Link from "next/link";
import styles from "../styles/MobileMenu.module.css"

const MobileMenu = ({setMenuStatus}) => {
  return (
    <div className={styles.container}>
      <Image className={styles.img} src="/images/smoking-pablo-pacheco.webp" layout="fill" alt="" />
      <ul className={styles.list}>
        <p className="logo">Alfonso<br/><span>'s pizza</span></p>
        <span className={styles.cross} onClick={()=> setMenuStatus(false)}>&#10060;</span>
        <Link href="/" passhref>
          <li className={styles.listItem} onClick={()=> setMenuStatus(false)}>Homepage</li>
        </Link>
        <Link href="/products" passHref>
          <li className={styles.listItem} onClick={()=> setMenuStatus(false)}>Products</li>
        </Link>
        <li className={styles.listItem} onClick={()=> setMenuStatus(false)}>Menu</li>
        <li className={styles.listItem} onClick={()=> setMenuStatus(false)}>Events</li>
        <li className={styles.listItem} onClick={()=> setMenuStatus(false)}>Blog</li>
        <a target="_blank" href="https://github.com/cory-sydn" rel="noopener noreferrer">
          <li className={styles.listItem} onClick={()=> setMenuStatus(false)}>Contact</li>
        </a>
      </ul>
    </div>
  )
}

export default MobileMenu