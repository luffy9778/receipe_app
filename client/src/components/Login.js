import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import {useCookies} from "react-cookie"
import {useNavigate,Link} from "react-router-dom"

const Login = ({setnavSearch}) => {
  const userRef=useRef()
  const errRef=useRef()
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const [errMsg,seterrMsg]=useState("")
  const[c,setCokkies]=useCookies(["acces_token"])
  const navigate=useNavigate()
  setnavSearch(false)

  useEffect(()=>{
    userRef.current.focus()
  },[])

  useEffect(()=>{
   seterrMsg("")
  },[username,password])

  const handelRegister=async(e)=>{
    e.preventDefault()
    try {
      const result=await axios.post("http://localhost:3000/auth/login",{
        username,password
      })
      alert("login successfull")
      setCokkies("access_token", result.data.token);
     localStorage.setItem("user", JSON.stringify(result.data.user));
      setUsername("")
      setPassword("")
      navigate("/")
    } catch (error) {
      if(!error?.response){
        seterrMsg("no server response")
      }else if(error.response?.status===400){
        seterrMsg("username and password are required")
      }else if(error.response?.status===401){
        seterrMsg(" invalid username or password")
      }else{
        seterrMsg("login failed")
      }
      errRef.current.focus()
    }
  }
  return ( 
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 " style={{backgroundColor:"#F1F1F2"}}>
      <div className='container  col-md-4 rounded p-4' style={{backgroundColor:"#A1D6E2"}}>
          <form onSubmit={handelRegister}>
            <div ref={errRef} className='text-center'>{errMsg&&(<p className=' alert alert-danger text-danger'>{errMsg}</p>)}</div>
            <h2 className='text-center'>Login</h2>
            <div class="form-group m-2">
              <label for="exampleInputEmail1">username</label>
              <input
              type="text" 
              class="form-control" 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp" 
              placeholder="Enter username"
              required
              ref={userRef}
              value={username}
              onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div class="form-group m-2">
              <label for="exampleInputPassword1">Password</label>
              <input 
              type="password" 
              class="form-control" 
              id="exampleInputPassword1"
              placeholder="Password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className='text-center'>
                <button type="submit" class="btn btn-info text-white  m-2" style={{backgroundColor:"#1995AD"}}>Submit</button>
            </div>
            <Link className='nav-link text-center ' to="/register"><p>don't have an account?</p></Link>
          </form>   
      </div>
    </div>
   
  )
}

export default Login