import mongoose from "mongoose";


const deliveryboySchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        trim:true,
    },
    email:{
        type:mongoose.Schema.Types.String,
        trim:true
    },
    phone:{
        type:mongoose.Schema.Types.Number,
        min:10,
        max:10
    },
    password:{
        type:mongoose.Schema.Types.String,
        trim:true,
        min:6,
        max:9
    },
    role:{
        type:mongoose.Schema.Types.String,
        enum:['buyer','seller','deliveryboy'],
        default:'deliveryboy'
    },
    vehicle_type:{
        type:mongoose.Schema.Types.String,
        enum:['bike','tempo','van','truck'],
    },
    vehicle_number: { 
        type:mongoose.Schema.Types.String,
        trim:true
     },
    is_ondelivery:{
        type:mongoose.Schema.Types.Boolean,
        default:false
    }
})


export const DeliveryBoy = mongoose.model('DeliveryBoy',deliveryboySchema)