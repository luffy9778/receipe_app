import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'

const AdminUserView = () => {
    const [user,setUser]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        const fetcchdata=async()=>{
            const response=await axios.get("http://localhost:3001/admin/userInfo")
            setUser(response.data)
            // console.log(response.data.qry.map(i=>i?.userrecipes.map(j=>j?.name)))
        }
        fetcchdata()
    },[])

    const removeUser=async(id)=>{
        console.log(id)
        window.confirm()
        const data= user.filter((i)=>i._id!==id)
        console.log(data)
        setUser(data)
        console.log(user)
        try {
            await axios.delete(`http://localhost:3001/admin/userInfo/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const getrecipe=(id)=>navigate(`${id}`)
 
  return (
    <div className='container mt-5 pt-5'>
        <div className='mt-5'>
            <table class="table">
                <thead class="thead-light">
                    <tr>
                    <th scope="col">user</th>
                    <th scope="col">Recipe</th>
                    <th></th>
                    </tr>
                </thead>
                
                <tbody>
                {user?.map((user)=>(
                    
                    <tr key={user._id}>
                        {/* <th >1</th> */}
                        <td scope="row">{user.username}</td>
                        <td><button className='btn btn-success' onClick={()=>getrecipe(user._id)}>View recipe</button></td>
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