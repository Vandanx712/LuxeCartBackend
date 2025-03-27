import express from 'express'
import dotenv from 'dotenv'
import cookieparser from 'cookie-parser'
import indexRoute from './routes/index.route.js'
import { connectDB } from './db/db.js'


dotenv.config()
const port = process.env.PORT

await connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieparser())

app.use('/api',indexRoute)

app.listen(port,()=>{
    console.log(`App listen on ${port}`)
})