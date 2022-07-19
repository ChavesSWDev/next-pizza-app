import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/Product.module.css";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import {addProduct, reset} from '../../redux/cartSlice'

const Product = ({pizza}) => {
  const [size, setSize] = useState(0);
  const [extra, setExtra] = useState(0);
  const [extraList, setExtraList] = useState([]);
  const [price, setPrice] = useState(pizza.prices[0]);   // price is an object {"old": num, "new": num} 
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  const handleCartButton = () => {
    if(quantity < 1) return
    const finalPrice = price.new;
    dispatch(addProduct({...pizza, extraList, finalPrice, quantity}))
  }

  const handleSize = (index) => {
    setSize(i => index)    
  }

  const handleExtra = (e, option) => {
    const checked = e.target.checked;

    if(checked) {
      setExtra(extra => extra + option.price);
      setExtraList(prev => [...prev, option])
    } else {
      setExtra(extra => extra - option.price);
      setExtraList(extraList.filter(extra=>extra._id !== option._id))
    }    
  }

  const updatePrice = (size, extra) => {
    setPrice( price =>
      price =
      {
        "old": pizza.prices[size].old + extra,
        "new": pizza.prices[size].new + extra
      }
    )
  }

  useEffect(()=> {
    updatePrice(size, extra)
  }, [size , extra])

  return (
    <div className={styles.container}>
      <div className={styles.context}>
        <div className={styles.left}>
          <div className={styles.imageContainer}>
            <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
          </div>
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>{pizza.title} </h1>
          <span className={styles.price}>
            <Image
              className={styles.cross}
              src="/icons/cross.svg"
              objectFit="cover"
              layout="fill"
              alt=""
              style={{ opacity: 0.5 }}
            />
            ${price.old}
          </span>
          <span className={styles.discount}>${price.new}</span>
          <p className={styles.desc}>{pizza.desc} </p>
          <h3 className={styles.choose}>Choose the size</h3>
          <div className={styles.sizes}>
            <div className={styles.size} onClick={() => handleSize(0) }>
              <Image src="/icons/small-size.svg" alt="" layout="fill" />
              <span className={styles.number}>Small</span>
            </div>
            <div className={styles.size} onClick={() => handleSize(1) }>
              <Image src="/icons/medium-size.svg" alt="" layout="fill" />
              <span className={styles.number}>Medium</span>
            </div>
            <div className={styles.size} onClick={() => handleSize(2) }>
              <Image src="/icons/larger-size.svg" alt="" layout="fill" />
              <span className={styles.number}>Large</span>
            </div>
          </div>
          <h3 className={styles}>Choose Additional Ingredients</h3>
          <div className={styles.ingredients}>
            {pizza.extraOptions.map((option) => {
              return (
                <div className={styles.option} key={option._id}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    id={option.text} 
                    name={option.text} 
                    onClick={(e)=>handleExtra(e, option) }
                  />
                  <label htmlFor={option.text} >{option.text} </label>
                </div>
              )
            })}         
          </div>
        <div className={styles.add} >
            <input type="number" max={50} min={0} defaultValue={1} className={styles.quantity} onChange={(e)=>setQuantity(e.target.value)} />
            <button className={styles.button} onClick={handleCartButton}>Add to Cart</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({params}) => {
  const response = await axios.get(`http://localhost:3000/api/products/${params.id}`)
  return {
    props:{
      pizza:response.data,
    },
  };
};

export default Product;
