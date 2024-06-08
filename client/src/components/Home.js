import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
      <h2>recipes</h2>
      {
      recipes?.map((recipe)=>(
         <Card key={recipe._id} style={{ width: '18rem' }}>
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
           <Button variant="primary">Go somewhere</Button>
         </Card.Body>
       </Card>
      ))}
    </div>
  )
}

export default Home