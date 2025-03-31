import { Router } from "express";
import { createDeliveryBoy } from "../controllers/seller.controller.js";
import { verifyjwt } from "../middlewares/verifyjwt.js";
import verifyRoles from "../middlewares/verifyrole.js";


const deliveryBoyRouter = Router()

deliveryBoyRouter.route('/register').post(verifyjwt,verifyRoles(['seller']),createDeliveryBoy)


export default deliveryBoyRouter