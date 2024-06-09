import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';  
// import {Container, Row} from 'react-bootstrap';  
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
const Home = () => {
  const[recipes,setRecipe]=useState([])
  useEffect(()=>{
    const fetchrecipes=async()=>{
      try {
        const response=await axios.get("http://localhost:3000/recipe")
        setRecipe(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchrecipes()
  },[])
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
             {recipe.ingredients}
           </Card.Text>
           <Card.Text>
             {recipe.instructions}
           </Card.Text>
           <Card.Text>
             {recipe.cookingTime}
           </Card.Text>
           <Button variant="primary">save</Button>
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