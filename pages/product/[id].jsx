import React, { useState } from "react";
import Image from "next/image";
import styles from "../../styles/Product.module.css";

const Product = () => {
  const [size, setSize] = useState(0);
  const pizza = {
    id: 1,
    img: "/images/5.jpg",
    name: "The Vegan One",
    price: [
      { old: 22, new: 19.9 },
      { old: 26, new: 23.9 },
      { old: 31, new: 27.9 },
    ],
    desc: "Tomato Base Sauce, Spring Onions, Chestnut Mushrooms, Sunblushed Tomatoes, Baby Spinach, Vegan Mozzarella,",
  };

  return (
    <div className={styles.container}>
      <div className={styles.context}>
        <div className={styles.left}>
          <div className={styles.imageContainer}>
            <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
          </div>
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>{pizza.name} </h1>
          <span className={styles.price}>
            <Image
              className={styles.cross}
              src="/images/cross.svg"
              layout="fill"
              alt=""
              style={{ opacity: 0.5 }}
            />
            ${pizza.price[size].old}
          </span>
          <span className={styles.discount}>${pizza.price[size].new}</span>
          <p className={styles.desc}>{pizza.desc} </p>
          <h3 className={styles.choose}>Choose the size</h3>
          <div className={styles.sizes}>
            <div className={styles.size} onClick={() => setSize(0)}>
              <Image src="/images/small-size.svg" alt="" layout="fill" />
              <span className={styles.number}>Small</span>
            </div>
            <div className={styles.size} onClick={() => setSize(1)}>
              <Image src="/images/medium-size.svg" alt="" layout="fill" />
              <span className={styles.number}>Medium</span>
            </div>
            <div className={styles.size} onClick={() => setSize(2)}>
              <Image src="/images/larger-size.svg" alt="" layout="fill" />
              <span className={styles.number}>Large</span>
            </div>
          </div>
          <h3 className={styles}>Choose Additional Ingredients</h3>
          <div className={styles.ingredients}>
            <div className={styles.option}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="double"
                name="double"
              />
              <label htmlFor="double">Double Ingredients </label>
            </div>
            <div className={styles.option}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="cheese"
                name="cheese"
              />
              <label htmlFor="cheese">Extra Cheese </label>
            </div>
            <div className={styles.option}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="spicy"
                name="spicy"
              />
              <label htmlFor="spicy">Spicy Souce </label>
            </div>
            <div className={styles.option}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="garlic"
                name="garlic"
              />
              <label htmlFor="garlic">Garlic Souce </label>
            </div>
          </div>
        <div className={styles.add} >
            <input type="number" defaultValue={1} className={styles.quantity} />
            <button className={styles.button}>Add to Cart</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
