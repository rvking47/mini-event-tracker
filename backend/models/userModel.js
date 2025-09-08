import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
   confirm_password:{
        type:String,
        required:true,
    }
});

const userModel=new mongoose.model("user",userSchema);

export default userModel;
