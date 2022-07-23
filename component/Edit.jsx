import { useState } from 'react'
import styles from '../styles/Add.module.css'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import Image from 'next/image'

const Edit = ({setOpen, product}) => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState(product.title)
    const [desc, setDesc] = useState(product.desc)
    const [prices, setPrices] = useState([])
    const [extra, setExtra] = useState(null)
    const [extraOptions, setExtraOptions] = useState([...product.extraOptions])
    const [loading, setLoading] = useState(false)

    const changePrice = (e, size) => {
        const currentPrices = Object.assign({}, product.prices);
        if (e.target.name === "old") {           
            setPrices(currentPrices, currentPrices[size].old = Number(e.target.value));
        } else {
            setPrices(currentPrices, currentPrices[size].new = Number(e.target.value));
        }
    }

    const handleExtraInput = (e) => {
        if (e.target.value < 1) return
        setExtra({...extra, [e.target.name]: e.target.value})
    };

    const handleExtra = () => {
        if (extra === null) return
        if (extra.text === undefined || extra.price === undefined ) return
        if (!extra.text.length || !extra.price.length ) return
        setExtraOptions(prev => [...prev, extra])
    }

    const handleRemove = (element) => {
        const newList = extraOptions.filter(option => option !== element )
        setExtraOptions(newList)
    }

    const handleCreate = async() => {
        setLoading(true)
        const updateImg = async () => {
            if (file !== null) { 
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "storage")
                try {
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/dyv2ytol5/upload",
                        data
                        ); 
                        const { url } = uploadRes.data
                        return url
                    } catch (err) {
                        console.log(err);                
                    }
            } else {
                return product.img
            }
        }

        try {
            const updateProduct = {
                title,
                desc,
                img: await updateImg(),
                prices: prices.length > 0 ? prices : product.prices,
                extraOptions
            }
            await axios.put(`http://localhost:3000/api/products/${product._id}`, updateProduct)
            setOpen(false)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.wrapper} onSubmit={(e) => e.preventDefault()}>
                <span 
                    className={styles.close}
                    onClick={()=>setOpen(false)}
                >&#10060;</span>
                <h1>Edit {product.title}</h1>
                <div className={styles.item}>
                    <label
                        className={styles.label}
                        htmlFor="file"
                        >Change Image</label>
                    <div className={styles.imgContainer}>
                        <Image src={product.img}  width={80} height={80} objectFit="cover" alt="" />
                        <input
                            className={styles.upload}
                            type="file" 
                            onChange={(e) => setFile(e.target.files[0])} 
                        />
                    </div>
                </div>
                <div className={styles.item}>
                    <label
                        className={styles.label}
                        htmlFor="title"
                    >Title</label>
                    <input
                        defaultValue={product.title}
                        className={styles.input}
                        placeholder="Pizza Name"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                    />
                </div>
                <div className={styles.item}>
                    <label
                        className={styles.label}
                        htmlFor="desc"
                    >Description</label>
                    <textarea 
                        defaultValue={product.desc}
                        className={styles.input}
                        placeholder="Description"
                        rows={4}                    
                        type="text" 
                        onChange={(e) => setDesc(e.target.value) }
                    />
                </div>
                <div className={styles.item}>
                    <label
                        className={styles.label}
                        htmlFor="prices"
                    >Prices</label>
                    <div className={styles.grid_prices} >
                        <input
                            defaultValue={product.prices[0].old}
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder='small-old'
                            name='old'
                            onChange={(e) => changePrice(e, 0)}
                            required
                        />
                        <input
                            defaultValue={product.prices[0].new}
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder='small-actual'
                            name='new'
                            onChange={(e) => changePrice(e, 0)}
                            required
                        />
                        <input
                            defaultValue={product.prices[1].old}
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder='medium-old'
                            name='old'
                            onChange={(e) => changePrice(e, 1)}
                            required
                        />
                        <input
                            defaultValue={product.prices[1].new}
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder='medium-actual'
                            name='new'
                            onChange={(e) => changePrice(e, 1)}
                            required
                        />
                        <input
                            defaultValue={product.prices[2].old}
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder='large-old'
                            name='old'
                            onChange={(e) => changePrice(e, 2)}
                            required
                        />
                        <input
                            defaultValue={product.prices[2].new}
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder='large-actual'
                            name='new'
                            onChange={(e) => changePrice(e, 2)}
                            required
                        />
                    </div>
                </div>
                <div className={styles.item}>
                    <label
                        className={styles.label}
                        htmlFor="desc"
                    >Extra</label>
                    <div className={styles.extra} >
                        <input
                            className={`${styles.input} ${styles.extraInput}`}
                            placeholder="item"
                            type="text"
                            name='text'
                            enterKeyHint="send"
                            onChange={handleExtraInput}
                        />
                        <input
                            className={`${styles.input} ${styles.extraInput}`}
                            placeholder='price'
                            type="number"
                            name='price'
                            enterKeyHint="send"
                            min={1}
                            max={10}
                            onChange={handleExtraInput}
                        />
                        <button  
                            className={styles.extraButton}
                            onClick={handleExtra}
                        >Add Extra
                        </button>
                    </div>
                    <div className={styles.displayExtraOptions}>
                        Extras &#10159;&emsp;
                        {extraOptions.map((el) => (
                            <span key={uuidv4()}>
                                <p className={styles.displayExtraItem}>
                                    {el.text}: ${el.price}
                                    <button 
                                        className={styles.removeExtraBtn}
                                        onClick={() => handleRemove(el)}
                                    >
                                        <span>&#735;</span> 
                                    </button>
                                </p>                                
                            </span>
                        ))}
                    </div>
                </div>
                <button
                    className={styles.addButton}
                    onClick={handleCreate}
                >
                    Confirm Changes&emsp;&#10024;
                </button>
            </form>
            {loading && <span className="loading"></span>}
        </div>
    )
}

export default Edit