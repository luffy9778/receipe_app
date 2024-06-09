import React from 'react'
import {Link} from "react-router-dom"
const Nav = () => {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-info ">
          
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav p-auto mx-auto">
              <li class="nav-item active">
                <Link className='nav-link text-white' to="/"><h4>Home</h4></Link>
              </li>
              <li class="nav-item">
              <Link className='nav-link text-white' to="/login"><h4>Login</h4></Link>
              </li>
              <li class="nav-item active">
                <Link className='nav-link text-white' to="/register"><h4>Register</h4></Link>
              </li>
              <li class="nav-item active">
                <Link className='nav-link text-white' to="/recipe"><h4>Resceipe</h4></Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>



      
    </div>
  )
}
export default Nav