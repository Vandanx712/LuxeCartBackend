import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()


async function sendWelcomeEmail(user) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { 
            user:process.env.ADMIN_EMAIL,
            pass:process.env.ADMIN_EMAIL_SCERECT_KEY
        },
    });

    const welcomehtml = fs.readFileSync(path.join('notification/welcome.html'),'utf-8').replace("#username#",user.username)
    await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: user.email,
        subject: `Welcome Email`,
        html:welcomehtml
    });
}

export default sendWelcomeEmail