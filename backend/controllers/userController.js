import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup=async(req,res)=>{
   try{
     const {email, password, confirm_password}=req.body;

     const result=await userModel.findOne({email});
     if(result){
     return res.status(401).json({message:"This email is already exists!!"});
     }

     const response=new userModel({
     email, 
     password,
     confirm_password,
     });
     response.password=await bcrypt.hash(password,10);
     await response.save();
     
     res.status(201).json({message:"Signup SuccessFully!!", response});
   }
   catch(err)
   {
     res.status(501).json({message:"Server Error!"+ err.message});
   }
};

const login=async(req,res)=>{
  try{
     const {email, password}=req.body;
     
     const result=await userModel.findOne({email});
     if(!result)
     {
     return res.status(401).json({message:"Email and Password wrong!!"})
     }

     const ispasswords=await bcrypt.compare(password, result.password);
     if(!ispasswords)
     {
     return res.status(401).json({message:"Email and Password wrong!!"})
     }

     const jwtToken=jwt.sign({email:result.email, _id:result._id},
      process.env.SECRET_KEY,
      {expiresIn:"24h"})
     
      res.status(201).json({message:"Login SuccessFully!!", token: jwtToken, user:{_id:result._id, email:result.email}})
  }
  catch(err)
  {
    res.status(501).json({message:"Server Error!"+ err.message});
  }
}


export {signup, login};