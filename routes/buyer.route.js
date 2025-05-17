import { Router } from "express";
import { addProductInCart, addProductInWishlist, getAllCartProducts, getAllWishlistProducts, getBuyerbyId, registerBuyer, removeProductfromCart, removeProductfromWishlist, updateBuyer } from "../controllers/buyer.controller.js";
import { verifyjwt } from "../middlewares/verifyjwt.js";



const buyerRoute = Router()


buyerRoute.route('/register').post(registerBuyer)
buyerRoute.route('/updateprofile').put(verifyjwt,updateBuyer)
buyerRoute.route('/get/:buyerId').get(verifyjwt,getBuyerbyId)

// wishlist part
buyerRoute.route('/addonwishlist/:productId').post(verifyjwt,addProductInWishlist)
buyerRoute.route('/removeonwishlist/:productId/:listId').put(verifyjwt,removeProductfromWishlist)
buyerRoute.route('/listproducts').get(verifyjwt,getAllWishlistProducts)

// cart part
buyerRoute.route('/addoncart').put(verifyjwt,addProductInCart)
buyerRoute.route('/removeoncart/:productId/:variantId').put(verifyjwt,removeProductfromCart)
buyerRoute.route('/cartproducts').get(verifyjwt,getAllCartProducts)

export default buyerRoute