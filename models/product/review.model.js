import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId: { 
        type:mongoose.Schema.Types.ObjectId
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Buyer"
    },
    comment:{ 
        type:mongoose.Schema.Types.String
    },
    rating: {
        type:Number
    }
  },{timestamps:true});
  


  export const Review = mongoose.model('Review',reviewSchema)