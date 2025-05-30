import { Admin } from "../models/admin/admin.model.js";
import { Buyer } from "../models/buyer/buyer.model.js";
import { DeliveryBoy } from "../models/seller/deliveryboy.model.js";
import { Seller } from "../models/seller/seller.model.js";
import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";
import jwt from 'jsonwebtoken'




export const verifyjwt = asynchandller(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken

        if (!token) throw new ApiError(400, 'Unathorized request ')

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        const [buyer, seller, deliveryboy, admin] = await Promise.all([
            Buyer.findById(decoded.id).select('-password'),
            Seller.findById(decoded.id).select("-password"),
            DeliveryBoy.findById(decoded.id).select('-password'),
            Admin.findById(decoded.id).select('-password')
        ])

        const user = buyer || seller || deliveryboy || admin
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
})