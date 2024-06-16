import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {Link,useNavigate} from "react-router-dom"
const Nav = ({search,setSearch}) => {
  const[cookie,setCookies]=useCookies(["access_token"])
  const[user,setUsername]=useState([])
  //  useEffect(()=>{
  //       const data = JSON.parse(localStorage.getItem('user'))
  //       if(data){
  //         setUsername(data)
  //       }
  //    },[user])

  const navigate=useNavigate()
  // console.log("cooki", cookie)
  const logout = () => {
    localStorage.clear();
    setCookies("access_token", "");
    setUsername([])
    navigate("/login");
  };
  return (
    <div className='row fixed top'style={{backgroundColor:"#1995AD"}}>
      <div className='col-md-6 text-center my-auto'>
        <h2 className="text-white">Recipe App</h2>
      </div>
      <div className='col-md-6'>
        <nav className="navbar navbar-expand-lg navbar-light " > 
          <div class="container-fluid">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">              
              <ul className="navbar-nav p-auto mx-auto my-auto">
                <li className="nav-item active">
                  <Link className='nav-link text-white' to="/"><h4>Home</h4></Link>
                </li>
                {/* <li class="nav-item active">
                  <Link className='nav-link text-white' to="/register"><h4>Register</h4></Link>
                </li> */}
                <li className="nav-item active">
                  <Link className='nav-link text-white' to="/recipe"><h4>Resceipe</h4></Link>
                </li>
                <li className="nav-item active">
                  <Link className='nav-link text-white' to="/savedrecipe"><h4>SavedRecipe</h4></Link>
                </li>
                <li className="nav-item active my-auto">
                  <form class="d-flex" role="search">
                    <input 
                      className="form-control me-2" 
                      type="search" 
                      placeholder="Search" 
                      aria-label="Search"
                      value={search}
                      onChange={(e)=>setSearch(e.target.value)} />
                   </form>
                </li>
                {user.username?(
                  <li className="nav-item my-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                </li>
                ):<></>} 
                <li className="nav-item my-auto">
                  {!cookie.access_token?
                  (<Link className='nav-link text-white' to="/login"><h4>Login</h4></Link>):
                  (<button className='btn-btn text-white bg-secondary ' onClick={logout}>logout</button>)}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>    
  )
}
export default Nav