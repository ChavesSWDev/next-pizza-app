import { useState } from 'react'
import styles from '../styles/Add.module.css'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const Add = ({setOpen}) => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [prices, setPrices] = useState([])
    const [extra, setExtra] = useState(null)
    const [extraOptions, setExtraOptions] = useState([])
    const [loading, setLoading] = useState(false)
    
    const changePrice = (e, i) => {
        const currentPrices = prices
        currentPrices[i] = e.target.value;
        setPrices(currentPrices);
    }

    const handleExtraInput = (e) => {
        if (e.target.value < 1) return
        setExtra({...extra, [e.target.name]: e.target.value})
    };

    const handleRemove = (element) => {
        const newList = extraOptions.filter(option => option !== element )
        setExtraOptions(newList)
    }

    const handleExtra = () => {
        if(extra === null) return
        if (extra.text === undefined || extra.price === undefined ) return
        if (!extra.text.length || !extra.price.length ) return
        setExtraOptions(prev => [...prev, extra])
    }

    const handleCreate = async() => {
        setLoading(true)
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "storage")
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dyv2ytol5/upload",
                data
            );
            const { url } = uploadRes.data
            const newProduct = {
                title,
                desc,
                img: url,
                prices: [
                            {
                                "old": Number(prices[0]),
                                "new": Number(prices[1])
                            },
                            {
                                "old": Number(prices[2]),
                                "new": Number(prices[3])
                            },
                            {
                                "old": Number(prices[4]),
                                "new": Number(prices[5])
                            }
                        ],
                extraOptions
            }
            await axios.post("https://next-pizza-app.vercel.app/api/products", newProduct)
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
                <h1>Add New Pizza</h1>
                <div className={styles.item}>
                    <label
                        className={styles.label}
                        htmlFor="file"
                        >Choose an image</label>
                    <input
                        className={`${styles.input} ${styles.upload}`}
                        type="file" 
                        onChange={(e) => setFile(e.target.files[0])}
                        required 
                    />
                </div>
                <div className={styles.item}>
                    <label
                        className={styles.label}
                        htmlFor="title"
                    >Title</label>
                    <input
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
                        className={styles.input}
                        placeholder="Description"
                        rows={4}                    
                        type="text" 
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label
                        className={styles.label}
                        htmlFor="prices"
                    >Prices</label>
                    <div className={styles.grid_prices} >
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder='small-old'
                            name='old'
                            onChange={(e) => changePrice(e, 0)}
                            required
                        />
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder='small-actual'
                            name='new'
                            onChange={(e) => changePrice(e, 1)}
                            required
                        />
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder='medium-old'
                            name='old'
                            onChange={(e) => changePrice(e, 2)}
                            required
                        />
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder='medium-actual'
                            name='new'
                            onChange={(e) => changePrice(e, 3)}
                            required
                        />
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder='large-old'
                            name='old'
                            onChange={(e) => changePrice(e, 4)}
                            required
                        />
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder='large-actual'
                            name='new'
                            onChange={(e) => changePrice(e, 5)}
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
                            enterKeyHint="send"
                            name='text'
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
                    Create&emsp;&#10024;
                </button>
            </form>
            {loading && <span className="loading"></span>}
        </div>
    )
}

export default Add