import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';  
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useUser } from '../hooks/useUser';
import { useCookies } from 'react-cookie';
import {  useNavigate } from 'react-router-dom';

const Home = () => {
  const [recipes,setRecipe]=useState([])
  const [saverecipe,setSaverecipe]=useState([])
  const[cookie,setCookies]=useCookies(["access_token"])
  const [search,setSearch]=useState('')
  const user=useUser()
  const navigate=useNavigate()

  
  useEffect(()=>{
    const fetchrecipes=async()=>{
      try {
        const response=await axios.get("http://localhost:3001/recipe")
        let result=response.data
        if(search){
          result=result.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
        }
        setRecipe(result)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSavedRecipeid=async()=>{
      try {
        const response=await axios.get(`http://localhost:3001/recipe/savedRecipe/id/${user._id}`)
        setSaverecipe(response.data.savedRecipe)
      } catch (error) {
        console.log(error)
      }
    }
    fetchrecipes()
    fetchSavedRecipeid()
  },[search])

  //saving recipe
  const save=async(recipeId)=>{
    const userId=user._id
    console.log(user)
    const response= await axios.put("http://localhost:3001/recipe",{
      recipeId,
      userId
    })
    setSaverecipe(response.data.savedrecipe)
  }
  const isSaved=(id)=>saverecipe.includes(id)
  const gotouser=(id)=>navigate(`/user/${id}`)
  return (
    <div>
      <div className='text-center mt-5 p-4  position-relative'>
      <h2 >Recipes</h2>
      <div>
        <form class="d-flex mt-4 position-absolute top-0 end-0" role="search">
                    <input 
                      className="form-control me-2 bg-white border border-dark" 
                      type="search" 
                      placeholder="Search" 
                      aria-label="Search"
                      value={search}
                      onChange={(e)=>setSearch(e.target.value)} />
                   </form>
                   </div>
      </div>
      
      <div className='container'>
        <div className='row h-25'>
          {recipes?.map((recipe)=>(
            <div className='col-md-3 '>           
              <Card key={recipe._id} className=" bg-light mx-auto my-2 " >
                <Card.Img variant="top" src={recipe.imageUrl} style={{height:"15rem"}} />
                <Card.Body style={{height:"15rem"}}>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Text>
                    {recipe.ingredients.toString().length<15?(recipe.ingredients):(`${recipe.ingredients.slice(0,15)}...`)}
                  </Card.Text>
                  <Card.Text>
                    {recipe.instructions.length<15?(recipe.instructions):(`${recipe.instructions.slice(0,15)}...`)}
                  </Card.Text>
                  <Card.Text>
                    {recipe.cookingTime}
                  </Card.Text>
                  {cookie.access_token&&(<Button variant="primary" onClick={()=>save(recipe._id)}
                    disabled={isSaved(recipe._id)} className='position-absolute bottom-0 end-0'>{isSaved(recipe._id)?"saved":"save"}</Button>)}
                </Card.Body>
                <div className=''><button onClick={()=>gotouser(recipe.userId)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{width:"2rem",height:"2rem"}}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>{recipe.userName}</button>
                </div>
             </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home