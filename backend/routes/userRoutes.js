import express from "express";
import { signup,  login } from "../controllers/userController.js";
import { validationSignup,  validationLogin } from "../utils/validation.js";

const userrouter=express.Router();

userrouter.post("/signup", validationSignup, signup);
userrouter.post("/login", validationLogin, login);

export default userrouter;