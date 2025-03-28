import mongoose from "mongoose";


const wishlistSchema = new mongoose.Schema({
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Buyer'
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
})


export const Wishlist = mongoose.model('Wishlist',wishlistSchema)