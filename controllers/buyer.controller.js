import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";
import { Buyer } from '../models/buyer/buyer.model.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import sendWelcomeEmail from "../notification/sentWelcomeMail.js";
import { Coin } from "../models/buyer/coin.model.js";
import { Otp } from "../models/otp.model.js";
import { generateotp } from "../utill/generateotp.js";
import sendVerifyPasswordOtpEmail from "../notification/sentVerifyPasswordOtp.js";


dotenv.config()




export const registerBuyer = asynchandller(async (req, res) => {
    const { name, email, phone, password } = req.body

    if ([name, email, phone, password].some((field) => field === '')) {
        throw new ApiError(404, 'Plz fill all field')
    }

    const existbuyer = await Buyer.findOne({
        $or: [{ email: email }, { phone: phone }, { name: name }]
    })

    if (existbuyer) {
        if (name === existbuyer.name) throw new ApiError(404, 'Username is already exist')
        if (email === existbuyer.email) throw new ApiError(404, 'Email is already exist')
        if (phone === existbuyer.phone) throw new ApiError(404, 'Phone is already exist')
    }

    const newBuyer = await Buyer.create({
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
    const { name, email, phone } = req.body
    const buyerId = req.user.id

    if ([name, email, phone].some((field) => field === '')) throw new ApiError(400, 'Plz fill all field')

    const existbuyer = await Buyer.findOne({
        $or: [{ name }, { email }, { phone }]
    })

    if (existbuyer) {
        if (name === existbuyer.name) throw new ApiError(400, 'Username already exist')
        if (email === existbuyer.email) throw new ApiError(400, 'Email already exist')
        if (phone === existbuyer.phone) throw new ApiError(400, 'PhoneNo already exist')
    }

    const updatedBuyer = await Buyer.findByIdAndUpdate(buyerId, { $set: { name, email, phone } })

    return res.status(200).json({
        message: 'Update buyer profile successfull',
        updatedBuyer: updatedBuyer
    })
})

export const generateOtp = asynchandller(async (req, res, next) => {
    const { email } = req.body

    if (!email) throw new ApiError(400, 'Plz fill email field')

    const findBuyer = await Buyer.findOne({ email })

    if (!findBuyer) throw new ApiError(400, 'User not found')

    req.User = findBuyer
    console.log(req.User)

    const otp = generateotp()

    await Otp.create({
        userid: findBuyer.id,
        otp: otp,
        expirein: new Date(Date.now() + 2 * 60 * 1000)
    })

    await sendVerifyPasswordOtpEmail(email, otp)

    next()
    return res.status(200).json({ message: 'Otp send on mail successfully' })
})     /// resend otp ma pan aa api aavse 


export const updatePassword = asynchandller(async(req,res)=>{
    const {password} = req.body

    if(!password) throw new ApiError(400,'Enter your new password')

    const userId = req.User.id

    await Buyer.findByIdAndUpdate(userId,{$set:{password:bcrypt.hash(password,10)}})

    return res.status(200).json({
        message:'Set new password successfully'
    })
})

