import { Seller } from "../models/seller/seller.model.js";
import { ApiError } from "../utill/apierror";
import { asynchandller } from "../utill/asynchandller.js";
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from "./login.controller.js";



export const sellerRegister = asynchandller(async (req, res) => {
    const { name, email, phone, password, shopname } = req.body

    if ([name, email, phone, password, shopname].some((field) => field.trim() === '')) {
        throw new ApiError(404, 'Plz fill all field')
    }

    const existseller = await Seller.findOne({
        $or: [{ name: name }, { email: email }, { phone: phone }]
    })

    if (existseller) {
        if (name === existseller.name) throw new ApiError(404, 'Name is already exist')
        if (email === existseller.email) throw new ApiError(404, 'Email is already exist')
        if (phone === existseller.phone) throw new ApiError(404, 'PhoneNO is already exist')
    }

    const newSeller = await Seller.create({
        name: name,
        email: email.toLowerCase(),
        phone: phone,
        password: await bcrypt.hash(password, 10),
        shopname: shopname
    })

    return res.status(200).json({
        message: 'Register successful',
        newSeller: newSeller
    })
})


export const login = asynchandller(async (req, res) => {
    const { email, password } = req.body

    if ([email, password].some((field) => field.trim() === '')) {
        throw new ApiError(404, 'Plz fill all field')
    }

    const seller = await Seller.findOne({ email: email })

    if (!seller) throw new ApiError(404, 'Seller not found')

    const passwordvalid = await bcrypt.compare(password, seller.password)
    if (!passwordvalid) throw new ApiError(404, 'Plz enter correct password')

    const accessToken = generateAccessToken(seller.id)
    const refreshToken = generateRefreshToken(seller.id)
    const options = {
        httpOnly: true,
        secure: true
    }

    const SELLER = Seller.findByIdAndUpdate(seller.id, { $set: { refreshToken: refreshToken } })
    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json({
            message: 'Login successful',
            seller: SELLER
        })
})

