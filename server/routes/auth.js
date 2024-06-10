const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const Usermodel=require("../model/UsersDb")
const router=express.Router()

router.post("/register",async(req,res)=>{
    const{username,password}=req.body
    if(!username||!password){
        return res.status(401).json({message:"username and password are required"})
    }
    //checking for duplicate
    const user=await Usermodel.findOne({username})
    if(user){
        return res.status(401).json({message:"username already taken"})
    }
    //encrypt the password
    const hashpwd= await bcrypt.hash(password,10)
    //creating new user
    const result=await Usermodel.create({username,password:hashpwd})
    console.log(result)
    res.status(200).json({message:"new user registration successfull"})
})

router.post("/login",async(req,res)=>{
    const{username,password}=req.body
    if(!username||!password){
        return res.status(401).json({message:"username and password are required"})
    }
    const user=await Usermodel.findOne({username}) 
    if(!user){
        return res.status(401).json({message:"username not found"})
    }
    const unhashpwd=await bcrypt.compare(password,user.password)
    if(!unhashpwd){
        res.status(400).json({message:"incorrect password "})
    }
    const token=jwt.sign({id:user._id},"secret")
    console.log(user)
    res.json({ token,user:user });
})

// export { router as userRouter };
module.exports=router 