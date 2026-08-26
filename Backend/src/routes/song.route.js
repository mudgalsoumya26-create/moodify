import express from 'express'
import upload from '../middlewares/song.middleware.js'
import { uploadSongController } from '../controller/song.controller.js'
import { getSongController } from '../controller/song.controller.js'
const songRouter=express.Router()

songRouter.post('/',upload.fields([{name:'song',maxCount:1},{name:'posterUrl',maxCount:1}]),uploadSongController)
songRouter.get('/',getSongController)
export default songRouter