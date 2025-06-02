import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

async function sentOrderInfoForBoy(delivery) {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.ADMIN_EMAIL,
            pass:process.env.ADMIN_EMAIL_SCERECT_KEY
        }
    })

    await transporter.sendMail({
        from:process.env.ADMIN_EMAIL,
        to:delivery.email,
        subject:'Assign Order',
        text:`Hello ${delivery} DeliveryBoy, Our team assigned new Order for you.Please pick up and deliver safely.Please check whole order details from your deshboard.`
    })
}

export default sentOrderInfoForBoy