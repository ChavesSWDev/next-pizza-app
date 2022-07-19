import styles from '../../styles/Order.module.css'
import Image from 'next/image'
import axios from 'axios'

const Order = ({order}) => {
    const status = order.status

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
                    <thead>
                        <tr className={styles.trTitle}>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.tr}>
                            <td>
                                <span className={styles.id}>{order._id.slice(-8)}</span>
                            </td>
                            <td>
                                <span className={styles.name}>{order.customer}</span>
                            </td>
                            <td>
                                <span className={styles.address}>{order.address}</span>
                            </td>
                            <td>
                                <span className={styles.total}>${order.total}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.row}>
                <div className={handleStatus(0)}>
                    <Image src="/icons/paid.svg" width={30} height={30} alt="" />
                    <span>Payment</span>
                    <div className={styles.checkedIcon}>
                        <Image
                            className={styles.checkedIcon}
                            src="/icons/checked.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                    </div>
                </div>
                <div className={handleStatus(1)}>
                    <Image src="/icons/preparing.svg" width={30} height={30} alt="" />
                    <span>Preparing</span>
                    <div className={styles.checkedIcon}>
                        <Image
                            className={styles.checkedIcon}
                            src="/icons/checked.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                    </div>
                </div>
                <div className={handleStatus(2)}>
                    <Image src="/icons/delivery-motorbike.svg" width={30} height={30} alt="" />
                    <span>On the way</span>
                    <div className={styles.checkedIcon}>
                        <Image
                            className={styles.checkedIcon}
                            src="/icons/checked.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                    </div>
                </div>
                <div className={handleStatus(3)}>
                    <Image src="/icons/delivered.svg" width={30} height={30} alt="" />
                    <span>Delivered</span>
                    <div className={styles.checkedIcon}>
                        <Image
                            className={styles.checkedIcon}
                            src="/icons/checked.svg"
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
                    <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount:</b>$0.00
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>${order.total}
                </div>
                <button disabled className={styles.button}>
                    {order.method < 1 
                        ? <span>Pay On Delivery</span>
                        : <span>PAID&nbsp;<span className={styles.paidIcon}>&#10004;</span></span>}
                </button>
            </div>
        </div>


    </div>
  )
}


export const getServerSideProps = async ({params}) => {
    const response = await axios.get(`http://localhost:3000/api/orders/${params.id}`)
    return {
        props: {
            order:response.data
        }
    }
}

export default Order