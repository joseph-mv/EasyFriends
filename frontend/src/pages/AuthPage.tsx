import { useState } from "react"
import Navbar from "../components/Navbar"
import SignupForm from "../components/SignupForm/SignupForm"
import LoginForm from "../components/LoginForm/LoginForm"



const AuthPage = () => {
    const [isLogin, setIsLogin]=useState(true)
  return (
    <div>
        <Navbar/>
        {
            isLogin? <LoginForm setIsLogin={setIsLogin}/>:<SignupForm setIsLogin={setIsLogin}/>
        }
       
    </div>
  )
}

export default AuthPage