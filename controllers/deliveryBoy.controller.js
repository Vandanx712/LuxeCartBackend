import { Order } from "../models/order/order.model.js";
import { DeliveryBoy } from "../models/seller/deliveryboy.model.js";
import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";
import bcrypt from 'bcrypt'




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

export const updateBoyProfile = asynchandller(async(req,res)=>{
    const {username, name, email, newpassword ,phone} = req.body
    const boyId = req.user.id

    const existBoy = await DeliveryBoy.findOne({$or:[{username,email,phone}]}).select('-password')
    const user = await findUserByEmail(email)

    if(existBoy){
        if(existBoy.username === username ) throw new ApiError(400,'Username already exist')
        if(existBoy.email === email) throw new ApiError(400,'Email already exist')
        if(existBoy.phone === phone) throw new ApiError(400,'PhoneNO already exist')
    }

    if(user) throw new ApiError(400,'Email already exist')

    const updatedBoy = await DeliveryBoy.findByIdAndUpdate(boyId,{username,name,email:email.toLowerCase(),password:await bcrypt.hash(newpassword,10),phone},{new:true})
    if(!updatedBoy) throw new ApiError(404,'DeliveryBoy not found')

    return res.status(200).json({
        message:'Deliveryboy profile update successfully',
        updatedBoy
    })
})
// Order part

export const getOrderByStatus = asynchandller(async(req,res)=>{
    const deliveryboyId = req.user.id
    const {order_status}= req.body

    const deliveryboyOrders = await Order.find({delivery_boy:deliveryboyId,order_status:order_status}).sort({createdAt:-1})
    const totalOrder = deliveryboyOrders.length

    return res.status(200).json({
        message:'Fetch all order by status successfully',
        deliveryboyOrders,
        totalOrder
    })
})