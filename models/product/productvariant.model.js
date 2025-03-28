import mongoose from "mongoose";


const productVariantSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        variant_name: {
            type: mongoose.Schema.Types.String,
        }, // e.g., "128GB Black"
        price: {
            type: mongoose.Schema.Types.Number,
        },
        stock_count: {
            type: mongoose.Schema.Types.Number,
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


export const ProductVariant = mongoose.model('ProductVariant',productVariantSchema)