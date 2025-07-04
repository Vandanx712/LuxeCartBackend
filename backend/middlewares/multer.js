import multer from "multer";


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },filename:function(req,file,cb){
        const user = req.user
        const username = user.username
        cb(null,`${user.role}_${username}_${file.originalname}`)
    }
})

const upload = multer({
    storage:storage
})


export default upload