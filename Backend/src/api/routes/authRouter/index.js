import express from "express";
import {registerUser , loginUser} from "../../handlers/auth.js"
const authRouter= express.Router()

authRouter.route("/register").post(registerUser)
authRouter.post("/login",loginUser)

export default authRouter