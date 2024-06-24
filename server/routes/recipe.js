const express=require("express")
const RecipesModel=require("../model/Recipes")
const  verifytoken = require("../middleware/verifytoken")
const UsersDb = require("../model/UsersDb")
const router=express.Router()

router.post("/",verifytoken, async(req,res)=>{
    const{name,ingredients,instructions,imageUrl,cookingTime,userName,userId}=req.body
    if(!name||!ingredients||!instructions||!imageUrl||!cookingTime||!userName){
        return res.status(401).json({message:"all feilds are required"})
    }
   try {
    const recipe=await RecipesModel.create({
        name,
        ingredients,
        instructions,
        imageUrl,
        cookingTime,
        userName,userId
    })
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

router.put("/",async(req,res)=>{
    const user=await UsersDb.findById(req.body.userId)
    const recipe=await RecipesModel.findById(req.body.recipeId)
    console.log(user,recipe)
    try {
        user.savedrecipe.push(recipe._id)
        await user.save()
        res.status(201).json({savedrecipe:user.savedrecipe})
    } catch (error) {
        console.log(error)
    }
})
router.get("/savedRecipe/:userId",async(req,res)=>{
    try {
        const user=await UsersDb.findById(req.params.userId)
        const savedRecipes = await RecipesModel?.find({
            _id: { $in: user.savedrecipe },
          });
          res.status(201).json({savedRecipes})
    } catch (error) {
        console.log(error)
    }

})
router.put("/savedRecipe",async(req,res)=>{
    try {
        console.log("jhdjvhjdh",req.body)
        const user=await UsersDb.findById(req.body.userId)
        user.savedrecipe=req.body.sr
        await user.save()
        res.json({message:"up"})
    } catch (error) {
        console.log(error)
    }
})
//get the id of saved recipe from db 
router.get("/savedRecipe/id/:userId",async(req,res)=>{
    try {
        const user=await UsersDb.findById(req.params.userId)
        const savedRecipe=user?.savedrecipe
        res.status(201).json({savedRecipe})
    } catch (error) {
        console.log(error)
    }
})

module.exports=router