import mongoose from "mongoose";

async function ConnectedDB() {
    try{
       await mongoose.connect(process.env.MONGO_DB);
       console.log("Database is Connected!!");
    }
    catch(err)
    {
        console.log("Database is not Connected!!",err.message);
    }
}
export default ConnectedDB;