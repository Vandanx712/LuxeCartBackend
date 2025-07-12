import mongoose from "mongoose";


const addressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.String,
        },
        userType: {
            type: mongoose.Schema.Types.String
        },
        street: {
            type: mongoose.Schema.Types.String,
        },
        city: {
            type: mongoose.Schema.Types.String
        },
        state: {
            type: mongoose.Schema.Types.String
        },
        zip_code: {
            type: mongoose.Schema.Types.String,
        },
        is_default: {
            type: mongoose.Schema.Types.Boolean,
            default: false
        },
    },
    { timestamps: true }
);


export const Address = mongoose.model('Address',addressSchema)