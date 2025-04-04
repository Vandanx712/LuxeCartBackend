import mongoose from "mongoose";



const productimageSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    imagename:{
        type:mongoose.Schema.Types.String
    },
    url:{
        type:mongoose.Schema.Types.String
    },
    isPrimary:{
        type:mongoose.Schema.Types.Boolean,
        default:false
    }
})


export const Productimage = mongoose.model('Productimage',productimageSchema)