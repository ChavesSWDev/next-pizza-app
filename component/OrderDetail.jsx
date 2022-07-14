import styles from '../styles/OrderDetail.module.css'
import React, { useState } from 'react'

const OrderDetail = ({total, createOrder}) => {
    const [customer, setCustomer] = useState("")
    const [address, setAddress] = useState("")

    const order = (state) => state.order

    const handleCashOrder = () => {
        createOrder({customer, address, total, method: 0})
    }

    return (
    <section className={styles.container}>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>You Will Pay <i>${total}</i> On Delivery</h1>
            <div className={styles.item}>
                <label className={styles.label} htmlFor="user-info">Name and Surname </label>
                <input className={styles.input} 
                    placeholder='Name Surname' 
                    type="text" 
                    name='user-info' 
                    onChange={(e) => setCustomer(e.target.value)}
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Phone Number</label>
                <input
                    type="text"
                    placeholder="+1 234 567 89"
                    className={styles.input}
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Address</label>
                <textarea
                    rows={5}
                    placeholder="Elton St. 505 NY"
                    type="text"
                    className={styles.textarea}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button className={styles.button} onClick={handleCashOrder} >
                Order
            </button>
        </div>
    </section>
  )
}

export default OrderDetail