import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Buyer"
        },
        payment_method: {
            type: String,
            enum: ["Credit Card", "PayPal", "UPI", "Cash on Delivery"],
        },
        amount: {
            type: Number,
        },
        transaction_id: {
            type: String,
            unique: true
        },
        payment_status: {
            type: String,
            enum: ["Pending", "Completed", "Failed"],
            default: "Pending"
        },
    },
    { timestamps: true }
);


export const Payment = mongoose.model('Payment',paymentSchema)