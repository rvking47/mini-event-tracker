import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const eventSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    dateTime:{
        type:Date,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"user", 
        required:true
    },
    publicId: { 
        type: String, 
        default: () => uuidv4(), 
        index: true
     },
    createdAt: { 
       type: Date, 
       default: Date.now 
    },
    updatedAt: {
        type: Date, 
        default: Date.now 
    }
});

const eventModel=new mongoose.model("event", eventSchema);

export default eventModel;