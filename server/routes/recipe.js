const express=require("express")
const RecipesModel=require("../model/Recipes")
const  verifytoken = require("../middleware/verifytoken")
const router=express.Router()

router.post("/",verifytoken, async(req,res)=>{
    const{name,ingredients,instructions,imageUrl,cookingTime}=req.body
    if(!name||!ingredients||!instructions||!imageUrl||!cookingTime){
        return res.status(401).json({message:"all feilds are required"})
    }
   try {
    const recipe=await RecipesModel.create({
        name,
        ingredients,
        instructions,
        imageUrl,
        cookingTime
    })
    console.log(recipe)
    res.status(200).json({message:"new recipe added successfully"})
   } catch (error) {
    console.log(error)
   } 
})

router.get("/",async(req,res)=>{
    try {
        const result= await RecipesModel.find({})
        if(!result){
            return res.status(203).json({message:"no data found"})
        }
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

module.exports=router