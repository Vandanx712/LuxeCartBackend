import { Otp } from "../models/otp.model.js";
import sendVerifyPasswordOtpEmail from "../notification/sentVerifyPasswordOtp.js";
import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";
import { generateotp } from "../utill/generateotp.js";
import { findUserByEmail } from "./finduserByemail.js";
import bcrypt from 'bcrypt'





export const forgetPassword = asynchandller(async (req, res) => {
    const { email } = req.body
    if (!email) throw new ApiError(409, 'Plz enter your email')

    const user = await findUserByEmail(email)
    if (!user) throw new ApiError(409, 'User not found plz enter valid email')

    const otp = await generateotp()

    await Otp.create({
        userid: user.id,
        otp: otp,
        expirein: new Date(Date.now() + 2 * 60 * 1000)
    })

    await sendVerifyPasswordOtpEmail(user, otp)

    return res.status(200).json({
        message: 'Send otp on mail successfully'
    })

})    /// resend otp mate aa use karvi 


export const resetPassword = asynchandller(async (req, res) => {
    const { email, otp, password } = req.body
    if (!otp) throw new ApiError(409, 'Plz enter otp')

    const user = await findUserByEmail(email)

    const findotp = await Otp.findOne({ userid: user.id })

    if (Date.now() > findotp.expirein) {
        await Otp.findByIdAndDelete(findotp.id)
        throw new ApiError(404, 'Plz enter valid otp')
    }

    if (otp !== findotp.otp) throw new ApiError(409, 'Plz enter correct otp')

    user.password = await bcrypt.hash(password, 10)
    await user.save()

    await Otp.findByIdAndDelete(findotp.id)

    return res.status(200).json({
        message: 'Reset password successfully'
    })
})
