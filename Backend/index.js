import  express from "express";
import * as dotenv from 'dotenv' // see
dotenv.config()
import bodyParser from "body-parser"
import mongoose from "mongoose"
import session from 'express-session';
import passport from "passport";


import router from './src/api/routes/router.js'

const app = express();
if(!process.env.SECRET_KEY){
  console.error("FATAL ERROR: SECRET_KEY is not defined.");
  process.exit(1);
}
const url="mongodb://localhost:27017/learnOnline"
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection is open');
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection has occured ' + err + ' error');
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection is disconnected due to application termination');
        process.exit(0)
    });
});

// const client = new MongoClient(url,{
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// })
// const dbName = "learnOnline"

// const main=async()=>{
//     try {
//         console.log('-----')
//         await client.connect();
//   console.log('Connected successfully to database');
//   const db = client.db(dbName);
        
//     } catch (error) {
//         console.log(error)
//     }
//     finally{client.close()};
// }

// main()
 

// mongoose.connect("mongodb://mongo:27017/docker-node-mongo",{useNewUrlParser:true}).then(()=>console.log("mongo connected")).catch(err=> console.log(err))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => { 
    next()
  });

  
  // Add passport middleware
  app.use(passport.initialize());
  // Add session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
  }));
  
app.all("/*",router)
const port = 3000
app.listen(port,()=> console.log(`Listening to port ${port} -------------------------`))