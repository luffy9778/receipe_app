const express=require("express")
const UsersDb = require("../model/UsersDb")
const Recipes = require("../model/Recipes")
const router=express.Router()

router.get("/profile/:userId",async(req,res)=>{
    const userId=req.params?.userId
    const recipes=await Recipes.find({userId}).populate("userId")
    res.json(recipes)
})
router.get("/yourrecipes/:userId",async(req,res)=>{
    try {
        const userId=req.params?.userId
        const recipes=await Recipes.find({userId})
        if(!recipes){
            return res.json({message:"no recipe found"})
        }
        res.json(recipes)
    } catch (error) {
        console.log(error)
    }
})
router.delete("/yourrecipe/:id",async(req,res)=>{
    try {
        const recipe=await Recipes.findById(req.params.id)
        if(!recipe){return res.json({message:"no match"})}
        const result=await recipe.deleteOne()
        res.json(result)
    } catch (error) {
        console.log(error)   
    } 
})
module.exports=router