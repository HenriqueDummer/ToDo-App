import LoginComponent from "../Components/LoginComponent";

const SignUp = ({ setUserIsAuthenticated }) => {
  
  return(
    <div className="login_screen">
        <h1>Create a new account!</h1>
        <LoginComponent signUp={false} setUserIsAuthenticated={setUserIsAuthenticated} />
    </div>
  )
};

export default SignUp;