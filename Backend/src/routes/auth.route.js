import express from 'express'
import { authUser } from '../middlewares/auth.middleware.js';
import { registerController } from '../controller/auth.controller.js';
import { loginController } from '../controller/auth.controller.js';
import { getMeController } from '../controller/auth.controller.js';
import { logOutController } from '../controller/auth.controller.js';
const authRouter=express.Router();


authRouter.post('/register',registerController)
authRouter.post('/login',loginController)
authRouter.get('/get-me',authUser,getMeController)
authRouter.get('/logout',logOutController)
export default authRouter