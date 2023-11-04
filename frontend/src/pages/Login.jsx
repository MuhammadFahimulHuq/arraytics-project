import React, { useState } from 'react'
import Layout from '../layout/Layout'
import styles from '../styles/login/page.module.scss'
import { Link, useNavigate} from 'react-router-dom'
import axios from '../api'
const Login = () => {
const navigate = useNavigate()
const [formData, setFormData] = useState({
  email : '',
  password: '',

})
const {email,password} = formData
const [error,setError] = useState('')
const handleChange= (e) =>{
  const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
}

const handleSubmit = async(e)=>{
  e.preventDefault()

  const postformData = {
    email,
    password
  }
  try{
    const res = await axios.post('/api/user/login',postformData)
 
    // console.log(data)
    if(res.status === 200){
     localStorage.setItem('token',res.data.token)
     console.log(res.data.token)
     setError('')
    navigate('/dashboard')

    }
  }catch(err){
    // setError(err)
    console.log(err)
    console.log(err.response.data.message)
    setError(err.response.data.message)
  }
}
  return (
    <Layout>
      <div className={styles.container}>
    <h1>Sign in to your account</h1>
        <form onSubmit={handleSubmit} >
         {error == '' ? '' : (
          <div className={styles.content}>
          <div className={styles.errorTag}>
          <p>{error}</p>
          </div>
        </div>
         )}
        
        <div className={styles.content}>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='email@yourcompany.com' name="email" value={email} onChange={handleChange}/>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='*******' name="password" value={password} onChange={handleChange}/>
          <button type='submit'>Sign In</button>
          </div>
        </form>
        <p>Don't have an account yet? <Link to="/register"><span>Sign up</span></Link> </p>
      </div>
       
    </Layout>
  
  )
}

export default Login