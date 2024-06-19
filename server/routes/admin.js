const express=require("express")
const UsersDb = require("../model/UsersDb")
const router=express.Router()

router.get("/userInfo",async(req,res)=>{
    const user=await UsersDb.find({})
    if(!user){
       return res.json({message:"no user found"})
    }
    res.json(user)
})
router.delete("/userInfo",async(req,res)=>{
    const user=await UsersDb.findById(req.body.id)
    if(!user){
        return res.json({message:"no user found"})
    }
    const result=await UsersDb.deleteOne(user)
    res.json({message:"dleted"})
})

module.exports=router