import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {Link,useNavigate} from "react-router-dom"
const Nav = () => {
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
    <div className='row fixed-top'style={{backgroundColor:"#1995AD"}}>
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
                {cookie.access_token&&(<>
                <li className="nav-item active">
                  <Link className='nav-link text-white' to="/recipe"><h4>add Resceipe</h4></Link>
                </li>
                <li className="nav-item active">
                  <Link className='nav-link text-white' to="user/recipes"><h4>your Resceipe</h4></Link>
                </li>
                <li className="nav-item active">
                  <Link className='nav-link text-white' to="/savedrecipe"><h4>SavedRecipe</h4></Link>
                </li>
                </>
                )}
                <li className="nav-item my-auto">
                  {!cookie.access_token?
                  (<Link className='nav-link text-white' to="/login"><h4>Login</h4></Link>):
                  (<button className='btn-btn text-white bg-secondary rounded-pill' onClick={logout}>logout</button>)}
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