import styles from '../../styles/Admin.module.css'
import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

const Index = ({products, orders }) => {
    const [pizzaList, setPizzaList] = useState(products)
    const [orderList, setOrderList] = useState(orders)
    const statusArr = ["Preparing", "On the way", "Delivered"]

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete("http://localhost:3000/api/products/" +id)
            setPizzaList(pizzaList.filter(pizza => pizza._id === id))
        } catch (err) {
            console.log(err);
        }
    }

    const handleNextStatus = async (id) => {
        const item = orderList.filter((order)=> order._id === id)[0]
        const currentStatus = item.status
        try {
            const updateRes = await axios.put("http://localhost:3000/api/orders/" + id, {status: currentStatus + 1,})
console.log(order.createdAt);
            setOrderList([
                updateRes.data,
                ...orderList.filter(order=> order._id !== id)
            ].sort((a,b)=> a.createdAt - b.createdAt) )
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Products </h1>
                <table className={styles.table}>
                    <tbody>
                        <th>Image</th>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tbody>
                    {pizzaList.map((product)=> (
                        <tbody className={styles.tbody} key={product._id} >
                            <td>
                                <Image src={product.img}  width={60} height={60} objectFit="cover" alt="" />
                            </td>
                            <td>...{product._id.slice(19, 24)}</td>
                            <td>{product.title}</td>
                            <td>[{product.prices[0].old}]{product.prices[0].new}</td>
                            <td>
                                <button className={styles.button}>Edit</button>
                                <button className={styles.button} onClick={() => handleDelete(product._id)} >Delete</button>                            
                            </td>
                        </tbody>
                    ))}
                </table>
            </div>
            <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                    <table className={styles.table}>
                        <tbody>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tbody >
                        {orderList.map((order) => (
                            <tbody className={styles.tbody} key={order._id} >
                                <td>...{order._id.slice(19,24)}</td>
                                <td>{order.customer}</td>
                                <td>${order.total}</td>
                                <td>{order.method === 0 ? (<span>Cash</span>) : (<span>Paid</span>) } </td>
                                <td>{statusArr[order.status]}</td>
                                <td>
                                    {order.status < 2 ? (
                                            <button className={styles.stage} onClick={() => handleNextStatus(order._id)} >Next Stage</button>
                                        ) : (
                                            <button className={styles.stage}>Completed</button>
                                        )
                                    }
                                </td>
                            </tbody>
                        ))}
                    </table>
            </div>
        </section>
    )
}


export const getServerSideProps = async (context) => {
    const myCookie = context.req?.cookies || "";

    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false //not cached.
            },
        };
    }

    const productRes = await axios.get(`http://localhost:3000/api/products`)
    const orderRes = await axios.get(`http://localhost:3000/api/orders`)
    return {
        props: {
            products: productRes.data,
            orders: orderRes.data
        }
    }
}

export default Index