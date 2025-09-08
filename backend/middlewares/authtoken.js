import jwt from "jsonwebtoken";

const verifyUser=async(req,res, next)=>{

    const authHeader=req.headers['authorization'];

    if(!authHeader)
    {
        res.status(401).json({message:"Unauthorized, JWT token is required"});
    }

    const token=authHeader.split(" ")[1];

     if(!token)
    {
        res.status(401).json({message:"Unauthorized, token format is incorrect"});
    }

    try{
     const decoded=jwt.verify(token, process.env.SECRET_KEY);
     req.userId= decoded._id
     next();
    }
    catch(err)
    {
        res.status(501).json({message:"Unauthorized, JWT token is invalid or expired"})
    }
}
export default verifyUser;