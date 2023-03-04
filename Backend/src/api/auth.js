import { jwt } from "jsonwebtoken";

const auth =(req,res,next)=>{
    try {
        const token = req.headers[x-access-token]
        if(!token){
            res.status(401).send("Acess denied ! No token supplied")
        }
        else{
            try {
                const decoded = jwt.verify(token,process.env.SECRET_KEY)
            console.log(decoded,'decoded')
            next()
            } catch (error) {
                console.log('token could not be decoded ')
                res.status(400).send("Invalid token.");

            }
            
        }
    } catch (error) {
        console.log(error,'error while authenticating')
    }
}
export {auth}