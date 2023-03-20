import express from "express";
import {registerUser , loginUser , changePassword,logOut,resetPassword} from "../handlers/auth.js"
const authRouter= express.Router()

authRouter.route("/register").post(registerUser)
authRouter.post("/login",loginUser)
authRouter.post("/logout",logOut)
authRouter.post("/changePassword",changePassword)
authRouter.post("/reset/:id",resetPassword)
export default authRouter