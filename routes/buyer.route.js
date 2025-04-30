import { Router } from "express";
import { getallCategory, getBuyerbyId, getCategoryById, getSubcategoryByCategory, registerBuyer, updateBuyer } from "../controllers/buyer.controller.js";
import { verifyjwt } from "../middlewares/verifyjwt.js";



const buyerRoute = Router()


buyerRoute.route('/register').post(registerBuyer)
buyerRoute.route('/updateprofile').put(verifyjwt,updateBuyer)
buyerRoute.route('/get/:buyerId').get(verifyjwt,getBuyerbyId)

buyerRoute.route('/category/:categoryId').get(verifyjwt,getCategoryById)
buyerRoute.route('/allcategory').get(verifyjwt,getallCategory)
buyerRoute.route('/getsubcategory/:categoryId').get(verifyjwt,getSubcategoryByCategory)

export default buyerRoute