import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { IoEyeOffOutline, IoEyeOutline, IoMailOutline } from 'react-icons/io5';
import { FiLock, FiUser } from 'react-icons/fi';
import {Toaster,toast} from 'react-hot-toast'
import axios from 'axios'
import { FaUserTie } from 'react-icons/fa';

const SellerLogin = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    useEffect(() => {
        localStorage.clear()
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/seller/login`,{
                email:email,
                password:password
            },{withCredentials:true}) 
            setLocalStorage(response.data.seller)
            toast.success(response.data.message)
            navigate('/sdeshboard')
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data.message)
        }
    };

    function setLocalStorage(user){
        localStorage.setItem('id',user.id)
        localStorage.setItem('username',user.username)
        localStorage.setItem('name',user.name)
        localStorage.setItem('email',user.email)
        localStorage.setItem('role',user.role)
    }

    const handleForgotPassword = () => {
        if(!email) toast.error('Please enter email to send otp')
    }

    return (

        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-DeepNavy to-royalpurple font-manrope p-4 relative">
            {/* Form Card */}
            <div className="w-full max-w-sm bg-offwhite/95 shadow-xl rounded-lg p-6 space-y-6 z-10">
                {/* Icon & Welcome */}
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                        <FaUserTie className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-playfair font-bold text-DeepNavy">
                        Welcome Back
                    </p>
                    <p className="text-warmgrey text-base">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-CharcoalBlack font-medium">
                            Email Address
                        </label>
                        <div className="relative">
                            <IoMailOutline className="absolute left-3 top-3 h-4 w-4 text-warmgrey" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="pl-10 h-12 w-full bg-white border border-warmgrey/30 focus:border-royalpurple focus:ring-royalpurple/20 rounded"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-CharcoalBlack font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-3 h-4 w-4 text-warmgrey" />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
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

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm text-royalpurple hover:text-DeepNavy transition-colors font-medium"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-br from-DeepNavy to-royalpurple hover:opacity-90 text-white font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] rounded"
                    >
                        Sign In
                    </button>
                </form>

                {/* Sign Up & Seller */}
                <div className="space-y-4 pt-2 text-center">
                    <div>
                        <span className="font-semibold text-royalpurple">Don't have an account? </span>
                        <button
                            type="button"
                            onClick={() => navigate('/sellersignup')}
                            className="text-sm text-CharcoalBlack hover:text-royalpurple hover:text-[15px] transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default SellerLogin;