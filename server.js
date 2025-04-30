import express from 'express'
import dotenv from 'dotenv'
import cookieparser from 'cookie-parser'
import indexRoute from './routes/index.route.js'
import { connectDB } from './db/db.js'
import { handleError } from './utill/apierror.js'
import defaultData from './db/default.js'
import rateLimit from 'express-rate-limit'


dotenv.config()
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 50, 
    message: "Too many requests, please try again later.",
});
const port = process.env.PORT

await connectDB()
await defaultData()
const app = express()

app.use(limiter)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieparser(true))
app.use('/api',indexRoute)
app.use(handleError);

app.listen(port,()=>{
    console.log(`App listen on ${port}`)
})