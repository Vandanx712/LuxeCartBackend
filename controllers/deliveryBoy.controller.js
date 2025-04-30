import { DeliveryBoy } from "../models/seller/deliveryboy.model.js";
import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";





export const getDeliveryboyById = asynchandller(async(req,res)=>{
    const {deliveryboyId} = req.params
    if(!deliveryboyId) throw new ApiError(429,'Plz pass deliveryBoy id')

    const deliveryBoy = await DeliveryBoy.findById(deliveryboyId).select('-password')
    if(!deliveryBoy) throw new ApiError(404,'DeliveryBoy not found')

    return res.status(200).json({
        message:'Fetch deliveryBoy detail successfully',
        deliveryBoy
    })
})