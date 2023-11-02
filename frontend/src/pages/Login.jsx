import React, { useState } from 'react'
import Layout from '../layout/Layout'

const Login = () => {
const [formData, setFormData] = useState({
  email : '',
  password: '',

})
const {email,password} = formData

const handleChange= (e) =>{
  const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
}

const handleSubmit =(e)=>{
  e.preventDefault()
}
  return (
    <Layout>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='email' name="email" value={email} onChange={handleChange}/>
          <input type="password" placeholder='password' name="password" value={password} onChange={handleChange}/>
          <button type='submit'>Submit</button>
        </form>
        
      </div>
       
    </Layout>
  
  )
}

export default Login