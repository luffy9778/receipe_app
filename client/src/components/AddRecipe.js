import axios from 'axios'
import React, { useEffect, useState } from 'react' 
const AddRecipe = ({setnavSearch}) => {
  setnavSearch(false)
  const[recipe,setRecipe]=useState({
    name:"",
    ingredients:[],
    instructions:"",
    imageUrl:"",
    cookingTime:Number
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
        cookingTime:Number
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container bg-light'>
      <h2 className='text-center mt-5 pt-4'>Add Recipe</h2>
      <form onSubmit={handlesubmit}>
        <div class="row">
          <div class="form-group col-md-6 py-2">
            <label for="inputEmail4">name</label>
            <input 
            type="text" 
            class="form-control" 
            id="inputEmail4" 
            placeholder="name"
            name='name'
            value={recipe.name}
            required
            onChange={onchange}/>
          </div>
          <div class="form-group col-md-6 py-2">
            <label for="inputCity">cookingTime</label>
            <input 
              type="number" 
              class="form-control" 
              id="inputCity"
              placeholder='cookingTime'
              name='cookingTime'
              value={recipe.cookingTime}
              required
              onChange={onchange}/>
          </div>
        </div>
        <div class="form-group py-2">
          <label for="inputAddress">instructions</label>
          <input type="text" class="form-control" 
            id="inputAddress" 
            placeholder='instructions'
            name='instructions'
            value={recipe.instructions}
            required
            onChange={onchange}/>
        </div>
        <div class="form-group py-2">
          <label for="inputAddress2">imageUrl</label>
          <input 
            type="text"
            class="form-control" 
            id="inputAddress2" 
            placeholder='imageUrl'
            name='imageUrl'
            value={recipe.imageUrl}
            required
            onChange={onchange}/>
        </div>
        <div class="form-group col-md-12 py-2">
            <label for="inputPassword4">ingredients</label>
            <input 
              type="text" 
              class="form-control" 
              id="inputPassword4" 
              placeholder='ingredients'
              name='ingredients'
              value={recipe.ingredients}
              required
              onChange={onchange}/>
          </div>
          <div className='text-center mt-2'>
          <button type="submit" class="btn btn-info text-white py-2 col-md-12">submit</button>
          </div>
      </form>
    </div>
  )
}

export default AddRecipe