import { Router } from "express";
import { verifyjwt } from "../middlewares/verifyjwt.js";
import { addAttributeValue, getallAttributes, getallCategory, getCategoryById, getSubcategoryByCategory } from "../controllers/product.controller.js";
import verifyRoles from "../middlewares/verifyrole.js";


const productRouter = Router()

//category
productRouter.route('/category/:categoryId').get(verifyjwt,getCategoryById)
productRouter.route('/allcategory').get(verifyjwt,getallCategory)
productRouter.route('/getsubcategory/:categoryId').get(verifyjwt,getSubcategoryByCategory)

//attribute
productRouter.route('/allattributes').get(verifyjwt,verifyRoles(['admin']),getallAttributes)
productRouter.route('/addattributevalue').post(verifyjwt,verifyRoles(['seller']),addAttributeValue)

export default productRouter