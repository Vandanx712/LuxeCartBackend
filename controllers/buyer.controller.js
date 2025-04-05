import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";
import { Buyer } from '../models/buyer/buyer.model.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import sendWelcomeEmail from "../notification/sentWelcomeMail.js";
import { Coin } from "../models/buyer/coin.model.js";


dotenv.config()




export const registerBuyer = asynchandller(async (req, res) => {
    const { username,name, email, phone, password } = req.body

    if ([username,name, email, phone, password].some((field) => field === '')) {
        throw new ApiError(404, 'Plz fill all field')
    }

    const existbuyer = await Buyer.findOne({
        $or: [{ email: email }, { phone: phone }, { username: username }]
    })

    if (existbuyer) {
        if (username === existbuyer.username) throw new ApiError(404, 'Username is already exist')
        if (email === existbuyer.email) throw new ApiError(404, 'Email is already exist')
        if (phone === existbuyer.phone) throw new ApiError(404, 'Phone is already exist')
    }

    const newBuyer = await Buyer.create({
        username:username.toLowerCase(),
        name: name,
        email: email.toLowerCase(),
        phone: phone,
        password: await bcrypt.hash(password, 10)
    })

    sendWelcomeEmail(newBuyer)

    await Coin.create({
        buyer: newBuyer.id,
        coincount: 100
    })

    return res.status(200).json({
        message: 'Register successful',
        newBuyer: newBuyer
    })
})


export const updateBuyer = asynchandller(async (req, res) => {
    const { username,name, email, phone } = req.body
    const buyerId = req.user.id

    if ([username,name, email, phone].some((field) => field === '')) throw new ApiError(400, 'Plz fill all field')

    const existbuyer = await Buyer.findOne({
        $or: [{ username }, { email }, { phone }]
    })

    if (existbuyer) {
        if (username === existbuyer.username) throw new ApiError(400, 'Username already exist')
        if (email === existbuyer.email) throw new ApiError(400, 'Email already exist')
        if (phone === existbuyer.phone) throw new ApiError(400, 'PhoneNo already exist')
    }

    const updatedBuyer = await Buyer.findByIdAndUpdate(buyerId, { $set: { username,name, email, phone } })

    return res.status(200).json({
        message: 'Buyer profile update successfully',
        updatedBuyer: updatedBuyer
    })
})


export const getBuyerbyId = asynchandller(async(req,res)=>{
    const {buyerId} = req.params

    if(!buyerId) throw new ApiError(409,'Something miss')

    const buyer = await Buyer.findById(buyerId).select('-password')

    return res.status(200).json({
        message:'Fetch Buyer successfully',
        buyer
    })
})










