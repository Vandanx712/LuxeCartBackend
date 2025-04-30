import { asynchandller } from "../utill/asynchandller.js";
import { ApiError } from "../utill/apierror.js";
import { Category } from "../models/admin/category.model.js";
import { findUserByEmail } from "./common.controller.js";
import { Admin } from "../models/admin/admin.model.js";



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


// category part

export const createCategory = asynchandller(async(req,res)=>{
    const {name} = req.body
    if(!name) throw new ApiError(429,'Plz enter category')

    const category = await Category.create({
        name
    })
    return res.status(200).json({
        message:'Categoy create successfully',
        category
    })
})

export const updateCategory = asynchandller(async(req,res)=>{
    const {categoryId,name,parent} = req.body
    if([categoryId,name,parent].some((field)=>field=='')) throw new ApiError(429,'Plz fill all field')

    const category = await Category.findById(categoryId)
    if(!category) throw new ApiError(404,'Category not found')

    const updatedCategory = await Category.updateOne(category.id,{name,parent:parent?parent:null,is_subcategory:parent?true:false})

    return res.status(200).json({
        message:"Category update successfully",
        updatedCategory
    })
})


export const updateCategoryStatus = asynchandller(async(req,res)=>{
    const {categoryIds} = req.body
    
    const categorys = await Category.find({_id:{$in:categoryIds}})
    if(categorys.some((category)=>!category)) throw new ApiError(404,'Category not found')

    for(let category of categorys){
        if(category.is_active==true){
        await Category.updateOne({_id:category.id},{$set:{is_active:false}})
        }
        else{
            await Category.updateOne({_id:category.id},{$set:{is_active:true}})
        }
    }
    return res.status(200).json({
        message:"Categories status change successfully",
    })
}) // aa subcategory mate chhe kem k subcategory nu status change thase 


export const createSubcategory = asynchandller(async(req,res)=>{
    const {name,parent} = req.body 
    if([name,parent].some((field)=>field=='')) throw new ApiError(429,'Plz fill all field')

    const subcategory = await Category.create({
        name,
        parent,
        is_subcategory:true
    })

    return res.status(200).json({
        message:'SubCategory create successfully',
        subcategory
    })
})