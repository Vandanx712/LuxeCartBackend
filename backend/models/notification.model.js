import mongoose from 'mongoose'


const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.String},
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});


export const Notification = mongoose.model('Notification',notificationSchema)


