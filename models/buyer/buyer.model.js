import mongoose, { mongo, trusted } from "mongoose";


const buyerSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.String,
        trim:true,
    },
    name:{
        type:mongoose.Schema.Types.String
    },
    email:{
        type:mongoose.Schema.Types.String,
        trim:true
    },
    phone:{
        type:mongoose.Schema.Types.Number
    },
    password:{
        type:mongoose.Schema.Types.String,
        trim:true,
    },
    profileImg:{
        key:{type:mongoose.Schema.Types.String},
        url:{type:mongoose.Schema.Types.String}
    },
    role:{
        type:mongoose.Schema.Types.String,
        enum: ['buyer', 'seller', 'deliveryboy','admin'],
        default:'buyer'
    },
    addresses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    },
    wishlist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Wishlist'
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    orders:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }
},{timestamps:true})



export const Buyer = mongoose.model('Buyer',buyerSchema)