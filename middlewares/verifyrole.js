import { DeliveryBoy } from "../models/seller/deliveryboy.model.js";
import { Seller } from "../models/seller/seller.model.js";
import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";



const verifyRoles = (roles = [] ) => asynchandller(async(req,res,next)=>{
    if(!req.user._id) throw new ApiError(404,'Unathorized request')

    const [seller , deliveryboy] = await Promise.all([
        Seller.findById(req.user._id).select('-password'),
        DeliveryBoy.findById(req.user._id).select('-password')
    ])

    const user = seller || deliveryboy
    if(!user) throw new ApiError(404,'User not found')

    if(roles.includes(user.role)) next()
    else throw new ApiError(404,'you are not allowed to perform this action')
})

export default verifyRoles

