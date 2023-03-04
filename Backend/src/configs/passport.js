import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User  from "../configs/passport";
import passport from "passport";

const localStratergy = async (email,enteredPW,userPW,done) => {
    try {
        console.log(email,enteredPW,userPW," user logged in -------------------------------------------------")
        const user = await User.findOne({email:email})
        if(user){
           let isMatch =  await bcrypt.compare(enteredPW,userPW)
           console.log(isMatch, 'isMatch')
           if(isMatch){
            return done(null,user);
    }
    else{
        return done(null, false, { message: 'Invalid email or password.' });

    }
        }else{
            return done(null, false, { message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.log("Error on local stratergy")
return done(error)
    }
}

const passportConfig = async (email,enteredPW,userPW,userId) =>{
    try {
        passport.use(new LocalStrategy(localStratergy))
        passport.serializeUser= (userId, done)=> {
            done(null, userId);
          };
          
          passport.deserializeUser= async (id, done)=> {
           const user=  await User.findById(id);
           done(err, user);
        
        }        
    } catch (error) {
        return done(error)
    }
}


export default passportConfig