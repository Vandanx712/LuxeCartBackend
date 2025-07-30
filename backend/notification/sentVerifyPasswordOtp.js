import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import path from 'path'
import { ApiError } from '../utill/apierror.js'

dotenv.config()


async function sendVerifyPasswordOtpEmail(user,otp) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { 
                user:process.env.ADMIN_EMAIL,
                pass:process.env.ADMIN_EMAIL_SCERECT_KEY
            },
        });
        
        const otphtml = (await fs.readFile(path.join("./notification/otp.html"), "utf-8"))
            .replace('#otp#', otp)
            .replace("#username#", user.username);
    
        await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: user.email,
            subject: `Verify Otp Email`,
            html:otphtml,
        });
    } catch (error) {
        throw new ApiError(error)
    }
}

export default sendVerifyPasswordOtpEmail