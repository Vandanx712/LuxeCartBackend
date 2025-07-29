import React, { useState } from 'react'
import { FiLock, FiPhone, FiUser } from 'react-icons/fi'
import { IoEyeOffOutline, IoEyeOutline, IoMailOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import {Toaster,toast} from 'react-hot-toast'
import { FaUser } from 'react-icons/fa'
import axios from 'axios'

function Signup() {

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailvalida = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailvalida.test(email)) toast.error('Plz enter valid email')
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/buyer/register`,
                {
                    username:username.trim(),
                    name:name.trim(),
                    email:email.trim().toLowerCase(),
                    phone:phone,
                    password:password.trim()
                }
            )
            toast.success(response.data.message)
            navigate('/login')
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data.message)
        }
    }


    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-DeepNavy to-royalpurple font-manrope p-4 relative">

                {/* Form Card */}
                <div className="w-full max-w-md bg-offwhite/95 shadow-xl rounded-lg p-6 space-y-6 z-10">

                    {/* Icon & Welcome */}
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                            <FiUser className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-3xl font-Playfair font-bold text-DeepNavy">
                            Join us
                        </p>
                        <p className="text-warmgrey text-base">
                            Sign up to  create your account
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-3">
                            <label htmlFor="email" className="text-CharcoalBlack font-medium">
                                Username
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-4 h-4 w-4 text-warmgrey" />
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-10 h-12 w-full bg-white border border-warmgrey/30 focus:border-royalpurple focus:ring-royalpurple/20 rounded"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label htmlFor="email" className="text-CharcoalBlack font-medium">
                                Name
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-4 h-4 w-4 text-warmgrey" />
                                <input
                                    type="text"
                                    placeholder="Enter your fullname"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10 h-12 w-full bg-white border border-warmgrey/30 focus:border-royalpurple focus:ring-royalpurple/20 rounded"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label htmlFor="email" className="text-CharcoalBlack font-medium">
                                Email Address
                            </label>
                            <div className="relative">
                                <IoMailOutline className="absolute left-3 top-4 h-4 w-4 text-warmgrey" />
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12 w-full bg-white border border-warmgrey/30 focus:border-royalpurple focus:ring-royalpurple/20 rounded"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label htmlFor="email" className="text-CharcoalBlack font-medium">
                                Phone
                            </label>
                            <div className="relative">
                                <FiPhone className="absolute left-3 top-4 h-4 w-4 text-warmgrey" />
                                <input
                                    type="text"
                                    placeholder="Enter your phoneNo"
                                    value={phone}
                                    onChange={(e) => {
                                        const onlyDigits = e.target.value.replace(/\D/g, '');
                                        const limitedDigits = onlyDigits.slice(0, 10);
                                        setPhone(Number(limitedDigits.trim()));
                                    }}
                                    className="pl-10 h-12 w-full bg-white border border-warmgrey/30 focus:border-royalpurple focus:ring-royalpurple/20 rounded"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label htmlFor="password" className="text-CharcoalBlack font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-4 h-4 w-4 text-warmgrey" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-12 bg-white w-full border border-warmgrey/30 focus:border-royalpurple focus:ring-royalpurple/20 rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-warmgrey hover:text-CharcoalBlack transition-colors"
                                >
                                    {showPassword ? <IoEyeOffOutline className="h-4 w-4" /> : <IoEyeOutline className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-br from-DeepNavy to-royalpurple hover:opacity-90 text-white font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] rounded"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Sign Up & Seller */}
                    <div className="space-y-4 pt-2 text-center">
                        <div>
                            <span className="font-semibold text-royalpurple">Do have already account? </span>
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="text-sm text-CharcoalBlack hover:text-royalpurple hover:text-[15px] transition-colors"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </>
    )
}

export default Signup
