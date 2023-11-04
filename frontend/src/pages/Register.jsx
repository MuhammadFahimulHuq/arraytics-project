import React, { useState } from 'react'
import Layout from '../layout/Layout'
import styles from '../styles/register/page.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api'
const Register = () => {
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  
  const [error,setError] = useState('')
  const {name,email,password,password2} = formData;
  const handleChange = (e) =>{
      const{name,value} = e.target
      setFormData({
        ...formData,
        [name]: value
      })
  }
  
const handleSubmit = async (e)=>{
  e.preventDefault()
  if(password != password2){
    setError('Password do not matches')
    return 
  }
  const postformData = {
    name,
    email,
    password
  }
  try{
    const res = await axios.post('/api/user',postformData)
 
    // console.log(data)
    if(res.status === 201){
     localStorage.setItem('token',res.data.token)
     setError('')
     navigate('/dashboard')
    }
  }catch(err){
    // setError(err)
    console.log(err.response.data.message)
    setError(err.response.data.message)
  }

}
  return (
    <Layout>
 <div className={styles.container}>
    <h1>Sign up to your account</h1>
        <form onSubmit={handleSubmit} >
          {error == '' ? '' :(
              <div className={styles.errorTag}>
              <p>{error}</p>
              </div>
          )}
        <div className={styles.content}>
        
        <label htmlFor="name">Name</label>
          <input type="text" placeholder='John mark' name="name" value={name} onChange={handleChange}/>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='email@yourcompany.com' name="email" value={email} onChange={handleChange}/>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='*******' name="password" value={password} onChange={handleChange}/>
          <label htmlFor="Cpassword">Confirm password</label>
          <input type="password" placeholder='*******' name="password2" value={password2} onChange={handleChange}/>
          <button type='submit'>Sign In</button>
          </div>
        </form>
        <p>Already Sign up ? <Link to="/register"><span>Sign In Now</span></Link> </p>
      </div>
    </Layout>
   
  )
}

export default Register