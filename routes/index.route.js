import { Router } from "express";
import buyerRoute from "./buyer.route.js";
import { login } from "../controllers/login.controller.js";
import sellerRouter from "./seller.route.js";
import deliveryBoyRouter from "./deliveryBoy.route.js";
import { verifyjwt } from "../middlewares/verifyjwt.js";
import upload from '../middlewares/multer.js'
import { setProfilePic } from "../controllers/profilepic.controller.js";
import { sendotp, verifyotp } from "../controllers/otp.controller.js";
import { updatePassword } from "../controllers/common.controller.js";


const indexRoute = Router()

indexRoute.use('/buyer',buyerRoute)
indexRoute.use('/deliveryboy',deliveryBoyRouter)
indexRoute.use('/seller',sellerRouter)
indexRoute.post('/login',login)
indexRoute.route('/setprofilepic').post(verifyjwt,upload.single('avatar'),setProfilePic)
indexRoute.post('/sendotp',sendotp)
indexRoute.post('/verifyotp',verifyotp)
indexRoute.post('/updatepassword',updatePassword)

export default indexRoute