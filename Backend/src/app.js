import express from 'express'
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import songRouter from './routes/song.route.js';
import cors from 'cors'
const app=express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'https://sonora-soumyas26.vercel.app',
    credentials:true
}))
app.use('/api/auth',authRouter)
app.use('/api/song',songRouter)




export default app