import React from 'react'
import styles from '../styles/PizzaList.module.css'
import GridItem from './GridItem'

const PizzaList = () => {
  return (
        <div className={styles.container}>
            <h1 className={styles.title}>Discover Beautiful Italian Pizza</h1>
            <p className={styles.desc}>
            We use only the best ingredients sourced directly from Italy, with real chefs preparing them. They are then cooked in one of the best ovens.
            </p>
            <div className={styles.grid_wrapper}>
                <GridItem /> 
                <GridItem /> 
                <GridItem /> 
                <GridItem /> 
                <GridItem /> 
                <GridItem /> 
                
               
            </div>
        </div>
    )
}

export default PizzaList