import bcrypt from 'bcryptjs'
import crypto from "crypto"
import jwt  from 'jsonwebtoken';
import User from '../../../../login/models/User';

const encryptPassword = async (saltRounds,password) => {
    let salt = await bcrypt.genSalt(saltRounds);
    console.log(salt,'salt')
    let hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}
const decryptPassword = async () =>{
    console.log('decryptPassword')
}
const generateAuthToken = async(_id,role) =>{
    try {
        const token = jwt.sign({ _id: _id, role: role }, process.env.SECRET_KEY); 
        return token
    } catch (error) {
        console.log(error,'Error while generating auth token ')
    }

}
const sendEmail = async () =>{
    try {
        console.log("in send email")
    } catch (error) {
        throw new Error("Invalid email or password") 
    }
}
const comparePassword = async (enteredPW,userPW) =>{ 
try {
    let comparedPW= await bcrypt.compare(enteredPW,userPW)
    console.log(comparedPW,'compared pw ')
} catch (error) {
   throw new Error("Invalid email or password") 
}}
const generateToken=async(id)=>{
    const user =await User.findOne({_id:id});
    if(user){
        let token = await crypto.randomBytes(128).toString("hex")
        let token_expires = new Date(now.getTime()+60*60*1000).getTime();
        console.log(token,token_expires)
        await User.updateOne({_id:req.params.id},{$set:{token:token,tokenExpires:token_expires} })
        return token
    }else{
        throw new Error("User not found")
    }

}
export default {
    encryptPassword,
    generateAuthToken,
    comparePassword,
    sendEmail,
    generateToken
}