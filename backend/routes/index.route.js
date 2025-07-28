import { Router } from "express";
import buyerRoute from "./buyer.route.js";
import { getGoogleLoginCallback, getGoolgeLoginpage, login } from "../controllers/login.controller.js";
import sellerRouter from "./seller.route.js";
import deliveryBoyRouter from "./deliveryBoy.route.js";
import { addAddress, deleteAddress, getAddressById, getUserAllAddress, sendotp, updateAddress, updatePassword, verifyotp } from "../controllers/common.controller.js";
import profilepicRouter from "./profilepic.route.js";
import adminRouter from "./admin.route.js";
import { verifyjwt } from "../middlewares/verifyjwt.js";
import productRouter from "./product.route.js";


const indexRoute = Router()

indexRoute.use('/buyer',buyerRoute)
indexRoute.use('/admin',adminRouter)
indexRoute.use('/deliveryboy',deliveryBoyRouter)
indexRoute.use('/seller',sellerRouter)
indexRoute.use('/profilepic',profilepicRouter)
indexRoute.use('/product',productRouter)
indexRoute.post('/login',login)
indexRoute.get('/googlelogin',getGoolgeLoginpage)   // google login
indexRoute.get('/google/callback',getGoogleLoginCallback)
indexRoute.post('/sendotp',sendotp)
indexRoute.post('/verifyotp',verifyotp)
indexRoute.post('/updatepassword',updatePassword)
indexRoute.post('/addAddress',verifyjwt,addAddress)
indexRoute.get('/getallAddress',verifyjwt,getUserAllAddress)
indexRoute.get('/addressgetByid/:addressId',verifyjwt,getAddressById)
indexRoute.put('/updateaddress',verifyjwt,updateAddress)
indexRoute.delete('/deleteaddress/:addressId',verifyjwt,deleteAddress)

export default indexRoute