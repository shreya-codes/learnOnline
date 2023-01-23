import express  from "express";
import authRouter from "./authRouter/index.js"

const router= express.Router();
router.use("/auth",authRouter)

export default router