import express from 'express'
import dotenv from 'dotenv'
import cookieparser from 'cookie-parser'
import indexRoute from './routes/index.route.js'
import { connectDB } from './db/db.js'
import { handleError } from './utill/apierror.js'
import defaultData from './db/default.js'
import rateLimit from 'express-rate-limit'
import cors from 'cors'

dotenv.config()
const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 50, 
    statusCode:429,
    message: "Too many requests, please try again later.",
});
const port = process.env.PORT

await connectDB()
await defaultData()
const app = express()

app.use(cors({origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(limiter)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieparser())
app.use('/api',indexRoute)
app.use(handleError);

app.listen(port,()=>{
    console.log(`App listen on ${port}`)
})