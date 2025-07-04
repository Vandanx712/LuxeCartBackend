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
import { Product } from "../models/product/product.model.js";
import { Order } from '../models/order/order.model.js'
import sentOrderInfoForBoy from "../notification/sentOrderInfoForBoy.js";
import mongoose from "mongoose";



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
    sendAccountDetailEmail(newDeliveryBoy,password)

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

export const uploadProduct = asynchandller(async (req, res) => {
    const { name, description, discount, category, subcategory, brand, variants } = req.body
    if([name,description,category,subcategory].some((field)=>field=='')) throw new ApiError(429,'Plz fill all field')

    const existproduct = await Product.findOne({
        name: { $regex: name.trim(), $options: 'i' },
        brand: { $regex: brand.trim(), $options: 'i' }
    })
    if(existproduct) throw new ApiError(409,'Product name already exist for given brand')

    const parsedVariants = variants || JSON.parse(variants)  // from multipart form

    let variantIds = []
    const filepath = `uploads/admin`
    const file = path.join(filepath, 'adminAttribute.txt')
    const filecontent = await fs.readFile(file, 'utf-8')
    const adminAttribute = await ProductAttribute.findById(filecontent)

    for(let variant of parsedVariants){
        let attributeIds = []
        for (let attribute of variant.attributes) {
            if (!adminAttribute.value.includes(attribute.key.toLowerCase())) throw new ApiError(400, 'Plz enter valid key')
            const attributeDoc = new ProductAttribute({
                key:attribute.key,
                value:attribute.value
            })
            await attributeDoc.save()
            attributeIds.push(attributeDoc.id)
        }
        const Variantprice = variant.price
        const discountprice = Variantprice - ((Variantprice * discount)/100)
        const variantDoc = new ProductVariant({
            variant_name:variant.name,
            price:Variantprice,
            discount_price:discountprice,
            stock_count:variant.stock,
            is_default_Variant:variant.defaultVariant,
            attributes:attributeIds
        })
        await variantDoc.save()
        variantIds.push(variantDoc.id)
    }

    const productvariants= await Promise.all(variantIds.map(async(variId)=>ProductVariant.findById(variId)))
    const defaultVariant = productvariants.filter((vari)=>vari.is_default_Variant==true)

    const product = await Product.create({
        name,
        description,
        price:defaultVariant[0].price,
        discount,
        discount_price:defaultVariant[0].discount_price,
        category,
        subcategory,
        seller:req.user.id,
        brand,
        stock_count:defaultVariant.stock_count,
        variants:variantIds
    })

    return res.status(200).json({
        message:'Product upload successfully',
        product
    })
})

export const productUpdate = asynchandller(async(req,res)=>{
    const {productId,name,description,brand,category,subcategory,discount,} = req.body
    const product = await Product.findByIdAndUpdate(productId,{$set:{name,description,brand,category,subcategory,discount}},{new:true})
    if(!product) throw new ApiError(404,"Product not found")

    return res.status(200).json({
        message:'Product update successfully',
        product
    })
})

export const productDelete = asynchandller(async (req, res) => {
    const { productId } = req.params

    const product = await Product.findById(productId)
    if (!product) throw new ApiError(404, 'Product not found with given id')

    const productImages = product.images
    const variants = await Promise.all(product.variants.map(async (vari) => ProductVariant.findById(vari)))
    const attributes = variants.map((vari) => vari.attributes).flat()

    await ProductAttribute.deleteMany({ _id: { $in: attributes } })
    await ProductVariant.deleteMany({ _id: { $in: product.variants } })

    await Product.deleteOne({_id:productId})
    // ahi have Aws mathi product photos pan delete karava padse tenu logic aavse 
    return res.status(200).json({
        message: 'Product delete successfully'
    })
})
// productattribute and productvariant part :--


export const updateAttribute = asynchandller(async (req, res) => {
    const { attributeId, key, value } = req.body
    const sellerId = req.user._id

    const variant = await ProductVariant.findOne({
        attributes: attributeId,
    });

    const product = await Product.findOne({
        variants: variant?._id,
        seller: sellerId,
    });
    if (!product) return res.status(403).json({ message: "Unauthorized" });

    const filepath = `uploads/admin`
    const file = path.join(filepath, 'adminAttribute.txt')
    const filecontent = await fs.readFile(file, 'utf-8')
    const adminAttribute = await ProductAttribute.findById(filecontent)
    if (!adminAttribute.value.includes(key.toLowerCase())) throw new ApiError(400, 'Plz enter valid key')

    const updatedAttribute = await ProductAttribute.findById(attributeId);
    if (!updatedAttribute) return res.status(404).json({ message: "Attribute not found" });

    updatedAttribute.key = key ?? updatedAttribute.key;
    updatedAttribute.value = value ?? updatedAttribute.value;

    await updatedAttribute.save();
    return res.status(200).json({
        message: 'Update your attribute successfully',
        updatedAttribute
    })
})

