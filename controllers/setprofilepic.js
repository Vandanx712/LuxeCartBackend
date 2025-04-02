import { asynchandller } from "../utill/asynchandller.js"
import { uploadOnAws } from "../utill/awsS3.js"




export const setProfilePic = asynchandller(async(req,res)=>{
    const filepath = req.file
    const user = req.user

    if(!filepath) throw new ApiError(409,'Plz upload imagefile')

    const avtarUrl = await uploadOnAws(filepath)

    user.profileImg = avtarUrl
    await user.save()

    return res.status(200).json({
        message:'Profile imaage successfully',
        updatedBuyer:user
    })
})