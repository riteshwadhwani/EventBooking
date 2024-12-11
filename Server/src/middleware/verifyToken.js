import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
const secretKey = process.env.SECRET_KEY;
export function verifyToken(req,res,next){
    const authHeader = req.get("Authorization");
    if(authHeader){
        const token = req.body.token || authHeader.split(" ")[1];
        jwt.verify(token,secretKey,(error,payload)=>{ 
            if(error){
                console.log(error)
                res.status(401).send({ // 401 -> unauthorized
                    message:"Token is not valid"
                })
            }
            else{
                next();
            }
        })
    }
    else{
        res.status(401).send({ // 401 -> unauthorized
            message:"Token is missing"
        })
    }

}