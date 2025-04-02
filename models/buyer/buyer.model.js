import mongoose, { mongo, trusted } from "mongoose";


const buyerSchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        trim:true,
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
        min:6,
        max:9
    },
    profileImg:{
        type:mongoose.Schema.Types.String
    },
    role:{
        type:mongoose.Schema.Types.String,
        enum:['buyer','seller','deliveryboy'],
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
    },
    refreshToken:{
        type:mongoose.Schema.Types.String
    }
},{timestamps:true})



export const Buyer = mongoose.model('Buyer',buyerSchema)