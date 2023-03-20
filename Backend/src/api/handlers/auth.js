import passport from "passport"
import User from "../../models/user.js"
import utils from '../../commons/utils.js'
import passportConfig from "../../configs/passport.js"
import sendMail from "./sendEmail.js"

const registerUser=async (req,res,next)=>{
    try {
    const {name,email,password1,password2,profileImage,bio,role} = req.body
    let saltRounds=10
    if(!name || !email || !password1 || !req.body.password2 || !role){
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
        let hashedPassword = await utils.encryptPassword(saltRounds,password1)
        newUser.password = hashedPassword
                try {

                    let savedUser=await newUser.save()
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
        await passportConfig(); 

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
const logOut = async(req,res,next)=>{
    req.logout(function(err){
        if(err) return next(err);
        res.redirect('/');
      })
  };

const changePassword = async (req,res,next) => {
    try {
        let user= await User.findOne({email:req.body.email})
        let oldPW=req.body.oldPW
        if(user){
            let isMatch =  await utils.comparePassword(oldPW,user.password)
            if(isMatch){
                if(req.body.password1 !== req.body.password2){
                    throw new Error('Passwords do not match')
                }
            
                if(req.body.password1.length < 6){
                    throw new Error( ' Password should be atlease 6 characters')
                }
                const hashedPassword = await utils.encryptPassword(saltRounds,req.body.password1)
                try {
                    await User.updateOne({_id:req.params.id},{$set:{password:hashedPassword} })
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
const resetPassword =async (req,res,next) =>{
    try {
        const user =await User.findOne({_id:req.params.id});
        if(user){
        let token = await generateToken(req.params.id);
        if(token){
            let url = `${process.env.baseURL}?type=reset-password&email=${user.email}&token=${token}&id=${user._id}`;
            console.log(url,'url');
            try {
                await sendMail(user.email,"Reset password",    `<div>Click the link to change password <a href=${url}>Click Here</a></div>`)

            } catch (error) {
            throw new Error(`Couldnot send mail to user ${user.email} for reset password`)            }
            
        } else{
            throw new Error("User not found")
        }
    
    }
    } catch (error) {
        throw new Error("error while resetting password")
    }
}
export {registerUser,loginUser,changePassword,logOut,resetPassword}
