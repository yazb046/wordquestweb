import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import axios from "axios";
import { useUser } from "../hooks/useUser";

const LoginPage: React.FC = () =>  {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useToken();
  const navigate = useNavigate(); 

  const onLogInClicked = async () => {
    axios.post('http://localhost:8080/login',{}, { headers:  {
      "username":emailValue,
      "password":passwordValue,
   }}).then((response) => {
    setToken(response.headers.getAuthorization());
    navigate("/");
   })
  };

  const onForgotPasswordClicked = () => {
    navigate("/forgot-password");
  };

  const onSignUpClicked = () => {
    navigate("/sign-up");
  };

  return (
		<div className='login'>
			<div className='login-container'>
				<h1 className='login-title'>Log In</h1>
				{errorMessage && <div>{errorMessage}</div>}
				<input
					value={emailValue}
					onChange={(e) => setEmailValue(e.target.value)}
					placeholder='user@mailbox.xyz'
					className='emailInput'
				/>
				<input
					value={passwordValue}
					type='password'
					onChange={(e) => setPasswordValue(e.target.value)}
					placeholder='password'
					className='passwordInput'
				/>
				<hr style={{ marginBottom: '20px' }} />
				<div className='authorizationButtons'>
					<button 
          disabled={!emailValue || !passwordValue} 
          onClick={onLogInClicked}
          className="loginButton"
          >
						Log In
					</button>
					<button 
          onClick={onForgotPasswordClicked}
          className="forgotPasswordButton"
          >
            Forgot password?
          </button>
					<button 
          onClick={onSignUpClicked}
          className="signUpButton">
            Sign Up
            </button>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
