import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.String,
    },
    otp:{
        type:mongoose.Schema.Types.Number
    },
    expirein:{
        type:mongoose.Schema.Types.Date
    }
})


export const Otp = mongoose.model('Otp',otpSchema)