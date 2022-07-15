import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from  '../../styles/Login.module.css'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/login", { username, password})
      router.push("/admin")
    } catch (err) {
      console.log(err);
      setError(true)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          type="text" 
          placeholder='username'
          className={styles.input}
          enterKeyHint="send"
          onChange={(e) => setUsername(e.target.value) + setError(false) }
        />
        <input
          type="password" 
          placeholder='password'
          className={styles.input}
          enterKeyHint="send"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          value="Submit"
          className={styles.button}
          onClick={handleClick}
        >
          Sign In
        </button>
        {error && <span className={styles.error} >"Wrong Creadentials"</span>}
      </div>
    </div>
  )
}

export default Login