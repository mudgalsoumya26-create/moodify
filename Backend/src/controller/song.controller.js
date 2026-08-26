import songModel from "../models/songs.model.js";
import id3 from 'node-id3'
import storageService from "../services/storage.service.js";
export async function uploadSongController(req,res){
    
    const songBuffer=req.files.song[0].buffer
    const posterBuffer=req.files.posterUrl[0].buffer
    const {mood,title}=req.body

    const tags=await id3.read(songBuffer)
    
    const songFile=await storageService.uploadFile({
        buffer:songBuffer,
        filename:title,
        folder:'/cohort/moodify/songs'
    })
    const posterFile=await storageService.uploadFile({
        buffer:posterBuffer,
        filename:title+'-poster',
        folder:'/cohort/moodify/posters'
    })

    const song=await songModel.create({
        url:songFile.url,
        posterUrl:posterFile.url,
        mood,
        title
        
       
    })
    res.status(200).json({
        message:"song created successfully",
        song
    })
}
 export async function getSongController(req,res){
    const {mood}=req.query
    const [song] = await songModel.aggregate([
    { $match: { mood } },       // filter by mood
    { $sample: { size: 1 } }    // pick one random doc
  ]);
    res.status(200).json({
        message:"Song fetched successfully",
        song
    })
}



