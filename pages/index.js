import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Featured from '../component/Featured.jsx'
import PizzaList from '../component/PizzaList.jsx'
import Footer from '../component/Footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza House in London</title>
        <meta name="description" content="Best Pizza Ever" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList />
  
    </div>
  )
}
