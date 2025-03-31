import mongoose from "mongoose";


const coinSchema = new mongoose.Schema({
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Buyer'
    },
    coincount:{
        type:mongoose.Schema.Types.Number,
        default:0,
    }
},{timestamps:true})


export const Coin = mongoose.model('Coin',coinSchema)