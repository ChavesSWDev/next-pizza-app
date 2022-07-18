import React from 'react'
import styles from '../styles/Add.module.css'

const AddButton = ({setOpen}) => {
  return (
    <div 
        className={styles.addButton}
        onClick={() => setOpen(true)}
    >
        Add New Pizza
    </div>
  )
}

export default AddButton