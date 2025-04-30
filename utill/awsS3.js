import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv'
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


export const uploadPic = async (key, files) => {
    const image = await Promise.all(
        files.map((file) => {
            const imageKey = `${key}/${file.originalname}`
            const command = new PutObjectCommand({
                Bucket: bucketname,
                Key: imageKey,
                Body: file.buffer,
                ContentType: filepath.mimetype
            })
            s3.send(command)
            const getcommand = new GetObjectCommand({
                Bucket: bucketname,
                Key: imageKey,
            })
            return { imageKey, url }
        })
    )
    // const url = await getSignedUrl(s3, getcommand)
    return image
}

export const updatePic = async (Key, files) => {
    const oldkey = `userprofilepic/${Key}`
    const deletecommand = new DeleteObjectCommand({
        Bucket: bucketname,
        Key: oldkey,
    })
    await s3.send(deletecommand)

    const imgkey = `userprofilepic/${files.filename}`
    const command = new PutObjectCommand({
        Bucket: bucketname,
        Key: imgkey,
        Body: Filebuffer,
        ContentType: filepath.mimetype
    })
    await s3.send(command)
    const key = filepath.filename
    return { key, url }
}