import React, { useRef, useState,useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const[errMsg,seterrMsg]=useState("")
  const navigate=useNavigate()
  const userRef=useRef()
  const errRef=useRef() 

  useEffect(()=>{
    userRef.current.focus()
  },[])

  useEffect(()=>{
   seterrMsg("")
  },[username,password])

  const handelRegister=async(e)=>{
    e.preventDefault()
    try {
      const result=await axios.post("http://localhost:3001/auth/register",{
        username,password
      })
      console.log(result)
      alert("registration successfull")
      setUsername("")
      setPassword("")
      navigate("/login")
    } catch (error) {
      if(!error?.response){
        seterrMsg("no server response")
      }else if(error.response?.status===409){
        seterrMsg("username already taken")
      }else if(error.response?.status===401){
        seterrMsg("username and password are require")
      }else{
        seterrMsg("registration failed")
      }
      errRef.current.focus()
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 " style={{backgroundColor:"#F1F1F2"}}>
      <div className='container  col-md-4 rounded p-4' style={{backgroundColor:"#A1D6E2"}}>
          <form onSubmit={handelRegister}>
          <div ref={errRef} className='text-center'>{errMsg&&(<p className=' alert alert-danger text-danger'>{errMsg}</p>)}</div>
            <h2 className='text-center'>Register</h2>
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
                <button type="submit" class="btn btn-info text-white m-2" style={{backgroundColor:"#1995AD"}}>Submit</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Register