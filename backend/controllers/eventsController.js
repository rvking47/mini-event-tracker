import eventModel from "../models/eventsModels.js";
import { v4 as uuidv4 } from "uuid";

const createEvent=async(req,res)=>{
    try{
        const {title, dateTime, location, description}=req.body;

        const result=new eventModel({
            title,
            dateTime,
            location,
            description,
            owner:req.userId,
            publicId:uuidv4()
        });

        await result.save();

       res.status(201).json({message:"Event created!", result, shareLink:`${process.env.BASE_URL}/api/publicevent/${result.publicId}`});
    }
    catch(err)
    {
     res.status(501).json({message:"Server Error!"+ err.message});
    }
}

const getEvents=async(req,res)=>{
    try{
     const result=await eventModel.find({owner:req.userId});
     res.status(201).json({message:"Evenets!!",result});
    }
    catch(err)
    {
     res.status(501).json({message:"Server Error!"+ err.message});
    }
}

const getEventById=async(req,res)=>{
    try{
        const {id}=req.params;
       const result=await eventModel.findOne({_id:id, owner:req.userId});
     if(!result)
     {
       return res.status(401).json({ message: "Event not found" });
     }
     res.status(201).json({message:"Single Event!!", result})
    }
    catch(err)
    {
     res.status(501).json({message:"Server Error!"+ err.message});
    }
}

const distroyEvent=async(req,res)=>{
    try{
    const {id}=req.params;
     const result=await eventModel.findOneAndDelete({_id:id, owner:req.userId});
     if(!result)
     {
      return res.status(401).json({ msg: "Event not found or not yours" });
     }
     res.status(201).json({message:"Event Deleted!!"});
    }
    catch(err)
    {
     res.status(501).json({message:"Server Error!"+ err.message});
    }
}

const updateEvent=async(req,res)=>{
    try{
    const {id}=req.params;
        const {title, dateTime, location, description}=req.body;
      const result=await  eventModel.findOneAndUpdate({_id:id, owner:req.userId},{
        $set:{
              title,
            dateTime,
            location,
            description
        }
      },{new:true}
    );
        if(!result)
     {
      return res.status(401).json({ msg: "Event not found or not yours" });
     }
     res.status(201).json({message:"Event Updated!!", result});
    }
    catch(err)
    {
     res.status(501).json({message:"Server Error!"+ err.message});
    }
}


const getpublicEvenet=async(req,res)=>{
try {
    const { publicId } = req.params;
    const result = await eventModel.findOne({ publicId }).populate("owner", "email");

    if (!result) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server Error! " + err.message });
  }
};


const listEvent=async(req,res)=>{
    try{
       const {filter}=req.query;
       const now=new Date();
       
       let query={owner:req.userId}

       if(filter === "upcoming") 
       {
        query.dateTime={$gte:now};
       }
       else if(filter==="past")
       {
        query.dateTime={$lt:now}
       }
        
       const result=await eventModel.find(query).sort({dateTime: 1});

       res.status(201).json({result});
    }
    catch(err)
    {
     res.status(501).json({message:"Server Error!"+ err.message});
    }
}

export {createEvent, getEvents, getEventById, distroyEvent, updateEvent, getpublicEvenet, listEvent};