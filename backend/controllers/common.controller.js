import { Address } from "../models/address.model.js";
import { Admin } from "../models/admin/admin.model.js";
import { Buyer } from "../models/buyer/buyer.model.js";
import { Otp } from "../models/otp.model.js";
import { DeliveryBoy } from "../models/seller/deliveryboy.model.js";
import { Seller } from "../models/seller/seller.model.js";
import sendVerifyPasswordOtpEmail from "../notification/sentVerifyPasswordOtp.js";
import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";
import bcrypt from 'bcrypt'
import { generateotp } from "../utill/generateotp.js";


export const findUserByEmail = async (email) => {
    const [buyer, seller, deliveryboy,admin] = await Promise.all([
        Buyer.findOne({email}),
        Seller.findOne({email}),
        DeliveryBoy.findOne({email}),
        Admin.findOne({email})
    ])
    const user = buyer || seller || deliveryboy || admin 
    return user;
}

export const sendotp = asynchandller(async (req, res) => {
    const { email } = req.body
    if (!email) throw new ApiError(409, 'Plz enter your email')

    const user = await findUserByEmail(email)
    if (!user) throw new ApiError(409, 'User not found plz enter valid email')

    const otp = generateotp()

    await Otp.create({
        userid: user.id,
        otp: otp,
        expirein: new Date(Date.now() + 2 * 60 * 1000)
    })

    await sendVerifyPasswordOtpEmail(user, otp)

    return res.status(200).json({
        message: 'Send otp on mail successfully'
    })

})    /// resend otp mate aa use karvi 


export const verifyotp = asynchandller(async (req, res) => {
    const { email, otp } = req.body
    if (!otp) throw new ApiError(409, 'Plz enter otp')

    const user = await findUserByEmail(email)

    const findotp = await Otp.findOne({ userid: user.id })

    if (Date.now() > findotp.expirein) {
        await Otp.findByIdAndDelete(findotp.id)
        throw new ApiError(404, 'Plz enter valid otp')
    }

    if (otp !== findotp.otp) throw new ApiError(409, 'Plz enter correct otp')

    findotp.isverify = true
    await findotp.save()

    return res.status(200).json({
        message: 'Verifyotp successfully'
    })
})


export const updatePassword = asynchandller(async (req, res) => {
    const { email, password } = req.body

    if (!password) throw new ApiError(409, 'Enter password')

    const user = await findUserByEmail(email)
    const checkOtp = await Otp.find({ userid: user.id })

    if (checkOtp.isverify == false) throw new ApiError(403, 'Section expire or invalid please re-enter email to reset a password')

    user.password = await bcrypt.hash(password, 10)
    await user.save()

    checkOtp.map(async(otp)=>{
        await Otp.findByIdAndDelete(otp.id)
    })
    
    return res.status(200).json({
        message: 'Update password successfully'
    })
})       

// Address :-

export const addAddress = asynchandller(async(req,res)=>{
    const {street, city, state, zipcode} = req.body 
    if([street,city,state,zipcode].some((field)=>field==='')) throw new ApiError(429,'Plz fill all fields')

    const user = req.user
    if(!user || user.role=='deliveryboy' || user.role=='admin') throw new ApiError(500,'Unauthorized request')

    const address = await Address.create({
        user:user.id,
        userType:user.role,
        street,
        city,
        state,
        zip_code:zipcode
    })
    return res.status(200).json({
        message:'Address add successfully',
        address
    })
})

export const getUserAllAddress = asynchandller(async(req,res)=>{
    const user = req.user
    if(!user || user.role=='deliveryboy' || user.role=='admin') throw new ApiError(500,'Unauthorized request')

    const addresses = await Address.find({user:user.id})
    return res.status(200).json({
        message:"Fetch user's all addresses",
        addresses
    })
})

export const getAddressById = asynchandller(async(req,res)=>{
    const {addressId} = req.params

    const user = req.user
    if(!user || user.role=='deliveryboy' || user.role=='admin') throw new ApiError(500,'Unauthorized request')

    const address = await Address.findById(addressId)
    return res.status(200).json({
        message:'Fetch single address',
        address
    })
})

export const updateAddress = asynchandller(async(req,res)=>{
    const {addressId,street, city, state, zipcode} = req.body 

    const user = req.user
    if(!user || user.role=='deliveryboy' || user.role=='admin') throw new ApiError(500,'Unauthorized request')

        
        const updatedAddress = await Address.findByIdAndUpdate(addressId,{
            street,
            city,
            state,
            zip_code:zipcode
        },{new:true})
        
    if(!updatedAddress) throw new ApiError(404,"Address not found")

    return res.status(200).json({
        message:'Address update successfully',
        updatedAddress
    })
})

export const deleteAddress = asynchandller(async(req,res)=>{
    const {addressId} = req.params
    const address = await Address.findById(addressId)
    if(!address) throw new ApiError('Address not found')
    
    await Address.deleteOne({_id:addressId})
    return res.status(200).json({
        message:'Address delete successfully'
    })
})