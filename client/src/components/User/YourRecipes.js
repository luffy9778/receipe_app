import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '../../hooks/useUser'
import { Link } from 'react-router-dom'

export const YourRecipes = () => {
    const [recipe,setRecipe]=useState([])
    const {_id,username}=useUser()
    console.log(_id,username)

    useEffect(()=>{
        const fetcchdata=async()=>{
            const response=await axios.get(`http://localhost:3001/user/yourrecipes/${_id}`)
            setRecipe(response.data)
        }
        fetcchdata()
    },[])

    const deleterecipe=async(id)=>{
        const data=recipe.filter((i)=>i._id!==id)
        setRecipe(data)
        console.log(id)
       const response= await axios.delete(`http://localhost:3001/user/yourrecipe/${id}`)
    }
    
  return (
    <div className='container mt-5 pt-5'>
       <div className='container'>
            <div className=' m-5 p-4 text-center'>
                <h1>{username}</h1>
            </div>
       {!recipe.length?(<div className='m-5 text-center p-4'><p>no recipe foundwant to add some?<Link to={"/recipe"} >Add your recipe</Link></p></div>):
            (
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
        </div>)}
        </div>
    </div>
  )
}
