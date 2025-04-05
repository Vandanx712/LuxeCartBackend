import { ApiError } from "../utill/apierror.js"
import { asynchandller } from "../utill/asynchandller.js"
import { reuploadProfilePic, uploadProfilePic } from "../utill/awsS3.js"
import fs from 'fs'
import { filedeleteReminder } from "./common.controller.js"




export const setProfilePic = asynchandller(async (req, res) => {
    const filepath = req.file
    const user = req.user
    console.log(user,'seller')

    if (!filepath) throw new ApiError(409, 'Please upload image file')

    const img = await uploadProfilePic(filepath)
    const time = new Date(Date.now() + 5 * 60 * 1000)

    user.profileImg = img
    await user.save()

    filedeleteReminder(time, filepath.path)
    return res.status(200).json({
        message: 'Profile image successfully',
        updatedBuyer: user
    })
})

export const updateProfilePic = asynchandller(async (req, res) => {
    const { oldkey } = req.body
    const filepath = req.file

    const user = req.user
    if (!filepath) throw new ApiError(409, 'Please upload image file')

    const updatedImg = await reuploadProfilePic(oldkey, filepath)
    const time = new Date(Date.now() + 5 * 60 * 1000)

    user.profileImg = updatedImg
    await user.save()
    filedeleteReminder(time, filepath.path)

    return res.status(200).json({
        message: 'Profile image update successfully',
        updatedBuyer: user
    })
})


export const getProfilePic = asynchandller(async (req, res) => {
    const user = req.user

    const profilepic = user.profileImg
    return res.status(200).json({
        message: 'Fetch user profile image',
        profilepic
    })
})