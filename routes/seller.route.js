import { Router } from "express";
import { sellerRegister } from "../controllers/seller.controller.js";



const sellerRouter = Router()


sellerRouter.route('/register').post(sellerRegister)


export default sellerRouter