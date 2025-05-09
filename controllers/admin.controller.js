import { asynchandller } from "../utill/asynchandller.js";
import { ApiError } from "../utill/apierror.js";
import { Category } from "../models/admin/category.model.js";
import { findUserByEmail } from "./common.controller.js";
import { Admin } from "../models/admin/admin.model.js";
import { ProductAttribute } from "../models/product/productattribute.model.js";
import fs from 'fs/promises'
import path from "path";


export const updateAdmin = asynchandller(async(req,res)=>{
    const {username,email} = req.body

    const admin = await Admin.findOne(email)
    if(!admin) throw new ApiError(404,'Admin not found')

    const check = await findUserByEmail(email)
    if(check) throw new ApiError(400,'Email already exist')

    const updatedAdmin = await Admin.findByIdAndUpdate(admin.id,{username,email})

    return res.status(200).json({
        message:"Update admin detail successfully",
        updatedAdmin
    })
})

export const getById = asynchandller(async(req,res)=>{
    const {adminId} = req.params
    if(!adminId) throw new ApiError(429,'Plz pass admin id')

    const admin = await Admin.findById(adminId)
    if(!admin) throw new ApiError(404,"Admin not found for given id")

    return res.status(200).json({
        message:'Fetch admin by id successfully',
        admin
    })
})


// category part

export const createCategory = asynchandller(async(req,res)=>{
    const {categories} = req.body
    if(categories.length===0) throw new ApiError(429,'Plz enter category')

    const Categories = await Promise.all(categories.map(async(category)=> Category.create({name:category})))

    return res.status(200).json({
        message:'Categoy create successfully',
        Categories
    })
})

export const updateCategory = asynchandller(async(req,res)=>{
    const {categoryId,name,parent} = req.body
    if([categoryId,name,parent].some((field)=>field=='')) throw new ApiError(429,'Plz fill all field')

    const category = await Category.findById(categoryId)
    if(!category) throw new ApiError(404,'Category not found')

    const updatedCategory = await Category.updateOne({_id:category.id},{$set:{name,parent:parent?parent:null,is_subcategory:parent?true:false}})

    return res.status(200).json({
        message:"Category update successfully",
        updatedCategory
    })
})


export const updateCategoryStatus = asynchandller(async (req, res) => {
    const { categoryIds } = req.body

    const categorys = await Category.find({ _id: { $in: categoryIds } })
    if (categorys.some((category) => !category)) throw new ApiError(404, 'Category not found')

    for (let category of categorys) {
        if (category.is_active == true) {
            await Category.updateOne({ _id: category.id }, { $set: { is_active: false } })
        }
        else {
            await Category.updateOne({ _id: category.id }, { $set: { is_active: true } })
        }
    }
    return res.status(200).json({
        message: "Categories status change successfully",
    })
}) // aa subcategory mate chhe kem k subcategory nu status change thase 


export const createSubcategory = asynchandller(async(req,res)=>{
    const {parent,categories} = req.body 

    if(!parent) throw new ApiError(429,"Plz add parent category")
    if(categories.length===0) throw new ApiError(429,"Plz enter category'")

    const subcategories = await Promise.all(categories.map(async(name)=>Category.create({name,parent,is_subcategory:true})))

    return res.status(200).json({
        message:'SubCategory create successfully',
        subcategories
    })
})


// attribute part 


export const addAttributes = asynchandller(async (req, res) => {
    const { key,value } = req.body
    if ([key,value].some((field)=>field=='')) throw new ApiError(429, 'Plz fill all fields')

    const Value = value.map((v)=>v.toLowerCase())
    const keys = await ProductAttribute.create({
        key,
        value:Value
    }) 

    const filepath = `uploads/admin`
    try {
        await fs.access(filepath); // Check if directory exists
    } catch (error) {
        await fs.mkdir(filepath, { recursive: true }); // Create directory if not exists
    }
    const file = path.join(filepath,'adminAttribute.txt')
    await fs.writeFile(file,keys.id.toString())

    return res.status(200).json({
        message: "Keys add successfully",
        keys
    })
}) 

export const updateAttribute = asynchandller(async(req,res)=>{
    const {attributeId,key,value} = req.body
    if([attributeId,key,value].some((field)=>field=='')) throw new ApiError(429,'Plz fill all field')

    const Value = value.map((v)=>v.toLowerCase())
    const updatedAttribute = await ProductAttribute.findByIdAndUpdate(attributeId,{key,value:Value},{new:true})
    if(!updatedAttribute) throw new ApiError(404,'Attribute not found')

    return res.status(200).json({
        message:"Attribute update successfully",
        updatedAttribute
    })
})

export const deleteAttribute = asynchandller(async (req, res) => {
    const { attributeId } = req.params
    if (!attributeId) throw new ApiError(429, 'Plz pass attributeId')

    await ProductAttribute.findByIdAndDelete(attributeId)
    const filepath = `uploads/admin`
    const file = path.join(filepath, 'adminAttribute.txt')
    await fs.unlink(file)

    return res.status(200).json({
        message: "Delete attribute successfully"
    })
})