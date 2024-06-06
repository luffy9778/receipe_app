import React from 'react'
import {Link} from "react-router-dom"
const Nav = () => {
  return (
    <div className='nav'>
        
            <Link to="/">home</Link>
            <Link to="/login">login</Link>
           <Link to="/register">register</Link>
            <Link to="/resceipe">resceipe</Link>
      
    </div>
  )
}
export default Nav