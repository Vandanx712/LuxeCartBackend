import { Seller } from "../models/seller/seller.model.js";
import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from "./login.controller.js";
import { DeliveryBoy } from "../models/seller/deliveryboy.model.js";
import sendAccountDetailEmail from "../notification/sentAccountDetail.js";



export const sellerRegister = asynchandller(async (req, res) => {
    const { username,name, email, phone, password, shopname } = req.body

    if ([username,name, email, phone, password, shopname].some((field) => field === '')) {
        throw new ApiError(404, 'Plz fill all field')
    }

    const existseller = await Seller.findOne({
        $or: [{ username: username }, { email: email }, { phone: phone }]
    })

    if (existseller) {
        if (username === existseller.username) throw new ApiError(404, 'Name is already exist')
        if (email === existseller.email) throw new ApiError(404, 'Email is already exist')
        if (phone === existseller.phone) throw new ApiError(404, 'PhoneNO is already exist')
    }

    const newSeller = await Seller.create({
        username:username.toLowerCase(),
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


export const sellerlogin = asynchandller(async (req, res) => {
    const { email, password } = req.body

    if ([email, password].some((field) => field === '')) {
        throw new ApiError(404, 'Plz fill all field')
    }

    const seller = await Seller.findOne({ email: email })

    if (!seller) throw new ApiError(404, 'Seller not found')

    const passwordvalid = await bcrypt.compare(password, seller.password)
    if (!passwordvalid) throw new ApiError(404, 'Plz enter correct password')

    const accessToken = await generateAccessToken(seller)
    const refreshToken = await generateRefreshToken(seller.id)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json({
            message: 'Login successful',
            seller: seller
        })
})


export const createDeliveryBoy  = asynchandller(async(req,res)=>{
    const { username, name,email, phone, password, vehicle_type, vehicle_number} = req.body 

    if([username,name,email,phone,password,vehicle_number,vehicle_type].some((field)=>field ==='')) throw new ApiError(404,'Plz fill all field')

    const existBoy = await DeliveryBoy.findOne({email}).select('name email phone')

    if(existBoy) {
        if(username == existBoy.username) throw new ApiError(404,'Username already exist')
        if(email == existBoy.email) throw new ApiError(404,'User email already exist')
        if(phone == existBoy.password) throw new ApiError(404,'User phone already exist') 
    }

    const newDeliveryBoy = await DeliveryBoy.create({
        username:username.toLowerCase(),
        name:name,
        email:email.toLowerCase(),
        phone,
        password:await bcrypt.hash(password,10),
        createBy:req.user.id,
        vehicle_type,
        vehicle_number,
    })

    sendAccountDetailEmail(newDeliveryBoy)

    return res.status(200).json({
        message:'Register DeliveryBoy successfully',
        newDeliveryBoy
    })
})

export const updateSeller = asynchandller(async(req,res)=>{
    const { username, name , email , phone, shopname } = req.body
    const sellerId = req.user.id

    if([username,name,email,phone,shopname].some((field)=>field==='')) throw new ApiError(409,'Please fill all field')

    const existSeller = await Seller.findOne({$or:[{email},{username},{phone}]}).select('username email phone')

    if(existSeller){
        if(username === existSeller.username) throw new ApiError(400,'Username already exist')
        if(email === existSeller.email) throw new ApiError(400,'Email already exist')
        if(phone === existSeller.phone) throw new ApiError(400,'PhoneNo already exist')
    }

    const updatedSeller = await Seller.findByIdAndUpdate(sellerId,{$set:{email,username,name,phone,shopname}})
    return res.status(200).json({
        message:'Seller profile update successfully'
    })
})

