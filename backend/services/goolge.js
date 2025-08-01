import { Google } from "arctic";
import dotenv from 'dotenv'

dotenv.config()


export const google = new Google(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:2003/api/google/callback"
)