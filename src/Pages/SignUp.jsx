import React, { useContext, useEffect, useRef, useState } from "react";
import { TodosContext } from "../Context/todosContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { createUser, signInWithGoogle, loading } =
    useAuthentication();

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    const {error} = await createUser(formData);

    if (error) {
      toast.error(error)
    }
  }


  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <div className="login_screen">
      <h1>Create a new account!</h1>
      <form onSubmit={handleSubmit} className="login_container">
        <p>
          <label htmlFor="displayName">Usename</label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </p>

        <p className="alternate_mode">
          Already have an account?
          <button
            onClick={() => navigate("/login")}
            type="button"
            className="alt_btn"
          >
            Log in
          </button>
        </p>
        <button
          disabled={loading}
          className={`main_btn ${loading ? "loading" : null}`}
        >
          {loading ? "Singin up" : "Sign up"}
        </button>

        <button
          type="button"
          className={`login_google main_btn`}
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default SignUp;
