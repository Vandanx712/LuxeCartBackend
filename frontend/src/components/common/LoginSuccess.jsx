import axios from "axios";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast'


const LoginSuccess = () => {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(()=>{
            setUser()
            toast.success('Login Successfully')
        },[3000])
    }, [])

    const setUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/me`, { withCredentials: true })
            setLocalStorage(response.data.user)
            const role = response.data.user.role
            if (role == 'buyer') navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    function setLocalStorage(user) {
        localStorage.setItem('id', user._id)
        localStorage.setItem('name', user.name)
        localStorage.setItem('username', user.username)
        localStorage.setItem('email', user.email)
        localStorage.setItem('role', user.role)
    }
    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-offwhite">
                <div className="grid place-content-center px-4 py-24">
                    <motion.div
                        transition={{
                            staggerChildren: 0.25,
                        }}
                        initial="initial"
                        animate="animate"
                        className="flex gap-2"
                    >
                        <motion.div variants={variants} className="h-20 w-3 bg-royalpurple" />
                        <motion.div variants={variants} className="h-20 w-3 bg-royalpurple" />
                        <motion.div variants={variants} className="h-20 w-3 bg-royalpurple" />
                        <motion.div variants={variants} className="h-20 w-3 bg-royalpurple" />
                        <motion.div variants={variants} className="h-20 w-3 bg-royalpurple" />
                    </motion.div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </>
    )
};

const variants = {
    initial: {
        scaleY: 0.5,
        opacity: 0,
    },
    animate: {
        scaleY: 1,
        opacity: 1,
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "circIn",
        },
    },
};


export default LoginSuccess;