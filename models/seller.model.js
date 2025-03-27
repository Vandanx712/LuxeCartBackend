import mongoose from "mongoose";


const sellerSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        trim: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        trim: true
    },
    phone: {
        type: mongoose.Schema.Types.Number,
        min: 10,
        max: 10
    },
    password: {
        type: mongoose.Schema.Types.String,
        trim: true,
        min: 6,
        max: 9
    },
    role: {
        type: mongoose.Schema.Types.String,
        enum: ['buyer', 'seller', 'deliveryboy'],
        default: 'seller'
    },
    shopname: {
        type: mongoose.Schema.Types.String,
        trim: true
    },
    addresses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    orders: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Order"
     }], 

}, { timestamps: true })



export const Seller = mongoose.model('Seller',sellerSchema)