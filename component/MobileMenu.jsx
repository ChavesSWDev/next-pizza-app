import Image from "next/image";
import Link from "next/link";
import styles from "../styles/MobileMenu.module.css"


const MobileMenu = ({prop}) => {
  return (
    <div className={styles.container}>
      <Image className={styles.img} src="/images/smoking-pablo-pacheco.webp" layout="fill" alt="" />
      <ul className={styles.list}>
        <p className="logo">Alfonso<br/><span>'s pizza</span> </p>
        <span className={styles.cross} onClick={prop}>&#10060;</span>
        <Link href="/" passhref>
          <li className={styles.listItem} onClick={prop}>Homepage</li>
        </Link>
        <li className={styles.listItem} onClick={prop}>Products </li>
        <li className={styles.listItem} onClick={prop}>Menu</li>
        <li className={styles.listItem} onClick={prop}>Events</li>
        <li className={styles.listItem} onClick={prop}>Blog</li>
        <li className={styles.listItem} onClick={prop}>Contact</li>
      </ul>
    </div>
    
  )
}

export default MobileMenu