const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()

const authRoute=require("./routes/auth")
const recipeRoute=require("./routes/recipe")
app.use(express.json())
app.use(cors())

app.use("/auth",authRoute)
app.use("/recipe",recipeRoute)
mongoose.connect("mongodb+srv://luffy97780:KWTorqZH268D3otV@cluster0.ij0boyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
app. listen(3000,()=>console.log("server running on port 3000"))