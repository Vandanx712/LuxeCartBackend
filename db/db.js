import mongoose from "mongoose";


export const connectDB = async()=>{
    const dbname = 'luxecart'
    try {
        const connectioninstance = await mongoose.connect(`${process.env.DATABASE_URL}/${dbname}`)
        console.log(`mongodb connect on ${connectioninstance.connection.host}`)
    } catch (error) {
        console.log(`connection error is ${error}`)
    }
}