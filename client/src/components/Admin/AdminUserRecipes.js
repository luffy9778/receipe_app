import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'

const AdminUserRecipes = () => {
    const [recipe,setRecipe]=useState([])
    const {userId}=useParams()

    useEffect(()=>{
        const fetcchdata=async()=>{
            const response=await axios.get(`http://localhost:3001/admin/userrecipe/${userId}`)
            
            setRecipe(response.data)
        }
        fetcchdata()
    },[])

    const deleterecipe=async(id)=>{
        const data=recipe.filter((i)=>i._id!==id)
        setRecipe(data)
        console.log(id)
       const response= await axios.delete(`http://localhost:3001/admin/userrecipe/${id}`)
    }
    
  return (
    <div className='container mt-5 pt-5'>
       <div className='container'>
       {!recipe.length?(<div className='m-5 text-center p-4'><h1>no recipe found</h1></div>):
            (<><div className=' m-5 p-4 text-center'>
                <h1>{recipe[0]?.userId.username}</h1>
            </div>
            
            <div className='row mt-4'>
            {recipe?.map((item)=>(
                <div className='col-md-3'>
                    <div class="card p-2 " key={item._id} >
                        <img src={item.imageUrl} className="card-img-top" alt="..."  style={{height:"10rem"}}/>
                        <div className="card-body"  style={{height:"10rem"}}>
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.ingredients.toString().length<25?(item.ingredients):(`${item.ingredients.slice(0,25)}...`)}
                            </p>
                            <p className="card-text">{item.instructions.length<25?(item.instructions):(`${item.instructions.slice(0,25)}...`)}
                            </p>
                            <p className="card-text">{item.cookingTime}</p>
                            <button className='position-absolute bottom-0 end-0 btn btn-danger' onClick={()=>deleterecipe(item._id)}>delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div></>)}
        </div>
    </div>
  )
}

export default AdminUserRecipes