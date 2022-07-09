import React from 'react'
import styles from '../styles/PizzaList.module.css'
import GridItem from './GridItem'

const PizzaList = ({pizzaList}) => {
  return (
        <div className={styles.container}>
            <div className={styles.grid_wrapper}>
                {pizzaList.map((pizza) => {
                    return (<GridItem pizza={pizza} key={pizza._id}/>)                    
                })}
            </div>
        </div>
    )
}

export default PizzaList