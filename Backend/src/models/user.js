import mongoose from "mongoose";

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

export default mongoose.model('User',UserSchema)