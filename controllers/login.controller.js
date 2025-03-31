import { Buyer } from '../models/buyer/buyer.model.js'
import { ApiError } from "../utill/apierror.js";
import {DeliveryBoy} from '../models/seller/deliveryboy.model.js'
import { asynchandller } from "../utill/asynchandller.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


export const generateAccessToken = async(userId) =>{
    try {
        const accessToken = jwt.sign({
            id:userId
        },process.env.ACCESS_TOKEN,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE})
        return accessToken
    } catch (error) {
        console.error(error)
    }
}

export const generateRefreshToken = async(userId) =>{
    try {
        const refreshToken = jwt.sign({
            id:userId
        },process.env.REFRESH_TOKEN,{expiresIn:process.env.REFRESH_TOKEN_EXPIRE})
        return refreshToken
    } catch (error) {
        console.error(error)
    }
}

export const login = asynchandller(async(req,res)=>{
    const { email, password } = req.body

    if([email,password].some((field)=>field ==='')) {
        throw new ApiError(404,'Plz fill all field')
    }

    const [buyer,deliveryBoy] = await Promise.all([
        Buyer.findOne({email:email}).select('name email password role'),
        DeliveryBoy.findOne({email:email}).select('name email password role')
    ])

    const user = buyer || deliveryBoy

    if(!user) throw new ApiError(404,'User not found')

    const passwordvalid = await bcrypt.compare(password, user.password )
    if(!passwordvalid) throw new ApiError(404,'Plz enter correct password')

    const accessToken = await generateAccessToken(user.id)
    const refreshToken = await generateRefreshToken(user.id)
    const options = {
        httpOnly: true,
        secure: true
    }
 
    if(buyer) {
        const updatedBuyer  = await Buyer.findByIdAndUpdate(buyer.id,{$set:{refreshToken:refreshToken}})
        return res.status(200)
        .cookie('accessToken',accessToken,options)
        .cookie('refreshToken',refreshToken,options)
        .json({
            message:'Login successful',
            Buyer: {
                name: updatedBuyer.name,
                email: updatedBuyer.email,
                role: updatedBuyer.role,
                refreshToken:updatedBuyer.refreshToken
            }, 
        })
    }
    else{
        const deliveryboy = await DeliveryBoy.findByIdAndUpdate(deliveryBoy.id,{$set:{refreshToken:refreshToken}})
        return res.status(200)
        .cookie('accessToken',accessToken,options)
        .cookie('refreshToken',refreshToken,options)
        .json({
            message:'Login successful',
            Deliveryboy: {
                name: deliveryboy.name,
                email: deliveryboy.email,
                role: deliveryboy.role,
                refreshToken:deliveryboy.refreshToken
            },
        })
    }
})