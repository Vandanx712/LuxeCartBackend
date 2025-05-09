import { Seller } from "../models/seller/seller.model.js";
import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from "./login.controller.js";
import { DeliveryBoy } from "../models/seller/deliveryboy.model.js";
import sendAccountDetailEmail from "../notification/sentAccountDetail.js";
import { findUserByEmail } from "./common.controller.js";
import { ProductAttribute } from "../models/product/productattribute.model.js";
import { ProductVariant } from "../models/product/productvariant.model.js";
import fs from 'fs/promises'
import path from "path";



export const sellerRegister = asynchandller(async (req, res) => {
    const { username, name, email, phone, password, shopname } = req.body

    if ([username, name, email, phone, password, shopname].some((field) => field === '')) {
        throw new ApiError(404, 'Plz fill all field')
    }

    const existseller = await Seller.findOne({
        $or: [{ username: username }, { email: email }, { phone: phone }]
    })

    const user = await findUserByEmail(email)

    if (existseller) {
        if (username === existseller.username) throw new ApiError(404, 'Name is already exist')
        if (email === existseller.email) throw new ApiError(404, 'Email is already exist')
        if (phone === existseller.phone) throw new ApiError(404, 'PhoneNO is already exist')
    }

    if (user) throw new ApiError(429, 'Email already exist')

    const newSeller = await Seller.create({
        username: username.toLowerCase(),
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


export const updateSeller = asynchandller(async (req, res) => {
    const { username, name, email, phone, shopname } = req.body
    const sellerId = req.user.id

    const existSeller = await Seller.findOne({ $or: [{ email }, { username }, { phone }] }).select('username email phone')

    const user = await findUserByEmail(email)

    if (existSeller) {
        if (username === existSeller.username) throw new ApiError(400, 'Username already exist')
        if (email === existSeller.email) throw new ApiError(400, 'Email already exist')
        if (phone === existSeller.phone) throw new ApiError(400, 'PhoneNo already exist')
    }

    if (user) throw new ApiError(429, 'Email already exist')

    const updatedSeller = await Seller.findByIdAndUpdate(sellerId, { $set: { email, username, name, phone, shopname } },{new:true})
    if(!updatedSeller) throw new ApiError(404,'Seller not found')
    return res.status(200).json({
        message: 'Seller profile update successfully',
        updatedSeller
    })
})

export const getSellerById = asynchandller(async (req, res) => {
    const { sellerId } = req.params
    if (!sellerId) throw new ApiError(429, 'Plz pass seller id')

    const seller = await Seller.findById(sellerId).select('-password')
    if (!seller) throw new ApiError(404, 'Seller not found')

    return res.status(200).json({
        message: 'Fetch seller successfully',
        seller
    })
})


// delivery boy part

export const createDeliveryBoy = asynchandller(async (req, res) => {
    const { username, name, email, phone, password, vehicle_type, vehicle_number } = req.body

    if ([username, name, email, phone, password, vehicle_number, vehicle_type].some((field) => field === '')) throw new ApiError(404, 'Plz fill all field')

    const existBoy = await DeliveryBoy.findOne({
        $or: [{ username: username }, { email: email }, { phone: phone }]
    }).select('name email phone')

    const user = await findUserByEmail(email)

    if (existBoy) {
        if (username == existBoy.username) throw new ApiError(404, 'Username already exist')
        if (email == existBoy.email) throw new ApiError(404, 'User email already exist')
        if (phone == existBoy.password) throw new ApiError(404, 'User phone already exist')
    }

    if (user) throw new ApiError(429, 'Email already exist')

    const newDeliveryBoy = await DeliveryBoy.create({
        username: username.toLowerCase(),
        name: name,
        email: email.toLowerCase(),
        phone,
        password: await bcrypt.hash(password, 10),
        createBy: req.user.id,
        vehicle_type,
        vehicle_number,
    })

    sendAccountDetailEmail(newDeliveryBoy)

    return res.status(200).json({
        message: 'Register DeliveryBoy successfully',
        newDeliveryBoy
    })
})

export const getAllDeliveryBoy = asynchandller(async(req,res)=>{
    const user = req.user
    if(user.role !== 'seller' || user.role !== 'admin') throw new ApiError(400,'You are not authorized perform this operation.')

    const totalBoys = await DeliveryBoy.find({createBy:user.id})
    const countboy = totalBoys.length

    return res.status(200).json({
        message:'Fetch all deliveryboys',
        totalBoys,
        countboy
    })
})

export const getOndeliveryBoy = asynchandller(async(req,res)=>{
    const user = req.user
    if(user.role !== 'seller') throw new ApiError(400,'You are not authorized perform this operation.')
    const deliveryboy = await DeliveryBoy.find({createBy:user.id},{is_ondelivery:true})
    const countboy = deliveryboy.length

    return res.status(200).json({
        message:"Fetch all is_ondelivery deliveryboy",
        deliveryboy,
        countboy
    })
})

export const getFreedeliveryBoy = asynchandller(async(req,res)=>{
    const user = req.user
    if(user.role !== 'seller') throw new ApiError(400,'You are not authorized perform this operation.')
    const deliveryboy = await DeliveryBoy.find({createBy:user.id},{is_ondelivery:false})
    const countboy = deliveryboy.length

    return res.status(200).json({
        message:"Fetch all free deliveryboy",
        deliveryboy,
        countboy
    })
})

/// product upload part ///

// productattribute and productvariant part :--

export const addAttributeValue = asynchandller(async(req,res)=>{
    const {key,value} = req.body

    if((key && !value) || (value && !key)) throw new ApiError(429,'Plz fill all fields') 

    const filepath = `uploads/admin`
    const file = path.join(filepath,'adminAttribute.txt')
    const filecontent = await fs.readFile(file,'utf-8')
    const adminAttribute = await ProductAttribute.findById(filecontent)
    if(!adminAttribute.value.includes(key.toLowerCase())) throw new ApiError(400,'Plz enter valid key')

    const attribute = await ProductAttribute.create({
        key,
        value
    })
    return res.status(200).json({
        message:'Attribute value add successfully',
        attribute
    })
}) // may be update attribute value ma aaj api use thase 

export const updateAttribute = asynchandller(async(req,res)=>{
    const {attributeId,key,value} = req.body

    if((key && !value) || (value && !key)) throw new ApiError(429,'Plz fill all fields') 

    const filepath = `uploads/admin`
    const file = path.join(filepath,'adminAttribute.txt')
    const filecontent = await fs.readFile(file,'utf-8')
    const adminAttribute = await ProductAttribute.findById(filecontent)
    if(!adminAttribute.value.includes(key.toLowerCase())) throw new ApiError(400,'Plz enter valid key') 

    const updatedAttribute = await ProductAttribute.findByIdAndUpdate(attributeId,{key,value},{new:true})
    if(!updatedAttribute) throw new ApiError(400,'Attribute not found for given id')

    return res.status(200).json({
        message:'Update your attribute successfully',
        updatedAttribute
    })
})

export const deleteAttribute = asynchandller(async(req,res)=>{
    const {attributeId} = req.params 
    if(!attributeId) throw new ApiError(429,'Plz pass attribute id')

    const attribute = await ProductAttribute.findById(attributeId)
    if(!attribute) throw new ApiError(404,'Productattribute not found for given id')
    await ProductAttribute.deleteOne({id:attributeId})

    return res.status(200).json({
        message:'Attribute delete successfully'
    })
})



export const addProductVariant  = asynchandller(async(req,res)=>{
    const {variantName,price,stock,attributes} = req.body 

    if([variantName,price,stock,attributes].some((field)=>field=='')) throw new ApiError(429,'Plz fill all fields')
    const productvariant = await ProductVariant.create({
        variant_name:variantName,
        price,
        stock_count:stock,
        attributes
    })

    return res.status(200).json({
        message:'ProductVariant set successfully',
        productvariant
    })
})

export const updateVariant = asynchandller(async(req,res)=>{
    const {variantId,variantName,price,stock,attributes} = req.body
    
    const updatedVariant = await ProductVariant.findByIdAndUpdate(variantId,{variant_name:variantName,price,stock_count:stock,attributes},{new:true})
    if(updatedVariant) throw new ApiError(404,'Productvariant not found for given id')

    return res.status(200).json({
        message:'Productvariant update successfully',
        updatedVariant
    })
})

export const deleteVariant =  asynchandller (async(req,res)=>{
    const {variantId} = req.params
    if(!variantId) throw new ApiError(429,'Plz pass variant id')

    const variant = await ProductVariant.findById(variantId)
    if(!variant) throw new ApiError(404,'Productvariant not found for given id')

    await ProductVariant.deleteOne({id:variantId})

    return res.status(200).json({
        message:"Productvariant delete successfully"
    })
})