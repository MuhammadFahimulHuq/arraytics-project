import React from 'react'
import { Link } from 'react-router-dom'

const Layout = ({children}) => {
  return (
    <div>
        <header >
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
        </header>

        {children}
        <p>Footer</p>
        </div>
  )
}

export default Layout