import mongoose from "mongoose";

const songSchema=new mongoose.Schema({
    url:{
        type:String,
        require:true
    },
    posterUrl:{
        type:String,
        require:true
    },
    
    title:{
        type:String,
        require:true
    },
    mood:{
        type:String,
        enum:[
            "happy","sad","surprised"
        ]

    }
})
const songModel=mongoose.model("songs",songSchema)

export default songModel