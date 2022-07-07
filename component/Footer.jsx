import Image from 'next/image'
import React from 'react'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container} >
      <div className={styles.wrapper} >
        <Image className={styles.image} src="/images/panaroma-pizza.jpg"  layout='fill'  alt='' />
        <div className={styles.motto}>
          <h3 className={styles.movement}>You Are Invited to the Real Pizza Movement</h3>
          <p>Time is money, money is power, power is pizza, and pizza is knowledge, Let's go!</p>
          <p>Subscribe to the newsletter</p>          
          <input className={styles.input} type="email" name='email' placeholder='Email Adress' />
          <button className={styles.button} name='email' type='submit'>Subscribe</button>
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <div className={styles.cardContext}>      
            <p className={styles.text}>
              1654 R. Don Road #304.
              <br /> London, 85022
              <br /> (020) 437-1010
            </p>
            <p className={styles.text}>
              2356 K. Laquie Rd #235.
              <br /> London, 85022
              <br /> (020) 563-1011
            </p>
            <p className={styles.text}>
              1614 E. Erwin St #104.
              <br /> London, 85022
              <br /> (020) 892-1012
            </p>
            <p className={styles.text}>
              1614 W. Caroll St #125.
              <br /> London, 85022
              <br /> (020) 812-1013
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <div className={styles.cardContext}>      
            <p className={styles.text}>
              MONDAY UNTIL FRIDAY
              <br /> 9:00 – 22:00
            </p>
            <p className={styles.text}>
              SATURDAY - SUNDAY
              <br /> 12:00 – 24:00
            </p>
          </div>
        </div>
      </div>
      <div className={styles.signiture}>
        <div>
            <a href="https://github.com/cory-sydn">Terms of Service</a>
            <span aria-hidden="true">&nbsp; &bull;  &nbsp;</span>
            <a href="https://github.com/cory-sydn">Privacy Policy</a>
        </div>
        <div>
            <i >Made With<span>&nbsp; &#9829;</span></i>
        </div>
        <div><a href="https://github.com/cory-sydn" target="_blank">©<span class="footer-date"></span>&nbsp;Copyright &ensp;<span class="signiture">Koray Soydan</span></a></div>
      </div>
    </div>
  )
}

export default Footer