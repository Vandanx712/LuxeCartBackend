import { Category } from "../models/admin/category.model.js"
import { ApiError } from "../utill/apierror.js"
import { asynchandller } from "../utill/asynchandller.js"
import {ProductAttribute} from '../models/product/productattribute.model.js'





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

export const getallAttributes = asynchandller(async(req,res)=>{
    const Attributes = await ProductAttribute.find({})
    return res.status(200).json({
        message:'Fetch all attributes',
        Attributes
    })
})

export const addAttributeValue = asynchandller(async(req,res)=>{
    const {attributeId,value} = req.body
    if([attributeId,value].some((field)=>field=='')) throw new ApiError(429,'Plz fill all field')
    
    const attribute = await ProductAttribute.findByIdAndUpdate(attributeId,{$set:{value}},{new:true})
    if(!attribute) throw new ApiError(404,'Attribute not found')

    return res.status(200).json({
        message:"Add value successfully",
        attribute
    })
}) // seller jyare product create tyare use thase