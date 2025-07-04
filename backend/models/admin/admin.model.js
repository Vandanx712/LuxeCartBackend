import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        trim: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        trim: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        trim: true,
    },
    role: {
        type: mongoose.Schema.Types.String,
        enum: ['buyer', 'seller', 'deliveryboy','admin'],
        default: 'admin'
    },
}, { timestamps: true })


export const Admin = mongoose.model('Admin',adminSchema)