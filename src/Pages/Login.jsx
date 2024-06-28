import React, { useRef } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";

const Login = ({ setUserIsAuthenticated }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserIsAuthenticated(true);
    } else {
      setUserIsAuthenticated(false);
    }
  }
  )

  async function signIn(e) {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (err) {
      console.log(err);
    }

    setUserIsAuthenticated(true);
  }

  async function logIn() {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      setUserIsAuthenticated(true)
    } catch (err) {
      console.error(err);
    }
  }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }

    setUserIsAuthenticated(true);
  }

  return (
    <div className="login_screen">
      <h1>Login into your account!</h1>
      <form className="login_container">
        <p>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" name="email" id="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            required
          />
        </p>

          <p>Doesn't have an account? <a href="#">Sign Up</a></p>

          <button type="button" className="login_btn" onClick={logIn}>Log In</button>
          <button type="button" className="login_btn" onClick={signInWithGoogle}>Log in with Google</button>
      </form>
      
      <p>{auth?.currentUser?.email}</p>
    </div>
  );
};

export default Login;
