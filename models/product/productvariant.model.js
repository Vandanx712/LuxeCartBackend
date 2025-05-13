import mongoose from "mongoose";


const productVariantSchema = new mongoose.Schema(
    {
        variant_name: {
            type: mongoose.Schema.Types.String,
        }, // e.g., "128GB Black"
        price: {
            type: mongoose.Schema.Types.Number,
        },
        discount_price: {
            type: mongoose.Schema.Types.Number,
            default: null
        },
        stock_count: {
            type: mongoose.Schema.Types.Number,
        },
        is_default_Variant: {
            type: mongoose.Schema.Types.Boolean,
            default: false
        },
        attributes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ProductAttribute"
            }
        ],
    },
    { timestamps: true }
);


export const ProductVariant = mongoose.model('ProductVariant', productVariantSchema)