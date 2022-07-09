import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Featured from '../component/Featured.jsx'
import PizzaList from '../component/PizzaList.jsx'
import axios from 'axios'

export default function Home({pizzaList}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza House in London</title>
        <meta name="description" content="Best Pizza Ever" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList}/>
  
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/products")
  return {
    props:{
      pizzaList:response.data,
    },
  };
};