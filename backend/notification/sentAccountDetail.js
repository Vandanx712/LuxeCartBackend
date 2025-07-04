import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { Seller } from '../models/seller/seller.model.js';
import fs from 'fs'
import path from 'path';

dotenv.config()


async function sendAccountDetailEmail(user, password) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_SCERECT_KEY
        },
    });

    const seller = await Seller.findById(user.createBy)
    const html = fs.readFileSync(path.join('notification/getcredentials.html'), 'utf-8')
        .replace("#name#", user.name)
        .replace("#username#", user.username)
        .replace("#email#", user.email)
        .replace("#password#", password)
        .replace("#shopname#", seller.shopname)

    await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: user.email,
        subject: `Your Delivery Account Has Been Created`,
        html: html
    });
}

export default sendAccountDetailEmail