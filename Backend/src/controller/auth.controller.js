import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import blacklistModel from "../models/blacklist.model.js";
import redis from '../config/cache.js'
export async function registerController(req,res){
    const {username,email,password}=req.body
    const isAlreadyRegistered=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(isAlreadyRegistered){
        return res.status(401).json({
            message:"User already registered",
            success:false

        })
    }
    const hash=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,
        email,
        password:hash
    })

    const token=jwt.sign({id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:'7d'})

    res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite:'none'
    })
    return res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}

export async function loginController(req,res) {
    const {email,password,username}=req.body
    const user=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select("+password")
    if(!user){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid Credentials",
            success:false
        })
    }

    
    const token=jwt.sign({id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:'7d'})

    res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite:'none',
        maxAge:7*24*60*60*1000
    })

    return res.status(201).json({
        message:"Logged in successfully",
        sucess:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }

    })
}

export async function getMeController(req,res){
    const user=await userModel.findById(req.user.id);
    
    res.status(200).json({
        message:"user fetched successfully",
        user
    })

}

export async function logOutController(req,res){
    const token=req.cookies.token
    res.clearCookie("token")

    await redis.set(token,Date.now().toString(),"EX",60*60)

    res.status(201).json({
        message:"User logged out successfully"
    })
}