export const deleteAttribute = asynchandller(async (req, res) => {
    const { attributeId } = req.params
    const sellerId = req.user._id

    const variant = await ProductVariant.findOne({ attributes: attributeId });
    const product = await Product.findOne({
        variants: variant?._id,
        seller: sellerId,
    });

    if (!product) return res.status(403).json({ message: "Unauthorized" });

    variant.attributes.pull(attributeId);
    await variant.save();

    await ProductAttribute.findByIdAndDelete(attributeId);
    return res.status(200).json({
        message: 'Attribute delete successfully'
    })
})


export const updateVariant = asynchandller(async(req,res)=>{
    const {variantId,variantName,price,stock} = req.body
    const sellerId = req.user._id

    const variant = await ProductVariant.findById(variantId)
    if(!variant) throw new ApiError(404,'Variant not found')
    
    const product = await Product.findOne({
        variants:variant?._id,
        seller:sellerId
    })

    if (!product) return res.status(403).json({ message: "Unauthorized" });
    variant.price = price ?? variant.price;
    variant.stock_count = stock ?? variant.stock_count;
    variant.variant_name = variantName ?? variant.variant_name;

    await variant.save()

    return res.status(200).json({
        message:'Productvariant update successfully',
        variant
    })
})

export const deleteVariant = asynchandller(async (req, res) => {
    const { variantId } = req.params
    const sellerId = req.user._id

    const product = await Product.findOne({
        variants: variantId,
        seller: sellerId,
    });
    const variant = await ProductVariant.findById(variantId)
    if(!variant) throw new ApiError(404,'Variant not found')
    if (!product) return res.status(403).json({ message: "Unauthorized" });

    product.variants.pull(variantId);
    await product.save();

    await ProductAttribute.deleteMany({id:{$in:variant.attributes}})
    await ProductVariant.findByIdAndDelete(variantId);

    return res.status(200).json({
        message: "Productvariant delete successfully"
    })
})

// order part 

export const getOrderByStatus = asynchandller(async(req,res)=>{
    const sellerId = req.user.id
    const {order_status}= req.body

    const sellerOrders = await Order.find({seller:sellerId,order_status:order_status}).sort({createdAt:-1})
    const totalOrder = sellerOrders.length

    return res.status(200).json({
        message:'Fetch all order by status successfully',
        sellerOrders,
        totalOrder
    })
})

export const getOrderById = asynchandller(async (req, res) => {
    const {orderId} = req.params

    const match = {
        $match: {
            _id: new mongoose.Types.ObjectId(orderId),
        }
    };

    const lookupproduct = {
        $lookup: {
            from: 'products',
            localField: 'items.product',
            foreignField: '_id',
            as: 'items.product',
            pipeline: [
                {
                    $project: {
                        name: 1,
                        images: 1
                    }
                }
            ]
        }
    };

    const lookupvariant = {
        $lookup: {
            from: 'productvariants',
            localField: 'items.variant',
            foreignField: '_id',
            as: 'items.variant',
            pipeline: [
                {
                    $project: {
                        variant_name: 1,
                    }
                }
            ]
        }
    };

    const unwindItems = { $unwind: "$items" };
    const unwindProduct = { $unwind: { path: "$items.product", preserveNullAndEmptyArrays: true } };
    const unwindVariant = { $unwind: { path: "$items.variant", preserveNullAndEmptyArrays: true } };
    const shipping_address = {
        $lookup:{
            from:'addresses',
            localField:'shipping_address',
            foreignField:'_id',
            as:'shipping_address',
            pipeline:[
                {
                    $project:{
                        street:1,
                        city:1,
                        state:1,
                        zip_code:1,
                    }
                }
            ]
        }
    }

    const groupItems = {
        $group: {
            _id: "$_id",
            buyer: { $first: "$buyer" },
            seller: { $first: "$seller" },
            delivery_boy: { $first: "$delivery_boy" },
            items: { $push: "$items" },
            total_price: { $first: "$total_price" },
            payment_status: { $first: "$payment_status" },
            order_status: { $first: "$order_status" },
            shipping_address: { $first: "$shipping_address" },
            createdAt: { $first: "$createdAt" },
            updatedAt: { $first: "$updatedAt" }
        }
    };

    const sellerOrders = await Order.aggregate([
        match,
        unwindItems,
        lookupproduct,
        lookupvariant,
        unwindProduct,
        unwindVariant,
        shipping_address,
        groupItems
    ])
    return res.status(200).json({
        message: 'Fetch seller order by order_status',
        sellerOrders
    });
});


export const assignOrder = asynchandller(async(req,res)=>{
    const {deliveryboyId} = req.params
    const sellerId = req.user.id

    if(!deliveryboyId) throw new ApiError(400,'DeliveryBoy id is required')
    const deliveryboy = await DeliveryBoy.findById(deliveryboyId)
    if(!deliveryboy || deliveryboy.is_ondelivery==true) throw new ApiError(404,'DeliveryBoy not found or he is on delivery')
    
    const order = await Order.findOneAndUpdate({seller:sellerId},{$set:{delivery_boy:deliveryboyId,order_status:"Shipped"}},{new:true})
    if(!order) throw new ApiError(404,'Order not found')
    
    await sentOrderInfoForBoy(deliveryboy)

    return res.status(200).json({
        message:'Order assign for deliveryBoy successfully',
        order
    })
})