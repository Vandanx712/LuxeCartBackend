import { asynchandller } from "../utill/asynchandller.js"
import { uploadProfilePic } from "../utill/awsS3.js"
import fs from 'fs'




export const setProfilePic = asynchandller(async(req,res)=>{
    const filepath = req.file
    const user = req.user
    console.log(user)

    if(!filepath) throw new ApiError(409,'Plz upload imagefile')

    const avtarUrl = await uploadProfilePic(user,filepath)

    user.profileImg = avtarUrl
    await user.save()

    await fs.promises.unlink(filepath.path)
    return res.status(200).json({
        message:'Profile imaage successfully',
        updatedBuyer:user
    })
})