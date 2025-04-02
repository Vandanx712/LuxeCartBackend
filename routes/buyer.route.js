import { Router } from "express";
import { registerBuyer, updateBuyer } from "../controllers/buyer.controller.js";
import { verifyjwt } from "../middlewares/verifyjwt.js";



const buyerRoute = Router()


buyerRoute.route('/register').post(registerBuyer)
buyerRoute.route('/updateprofile').put(verifyjwt,updateBuyer)


export default buyerRoute