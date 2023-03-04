import bcrypt from 'bcryptjs'
import jwt  from 'jsonwebtoken';

const encryptPassword = async (saltRounds,password) => {
    console.log('a-----pp')
    let salt = await bcrypt.genSalt(saltRounds);
    console.log(salt,'salt')
    let hashedPassword = await bcrypt.hash(password,salt);
    console.log(hashedPassword,'-----')
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
const comparePassword = async (enteredPW,userPW) =>{ 
try {
    let comparedPW= bcrypt.compare(enteredPW,userPW)
    console.log(comparedPW,'compared pw ')
} catch (error) {
   throw new Error("Invalid email or password") 
}}
export default {
    encryptPassword,
    generateAuthToken,
    comparePassword
}