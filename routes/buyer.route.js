import { Router } from "express";
import { registerBuyer } from "../controllers/buyer.controller.js";



const buyerRoute = Router()


buyerRoute.route('/register').post(registerBuyer)



export default buyerRoute