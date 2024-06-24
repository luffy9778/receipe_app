const express=require("express")
const UsersDb = require("../model/UsersDb")
const Recipes = require("../model/Recipes")
const router=express.Router()

router.get("/profile/:userId",async(req,res)=>{
    const userId=req.params?.userId
    const recipes=await Recipes.find({userId}).populate("userId")
    res.json(recipes)
})
module.exports=router