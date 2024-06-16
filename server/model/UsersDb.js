const mongoose=require("mongoose") 
const UserModel=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    savedrecipe:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"recipes"
    }]

})
module.exports=mongoose.model("users",UserModel)