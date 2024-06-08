const mongoose=require("mongoose")
const RecipesModel=new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      ingredients: [
        {
          type: String,
          required: true,
        },
      ],
      instructions: {
        type: String,
        required: true,
      },
    
      imageUrl: {
        type: String,
        required: true,
      },
      cookingTime: {
        type: Number,
        required: true,
      }
})
module.exports=mongoose.model("recipes",RecipesModel)