import styles from '../styles/Cart.module.css'
import Image from 'next/image'

const Cart = () => {
  return (
    <div className={styles.container}>
        <div className={styles.left}> 
            <table className={styles.table}>
                <tr className={styles.tr}>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Extras</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>
                    <div className={styles.imgContainer}>
                        <Image className={styles.imgContainer} src="/images/5.jpg" alt='' objectFit='cover' objectPosition="center" layout='fill' />
                    </div>
                    </td>
                    <td>
                        <span className={styles.name}>Coralzo</span>
                    </td>
                    <td>
                        <span className={styles.extras}>
                            Double Ingredients, spicy souce, garlic souce
                        </span>
                    </td>
                    <td>
                        <span className={styles.price}>$19.90</span>
                    </td>
                    <td>
                        <span className={styles.quantity}>3</span>
                    </td>
                    <td>
                        <span className={styles.total}>$59.70</span>
                    </td>
                </tr>
            </table>
        </div>
        <div className={styles.left}>
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
                <button className={styles.button}>CHECKOUT NOW!</button>
            </div>
        </div>

    </div>
  )
}

export default Cart