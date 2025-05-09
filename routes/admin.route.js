import { Router } from "express";
import {verifyjwt} from '../middlewares/verifyjwt.js'
import verifyRoles from '../middlewares/verifyrole.js'
import { addAttributes, createCategory, createSubcategory, deleteAttribute, getById, updateAdmin, updateAttribute, updateCategory, updateCategoryStatus } from "../controllers/admin.controller.js";


const adminRouter = Router()

adminRouter.route('/update').put(verifyjwt,verifyRoles(['admin']),updateAdmin)


adminRouter.route('/create-categoy').post(verifyjwt,verifyRoles(['admin']),createCategory)
adminRouter.route('/updatecategory').put(verifyjwt,verifyRoles(['admin']),updateCategory)
adminRouter.route('/changestatus').put(verifyjwt,verifyRoles(['admin']),updateCategoryStatus)
adminRouter.route('/create-subcategory').post(verifyjwt,verifyRoles(['admin']),createSubcategory)
adminRouter.route('/getbyid').get(verifyjwt,verifyRoles(['admin']),getById)

adminRouter.route('/addAttribute').post(verifyjwt,verifyRoles(['admin']),addAttributes)
adminRouter.route('/updateattribute').put(verifyjwt,verifyRoles(['admin']),updateAttribute)
adminRouter.route('/deleteattribute/:attributeId').delete(verifyjwt,verifyRoles(['admin']),deleteAttribute)

export default adminRouter