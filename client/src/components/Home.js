import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';  
// import {Container, Row} from 'react-bootstrap';  
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
const Home = ({search}) => {
  const[recipes,setRecipe]=useState([])
  const [saverecipe,setSaverecipe]=useState('')
  useEffect(()=>{
    const fetchrecipes=async()=>{
      try {
        const response=await axios.get("http://localhost:3000/recipe")
        let result=response.data
        if(search){
          result=result.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
        }
        setRecipe(result)
      } catch (error) {
        console.log(error)
      }
    }
    fetchrecipes()
  },[search])

  //saving recipe
  const save=async(recipeId)=>{
    const user=JSON.parse(localStorage.getItem("user"))
    const userId=user._id
    console.log(user)
    const response= await axios.put("http://localhost:3000/recipe",{
      recipeId,
      userId
    })
    setSaverecipe(response.data)
  }
  return (
    <div>
      <h2 className='text-center mt-5 p-4'>recipes</h2>
      <div className='container '>
        <div className='row h-25'>
        
      {/* <Container className=' row p-4 overflow '> */}
      {
      recipes?.map((recipe)=>(
          <div className='col-md-4 '>
         
         <Card key={recipe._id}   
         className=" bg-light mx-auto my-2 ">
         <Card.Img variant="top" src={recipe.imageUrl} />
         <Card.Body>
           <Card.Title>{recipe.name}</Card.Title>
           <Card.Text>
             {/* {recipe.ingredients} */}
             {recipe.ingredients.toString().length<25?(recipe.ingredients):(`${recipe.ingredients.slice(0,25)}...`)}
           </Card.Text>
           <Card.Text>
             {recipe.instructions.length<25?(recipe.instructions):(`${recipe.instructions.slice(0,25)}...`)}
           </Card.Text>
           <Card.Text>
             {recipe.cookingTime}
           </Card.Text>
           <Button variant="primary" onClick={()=>save(recipe._id)}>save</Button>
         </Card.Body>
       </Card>
       </div>
      ))}
       {/* </Container> */}
       </div>
       </div>
    </div>
  )
}

export default Home