import mongoose from "mongoose";


const deliveryboySchema = new mongoose.Schema({
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
    profileImg: {
        type: mongoose.Schema.Types.String
    },
    role: {
        type: mongoose.Schema.Types.String,
        enum: ['buyer', 'seller', 'deliveryboy'],
        default: 'deliveryboy'
    },
    vehicle_type: {
        type: mongoose.Schema.Types.String,
        enum: ['bike', 'tempo', 'van', 'truck'],
    },
    vehicle_number: {
        type: mongoose.Schema.Types.String,
        trim: true
    },
    is_ondelivery: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    }
})


export const DeliveryBoy = mongoose.model('DeliveryBoy', deliveryboySchema)