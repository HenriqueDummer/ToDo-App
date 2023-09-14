import React, { useState } from 'react'
import { auth, googleProvider } from '../../Config/Firebase'
import { 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile,
    signInWithEmailAndPassword
} from 'firebase/auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { doc, addDoc, collection } from 'firebase/firestore'
import { db } from '../../Config/Firebase'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")


    const todosRef = collection(db, "todos")

    const navigate = useNavigate()

    const signIn = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setError("Password does not match!")
            return
        }
        try{
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(user, {displayName: username})

            await addDoc(todosRef, {
                todoList: [
                    {
                        todoId: 0,
                        todoName: "Personal",
                        todoTasks: []
                    },
                    {
                        todoId: 1,
                        todoName: "Work",
                        todoTasks: []
                    },
                    {
                        todoId: 2,
                        todoName: "College",
                        todoTasks: []
                    }
                ]
            })
            
            console.log(inserted)

        } catch(err){
            console.error(err)
        } 

        navigate('/home')
    }
    
    

    const signIngWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider)

            await addDoc(todosRef, {
                todoList: [
                    {
                        todoId: 0,
                        todoName: "Personal",
                        todoTasks: []
                    },
                    {
                        todoId: 1,
                        todoName: "Work",
                        todoTasks: []
                    },
                    {
                        todoId: 2,
                        todoName: "College",
                        todoTasks: []
                    }
                ]
            })
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
    <div className='register_screen'>
        <div className="register_container">
            <div className="img_container">
                <img src="" alt="" />
            </div>
            <form onSubmit={(e) => signIn(e)}>
                <input 
                    type="text" 
                    required 
                    placeholder='Username' 
                    max={18}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
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
                <input 
                    type="password" 
                    required 
                    placeholder='Confirm Password' 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <button>Register</button>
            </form>
            <button onClick={signIngWithGoogle}>Sign In With Google</button>
            <button onClick={logout}>Log Out</button>
        </div>
    </div>
  )
}

export default Register