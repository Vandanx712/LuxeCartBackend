import { S3Client, PutObjectCommand, GetObjectCommand,DeleteObjectCommand } from "@aws-sdk/client-s3";
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


export const uploadProfilePic = async(filepath) =>{

    const file = await fs.promises.readFile(filepath.path)
    const FileBuffer = await sharp(file).resize({height:100,width:150,fit:'fill'}).toBuffer()
    const imgkey = `userprofilepic/${filepath.filename}`
    const command = new PutObjectCommand({
        Bucket:bucketname,
        Key:imgkey,
        Body:FileBuffer,
        ContentType:filepath.mimetype
    })
    await s3.send(command)
    const getcommand = new GetObjectCommand({
        Bucket:bucketname,
        Key:imgkey,
    })
    const key = filepath.filename
    const url = await getSignedUrl(s3,getcommand)
    return { key , url}
}


export const  reuploadProfilePic = async(Key,filepath) =>{
    const oldkey = `userprofilepic/${Key}`
    const deletecommand = new DeleteObjectCommand({
        Bucket:bucketname,
        Key:oldkey,
    })
    await s3.send(deletecommand)

    const imgkey = `userprofilepic/${filepath.filename}`
    const file = await fs.promises.readFile(filepath.path)
    const Filebuffer = await sharp(file).resize({height:100,width:150,fit:'fill'}).toBuffer()
    const command = new PutObjectCommand({
        Bucket:bucketname,
        Key:imgkey,
        Body:Filebuffer,
        ContentType:filepath.mimetype
    })
    await s3.send(command)
    const getcommand = new GetObjectCommand({
        Bucket:bucketname,
        Key:imgkey,
    })

    const key = filepath.filename

    const url = await getSignedUrl(s3,getcommand)
    return { key, url}
}