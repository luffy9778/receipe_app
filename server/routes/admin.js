const express=require("express")
const UsersDb = require("../model/UsersDb")
const Recipes = require("../model/Recipes")
const router=express.Router()

router.get("/userInfo",async(req,res)=>{
    const user=await UsersDb.find({})
    if(!user){
       return res.json({message:"no user found"})
    }
    res.json(user)
})
router.delete("/userInfo/:id",async(req,res)=>{
    const user=await UsersDb.findById(req.params.id)
    if(!user){
        return res.json({message:"no user found"})
    }
    const result=await user.deleteOne()
    res.json({message:"dleted"})
})
router.get("/userrecipe/:userId",async(req,res)=>{
    const userId=req.params?.userId
    const recipes=await Recipes.find({userId}).populate("userId")
    res.json(recipes)
})
router.delete("/userrecipe/:id",async(req,res)=>{
    const recipe=await Recipes.findById(req.params.id)
    if(!recipe){return res.json({message:"no match"})}
    const result=await recipe.deleteOne()
    res.json(result)  
})
router.get("/recipe",async(req,res)=>{
    const recipes=await Recipes.find({})
    res.json(recipes)
})
router.delete("/recipe/:id",async(req,res)=>{
    try {
        const recipe=await Recipes.findById(req.params.id)
        await recipe.deleteOne()
        res.json(recipe)
    } catch (error) {
        console.log(error)
    }
})

module.exports=router