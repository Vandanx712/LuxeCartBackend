import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()


async function sendVerifyPasswordOtpEmail(user,otp) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: { 
            user:process.env.ADMIN_EMAIL,
            pass:process.env.ADMIN_EMAIL_SCERECT_KEY
        },
    });
    
    const otphtml = fs.readFileSync(path.join(__dirname,"otp.html"),"utf-8").replace('#otp#',otp).replace("#username#",user.username)
    await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: user.email,
        subject: `Verify Otp Email`,
        html:otphtml,
    });
}

export default sendVerifyPasswordOtpEmail