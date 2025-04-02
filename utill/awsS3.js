import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv'
import fs from 'fs'


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


export const uploadOnAws = async(filepath) =>{

    const filebuffer = await fs.promises.readFile(filepath.path)
    const key = `productspic/${filepath.filename}`
    const command = new PutObjectCommand({
        Bucket:bucketname,
        Key:key,
        Body:filebuffer,
        ContentType:filepath.mimetype
    })
    await s3.send(command)
    const getcommand = new GetObjectCommand({
        Bucket:bucketname,
        Key:filepath.filename
    })
    const url = await getSignedUrl(s3,getcommand)
    await fs.promises.unlink(filepath.path)
    return url
}