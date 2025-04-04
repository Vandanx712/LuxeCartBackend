import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv'
import fs from 'fs'
import sharp from "sharp";


dotenv.config()

const bucketname = process.env.BUCKET_NAME || backet.vandan
const bucketregion = process.env.BUCKET_REGION
const accesskey = process.env.ACCESS_KEY
const secretaccesskey = process.env.SECRET_ACCESS_KEY
const s3 = new S3Client({
    credentials: {
        accessKeyId: accesskey,
        secretAccessKey: secretaccesskey
    },
    region: bucketregion,
})


export const uploadProfilePic = async(user,filepath) =>{

    const filebuffer = await fs.promises.readFile(filepath.path)
    const FileBuffer = await sharp(filebuffer).resize({height:100,width:100,fit:'contain'}).toBuffer()
    const key = `userprofilepic/${filepath.filename}`
    const command = new PutObjectCommand({
        Bucket:bucketname,
        Key:key,
        Body:FileBuffer,
        ContentType:filepath.mimetype
    })
    await s3.send(command)
    const getcommand = new GetObjectCommand({
        Bucket:bucketname,
        Key:key,
    })
    const url = await getSignedUrl(s3,getcommand)
    return url
}