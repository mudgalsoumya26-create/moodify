import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import blacklistModel from "../models/blacklist.model.js";
import redis from "../config/cache.js";
export async function authUser(req,res,next){
    const token=req.cookies.token

    if(!token){
        return res.status(400).json({
            message:"Token not provided"
        })
    }

    const isTokenBlacklisted=await redis.get(token)
    if(isTokenBlacklisted){
        return res.status(400).json({
            message:"token is blacklisted"
        })
    }

  try{ const decoded= jwt.verify(
        token,process.env.JWT_SECRET)
        req.user=decoded
        next();
    }
    catch(err){
        return res.status(400).json({
            message:"Invalid token"
        })
    } 

}