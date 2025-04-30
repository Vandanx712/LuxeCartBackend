import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { findUserByEmail } from './common.controller.js';

dotenv.config()


export const generateAccessToken = async (user) => {
    try {
        const accessToken = jwt.sign({
            id: user.id,
            role: user.role
        }, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE })
        return accessToken
    } catch (error) {
        console.error(error)
    }
}

export const generateRefreshToken = async (userId) => {
    try {
        const refreshToken = jwt.sign({
            id: userId
        }, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE })
        return refreshToken
    } catch (error) {
        console.error(error)
    }
}

export const login = asynchandller(async (req, res) => {
    const { email, password } = req.body

    if ([email, password].some((field) => field === '')) {
        throw new ApiError(404, 'Plz fill all field')
    }

    const user = await findUserByEmail(email)

    if (!user) throw new ApiError(404, 'User not found')

    if (user.role !== 'admin') {
        const passwordvalid = await bcrypt.compare(password, user.password)
        if (!passwordvalid) throw new ApiError(404, 'Plz enter correct password')
    }

    const accessToken = await generateAccessToken(user)
    const refreshToken = await generateRefreshToken(user.id)
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json({
            message: 'Login successfully',
            user: {
                username: user.username,
                name: user.name || null,
                email: user.email,
                role: user.role,
                profileImg: user.profileImg || null
            }
        })
})