import User from "../../models/user.js"

const registerUser=(req,res,next)=>{
    console.log("+++++++++++++++++++++++++++++++++++++++")
    console.log(res.body)
    const {name,email,password1,password2,profileImage,bio,role} = req.body
    let errors = []
    if(!name || !email || !password1 || password2 || !role){
        errors.push({msg: 'Please fill all the fields'})
    }

    if(password1 !== password2){
        errors.push({msg:'Passwords do not match'})
    }

    if(password1.length < 6){
        errors.push({msg : ' Password should be atlease 6 characters'})
    }

    if (errors.length > 0){
        res.send(400, errors)
    }else{
        const existingUser = User.findOne({email: email})
        console.log(existingUser)
    }

    console.log(" user registered -------------------------------------------------")
}
const loginUser=()=>{
    console.log(" user logged in -------------------------------------------------")
}
export {registerUser,loginUser}
