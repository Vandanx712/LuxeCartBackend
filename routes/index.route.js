import { Router } from "express";
import buyerRoute from "./buyer.route.js";
import { login } from "../controllers/login.controller.js";
import sellerRouter from "./seller.route.js";
import deliveryBoyRouter from "./deliveryBoy.route.js";
import { forgetPassword, resetPassword } from "../controllers/forgetPassword.js";


const indexRoute = Router()

indexRoute.use('/buyer',buyerRoute)
indexRoute.use('/deliveryboy',deliveryBoyRouter)
indexRoute.use('/seller',sellerRouter)
indexRoute.post('/login',login)
indexRoute.post('/forgetpassword',forgetPassword)
indexRoute.post('/resetpassword',resetPassword)

export default indexRoute