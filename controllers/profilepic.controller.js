import { ApiError } from "../utill/apierror.js"
import { asynchandller } from "../utill/asynchandller.js"
import { AwsStorePath } from "../utill/filesPath.js"
import { updatePic, uploadPic } from "../utill/awsS3.js"




export const setProfilePic = asynchandller(async (req, res) => {
    const file = req.file
    const user = req.user

    if (!filepath) throw new ApiError(409, 'Please upload image file')

    const AwsKey = AwsStorePath('')
    const Key = `${AwsKey}/${file.originalname}`

    const img = await uploadPic(Key,file)

    user.profileImg = img
    await user.save()
    
    return res.status(200).json({
        message: 'Profile image successfully',
        updatedBuyer: user
    })
})

export const updateProfilePic = asynchandller(async (req, res) => {
    const { oldkey } = req.body
    const file = req.file

    const user = req.user
    if (!filepath) throw new ApiError(409, 'Please upload image file')

    const updatedImg = await updatePic(oldkey, file)
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