import express from "express";
import {registerUser , loginUser , changePassword} from "../handlers/auth.js"
const authRouter= express.Router()

authRouter.route("/register").post(registerUser)
authRouter.post("/login",loginUser)
authRouter.post("/changePassword",changePassword)

export default authRouter