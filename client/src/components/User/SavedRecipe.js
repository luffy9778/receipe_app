import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { Link } from 'react-router-dom'

const SavedRecipe = () => {
    const [savedRecipe,setSavedrecipe]=useState([])
    const user=useUser()
    const userId=user._id
    useEffect(()=>{
        const fetchSavedRecipe=async()=>{
            try {
                const response=await axios.get(`http://localhost:3001/recipe/savedRecipe/${userId}`)
                setSavedrecipe(response.data.savedRecipes)
            } catch (error) {
                console.log(error)
            }    
        }
        fetchSavedRecipe()
    },[])
const deleteRecipe=async(id)=>{
    const data=savedRecipe.filter((i)=>i._id!==id)
    setSavedrecipe(data)
    const sr=data.map((i)=>i._id)
    await axios.put("http://localhost:3001/recipe/savedRecipe",{userId,sr})
    
}
  return (   
    <div className='container mx-auto p-4'>
        <div className='text-center'><h2>Your Recipes</h2></div>
        <div className='row mt-4'>
            {!savedRecipe.length?(<div className='d-flex  justify-content-center my-5'><h5 className='text-center  ' style={{fontFamily:"-moz-initial"}}>you don't have any saved items in your list<br/>got to 
            <Link to={"/"}>Home</Link></h5></div>):
            savedRecipe.map((item)=>(
                <div className='col-md-3'>
                    <div class="card p-2 "  >
                        <img src={item.imageUrl} className="card-img-top" style={{height:"10rem"}} alt="..."/>
                        <div className="card-body " style={{height:"10rem"}}>
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.ingredients.toString().length<15?(item.ingredients):(`${item.ingredients.slice(0,15)}...`)}
                            </p>
                            <p className="card-text">{item.instructions.length<15?(item.instructions):(`${item.instructions.slice(0,15)}...`)}
                            </p>
                            <p className="card-text">{item.cookingTime}</p>
                            <button href="#" className="btn btn-danger position-absolute bottom-0 end-0" on onClick={(()=>deleteRecipe(item._id))}>delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SavedRecipe