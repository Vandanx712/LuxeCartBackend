import mongoose from "mongoose";


const orderItemSchema = new mongoose.Schema(
    {
        product: { 
            type: mongoose.Schema.Types.ObjectId,
             ref: "Product"
            },
        variant: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "ProductVariant" 
        },
        quantity: { 
            type: mongoose.Schema.Types.Number, 
         },
        price: { 
            type: mongoose.Schema.Types.Number, 
         },
    },
    { timestamps: true }
);


export const Orderitem = mongoose.model('Orderitem',orderItemSchema)