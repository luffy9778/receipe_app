const express=require("express")
const jwt=require("jsonwebtoken")
const verifytoken=(req,res,next)=>{
    const authheader=req.headers.authorization
    if(authheader){
        jwt.verify(authheader,"secret",(err)=>{
            if (err) {
                return res.sendStatus(403);
              }
              next();
        })
    }
}
module.exports=verifytoken