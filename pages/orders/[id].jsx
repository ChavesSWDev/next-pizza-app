import styles from '../../styles/Order.module.css'
import Image from 'next/image'

const Order = () => {
    const status = 0

    const handleStatus = (number) => {
        if (number - status < 1 ) return styles.done
        if (number - status === 1 ) return styles.inProgress
        if (number - status > 1 ) return styles.waiting
        
    }

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.row}>
                <table className={styles.table}>
                    <tr className={styles.trTitle}>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Total</th>
                    </tr>
                    <tr className={styles.tr}>
                        <td>
                            <span className={styles.id}>129837819237</span>
                        </td>
                        <td>
                            <span className={styles.name}>John Doe</span>
                        </td>
                        <td>
                            <span className={styles.address}>Elton st. 212-33 LA</span>
                        </td>
                        <td>
                            <span className={styles.total}>$79.80</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div className={styles.row}>
                <div className={handleStatus(0)}>
                    <Image src="/images/paid.svg" width={30} height={30} alt="" />
                    <span>Payment</span>
                    <div className={styles.checkedIcon}>
                        <Image
                            className={styles.checkedIcon}
                            src="/images/checked.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                    </div>
                </div>
                <div className={handleStatus(1)}>
                    <Image src="/images/preparing.svg" width={30} height={30} alt="" />
                    <span>Preparing</span>
                    <div className={styles.checkedIcon}>
                        <Image
                            className={styles.checkedIcon}
                            src="/images/checked.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                    </div>
                </div>
                <div className={handleStatus(2)}>
                    <Image src="/images/delivery-motorbike.svg" width={30} height={30} alt="" />
                    <span>On the way</span>
                    <div className={styles.checkedIcon}>
                        <Image
                            className={styles.checkedIcon}
                            src="/images/checked.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                    </div>
                </div>
                <div className={handleStatus(3)}>
                    <Image src="/images/delivered.svg" width={30} height={30} alt="" />
                    <span>Delivered</span>
                    <div className={styles.checkedIcon}>
                        <Image
                            className={styles.checkedIcon}
                            src="/images/checked.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                    </div>
                </div>
            </div> 
        </div>
        <div className={styles.right}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>CART TOTAL</h2>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal:</b>$79.60
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount:</b>$0.00
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>$79.60
                </div>
                <button disabled className={styles.button}>
                    PAID
                </button>
            </div>
        </div>


    </div>
  )
}

export default Order