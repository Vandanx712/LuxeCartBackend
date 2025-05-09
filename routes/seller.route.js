import { Router } from "express";
import { addAttributeValue, addProductVariant, deleteAttribute, deleteVariant, getAllDeliveryBoy, getFreedeliveryBoy, getOndeliveryBoy, getSellerById, sellerlogin, sellerRegister, updateAttribute, updateSeller, updateVariant } from "../controllers/seller.controller.js";
import { verifyjwt } from "../middlewares/verifyjwt.js";
import verifyRoles from '../middlewares/verifyrole.js'



const sellerRouter = Router()


sellerRouter.route('/register').post(sellerRegister)
sellerRouter.route('/login').post(sellerlogin)
sellerRouter.route('/update').put(verifyjwt,verifyRoles(['seller']),updateSeller)
sellerRouter.route('/getdetail/:sellerId').get(verifyjwt,verifyRoles(['seller']),getSellerById)

// deliveryboy part 
sellerRouter.route('/getallboys').get(verifyjwt,verifyRoles(['seller']),getAllDeliveryBoy) // aatran test karvani baki chhe 
sellerRouter.route('/getOndeliveryboy').get(verifyjwt,verifyRoles(['seller']),getOndeliveryBoy)
sellerRouter.route('/getfreedeliveryboy').get(verifyjwt,verifyRoles(['seller']),getFreedeliveryBoy)

//product part 
sellerRouter.route('/addattribute').post(verifyjwt,verifyRoles(['seller']),addAttributeValue)
sellerRouter.route('/updateattribute').put(verifyjwt,verifyRoles(['seller']),updateAttribute)
sellerRouter.route('/deleteattribute/:attributeId').delete(verifyjwt,verifyRoles(['seller']),deleteAttribute)
sellerRouter.route('/addproductvariant').post(verifyjwt,verifyRoles(['seller']),addProductVariant)
sellerRouter.route('/updatevariant').put(verifyjwt,verifyRoles(['seller']),updateVariant)
sellerRouter.route('/deletevariant/:variantId').delete(verifyjwt,verifyRoles(['seller']),deleteVariant)

export default sellerRouter