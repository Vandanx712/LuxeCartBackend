import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

async function sentOrderInfomail(email) {
    const transporter = nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_SCERECT_KEY
        }
    })
    
    await transporter.sendMail({
        from:process.env.ADMIN_EMAIL,
        to:email,
        subject:"Order info",
        text:'One Order placed plz fulfill buyer order'
    })
    
}

export default sentOrderInfomail