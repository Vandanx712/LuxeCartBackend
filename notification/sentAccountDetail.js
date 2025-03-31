import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { Seller } from '../models/seller/seller.model.js';

dotenv.config()


async function sendAccountDetailEmail(user) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: { 
            user:process.env.ADMIN_EMAIL,
            pass:process.env.ADMIN_EMAIL_SCERECT_KEY
        },
    });

    const seller = await Seller.findById(user.createBy)

    await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: user.email,
        subject: `Give your Username & password`,
        text:` Hello ${user.name}, Welcome to ${seller.shopname}. Your username is ${user.name} and your password is ${user.password} sent by ${seller.name}`,
    });
}

export default sendAccountDetailEmail



