import { Buyer } from "../models/buyer/buyer.model.js";
import { Otp } from "../models/otp.model.js";
import { DeliveryBoy } from "../models/seller/deliveryboy.model.js";
import { Seller } from "../models/seller/seller.model.js";
import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";
import bcrypt from 'bcrypt'
import schedule from 'node-schedule'
import fs from 'fs'
import notify from 'node-notifier'







export const findUserByEmail = async(email) => {

    let user = await Buyer.findOne({ email });
    if (user) return user ;

    user = await DeliveryBoy.findOne({ email });
    if (user) return user;

    user = await Seller.findOne({ email });
    if (user) return user;

    return null;
}


export const updatePassword = asynchandller(async(req,res)=>{
    const { email,password } = req.body

    if(!password) throw new ApiError(409,'Enter password')

    const user = await findUserByEmail(email)
    const checkOtp = await Otp.find({userid:user.id})

    if(checkOtp.isverify == false) throw new ApiError(403,'Section expire or invalid please re-enter email to reset a password')

    user.password = await bcrypt.hash(password,10)
    await user.save()

    await Otp.findByIdAndDelete(checkOtp.id)
    return res.status(200).json({
        message:'Update password successfully'
    })
})


export const filedeleteReminder = (time,filepath) =>{
    const {Time} = time
    const jobname = 'deleteFile'
    const path = filepath
    console.log('time',Time)
    console.log('path',path)

    schedule.scheduleJob(jobname,Time,async function() {
        console.log('path',path)
        await fs.promises.unlink(path)
        notify.notify({title:jobname,sound:true})
        console.log('Delete file successfully')
        schedule.cancelJob(jobname)
    })
}