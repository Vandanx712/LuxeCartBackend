import { Router } from "express";
import buyerRoute from "./buyer.route.js";
import { login } from "../controllers/login.controller.js";
import sellerRouter from "./seller.route.js";
import deliveryBoyRouter from "./deliveryBoy.route.js";
import { sendotp, updatePassword, verifyotp } from "../controllers/common.controller.js";
import profilepicRouter from "./profilepic.route.js";
import adminRouter from "./admin.route.js";


const indexRoute = Router()

indexRoute.use('/buyer',buyerRoute)
indexRoute.use('/admin',adminRouter)
indexRoute.use('/deliveryboy',deliveryBoyRouter)
indexRoute.use('/seller',sellerRouter)
indexRoute.use('/profilepic',profilepicRouter)
indexRoute.post('/login',login)
indexRoute.post('/sendotp',sendotp)
indexRoute.post('/verifyotp',verifyotp)
indexRoute.post('/updatepassword',updatePassword)

export default indexRoute