import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear()
    }, [])

    const handleLogin = async()=>{
        navigate('/')
    }
    return (
        <>
            
        </>
    )
}

export default Login
