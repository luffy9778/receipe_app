import React, { useState } from 'react'
import axios from "axios"

const Login = () => {
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const handelRegister=async(e)=>{
    e.preventDefault()
    try {
      const result=await axios.post("http://localhost:3000/auth/login",{
        username,password
      })
      console.log(result)
      alert("login successfull")
      setUsername("")
      setPassword("")
    } catch (error) {
      console.log(error)
    }
  }
  return ( 
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 " style={{backgroundColor:"#F1F1F2"}}>
      <div className='container  col-md-4 rounded p-4' style={{backgroundColor:"#A1D6E2"}}>
          <form onSubmit={handelRegister}>
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
          </form>
      </div>
    </div>
   
  )
}

export default Login