import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import OrderDetail from '../component/OrderDetail';


const Cart = () => {
    const [open, setOpen] = useState(false)
    const [cash, setCash] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const cart = useSelector(state => state.cart)

    const createOrder = async (data) => {
        try {
            const res = await axios.post("https://next-pizza-app.vercel.app/api/orders", data)
            res.status === 201 && router.push("/orders/"+ res.data._id)
            dispatch(reset())
        } catch (err) {
            console.log(err);
        }
    }

    // This values are the props in the UI
    const amount = `${cart.total.toFixed(2)}`;
    const currency = "USD";
    const style = {"layout":"vertical"};
    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);


        return (<>
                { (showSpinner && isPending) && <div className="spinner" /> }
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            console.log(details);
                            const shipping = details.purchase_units[0].shipping;
                            createOrder({
                                customer:shipping.name.full_name, 
                                address:shipping.address.address_line_1, 
                                total:amount, method:1 
                            })
                        });
                    }}
                />
            </>
        );
    }


  return (
    <div className={styles.container}>
        <div className={styles.left}> 
            <table className={styles.table}>
                <tbody>                    
                    <tr className={styles.tr}>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Extras</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </tbody>
                <tbody>                    
                    {cart.products.map(product => (
                        <tr key={uuidv4()}>
                            <td>
                                <div className={styles.imgContainer}>
                                    <Image className={styles.imgContainer} src={product.img} alt='' objectFit='cover' objectPosition="center" layout='fill' />
                                </div>
                            </td>
                            <td>
                                <span className={styles.name}>{product.title}</span>
                            </td>
                            <td>
                                <span className={styles.extras}>
                                    {product.extraList.map(extra => {
                                        return (<span key={extra._id}>{extra.text}, </span>)
                                    })}
                                </span>
                            </td>
                            <td>
                                <span className={styles.price}>${product.finalPrice}</span>
                            </td>
                            <td>
                                <span className={styles.quantity}>{product.quantity} </span>
                            </td>
                            <td>
                                <span className={styles.total}>${product.finalPrice * product.quantity} </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className={styles.left}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>CART TOTAL</h2>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal:</b>${amount}
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount:</b>$0.00
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>${amount}
                </div>
                {open ? (
                    <div className={styles.paymentMethods}>
                        <button className={styles.cashButton} onClick={() => setCash(true)} >
                            CASH ON DELİVERY
                        </button>
                        <PayPalScriptProvider
                        options={{
                            "client-id": "AaGWpQzWzEr5NkrKAKi4tVOnW3M0O0lsbLFTS31n3kKTsmdWEwRUCUuyYs9MmiNs3Q4DAN4fh0tzIbQ4",
                            components: "buttons",
                            currency: "USD",
                            "disable-funding": "credit,card,p24"
                        }}
                        >
                        <ButtonWrapper
                            currency={currency}
                            showSpinner={false}
                        />
                        </PayPalScriptProvider>                    
                    </div>
                    )   :  (
                        <button className={styles.button} onClick={() => setOpen(true)}>CHECKOUT NOW!</button>
                    )
                }
            </div>
        </div>
        {cash && (
            <OrderDetail total={amount} createOrder={createOrder} />
        )}
    </div>
  )
}

export default Cart