import mongoose, { Schema } from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:[true,"Username is required"],
        unique:[true,"Username should be unique"]
    },
    email:{
        type:String,
        require:[true,"Email is required"],
        unique:[true,"Email should be unique"]
    },
    password:{
        type:String,
        require:[true,"Password is required"],
        select:false
    }
})

const userModel=mongoose.model("user",userSchema)
export default userModel