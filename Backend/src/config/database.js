import mongoose from "mongoose";

const connectToDB=async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to DB")
    }).catch((err)=>{
        console.log("Error in connecting to DB",err)
    })
}

export default connectToDB