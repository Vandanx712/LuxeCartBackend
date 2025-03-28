import mongoose from "mongoose";



const cartSchema = new mongoose.Schema({
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        reff:'Buyer'
    },
    items:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
            variant:{type:mongoose.Schema.Types.ObjectId,ref:'Variant'},
            quantity:{type:mongoose.Schema.Types.Number}
        }
    ],
    totalprice:{type:mongoose.Schema.Types.Number,default:0}
},{timestamps:true})


export const Cart = mongoose.model('Cart',cartSchema)