import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useToken} from "../../hooks/useToken";
import axios from "axios";

const SignUpPage: React.FC = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSignUpClicked = async () => {
    const response = await axios.post('http://localhost:8080/sign-up',
      {
        "username":emailValue,
        "password":passwordValue
     }
    )
    if (response.data === "OK"){
      // TODO show successfull user registration message and then propose to go to login page
    } else {
      //Propose to chose another username and propose otherwise
    }
  };

  const onLogInClicked = () => {
    navigate("/login");
  };


  return (
    <div className="signin">
      <div className="signin-container">
      <h1 className="login-title">Sign Up</h1>
      {errorMessage && <div>{errorMessage}</div>}
      <input
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        placeholder="user@mailbox.xyz"
        className="emailInput"
      />
      <input
        value={passwordValue}
        type="password"
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder="password"
        className="passwordInput"
      />
      <input
        value={confirmPasswordValue}
        type="password"
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder="password"
        className="passwordInput"
      />
      <hr style={{ marginBottom: "20px" }}/>
      <div className='authorizationButtons'>
      <button
        disabled={
          !emailValue ||
          !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}
        className="loginButton"
      >
        Sign up
      </button>
      <button onClick={onLogInClicked} className="loginButton">Back to Log in</button>
      </div>
    
      </div>
     
    </div>
  );
};

export default SignUpPage;
