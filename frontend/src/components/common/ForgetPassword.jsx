import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiLock, FiSend } from "react-icons/fi";
import { useState } from "react";
import { toast, Toaster } from 'react-hot-toast'
import axios from "axios";
import { IoEnterOutline } from "react-icons/io5";

const ForgetPassword = ({ onclose, email }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [Email, setEmail] = useState(email)
    const [otp, setOtp] = useState('')
    const [isEnterOtp, setIsEnterOtp] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [password, setPassword] = useState('')
    const [invalid, setInValid] = useState(false)

    const handlesendotp = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/sendotp`, {
                email: Email.trim()
            })
            toast.success(response.data.message)
            setIsEnterOtp(true)
            setInValid(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data.message)
        }
    }

    const handleresendotp = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/sendotp`, {
                email: Email.trim()
            })
            toast.success(response.data.message)
            setInValid(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data.message)
        }
    }

    const handleverifyotp = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/verifyotp`, {
                email: Email.trim(),
                otp: Number(otp.trim())
            })
            setIsPassword(true)
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
            error.response?.data.message == 'Plz enter valid otp' ? setInValid(true) : setInValid(false)
            toast.error(error.response?.data.message)
        }
    }

    const handlepassword = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/updatepassword`,
                {
                    email: Email.trim(),
                    password: password.trim()
                }
            )
            toast.success(response.data.message)
            onclose()
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data.message)
        }
    }

    return (
        <>
            <div className="px-4 py-64 bg-slate-900 grid place-content-center">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: "12.5deg" }}
                            animate={{ scale: 1, rotate: "0deg" }}
                            exit={{ scale: 0, rotate: "0deg" }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-violet-600 to-indigo-600 p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                        >

                            {!isEnterOtp && !isPassword && (
                                <div className="relative z-10">
                                    <div className="bg-white w-16 h-16 mb-3 rounded-full text-3xl text-indigo-600 flex items-center justify-center mx-auto">
                                        <FiSend />
                                    </div>
                                    <h3 className="text-3xl  text-white font-Playfair text-center mb-3">
                                        Otp Verification
                                    </h3>
                                    <p className="text-center text-white mb-6">
                                        Click send otp button to send otp on your email and remember this otp is valid only 2 min.
                                    </p>
                                    <button
                                        onClick={handlesendotp}
                                        className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                                    >
                                        Send Otp
                                    </button>
                                </div>
                            )}

                            {isEnterOtp && !isPassword && (
                                <div className="relative z-10">
                                    <div className="bg-white w-16 h-16 mb-3 rounded-full text-3xl text-indigo-600 flex items-center justify-center mx-auto">
                                        <IoEnterOutline />
                                    </div>
                                    <h3 className="text-3xl text-white font-Playfair text-center mb-3">
                                        Otp Verification
                                    </h3>
                                    <input className="text-center text-CharcoalBlack mb-6 pl-10 pr-10 h-12 bg-white w-full border border-warmgrey/30 focus:border-royalpurple focus:ring-royalpurple/20 rounded" type="text" value={otp} placeholder="Enter Otp" onChange={(e) => setOtp(e.target.value)} />
                                    {!invalid && (
                                        <button
                                            onClick={handleverifyotp}
                                            className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                                        >
                                            Verify Otp
                                        </button>
                                    )}
                                    {invalid && (
                                        <button
                                            onClick={handleresendotp}
                                            className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                                        >
                                            ReSend Otp
                                        </button>
                                    )}
                                </div>
                            )}

                            {isPassword && (
                                <div className="relative z-10">
                                    <div className="bg-white w-16 h-16 mb-3 rounded-full text-3xl text-indigo-600 flex items-center justify-center mx-auto">
                                        <FiLock />
                                    </div>
                                    <h3 className="text-3xl text-white font-Playfair text-center mb-3">
                                        New Password
                                    </h3>
                                    <input className="text-center text-CharcoalBlack mb-6 pl-10 pr-10 h-12 bg-offwhite w-full border border-warmgrey/30 focus:border-royalpurple focus:ring-royalpurple/20 rounded" type="text" value={password} placeholder="Enter New Password" onChange={(e) => setPassword(e.target.value)} />
                                    <button
                                        onClick={handlepassword}
                                        className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                                    >
                                        Save Password
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
            <Toaster position="top-center" />
        </>
    );
};


export default ForgetPassword;