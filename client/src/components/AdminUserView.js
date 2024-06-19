import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdminUserView = () => {
    const [user,setUser]=useState()

    useEffect(()=>{
        const fetcchdata=async()=>{
            const response=await axios.get("http://localhost:3000/admin/userInfo")
            setUser(response.data)
            console.log(response)
        }
        fetcchdata()
    },[])

    const removeUser=async(id)=>{
        const data=user.filter((i)=>i._id!==id)
        setUser(data)
        await axios.delete("http://localhost:3000/admin/userInfo",{id})
    }
  return (
    <div className='container mt-5 pt-5'>
        <div className='mt-5'>
            <table class="table">
                <thead class="thead-light">
                    <tr>
                    <th scope="col">user</th>
                    <th scope="col">Recipe</th>
                    </tr>
                </thead>
                
                <tbody>
                {user?.map((user)=>(
                    <tr key={user._id}>
                        {/* <th scope="row">1</th> */}
                        <td>{user.username}</td>
                        <td>hggfhj</td>
                        <td><button className='btn btn-danger'
                            onClick={()=>removeUser(user._id)}>Remove</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    </div>
  )
}

export default AdminUserView