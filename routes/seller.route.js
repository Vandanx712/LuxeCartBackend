import { Router } from "express";
import { getAllDeliveryBoy, getFreedeliveryBoy, getOndeliveryBoy, getSellerById, sellerlogin, sellerRegister } from "../controllers/seller.controller.js";
import { verifyjwt } from "../middlewares/verifyjwt.js";
import verifyRoles from '../middlewares/verifyrole.js'



const sellerRouter = Router()


sellerRouter.route('/register').post(sellerRegister)
sellerRouter.route('/login').post(sellerlogin)
sellerRouter.route('/getdetail').get(verifyjwt,verifyRoles(['seller']),getSellerById)



// deliveryboy part 
sellerRouter.route('/getallboys').get(verifyjwt,verifyRoles(['seller']),getAllDeliveryBoy)
sellerRouter.route('/getOndeliveryboy').get(verifyjwt,verifyRoles(['seller']),getOndeliveryBoy)
sellerRouter.route('/getfreedeliveryboy').get(verifyjwt,verifyRoles(['seller']),getFreedeliveryBoy)


export default sellerRouter