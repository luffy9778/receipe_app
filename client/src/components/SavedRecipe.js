import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'
import { Link } from 'react-router-dom'

const SavedRecipe = ({setnavSearch}) => {
    const [savedRecipe,setSavedrecipe]=useState([])
    const user=useUser()
    setnavSearch(true)
    const userId=user._id
    useEffect(()=>{
        const fetchSavedRecipe=async()=>{
            try {
                const response=await axios.get(`http://localhost:3000/recipe/savedRecipe/${userId}`)
                setSavedrecipe(response.data.savedRecipes)
            } catch (error) {
                console.log(error)
            }    
        }
        fetchSavedRecipe()
    },[])
const deleteRecipe=async(id)=>{
    // console.log("before",savedRecipe)
    const data=savedRecipe.filter((i)=>i._id!==id)
    // console.log("dd",data) 
    setSavedrecipe(data)
    // console.log("after",savedRecipe)
    const sr=data.map((i)=>i._id)
    await axios.put("http://localhost:3000/recipe/savedRecipe",{userId,sr})
    
}
  return (   
    <div className='container mx-auto p-4'>
        <div className='text-center'><h2>Your Recipes</h2></div>
        <div className='row mt-4'>
            {!savedRecipe.length?(<div className='d-flex  justify-content-center my-5'><h5 className='text-center  ' style={{fontFamily:"-moz-initial"}}>you don't have any saved items in your list<br/>got to 
            <Link to={"/"}>Home</Link></h5></div>):
            savedRecipe.map((item)=>(
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
                            <button href="#" className="btn btn-secondary" on onClick={(()=>deleteRecipe(item._id))}>delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SavedRecipe