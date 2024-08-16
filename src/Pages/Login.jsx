import React, { useContext, useRef, useState } from "react";
import { signUp, logIn, signInWithGoogle } from "../config/logInFunctions";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const {userIsAuthenticated} = useContext(UserContext)
  const [isLogin, setIsLogin] = useState(true);
  console.log(userIsAuthenticated)

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <div className="login_screen">
      <h1>{isLogin ? "Log in into your account!" : "Create a new account!"}</h1>
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
        {!isLogin && (
          <p>
            <label htmlFor="password">Confirm password</label>
            <input
              ref={confirmPasswordRef}
              type="password"
              name="password"
              id="password"
              required
            />
          </p>
        )}

        {isLogin ? (
          <p className="alternate_mode">
            Doesn't have an account?
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="alt_btn"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p className="alternate_mode">
            Already have an account?
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="alt_btn"
            >
              Log in
            </button>
          </p>
        )}

        {isLogin ? (
          <button
            className="main_btn"
            type="button"
            onClick={() =>
              logIn(emailRef.current.value, passwordRef.current.value)
            }
          >
            Log in
          </button>
        ) : (
          <button
            className="main_btn"
            type="button"
            onClick={() =>
              signUp(emailRef.current.value, passwordRef.current.value)
            }
          >
            Sign up
          </button>
        )}

        <button
          type="button"
          className="login_google main_btn"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
