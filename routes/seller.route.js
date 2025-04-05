import { Router } from "express";
import { sellerlogin, sellerRegister } from "../controllers/seller.controller.js";



const sellerRouter = Router()


sellerRouter.route('/register').post(sellerRegister)
sellerRouter.route('/login').post(sellerlogin)


export default sellerRouter