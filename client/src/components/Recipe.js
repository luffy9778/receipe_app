import axios from 'axios'
import React, { useState } from 'react'

const Recipe = () => {
  const[recipe,setRecipe]=useState({
    name:"",
    ingredients:[],
    instructions:"",
    imageUrl:"",
    cookingTime:0
  })
  const onchange=(e)=>{
    const{name,value}=e.target
    setRecipe({...recipe,[name]:value})
  }
  const handlesubmit=async(e)=>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/recipe",{...recipe})
      setRecipe({
        name:"",
        ingredients:[],
        instructions:"",
        imageUrl:"",
        cookingTime:0
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h2>add a recipe</h2>
      <form onSubmit={handlesubmit}>
        <input
          type='text'
          placeholder='name'
          name='name'
          value={recipe.name}
          required
          onChange={onchange}
          />
          <input
          type='text'
          placeholder='ingredients'
          name='ingredients'
          value={recipe.ingredients}
          required
          onChange={onchange}
          />
          <input
          type='text'
          placeholder='instructions'
          name='instructions'
          value={recipe.instructions}
          required
          onChange={onchange}
          />
          <input
          type='text'
          placeholder='imageUrl'
          name='imageUrl'
          value={recipe.imageUrl}
          required
          onChange={onchange}
          />
          <input
          type='text'
          placeholder='cookingTime'
          name='cookingTime'
          value={recipe.cookingTime}
          required
          onChange={onchange}
          />
          <button>add</button>
      </form>
    </div>
  )
}

export default Recipe