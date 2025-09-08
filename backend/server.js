import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectedDB from "./database/db.js";
import userrouter from "./routes/userRoutes.js";
import eventsRouter from "./routes/eventsRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
ConnectedDB();
const app=express();

const ports=process.env.PORT;

app.use(express.json());

app.use(cors());

//Deployement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.use("/api", userrouter);

app.use("/api",eventsRouter);

app.listen(ports,()=>{
    console.log(`Server is running http://localhost:${ports}`)

});
