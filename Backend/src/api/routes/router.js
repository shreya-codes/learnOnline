import express  from "express";
import authRouter from "../routes/authRouter.js"

const router= express.Router();
router.use("/auth",authRouter)

export default router