import { express } from "express";
import mongoose from "mongoose"
import router from "./src/api/routes/router"

const app = express();

mongoose.connect("mongodb://mongo:27017/learnOnline",{useNewUrlParser:true}).then(()=>console.log("mongo connected")).catch(err=> console.log(err))
app.all("/*",router)
const port = 3000
app.listen(port,()=> console.log(`Listening to port ${port}`))