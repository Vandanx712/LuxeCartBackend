import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()

async function sentOrderInfomail(seller) {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_SCERECT_KEY
        }
    })
    const orderhtml = fs.readFileSync(path.join('notification/order.html'),'utf-8').replace("#username#",seller.username)

    await transporter.sendMail({
        from:process.env.ADMIN_EMAIL,
        to:seller.email,
        subject:"Order info",
        html:orderhtml
    })
    
}

export default sentOrderInfomail