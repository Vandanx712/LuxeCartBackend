import nodemalier from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

async function sentStockAlertEmail(sellerEmail,username,productname,varintname) {
    const transporter = nodemalier.createTransport({
        service:"Gmail",
        auth:{
            user:process.env.ADMIN_EMAIL,
            pass:process.env.ADMIN_EMAIL_SCERECT_KEY
        }
    })
    
    await transporter.sendMail({
        from:process.env.ADMIN_EMAIL,
        to:sellerEmail,
        subject:'Stock Alert mail',
        text:` Hello ${username}, Your product ${productname} with varint ${varintname}'s stock are very low plz fullfill and update product.`
    })

}

export default sentStockAlertEmail