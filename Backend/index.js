import express from "express";
import mongoose from "mongoose"
// import {MongoClient} from "mongodb"

import router from './src/api/routes/router.js'

const app = express();
mongoose.set('strictQuery', false);

mongoose.connect("mongodb://mongo:27017/learnOnline",{useNewUrlParser:true}).then(()=>console.log("mongo connected")).catch(err=> console.log(err))


// // const client = new MongoClient(url,{
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// })
// const dbName = "learnOnline"

// const main=async()=>{
//     try {
//         console.log("main")
//         await client.connect();
//   console.log('Connected successfully to database');
//   const db = client.db(dbName);
        
//     } catch (error) {
//         console.log(error)
//     }
//     finally{client.close()};
// }

// main()
 

app.all("/*",router)
const port = 3000
app.listen(port,()=> console.log(`Listening to port ${port}`))