import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()


async function sendWelcomeEmail(user) {
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
        subject: `Welcome Email`,
        text:` Hello ${user.name}, Welcome to LuxeCart. Let improve your shooping experience.`,
    });
}

export default sendWelcomeEmail