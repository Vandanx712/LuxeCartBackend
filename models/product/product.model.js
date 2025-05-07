import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
        },
        description: {
            type: mongoose.Schema.Types.String,
        },
        price: {
            type: mongoose.Schema.Types.Number
        },
        discount_price: {
            type: mongoose.Schema.Types.Number,
            default: null
        },
        discount: {
            type: mongoose.Schema.Types.Number,
            default: null
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        subcategory:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
        brand: {
            type: mongoose.Schema.Types.String,
            trim:true
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller"
        },
        stock_count: {
            type: mongoose.Schema.Types.Number,
        },
        review: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        },
        images:[
            {
                key:{ type: mongoose.Schema.Types.String},
                url:{type:mongoose.Schema.Types.String}
            }
        ],
        variants: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "ProductVariant" 
            }
        ],
    },
    { timestamps: true }
);


export const Product = mongoose.model('Product',productSchema)