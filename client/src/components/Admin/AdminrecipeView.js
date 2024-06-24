import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'

const AdminrecipeView = () => {
    const [recipe,setrecipe]=useState([])
    const navigate=useNavigate()
    const user=useUser()
    const userId=user._id
    useEffect(()=>{
        const fetchSavedRecipe=async()=>{
            try {
                const response=await axios.get(`http://localhost:3001/admin/recipe`)
                setrecipe(response.data)
                console.log(recipe)
            } catch (error) {
                console.log(error)
            }    
        }
        fetchSavedRecipe()
    },[recipe])
const deleteRecipe=async(id)=>{
    const data=recipe.filter((i)=>i._id!==id)
    setrecipe(data)
    await axios.delete(`http://localhost:3001/admin/recipe/${id}`)  
}
const gotouser=(id)=>navigate(`/admin/${id}`)
  return (   
    <div className='container mx-auto p-4'>
        <div className='text-center'><h2> Recipes</h2></div>
        <div className='row mt-4'>
            {!recipe.length?(<div className='d-flex  justify-content-center my-5'><h5 className='text-center  ' style={{fontFamily:"-moz-initial"}}>you don't have any saved items in your list</h5></div>):
            recipe.map((item)=>(
                <div className='col-md-3 mt-4'>
                    <div class="card p-2 "  >
                        <img src={item.imageUrl} className="card-img-top" style={{height:"10rem"}} alt="..."/>
                        <div className="card-body " style={{height:"10rem"}}>
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.ingredients.toString().length<15?(item.ingredients):(`${item.ingredients.slice(0,15)}...`)}
                            </p>
                            <p className="card-text">{item.instructions.length<15?(item.instructions):(`${item.instructions.slice(0,15)}...`)}
                            </p>
                            <p className="card-text">{item.cookingTime}</p>
                            <div className='position-absolute bottom-0 start-0'>
                                <button onClick={()=>gotouser(item.userId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{width:"2rem",height:"2rem"}}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>{item.userName}</button>
                            </div>
                            <button href="#" className="btn btn-danger position-absolute bottom-0 end-0" on onClick={(()=>deleteRecipe(item._id))}>delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AdminrecipeView