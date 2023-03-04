import mongoose from "mongoose";
import  jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String
    },
    bio:{
        type:String
    },
    role:{
        type:String,
        required:true,
        enum:['student','tutor']
    },
    createdAt:{
        type: Date,
        default: Date.now()

    },
    updatedAt:{
        type: Date
    }
})

UserSchema.methods.generateAuthToken = () =>{
    try {
        const token = jwt.sign({ _id: this._id, role: this.role }, process.env.SECRET_KEY); 
        return token
    } catch (error) {
        console.log(error,'Error while generating auth token ')
    }

}

export default mongoose.model('User',UserSchema)