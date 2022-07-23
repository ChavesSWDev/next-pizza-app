import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from  '../../styles/Login.module.css'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [pass, setPass] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    try {
      await axios.post("https://next-pizza-app.vercel.app/api/login", { username, password})
      router.push("/admin")
      setPass(true)
    } catch (err) {
      console.log(err);
      setError(true)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={(e) => e.preventDefault()}>
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
        {error && <span className={`${styles.msg} ${styles.error}`}>Wrong Creadentials!</span>}
        {pass && <span className={`${styles.msg} ${styles.pass}`}>Welcome Back Admin</span>}
        {pass && <span className="loading"></span>}
      </form>
    </div>
  )
}

export default Login