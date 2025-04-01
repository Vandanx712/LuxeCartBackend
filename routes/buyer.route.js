import { Router } from "express";
import { generateOtp, registerBuyer, updateBuyer, updatePassword } from "../controllers/buyer.controller.js";
import { verifyjwt } from "../middlewares/verifyjwt.js";
import { verifyOtp } from "../middlewares/verifyOtp.js";



const buyerRoute = Router()


buyerRoute.route('/register').post(registerBuyer)
buyerRoute.route('/update').put(verifyjwt,updateBuyer)
buyerRoute.route('/updatepassword').put(generateOtp,verifyOtp,updatePassword)



export default buyerRoute