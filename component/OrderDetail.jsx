import styles from '../styles/OrderDetail.module.css'
import React, { useCallback, useEffect, useState } from 'react'
import {GameIconsReturnArrow} from '../public/icons/return'

const OrderDetail = ({total, createOrder, setCash}) => {
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

    const handleReturn = () => {
        setCash(false)
    }

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") handleReturn();
    },[setCash]);

    useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

    return (
        <section className={styles.container}>
            <form className={styles.wrapper} onSubmit={(e) => e.preventDefault()} >
                <span className={styles.return} onClick={handleReturn}>
                    <GameIconsReturnArrow />
                </span>
                <h1 className={styles.title}>You Will Pay <i>
                        <span style={{fontSize:18}} >$</span>{total}
                    </i> On Delivery</h1>
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