import { Category } from "../models/admin/category.model.js"
import { ApiError } from "../utill/apierror.js"
import { asynchandller } from "../utill/asynchandller.js"
import {ProductAttribute} from '../models/product/productattribute.model.js'
import { ProductVariant } from "../models/product/productvariant.model.js"
import { Product } from "../models/product/product.model.js"
import mongoose from "mongoose"





// category part 
export const getCategoryById = asynchandller(async(req,res)=>{
    const {categoryId} = req.params
    const category = await Category.findById(categoryId)
    if(!category) throw new ApiError(404,'Category not found')

    return res.status(200).json({
        message:'Fetch category successfully',
        category
    })
}) // category ane subcategory mate same 

export const getallCategory = asynchandller(async(req,res)=>{
    const categoies = await Category.find({is_subcategory:false,is_active:true})
    return res.status(200).json({
        message:'Fetch all categoies',
        categoies
    })
})

export const getSubcategoryByCategory = asynchandller(async(req,res)=>{
    const {categoryId} = req.params
    const category = await Category.findById(categoryId)
    if(!category) throw new ApiError(404,'Category not found')
    const subcategory = await Category.find({parent:categoryId})

    return res.status(200).json({
        message:'Fetch all subcategory of category',
        subcategory
    })
})


// attribute part  

export const attributegetById = asynchandller(async(req,res)=>{
    const {attributeId} = req.params
    if(!attributeId) throw new ApiError(429,'Plz pass attribute id')

    const attribute = await ProductAttribute.findById(attributeId)
    if(!attribute) throw new ApiError(404,'Attribute not found for given id')

    return res.status(200).json({
        message:"Fetch attribute detail by id successfully",
        attribute
    })
})

export const variantgetById = asynchandller(async(req,res)=>{
    const {variantId} = req.params
    if(!variantId) throw new ApiError(429,"Plz pass variant id")
    
    const variant = await ProductVariant.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(variantId)
            }
        },
        {
            $lookup:{
                from:'productattributes',
                localField:'attributes',
                foreignField:'_id',
                as:'attributes'
            }
        }
    ])
    if(!variant) throw new ApiError(404,"Productvariant not found for given id")

    return res.status(200).json({
        message:'Fetch productvariant by id',
        variant
    })
})

export const productGetById = asynchandller(async(req,res)=>{
    const {productId} = req.params

    const product = await Product.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(productId)
            }
        },
        {
            $lookup:{
                from:"productvariants",
                localField:'variants',
                foreignField:'_id',
                as:'variants',
                pipeline:[
                    {
                        $project:{
                            variant_name:1,
                            price:1,
                            discount_price:1,
                            stock_count:1,
                            is_default_Variant:1,
                            attributes:1,
                        }
                    },
                    {
                        $lookup:{
                            from:'productattributes',
                            localField:'attributes',
                            foreignField:'_id',
                            as:"attributes",
                            pipeline:[
                                {
                                    $project:{
                                        key:1,
                                        value:1
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ])
    if(!product) throw new ApiError(404,'Product not found with given id')

    return res.status(200).json({
        message:'Product fetch by id successfully',
        product
    })
})