import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectedDB from "./database/db.js";
import userrouter from "./routes/userRoutes.js";
import eventsRouter from "./routes/eventsRoutes.js";
import path from "path";


dotenv.config();
ConnectedDB();
const app=express();

const ports=process.env.PORT;

app.use(express.json());

app.use(cors());

//Deployement

const _dirname=path.resolve();

app.use(express.static(path.join(_dirname, "frontend/dist")));

app.get("/",(req,res)=>{
    res.send(path.join(_dirname, "frontend", "dist", "index.html"));
})

app.use("/api", userrouter);

app.use("/api",eventsRouter);

app.listen(ports,()=>{
    console.log(`Server is running http://localhost:${ports}`)
});