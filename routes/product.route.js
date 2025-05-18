import { Router } from "express";
import { verifyjwt } from "../middlewares/verifyjwt.js";
import {attributegetById, getallCategory, getCategoryById, getProductByCategory, getSubcategoryByCategory, homepageProduct, productGetById, searchProduct, variantgetById } from "../controllers/product.controller.js";
import verifyRoles from "../middlewares/verifyrole.js";


const productRouter = Router()

//category
productRouter.route('/category/:categoryId').get(verifyjwt,getCategoryById)
productRouter.route('/allcategory').get(verifyjwt,getallCategory)
productRouter.route('/getsubcategory/:categoryId').get(verifyjwt,getSubcategoryByCategory)

//attribute
productRouter.route('/getattribute/:attributeId').get(verifyjwt,verifyRoles(['seller']),attributegetById)
productRouter.route('/getvariant/:variantId').get(verifyjwt,verifyRoles(['seller']),variantgetById)

//product
productRouter.route('/getproductById/:productId').get(verifyjwt,productGetById)
productRouter.route('/search').post(verifyjwt,searchProduct)
productRouter.route('/searchby/:categoryId').get(verifyjwt,getProductByCategory)
productRouter.route('/homepage').get(verifyjwt,homepageProduct)



export default productRouter