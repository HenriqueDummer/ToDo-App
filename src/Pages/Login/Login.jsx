import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../Config/Firebase'

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const logIn = async (e) => {
    e.preventDefault()

    await signInWithEmailAndPassword(auth, email, password)

    navigate('/home')
  }

  const signIngWithGoogle = async () => {
    try{
        await signInWithPopup(auth, googleProvider)
    } catch(err){
        console.log(err.error)
    } 
    navigate('/home')
  }

  const logout = async() => {
    try{
        await signOut(auth)
    } catch(err){
        console.log(err.error)
    }
  }

  return (
    <div className='login_screen'>
      <div className="login_container">
            <div className="img_container">
                <img src="" alt="" />
            </div>
            <form onSubmit={(e) => logIn(e)}>
                <input 
                    type="email" 
                    required 
                    placeholder='Email' 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input 
                    type="password" 
                    required 
                    placeholder='Password' 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button>Login</button>
            </form>
            <button onClick={signIngWithGoogle}>Sign In With Google</button>
            <button onClick={logout}>Log Out</button>
        </div>
    </div>
  )
}

export default Login