import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'



const Userprofile = () => {
    const [user,setUser]=useState([])
    const {userId}=useParams()

    useEffect(()=>{
        const fetcchdata=async()=>{
            const response=await axios.get(`http://localhost:3001/user/profile/${userId}`)
            
            setUser(response.data)
        }
        fetcchdata()
    },[])
    
  return (
 
    <div>
        <div className='container'>
            <div className=' m-5 p-4 text-center'>
                <h1>{user[0]?.userId.username}</h1>
            </div>
            <div className='row mt-4'>
            {user.map((item)=>(
                <div className='col-md-3'>
                    <div class="card p-2 " >
                        <img src={item.imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.ingredients.toString().length<25?(item.ingredients):(`${item.ingredients.slice(0,25)}...`)}
                            </p>
                            <p className="card-text">{item.instructions.length<25?(item.instructions):(`${item.instructions.slice(0,25)}...`)}
                            </p>
                            <p className="card-text">{item.cookingTime}</p>
                            {/* {cookie.access_token&&( <button href="#" className="btn btn-secondary"   onClick={()=>save(item._id)}
                    disabled={isSaved(item._id)}>{isSaved(item._id)?"saved":"save"}</button>)} */}
                    <button>save</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    </div>
  )
}

export default Userprofile