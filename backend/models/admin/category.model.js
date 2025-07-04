import mongoose from "mongoose";


const categorySchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            trim: true
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        is_subcategory:{
            type:mongoose.Schema.Types.Boolean,
            default:false
        },
        is_active: {
            type: mongoose.Schema.Types.Boolean,
            default: true
        },
    }
);


export const Category = mongoose.model('Category',categorySchema)