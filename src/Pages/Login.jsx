import { useState, useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, signInWithGoogle, error, setError } = useAuthentication();

  useEffect(() => {
    toast.error(error);
  }, [error]);
  
  async function handleSubmit(e) {
    e.preventDefault();
    const {error} = await login(formData);

    if(error){
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
      <h1>Log in into your account!</h1>
      <form onSubmit={handleSubmit} className="login_container">
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

        <p className="alternate_mode">
            Doesn't have an account?
            <button
              type="button"
              className="alt_btn"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </p>

        <button className="main_btn">Log in</button>

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
