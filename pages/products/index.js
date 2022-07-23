import axios from 'axios'
import React from 'react'
import PizzaList from '../../component/PizzaList'

const index = ({pizzaList}) => {    
    return (
        <PizzaList pizzaList={pizzaList}/>
    )
}

export const getServerSideProps = async () => {
    const response = await axios.get("https://next-pizza-app.vercel.app/api/products")
    return {
        props: {
            pizzaList: response.data
        }
    }
}

export default index