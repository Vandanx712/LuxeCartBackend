import { Router } from "express";
import { createDeliveryBoy } from "../controllers/seller.controller.js";
import { verifyjwt } from "../middlewares/verifyjwt.js";
import verifyRoles from "../middlewares/verifyrole.js";
import { getDeliveryboyById, getYourOrderByStatus, updateBoyProfile } from "../controllers/deliveryBoy.controller.js";


const deliveryBoyRouter = Router()

deliveryBoyRouter.route('/register').post(verifyjwt,verifyRoles(['seller']),createDeliveryBoy)
deliveryBoyRouter.route('getdetail').get(verifyjwt,verifyRoles(['deliveryboy']),getDeliveryboyById)
deliveryBoyRouter.route('/updateprofile').put(verifyjwt,verifyRoles(['deliveryboy']),updateBoyProfile)

// order part
deliveryBoyRouter.route('/getyourorder').post(verifyjwt,verifyRoles(['deliveryboy']),getYourOrderByStatus)

export default deliveryBoyRouter