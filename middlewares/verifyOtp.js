import { Otp } from "../models/otp.model.js"
import { ApiError } from "../utill/apierror.js"
import { asynchandller } from "../utill/asynchandller.js"




export const verifyOtp = asynchandller(async (req, res, next) => {
    try {
        const { otp } = req.body

        if (!otp) throw new ApiError(400, 'Plz enter your Otp')

        console.log('req.User',req.User)

        const findotp = await Otp.findOne({ userid: req.User.id })

        if (Date.now() > findotp.expirein) {
            await Otp.findByIdAndDelete(findotp.id)
            throw new ApiError(400, 'Your Otp is invalid')
        }

        if (otp !== findotp.otp) throw new ApiError(404, 'Your otp is incorrect')
        else next()
    } catch (error) {
        next(error)
    }
})
