import styles from '../styles/OrderDetail.module.css'
import React, { useState } from 'react'

const OrderDetail = ({total, createOrder}) => {
    const [customer, setCustomer] = useState("")
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState([false, ""])

    const handleCashOrder = () => {
        if (customer.length < 3 ) return setMsg([true, "User Name"])
        if (address.length < 9 ) return setMsg([true, "Address information"])
        createOrder({customer, address, total, method: 0})
        setLoading(true)
    }

    return (
        <section className={styles.container}>
            <form className={styles.wrapper} onSubmit={(e) => e.preventDefault()} >
                <h1 className={styles.title}>You Will Pay <i>${total}</i> On Delivery</h1>
                <div className={styles.item}>
                    <label className={styles.label} htmlFor="user-info">Name and Surname </label>
                    <input className={styles.input} 
                        placeholder='Name Surname' 
                        type="text" 
                        name='user-info' 
                        onChange={(e) => setCustomer(e.target.value) + setMsg([false, ""])}
                        required
                        enterKeyHint="send"
                        />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Phone Number</label>
                    <input
                        type="text"
                        placeholder="+1 234 567 89"
                        className={styles.input}
                        onChange={(e) =>setMsg([false, ""])}
                        required
                        enterKeyHint="send"
                        />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Address</label>
                    <textarea
                        rows={5}
                        placeholder="Elton St. 505 NY"
                        type="text"
                        className={styles.textarea}
                        onChange={(e) => setAddress(e.target.value) + setMsg([false, ""])}
                        required
                        enterKeyHint="send"
                        />
                </div>
                <button className={styles.button} onClick={handleCashOrder} >
                    Order
                </button>
                {msg[0] && <span style={{color:"red"}}>{msg[1]} is missing</span>}
            </form>
            {loading && <span className="loading"></span>}
        </section>
    )
}

export default OrderDetail