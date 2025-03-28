import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Buyer"
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller"
        },
        delivery_boy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryBoy"
        },
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OrderItem"
            }
        ],
        total_price: {
            type: mongoose.Schema.Types.Number
        },
        payment_status: {
            type: mongoose.Schema.Types.String,
            enum: ["Pending", "Completed", "Failed"],
            default: "Pending"
        },
        order_status: {
            type: mongoose.Schema.Types.String,
            enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Processing"
        },
        shipping_address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
        },
    },
    { timestamps: true }
);



export const Order = mongoose.model('Order',orderSchema)