import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User  from "../models/user.js";
import passport from "passport";

const localStratergy = async (email,password,done) => {
    try {
        console.log(email,password," user logged in -------------------------------------------------")
        const user = await User.findOne({email:email})
        if(user){
           let isMatch =  await bcrypt.compare(password,user.password)
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

const passportConfig = async (email,password,done) =>{
    try {
        passport.use(new LocalStrategy({usernameField:'email'},localStratergy))
        passport.serializeUser((user, done)=> {
            done(null, user.id);
          });
          
          passport.deserializeUser(async (id, done)=> {
           const user=  await User.findOne({_id:id});
           done(null, user);
        
        }   )     
    } catch (error) {
        return done(error)
    }
}


export default passportConfig