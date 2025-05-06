import mongoose from "mongoose";


const sellerSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        trim: true,
    },
    name:{
        type:mongoose.Schema.Types.String
    },
    email: {
        type: mongoose.Schema.Types.String,
        trim: true
    },
    phone: {
        type: mongoose.Schema.Types.Number,
    },
    password: {
        type: mongoose.Schema.Types.String,
        trim: true,
    },
    profileImg:{
        key:{type:mongoose.Schema.Types.String},
        url:{type:mongoose.Schema.Types.String}
    },
    role: {
        type: mongoose.Schema.Types.String,
        enum: ['buyer', 'seller', 'deliveryboy','admin'],
        default: 'seller'
    },
    shopname: {
        type: mongoose.Schema.Types.String,
        trim: true
    },
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        }
    ],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }]
}, { timestamps: true })



export const Seller = mongoose.model('Seller', sellerSchema)