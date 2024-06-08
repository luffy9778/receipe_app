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
    <div>
      <h2>Login</h2>
      <form onSubmit={handelRegister}>
        <input 
         type='text'
         placeholder='username'
         required
         value={username}
         onChange={(e)=>setUsername(e.target.value)}/><br/>
        <input
          type='password'
          placeholder='password'
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}/><br/>
        <button type='submit'>Log in</button>
      </form>
    </div>
  )
}

export default Login