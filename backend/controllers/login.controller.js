import { ApiError } from "../utill/apierror.js";
import { asynchandller } from "../utill/asynchandller.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { findUserByEmail } from './common.controller.js';
import { decodeIdToken, generateCodeVerifier, generateState } from "arctic";
import { google } from "../services/goolge.js";
import { Buyer } from "../models/buyer/buyer.model.js";

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
        secure: false,
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000
    }

    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json({
            message: 'Login successfully',
            user: {
                id: user._id,
                username: user.username,
                name: user.name ?? null,
                email: user.email,
                role: user.role,
                profileImg: user.profileImg ?? null
            }
        })
})

//Google login part
export const getGoolgeLoginpage = asynchandller(async (req, res) => {
    const state = generateState()
    const codeverifier = generateCodeVerifier()
    const url = google.createAuthorizationURL(state, codeverifier, [
        'openid',
        'profile',
        'email'
    ])

    const cookieConfig = {
        httpOnly: true,
        secure: true,
        maxAge: 2 * 60 * 1000,
        sameSite: 'None'
    }

    res.cookie('google_oauth_state', state, cookieConfig)
    res.cookie('google_code_verifier', codeverifier, cookieConfig)
    res.json({
        url
    })
})

export const getGoogleLoginCallback = asynchandller(async (req, res) => {
    const { code, state } = req.query

    const {
        google_oauth_state: storedState, //alicename aapyu chhe 
        google_code_verifier: codeVerfier
    } = req.cookies

    if (
        !code ||
        !state ||
        !storedState ||
        !codeVerfier ||
        state !== storedState
    ) throw new ApiError(400, "Couldn't login with Google because of invalid login attempt. Please try again!")

    let token
    try {
        token = await google.validateAuthorizationCode(code, codeVerfier)
    } catch (error) {
        console.log(error)
        throw new ApiError(400, "Couldn't login with Google because of invalid login attempt. Please try again!")
    }

    const details = decodeIdToken(token.idToken())

    const { sub: googleUserId, name, email, phone, picture } = details

    const user = await findUserByEmail(email)
    if (user && user.role !== 'buyer') throw new ApiError(400, 'User already exist for other roles')

    if (!user.password && user.providerAccountId) {
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
                message: 'Login with google successfully',
                user
            })
            .redirect('/home')
    }

    const newbuyer = await Buyer.create({
        name: name,
        email: email,
        phone: phone,
        providerAccountId: googleUserId,
        role: 'buyer',
        password: null,
        profileImg: picture
    })

    const accessToken = await generateAccessToken(newbuyer)
    const refreshToken = await generateRefreshToken(newbuyer.id)
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json({
            message: 'Buyer register and login successfully',
            newbuyer
        })
        .redirect('/home')
})