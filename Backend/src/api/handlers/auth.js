import bcrypt from "bcryptjs"
import passport from "passport"
import User from "../../models/user.js"
import utils from '../../commons/utils.js'

const registerUser=async (req,res,next)=>{
    try {
    const {name,email,password1,password2,profileImage,bio,role} = req.body
    let saltRounds=10
    if(!name || !email || !password1 || !password2 || !role){
        throw new Error( "Please fill all the fields")
    }

    if(password1 !== password2){
        throw new Error('Passwords do not match')
    }

    if(password1.length < 6){
        throw new Error( ' Password should be atlease 6 characters')
    }

    
        console.log('in here')
        const existingUser = await User.findOne({email:email}).exec();
        console.log(existingUser,'exist')
        if(existingUser){
         throw new Error("User has already been registered")
        }
        let newUser=new User ({name,email,role})
        console.log(newUser,process.env.SECRET_KEY)
        let hashedPassword = await utils.encryptPassword(saltRounds,password1)
        newUser.password = hashedPassword
        console.log(newUser,'newuser')
                try {

                    let savedUser=await newUser.save()
                    console.log(savedUser,'saved user')
                   const token = await utils.generateAuthToken(newUser._id,newUser.role)
                   res.header("x-auth-token", token).send({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                  });
                } catch (error) {
                    console.log(error,'Error while registering')
                    res.send(error)
                    
                }
}
    catch(error){
        console.log(error.message)
        res.status(400).send({ error: error.message });
    }
}
const loginUser= async (req,res,next)=>{
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
              console.log(err);
              return res.status(400).send({ error: err.message });
            }
            if (!user) {
              console.log(info.message);
              return res.status(400).send({ error: info.message });
            }
            req.logIn(user, (err) => {
              if (err) {
                console.log(err);
                return res.status(400).send({ error: err.message });
              }
              return res.send({ message: 'Login successful' });
            });
          })(req, res, next);
            } catch (error) {
        console.log(error,'Error while logging in')
        res.status(400
            ).send({ error: error.message });
    }
}

const changePassword = async (req,res,next) => {
    try {
        let requestedUser= await User.findOne({email:req.body.email})
        if(requestedUser){
            let pass =  await utils.comparePassword(enteredPW,user,password)
            if(pass){

            }else{
                throw new Error("old password doesnot match")
            }

        }else{
            throw new Error("Invalid email")
        }
        
    } catch (error) {
        console.log("error while changing passwprd")
        res.status(400).send({ error: error.message });

    }

}
export {registerUser,loginUser,changePassword}
