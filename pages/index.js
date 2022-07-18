import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Featured from '../component/Featured.jsx'
import PizzaList from '../component/PizzaList.jsx'
import axios from 'axios'
import AddButton from '../component/AddButton'
import Add from '../component/Add'
import { useState } from 'react'

export default function Home({ pizzaList, admin }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza House in London</title>
        <meta name="description" content="Best Pizza Ever"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setOpen={setOpen} />}
      <PizzaList pizzaList={pizzaList}/>
      {open && <Add setOpen={setOpen} />}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  /* authorization*/
  const myCookie = ctx.req?.cookies || "";
  let admin = false
  if(myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const response = await axios.get("http://localhost:3000/api/products")
  return {
    props:{
      pizzaList:response.data,
      admin
    },
  };
};