import { Router } from "express";
import { addProductInCart, addProductInWishlist, createOrderForSingle, createOrderFromCart, getAllCartProducts, getAllWishlistProducts, getBuyerbyId, getCartById, getListById, registerBuyer, removeProductfromCart, removeProductfromWishlist, updateBuyer, verifyPayment } from "../controllers/buyer.controller.js";
import { verifyjwt } from "../middlewares/verifyjwt.js";



const buyerRoute = Router()


buyerRoute.route('/register').post(registerBuyer)
buyerRoute.route('/updateprofile').put(verifyjwt,updateBuyer)
buyerRoute.route('/get/:buyerId').get(verifyjwt,getBuyerbyId)

// wishlist part
buyerRoute.route('/addonwishlist/:productId').post(verifyjwt,addProductInWishlist)
buyerRoute.route('/removeonwishlist/:productId/:listId').put(verifyjwt,removeProductfromWishlist)
buyerRoute.route('/getlist/:listId').get(verifyjwt,getListById)
buyerRoute.route('/listproducts').get(verifyjwt,getAllWishlistProducts)

// cart part
buyerRoute.route('/addoncart').put(verifyjwt,addProductInCart)
buyerRoute.route('/removeoncart/:productId/:variantId').put(verifyjwt,removeProductfromCart)
buyerRoute.route('/getcart/:cartId').get(verifyjwt,getCartById)
buyerRoute.route('/cartproducts').get(verifyjwt,getAllCartProducts)

// order part
buyerRoute.route('/cartorder').post(verifyjwt,createOrderFromCart)
buyerRoute.route('/singleorder').post(verifyjwt,createOrderForSingle)
buyerRoute.route('/verifypayment').post(verifyjwt,verifyPayment)

export default buyerRoute