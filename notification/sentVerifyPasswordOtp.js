import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()


async function sendVerifyPasswordOtpEmail(email,otp) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: { 
            user:process.env.ADMIN_EMAIL,
            pass:process.env.ADMIN_EMAIL_SCERECT_KEY
        },
    });

    await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: user.email,
        subject: `Verify Otp Email`,
        text:` Hello ${user.name}, it is ${otp} your otp for verify`,
    });
}

export default sendVerifyPasswordOtpEmail