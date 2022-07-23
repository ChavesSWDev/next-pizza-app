import styles from '../../styles/Admin.module.css'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Edit from '../../component/Edit'

const Index = ({products, orders }) => {
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(null)
    const [pizzaList, setPizzaList] = useState(products)
    const [orderList, setOrderList] = useState(orders)
    const statusArr = ["Preparing", "On the way", "Delivered"]

    const handleUpdate = (pizza) => {
        setUpdate(pizza)
        setOpen(true)
    }
 
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3000/api/products/" +id)
            setPizzaList(pizzaList.filter(pizza => pizza._id !== id))
        } catch (err) {
            console.log(err);
        }
    }

    const handleNextStatus = async (id) => {
        const item = orderList.filter((order)=> order._id === id)[0]
        const currentStatus = item.status
        try {
            const updateRes = await axios.put("http://localhost:3000/api/orders/" + id, {status: currentStatus + 1,})
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
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {pizzaList.map((product)=> (
                        <tbody className={styles.tbody} key={product._id} >
                            <tr className={styles.tr}>
                                <td className={styles.imgContainer}>
                                    <Image src={product.img}  width={60} height={60} objectFit="cover" alt="" />
                                </td>
                                <td className={styles.id}>...{product._id.slice(-6)}</td>
                                <td><p>{product.title}</p></td>
                                <td>[${product.prices[0].old}] ${product.prices[0].new}</td>
                                <td>
                                    <button className={styles.button} onClick={() => handleUpdate(product)} >Edit</button>
                                    <button className={styles.button} onClick={() => handleDelete(product._id)}>Delete</button>                            
                                </td>                                
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead >
                    {orderList.map((order) => (
                        <tbody className={styles.tbody} key={order._id} >
                            <tr className={styles.tr}>
                                <td className={styles.id}>...{order._id.slice(-6)}</td>
                                <td>{order.customer}</td>
                                <td>${order.total}</td>
                                <td>{order.method === 0 ? (<span>Cash</span>) : (<span>Paid</span>) } </td>
                                <td>{statusArr[order.status]}</td>
                                <td>
                                    {order.status < 2 ? (
                                            <button className={styles.stage} onClick={() => handleNextStatus(order._id)}>Next Stage</button>
                                        ) : (
                                            <button className={styles.stage}>Completed</button>
                                        )
                                    }
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            {open &&  <Edit setOpen={setOpen} product={update} />}
        </section>
    )
}


export const getServerSideProps = async (context) => {
    /* authorization */
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